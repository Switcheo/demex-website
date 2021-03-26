import { MarketsActionTypes } from "./actions";
import { MarketsState } from "./types";

const initial_state: MarketsState = {
  marketStats: [],
};

const reducer = (state: MarketsState = initial_state, actions: any) => {
	switch (actions.type) {
    case MarketsActionTypes.SET_MARKET_STATS: {
      return {
        ...state,
        marketStats: actions.marketStats,
      };
    }
    default: {
      return state;
    }
	}
};

export default reducer;
