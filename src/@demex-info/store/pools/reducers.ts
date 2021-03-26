import { PoolsActionTypes } from "./actions";
import { PoolsState } from "./types";

const initial_state: PoolsState = {
  pools: [],
  totalCommitMap: {},
  weeklyRewards: 0,
};

const reducer = (state: PoolsState = initial_state, actions: any) => {
	switch (actions.type) {
    case PoolsActionTypes.SET_LIQUIDITY_POOLS: {
      return {
        ...state,
        pools: actions.pools,
      };
    }
    case PoolsActionTypes.SET_TOTAL_COMMITMENT: {
      return {
        ...state,
        totalCommitMap: actions.totalCommitMap,
      };
    }
    case PoolsActionTypes.SET_WEEKLY_POOL_REWARDS: {
      return {
        ...state,
        weeklyRewards: actions.weeklyPoolRewards,
      }; 
    }
    default: {
      return state;
    }
	}
};

export default reducer;
