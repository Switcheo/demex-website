import { getUsd, POOL_DECIMALS } from "@demex-info/constants";
import { TokenObj, USDPrices } from "@demex-info/store/app/types";
import { BN_ZERO, parseNumber } from "@demex-info/utils";
import BigNumber from "bignumber.js";

export interface Pool {
  poolId: number;
  name: string;
  denom: string;
  market: string;
  creatorAddress: string;
  poolAddress: string;

  denomA: string;
  amountA: BigNumber;
  weightA: BigNumber;

  denomB: string;
  amountB: BigNumber;
  weightB: BigNumber;

  swapFee: BigNumber;
  numQuotes: BigNumber;
  rewardsWeight: BigNumber;
  blockHeight: number;
  sharesAmount: BigNumber;
  totalCommitment: BigNumber;
  type: string;
  volume: BigNumber;
}

export interface TotalCommitmentMap {
  [denom: string]: BigNumber;
}

export const parseLiquidityPools = (data: any): Pool[] => {
  if (!data || data.length <= 0) return [];
  return data.map((pool: any) => {
    const {
      pool_id: poolId = 0,
      name = "",
      denom = "",
      market = "",
      creator_address: creatorAddress = "",
      pool_address: poolAddress = "",
      denom_a: denomA = "",
      amount_a: amountA = 0,
      weight_a: weightA = 0,
      denom_b: denomB = "",
      amount_b: amountB = 0,
      weight_b: weightB = 0,
      swap_fee: swapFee = 0,
      num_quotes: numQuotes = 0,
      rewards_weight: rewardsWeight = 0,
      block_height: blockHeight = 0,
      shares_amount: sharesAmount = 0,
      total_commitment: totalCommitment = 0,
      type = "",
      volume = "",
    } = pool;
    return {
      poolId,
      name,
      denom,
      market,
      creatorAddress,
      poolAddress,
      denomA,
      amountA: parseNumber(amountA, BN_ZERO)!,
      weightA: parseNumber(weightA, BN_ZERO)!,
      denomB,
      amountB: parseNumber(amountB, BN_ZERO)!,
      weightB: parseNumber(weightB, BN_ZERO)!,
      swapFee: parseNumber(swapFee, BN_ZERO)!,
      numQuotes: parseNumber(numQuotes, BN_ZERO)!,
      rewardsWeight: parseNumber(rewardsWeight, BN_ZERO)!,
      blockHeight,
      sharesAmount: parseNumber(sharesAmount, BN_ZERO)!,
      totalCommitment: parseNumber(totalCommitment, BN_ZERO)!,
      type,
      volume: parseNumber(volume, BN_ZERO)!,
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
 * @param tokens tokens list for retrieving token info
 */
export function getBreakdownToken(
  inputLiquid: BigNumber,
  selectPool: Pool,
  userLPPercentage: BigNumber = BN_ZERO,
  userLPTokens: BigNumber = BN_ZERO,
  tokens: TokenObj[],
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
  const tokenA = tokens.find((token) => token.denom === selectPool.denomA);
  const decimalsA = parseNumber(tokenA?.decimals, poolDecimals)!;
  const tokenB = tokens.find((token) => token.denom === selectPool.denomB);
  const decimalsB = parseNumber(tokenB?.decimals, poolDecimals)!;

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
  usdPrices: USDPrices,
  pool: Pool,
  poolsRewards: number = 0,
  totalWeight: BigNumber,
): BigNumber {
  const {
    amountA = "0", amountB = "0", denomA, denomB,
    rewardsWeight = "0",
  } = pool;
  const amountABN = new BigNumber(amountA);
  const amountBBN = new BigNumber(amountB);
  const weeklyRewards = new BigNumber(poolsRewards);
  const rewardsWeightBN = new BigNumber(rewardsWeight);

  const poolWeightFactor = rewardsWeightBN.div(totalWeight);

  const swthUSD = usdPrices.swth || BN_ZERO;
  const notionalWeeklyRewards = poolWeightFactor.times(swthUSD.times(weeklyRewards));

  const tokenAUSD = getUsd(usdPrices, denomA);
  const notionalTokenA = denomA ? amountABN.times(tokenAUSD) : BN_ZERO;

  const tokenBUSD = getUsd(usdPrices, denomB);
  const notionalTokenB = denomB ? amountBBN.times(tokenBUSD) : BN_ZERO;

  const notionalAB = notionalTokenA.plus(notionalTokenB);

  const apy = notionalWeeklyRewards.dividedBy(notionalAB).times(52).shiftedBy(2);

  return apy;
}
