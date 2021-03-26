import BigNumber from "bignumber.js";
import { adjustGweiToHumanAmount } from "@demex-info/utils";

export interface StakingState {
  stats: StakingStats;
}

export interface StakingStats {
  bondedTokens: BigNumber;
  nonBondedTokens: BigNumber;
  totalStaked: BigNumber;
}

export const parseStakingStats = (data: any): StakingStats => {
  const stakingData = data?.result ?? {};
  const bondedTokens = adjustGweiToHumanAmount(stakingData?.bonded_tokens, "swth");
  const nonBondedTokens = adjustGweiToHumanAmount(stakingData?.not_bonded_tokens, "swth")!;
  return {
    bondedTokens,
    nonBondedTokens,
    totalStaked: bondedTokens.plus(nonBondedTokens),
  };
};
