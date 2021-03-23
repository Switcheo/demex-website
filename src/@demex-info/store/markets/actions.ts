import { MarketStatItem } from "./types";

export const MarketsActionTypes = {
  SET_MARKET_STATS: "SET_MARKET_STATS",
};

export function setMarketStats(marketStats: MarketStatItem[]) {
	return {
		type: MarketsActionTypes.SET_MARKET_STATS,
		marketStats,
	};
}
