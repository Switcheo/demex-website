import { Pool, TotalCommitmentMap } from "./types";

export const PoolsActionTypes = {
  SET_LIQUIDITY_POOLS: "SET_LIQUIDITY_POOLS",
  SET_TOTAL_COMMITMENT: "SET_TOTAL_COMMITMENT",
  SET_WEEKLY_POOL_REWARDS: "SET_WEEKLY_POOL_REWARDS",
};

export function setLiquidityPools(pools: Pool[]) {
  return {
    type: PoolsActionTypes.SET_LIQUIDITY_POOLS,
    pools,
  };
}

export function setTotalCommitMap(totalCommitMap: TotalCommitmentMap) {
  return {
    type: PoolsActionTypes.SET_TOTAL_COMMITMENT,
    totalCommitMap,
  };
}

export function setWeeklyPoolRewards(weeklyPoolRewards: number) {
  return {
    type: PoolsActionTypes.SET_WEEKLY_POOL_REWARDS,
    weeklyPoolRewards,
  };
}
