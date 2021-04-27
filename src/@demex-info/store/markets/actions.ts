import { MarketListMap, MarketStatItem } from "./types";

export const MarketsActionTypes = {
	SET_MARKET_LIST_MAP: "SET_MARKET_LIST_MAP",
  SET_MARKET_STATS: "SET_MARKET_STATS",
};

export function setMarketStats(stats: MarketStatItem[]) {
	return {
		type: MarketsActionTypes.SET_MARKET_STATS,
		stats,
	};
}

export function setMarketListMap(list: MarketListMap) {
	return {
		type: MarketsActionTypes.SET_MARKET_LIST_MAP,
		list,
	};
}
