import { toBase64 } from "@cosmjs/encoding";
import { BN_ZERO, parseNumber } from "@demex-info/utils";
import BigNumber from "bignumber.js";
import { CarbonSDK, Models } from "carbon-js-sdk";

export interface StakingStats {
  totalStaked: BigNumber;
}
// "1970-01-01T00:00:00Z"

export interface Validator {
  operatorAddress: string;
  delegatorShares: BigNumber;
  status: Models.Staking.BondStatus;
  tokens: BigNumber;
}

export const parseStakingStats = (data: Models.Staking.Pool | undefined, sdk: CarbonSDK | undefined): StakingStats => {
  if (!sdk?.token || !data) {
    return { totalStaked: BN_ZERO };
  }
  const bondedTokens = sdk.token.toHuman("swth", parseNumber(data.bondedTokens, BN_ZERO)!);
  const nonBondedTokens = sdk.token.toHuman("swth", parseNumber(data.notBondedTokens, BN_ZERO)!);
  return {
    totalStaked: bondedTokens.plus(nonBondedTokens),
  };
};

export const parseValidators = (data: Models.Staking.Validator[]): Validator[] => {
  if (typeof data !== "object" || data.length <= 0) {
    return [];
  }

  return data.map((validator: Models.Staking.Validator) => {
    const {
      status = Models.Staking.BondStatus.BOND_STATUS_UNSPECIFIED,
      delegatorShares = "0",
      operatorAddress = "",
      tokens = "0",
    } = validator;

    return {
      status,
      delegatorShares: parseNumber(delegatorShares, BN_ZERO)!,
      operatorAddress,
      tokens: parseNumber(tokens, BN_ZERO)!,
    };
  });
};

export const parseEventAttr = (a: Uint8Array) => {
  return window.atob(toBase64(a));
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
