import { BN_ZERO, adjustGweiToHumanAmount, parseNumber } from "@demex-info/utils";

import BigNumber from "bignumber.js";
import { TokenObj } from "@demex-info/store/app/types";

export interface StakingState {
  avgBlockTime: string;
  avgReward: BigNumber;
  stats: StakingStats;
  totalBonded: BigNumber;
  validators: Array<any>;
}

export interface StakingStats {
  bondedTokens: BigNumber;
  nonBondedTokens: BigNumber;
  totalStaked: BigNumber;
}
// "1970-01-01T00:00:00Z"

export interface Validator {
  operatorAddress: string
  consPubKey: string;
  jailed: boolean;
  status: number;
  tokens: BigNumber;
  delegatorShares: BigNumber;
  description: {
    details: string;
    identity: string;
    moniker: string;
    securityContact: string;
    website: string;
  };
  unbondingHeight: number;
  unbondingCompletionTime: string; // string representation of date
  commission: {
    commissionRates: {
      maxChangeRate: BigNumber;
      maxRate: BigNumber;
      rate: BigNumber;
    };
    updateTime: string; // string representation of date
  };
  minSelfDelegation: BigNumber;
  consAddress: string;
  consAddressByte: string;
  walletAddress: string
  bondStatus: string;
}

export const parseStakingStats = (data: any, tokens: TokenObj[]): StakingStats => {
  const stakingData = data?.result ?? {};
  const bondedTokens = adjustGweiToHumanAmount(stakingData?.bonded_tokens, tokens, "swth");
  const nonBondedTokens = adjustGweiToHumanAmount(stakingData?.not_bonded_tokens, tokens, "swth")!;
  return {
    bondedTokens,
    nonBondedTokens,
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
      Commission: commission = {
        commission_rates: {
          max_change_rate: BN_ZERO,
          max_rate: BN_ZERO,
          rate: BN_ZERO,
        },
        update_time: "1970-01-01T00:00:00Z",
      },
      ConsAddress: consAddress = "",
      ConsAddressByte: consAddressByte = "",
      ConsPubKey: consPubKey = "",
      DelegatorShares: delegatorShares = "0",
      Description: description = {
        details: "",
        identity: "",
        moniker: "",
        security_contact: "",
        website: "",
      },
      Jailed: jailed = false,
      MinSelfDelegation: minSelfDelegation = "0",
      OperatorAddress: operatorAddress = "",
      Status: status = 0,
      Tokens: tokens = BN_ZERO,
      UnbondingCompletionTime: unbondingCompletionTime = "1970-01-01T00:00:00Z",
      UnbondingHeight: unbondingHeight = 0,
      WalletAddress: walletAddress = "",
    } = validator;

    const {
      commission_rates: commissionRates = {
        max_change_rate: BN_ZERO,
        max_rate: BN_ZERO,
        rate: BN_ZERO,
      },
      update_time: updateTime = "1970-01-01T00:00:00Z",
    } = commission;
    const {
      max_change_rate: maxChangeRate = BN_ZERO,
      max_rate: maxRate = BN_ZERO,
      rate = BN_ZERO,
    } = commissionRates;

    const {
      details = "",
      identity = "",
      moniker = "",
      security_contact: securityContact = "",
      website = "",
    } = description;

    return {
      bondStatus,
      commission: {
        commissionRates: {
          maxChangeRate: parseNumber(maxChangeRate, BN_ZERO)!,
          maxRate: parseNumber(maxRate, BN_ZERO)!,
          rate: parseNumber(rate, BN_ZERO)!,
        },
        updateTime,
      },
      consAddress,
      consAddressByte,
      consPubKey,
      delegatorShares: parseNumber(delegatorShares, BN_ZERO)!,
      description: {
        details,
        identity,
        moniker,
        securityContact,
        website,
      },
      jailed,
      minSelfDelegation: parseNumber(minSelfDelegation, BN_ZERO)!,
      operatorAddress,
      status,
      tokens: parseNumber(tokens, BN_ZERO)!,
      unbondingCompletionTime,
      unbondingHeight,
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
