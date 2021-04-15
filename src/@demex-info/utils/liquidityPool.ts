import { getUsd, POOL_DECIMALS } from "@demex-info/constants";
import { TokenObj, USDPrices } from "@demex-info/store/app/types";
import { Pool } from "@demex-info/store/pools/types";
import { BN_ZERO, parseNumber } from "@demex-info/utils";
import BigNumber from "bignumber.js";

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
