import { BN_ZERO } from "@demex-info/utils";
import { StakingActionTypes } from "./actions";
import { StakingState } from "./types";

const initial_state: StakingState = {
  avgBlockTime: "00:00:00",
  avgReward: BN_ZERO,
  stats: {
    bondedTokens: BN_ZERO,
    nonBondedTokens: BN_ZERO,
    totalStaked: BN_ZERO,
  },
  totalBonded: BN_ZERO,
  validators: [],
};

const reducer = (state: StakingState = initial_state, actions: any) => {
	switch (actions.type) {
    case StakingActionTypes.SET_STAKING_STATS: {
      return {
        ...state,
        stats: actions.stats,
      };
    }
    case StakingActionTypes.SET_AVG_BLOCK_TIME: {
      return {
        ...state,
        avgBlockTime: actions.avgBlockTime,
      };
    }
    case StakingActionTypes.SET_AVG_REWARD: {
      return {
        ...state,
        avgReward: actions.avgReward,
      };
    }
    case StakingActionTypes.SET_VALIDATORS: {
      return {
        ...state,
        validators: actions.validators,
      };
    }
    case StakingActionTypes.SET_TOTAL_BONDED: {
      return {
        ...state,
        totalBonded: actions.totalBonded,
      };
    }
    default: {
      return state;
    }
	}
};

export default reducer;

