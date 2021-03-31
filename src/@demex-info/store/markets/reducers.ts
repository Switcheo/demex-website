import { MarketsActionTypes } from "./actions";
import { MarketsState } from "./types";

const initial_state: MarketsState = {
  stats: [],
  list: {},
  candlesticks: {},
};

const reducer = (state: MarketsState = initial_state, actions: any) => {
	switch (actions.type) {
    case MarketsActionTypes.SET_MARKET_STATS: {
      return {
        ...state,
        stats: actions.stats,
      };
    }
    case MarketsActionTypes.SET_MARKET_LIST_MAP: {
      return {
        ...state,
        list: actions.list,
      };
    }
    case MarketsActionTypes.SET_MARKET_CANDLESTICKS: {
      return {
        ...state,
        candlesticks: actions.candlesticks,
      };
    }
    default: {
      return state;
    }
	}
};

export default reducer;
