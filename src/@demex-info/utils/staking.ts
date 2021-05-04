import { TokenObj } from "@demex-info/store/app/types";
import { adjustGweiToHumanAmount, BN_ZERO, parseNumber } from "@demex-info/utils";
import BigNumber from "bignumber.js";

export interface StakingStats {
  totalStaked: BigNumber;
}
// "1970-01-01T00:00:00Z"

export interface Validator {
  operatorAddress: string
  delegatorShares: BigNumber;
  walletAddress: string
  bondStatus: string;
}

export const parseStakingStats = (data: any, tokens: TokenObj[]): StakingStats => {
  const stakingData = data?.result ?? {};
  const bondedTokens = adjustGweiToHumanAmount(stakingData?.bonded_tokens, tokens, "swth");
  const nonBondedTokens = adjustGweiToHumanAmount(stakingData?.not_bonded_tokens, tokens, "swth")!;
  return {
    totalStaked: bondedTokens.plus(nonBondedTokens),
  };
};

export const parseValidators = (data: any): Validator[] => {
  if (typeof data !== "object" || data.length <= 0) {
    return [];
  }

  return data.map((validator: any) => {
    const {
      BondStatus: bondStatus = "",
      DelegatorShares: delegatorShares = "0",
      OperatorAddress: operatorAddress = "",
      WalletAddress: walletAddress = "",
    } = validator;

    return {
      bondStatus,
      delegatorShares: parseNumber(delegatorShares, BN_ZERO)!,
      operatorAddress,
      walletAddress,
    };
  });
};

export interface BlockSummary {
  block_height: string; // string representation of number
  time: string;
  count: number;
  proposer_address: string;
}

export const StakingTasks: { [key: string]: string } = {
  Blocks: "Blocks-Staking",
  Stats: "Stats-Staking",
  Validators: "Validators-Staking",
  AvgBlockTime: "AvgBlockTime-Staking",
};
