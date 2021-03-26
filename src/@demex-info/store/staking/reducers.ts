import { BN_ZERO } from "@demex-info/utils";
import { StakingActionTypes } from "./actions";
import { StakingState } from "./types";

const initial_state: StakingState = {
  stats: {
    bondedTokens: BN_ZERO,
    nonBondedTokens: BN_ZERO,
    totalStaked: BN_ZERO,
  },
};

const reducer = (state: StakingState = initial_state, actions: any) => {
	switch (actions.type) {
    case StakingActionTypes.SET_STAKING_STATS: {
      return {
        ...state,
        stats: actions.stats,
      };
    }
    default: {
      return state;
    }
	}
};

export default reducer;

