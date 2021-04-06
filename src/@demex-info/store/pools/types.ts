import { BN_ZERO, parseNumber } from "@demex-info/utils";

import BigNumber from "bignumber.js";

export interface PoolsState {
  pools: Pool[];
  totalCommitMap: TotalCommitmentMap;
  weeklyRewards: number;
}

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

export const PoolsTasks: { [key: string]: string } = {
  List: "List-Pools",
  Rewards: "Rewards-Pools",
};
