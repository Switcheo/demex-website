import { BN_ZERO, parseNumber } from "@demex-info/utils";
import BigNumber from "bignumber.js";
import { CarbonSDK, WSModels } from "carbon-js-sdk";
import { TokenClient } from "carbon-js-sdk/lib/clients";

// Constant amount of liquidity (to estimate APY)
export const constantLP = new BigNumber(1000);

export interface Pool {
  poolId: number;
  denom: string;
  rewardsWeight: BigNumber;
  totalCommitment: BigNumber;
  sharesAmount: BigNumber;
  swapFee: BigNumber;

  denomA: string;
  amountA: BigNumber;

  denomB: string;
  amountB: BigNumber;
}

export interface WSPools {
  [key: number]: WSModels.Pool;
}

export const parseLiquidityPools = (data: WSPools, tokenClient: TokenClient): Pool[] => {
  const poolsArr = (Object.values(data) ?? []) as WSModels.Pool[];
  if (!poolsArr || poolsArr.length <= 0 || !tokenClient) return [];
  return poolsArr.map((extendedPool: WSModels.Pool) => {
    const {
      pool,
      rewards_weight = "0",
      total_commitment = "0",
    } = extendedPool;
    const amtA = parseNumber(pool?.amount_a, BN_ZERO)!;
    const amtB = parseNumber(pool?.amount_b, BN_ZERO)!;
    const adjustedAmtA = tokenClient.toHuman(pool?.denom_a ?? "", amtA);
    const adjustedAmtB = tokenClient.toHuman(pool?.denom_b ?? "", amtB);
    const sharesAmt = parseNumber(pool?.shares_amount, BN_ZERO)!;
    const adjustedShares = tokenClient.toHuman(pool?.denom, sharesAmt);
    const totalCommitBN = parseNumber(total_commitment, BN_ZERO)!;
    const adjustedCommit = tokenClient.toHuman(pool?.denom ?? "", totalCommitBN);
    const swapFee = parseNumber(pool?.swap_fee, BN_ZERO)!;
    return {
      poolId: pool.id,
      denom: pool?.denom ?? "",
      denomA: pool?.denom_a ?? "",
      amountA: adjustedAmtA,
      denomB: pool?.denom_b ?? "",
      amountB: adjustedAmtB,
      sharesAmount: adjustedShares,
      rewardsWeight: parseNumber(rewards_weight, BN_ZERO)!,
      totalCommitment: adjustedCommit,
      swapFee,
    };
  });
};

/**
 *
 * return weekly rewards for liquidity pool
 * @param rewards total weekly pools rewards (in BigNumber form)
 * @param rewardsWeight rewards weight for liquidity pool
 * @param totalWeight total rewards weight for all pools
 */
 export function getWeeklyRewards(
  rewards: BigNumber = BN_ZERO,
  rewardsWeight: BigNumber = BN_ZERO,
  totalWeight: BigNumber = BN_ZERO,
): BigNumber {
  const weeklyRewards = !totalWeight.isZero() ? rewards.times(rewardsWeight).div(totalWeight) : BN_ZERO;
  return weeklyRewards;
}

interface LPRewardsParams {
  sdk: CarbonSDK | undefined;
  pool: Pool;
  poolsRewards: BigNumber;
  totalWeight: BigNumber;
  amountLP?: BigNumber;
  boostFactor?: BigNumber;
  commitPower?: BigNumber;
}
/**
 *
 * Returns swth lp rewards in usd (amount depends on pool weight and user commitment power)
 *
 * @param sdk carbon sdk instance (for retrieving usd values, etc.)
 * @param pool pool data
 * @param poolsRewards total swth LP rewards
 * @param totalWeight total rewards weight for all pools
 * @param amountLP total LP tokens staked (used only if commitPower is undefined)
 * @param boostFactor boost factor of staked tokens (used only if commitPower is undefined)
 * @param commitPower user's commitment power (if not provided, take amountLP * boostFactor to get commitPower)
 */
export function getLPRewards(rewardsParams: LPRewardsParams) {
  const { sdk, pool, poolsRewards, totalWeight, amountLP = BN_ZERO, boostFactor = new BigNumber(1) } = rewardsParams;
  const swthUSD = sdk?.token.getUSDValue("swth") ?? BN_ZERO;
  const userCommit = rewardsParams.commitPower
    ? rewardsParams.commitPower
    : amountLP.times(boostFactor);

  // swthRewardsPoolUsd = poolsRewards * (rewardsWeight / totalWeight) * swthUsd
  const swthRewardsPoolUsd = getWeeklyRewards(poolsRewards, pool.rewardsWeight, totalWeight).times(swthUSD);
  const adjustedTotalCommit = pool.totalCommitment.plus(userCommit); // adjust totalCommit based on user's individual power
  // swthRewardsUserUsd = swthRewardsPoolUsd * (userCommitPower / adjustedTotalCommit)
  return adjustedTotalCommit.isZero() ? BN_ZERO : swthRewardsPoolUsd.times(userCommit.div(adjustedTotalCommit));
}

