import { POOL_DECIMALS } from "@demex-info/constants";
import { BN_ZERO, parseNumber } from "@demex-info/utils";
import BigNumber from "bignumber.js";
import { CarbonSDK, Models, WSModels } from "carbon-js-sdk";
import { TokenClient } from "carbon-js-sdk/lib/clients";

// Constant amount of liquidity (to estimate APY)
export const constantLP = new BigNumber(1000);

export const commitLpWalletAddr = {
  [CarbonSDK.Network.MainNet]: "swth1jdkc8y4a60k279fwe9hwgzdpn6pnxzg898al27",
  [CarbonSDK.Network.TestNet]: "tswth1jdkc8y4a60k279fwe9hwgzdpn6pnxzg8psv0nm",
  [CarbonSDK.Network.DevNet]: "swth1jdkc8y4a60k279fwe9hwgzdpn6pnxzg898al27",
  [CarbonSDK.Network.LocalHost]: "tswth1jdkc8y4a60k279fwe9hwgzdpn6pnxzg8psv0nm",
};

export interface Pool {
  denom: string;
  rewardsWeight: BigNumber;
  totalCommitment: BigNumber;
  sharesAmount: BigNumber;

  denomA: string;
  amountA: BigNumber;

  denomB: string;
  amountB: BigNumber;
}

export interface WSPools {
  [key: number]: WSModels.Pool;
}

export interface TotalCommitmentMap {
  [denom: string]: BigNumber;
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
    return {
      denom: pool?.denom ?? "",
      denomA: pool?.denom_a ?? "",
      amountA: adjustedAmtA,
      denomB: pool?.denom_b ?? "",
      amountB: adjustedAmtB,
      sharesAmount: adjustedShares,
      rewardsWeight: parseNumber(rewards_weight, BN_ZERO)!,
      totalCommitment: adjustedCommit,
    };
  });
};

/**
 *
 * outputs breakdown of return tokens when user inputs amount of liquidity tokens
 * used in remove liquidity to display amount of return tokens
 * amountA = (sharesToRemove / total shares in pool) * amountAInPool
 * amountB = (sharesToRemove / total shares in pool) * amountBInPool
 * @param inputLiquid number of liquidity tokens input by user (i.e. number of liquidity tokens to be removed)
 * @param selectPool selected pool data
 * @param userLPPercentage user"s share percentage in LP
 * @param userLPTokens number of liquidity tokens that user owns
 * @param tokenClient sdk token client
 */
export function getBreakdownToken(
  inputLiquid: BigNumber,
  selectPool: Pool,
  userLPPercentage: BigNumber = BN_ZERO,
  userLPTokens: BigNumber = BN_ZERO,
  tokenClient: TokenClient | undefined,
): [BigNumber, BigNumber] {
  const {
    amountA = "0",
    amountB = "0",
  } = selectPool;

  const aAmt = new BigNumber(amountA);
  const bAmt = new BigNumber(amountB);
  const poolShare = userLPPercentage.shiftedBy(-2);

  // Check if total number of liquidity tokens is infinite, NaN or Zero
  // and return 0 if true
  if (!userLPTokens.isFinite() || userLPTokens.isZero()) {
    return [BN_ZERO, BN_ZERO];
  }

  const poolDecimals = new BigNumber(POOL_DECIMALS);
  const tokenA: Models.Token | undefined = tokenClient?.tokenForDenom(selectPool.denomA);
  const decimalsA = parseNumber(tokenA?.decimals.toNumber() ?? 0, poolDecimals)!;
  const tokenB: Models.Token | undefined = tokenClient?.tokenForDenom(selectPool.denomB);
  const decimalsB = parseNumber(tokenB?.decimals.toNumber() ?? 0, poolDecimals)!;

  // Find amount of Token A returned
  const tokenAOut = inputLiquid.dividedBy(userLPTokens)
    .multipliedBy(aAmt)
    .multipliedBy(poolShare)
    .decimalPlaces(decimalsA.toNumber());

  // Find amount of Token B returned
  const tokenBOut = inputLiquid.dividedBy(userLPTokens)
    .multipliedBy(bAmt)
    .multipliedBy(poolShare)
    .decimalPlaces(decimalsB.toNumber());

  return [tokenAOut, tokenBOut];
}

/**
 *
 * calculate Estimated Annual Percentage Yield (APY) of liquidity pool
 * @param usd USD values of different coins
 * @param pool liquidity pool data
 * @param poolsRewards total weekly pools rewards
 * @param totalWeight total rewards weight for all pools
 */
 export function calculateAPY(
  sdk: CarbonSDK | undefined,
  pool: Pool,
  poolsRewards: BigNumber = BN_ZERO,
  totalWeight: BigNumber,
): BigNumber {
  if (!sdk) {
    return BN_ZERO;
  }
  const {
    amountA = "0", amountB = "0", denomA, denomB,
    rewardsWeight = "0",
  } = pool;
  const amountABN = new BigNumber(amountA);
  const amountBBN = new BigNumber(amountB);
  const weeklyRewards = new BigNumber(poolsRewards);
  const rewardsWeightBN = new BigNumber(rewardsWeight);

  const poolWeightFactor = rewardsWeightBN.div(totalWeight);

  const swthUSD = sdk.token.getUSDValue("swth") ?? BN_ZERO;
  const notionalWeeklyRewards = poolWeightFactor.times(swthUSD.times(weeklyRewards));

  const tokenAUSD = sdk.token.getUSDValue(denomA) ?? BN_ZERO;
  const notionalTokenA = denomA ? amountABN.times(tokenAUSD) : BN_ZERO;

  const tokenBUSD = sdk.token.getUSDValue(denomB) ?? BN_ZERO;
  const notionalTokenB = denomB ? amountBBN.times(tokenBUSD) : BN_ZERO;

  const notionalAB = notionalTokenA.plus(notionalTokenB);

  const apy = notionalWeeklyRewards.dividedBy(notionalAB).times(52).shiftedBy(2);

  return apy.isFinite() && !apy.isZero() ? apy : BN_ZERO;
}

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
 */
export function estimateAPY(apyParams: ApyParams) {
  const {
    sdk, pool, poolsRewards, totalWeight, amountLP = BN_ZERO, boostFactor = new BigNumber(1), commitPower = undefined, notionalLp = BN_ZERO,
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
  return notionalLp.isZero() ? BN_ZERO : swthRewards.div(notionalLp).times(52).shiftedBy(2);
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
 */
export function estimateApyUSD(apyUSDParams: ApyParams) {
  const {
    sdk, pool, poolsRewards, totalWeight, boostFactor = new BigNumber(1), notionalLp = BN_ZERO,
  } = apyUSDParams;
  const poolTotal = getTotalUSDPrice(sdk, pool);
  const amountLP = poolTotal.isZero() ? BN_ZERO : notionalLp.div(poolTotal).times(pool.sharesAmount);
  return estimateAPY({
    sdk, pool, poolsRewards, totalWeight, amountLP, boostFactor, notionalLp,
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