interface ApyParams extends LPRewardsParams {
  notionalLp?: BigNumber
  tradingFee?: BigNumber
}

/**
 *
 * return estimated APY (for detailed calculation, please refer to the following resources: https://www.notion.so/switcheo/Calculating-LP-APY-Pseudocode-f20f51dda7164e779c4680479eb628f2)
 * @param sdk carbon sdk instance (for retrieving usd values, etc.)
 * @param pool pool data
 * @param poolsRewards total swth LP rewards
 * @param totalWeight total rewards weight for all pools
 * @param amountLP total LP tokens staked
 * @param boostFactor boost factor of staked tokens
 * @param commitPower user's commitment power
 * @param notionalLp user's pool liquidity (in usd)
 * @param tradingFee trading fee of pool
 */
export function estimateAPY(apyParams: ApyParams) {
  const {
    sdk, pool, poolsRewards, totalWeight, amountLP = BN_ZERO, boostFactor = new BigNumber(1), commitPower = undefined, notionalLp = BN_ZERO, tradingFee = BN_ZERO,
  } = apyParams;
  const swthRewards = getLPRewards({
    sdk,
    pool,
    poolsRewards,
    totalWeight,
    amountLP,
    boostFactor,
    commitPower,
  });
  const totalRewards = tradingFee?.plus(swthRewards) ?? swthRewards;
  return notionalLp.isZero() ? BN_ZERO : totalRewards.div(notionalLp).times(52).shiftedBy(2);
}

/**
 *
 * calculate trading fee in 7 days
 * tradingFee = (Pool Volume) * Swap Fee * (user share of pool)
 * @param poolVolume
 * @param swapFee
 * @param shares of pool
 */

export function calculateTradingFee(poolVolume: BigNumber, swapFee: BigNumber, userShare: BigNumber) {
  const tradingFee = poolVolume.times(swapFee).times(userShare).times(7);
  return tradingFee;
}

/**
 *
 * Return estimated APY if user's pool liquidity (in usd) is provided (i.e. no staked tokens info).
 * Used for calculating APY given constant value (e.g. $1000 of staked LP tokens)
 * @param sdk carbon sdk instance (for retrieving usd values, etc.)
 * @param pool pool data
 * @param poolsRewards total swth LP rewards
 * @param totalWeight total rewards weight for all pools
 * @param boostFactor boost factor of staked tokens
 * @param notionalLp user's pool liquidity (in usd)
 * @param tradingFee trading fee of pool
 */
export function estimateApyUSD(apyUSDParams: ApyParams) {
  const {
    sdk, pool, poolsRewards, totalWeight, boostFactor = new BigNumber(1), notionalLp = BN_ZERO, tradingFee = BN_ZERO,
  } = apyUSDParams;
  const poolTotal = getTotalUSDPrice(sdk, pool);
  const amountLP = poolTotal.isZero() ? BN_ZERO : notionalLp.div(poolTotal).times(pool.sharesAmount);
  return estimateAPY({
    sdk, pool, poolsRewards, totalWeight, amountLP, boostFactor, notionalLp, tradingFee,
  });
}

/**
 *
 * return total USD amount for tokenA and tokenB of liquidity pool from pool data
 * @param sdk carbon sdk instance (for retrieving token usd value, etc.)
 * @param pool liquidity pool data
 */
 export function getTotalUSDPrice(
  sdk: CarbonSDK | undefined,
  pool: Pool,
): BigNumber {
  const {
    amountA: amountABN = BN_ZERO, amountB: amountBBN = BN_ZERO, denomA, denomB,
  } = pool;

  const usdValueA = sdk?.token.getUSDValue(denomA) ?? BN_ZERO;
  const usdValueB = sdk?.token.getUSDValue(denomB) ?? BN_ZERO;

  const amountAUSD = usdValueA.times(amountABN);
  const amountBUSD = usdValueB.times(amountBBN);

  const totalValueUSD = amountAUSD.plus(amountBUSD);
  return totalValueUSD;
}
