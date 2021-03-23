import { BN_ZERO, parseNumber } from "@demex-info/utils";

import BigNumber from "bignumber.js";

export interface MarketsState {
  marketStats: MarketStatItem[];
}

export interface MarketStatItem {
  day_high: BigNumber;
  day_low: BigNumber;
  day_open: BigNumber;
  day_close: BigNumber;
  day_volume: BigNumber;
  day_quote_volume: BigNumber;
  index_price: BigNumber;
  mark_price: BigNumber;
  last_price: BigNumber;
  market: string;
  market_type: string;
  open_interest: BigNumber;
}

export function parseMarketStats(marketStats: any[]): MarketStatItem[] {
  if (typeof marketStats !== "object" || marketStats.length <= 0) {
    return [];
  }
  return marketStats.map((marketStat: any) => ({
    ...marketStat,
    day_high: parseNumber(marketStat.day_high, BN_ZERO)!,
    day_low: parseNumber(marketStat.day_low, BN_ZERO)!,
    day_open: parseNumber(marketStat.day_open, BN_ZERO)!,
    day_close: parseNumber(marketStat.day_close, BN_ZERO)!,
    day_volume: parseNumber(marketStat.day_volume, BN_ZERO)!,
    day_quote_volume: parseNumber(marketStat.day_quote_volume, BN_ZERO)!,
    index_price: parseNumber(marketStat.index_price, BN_ZERO)!,
    mark_price: parseNumber(marketStat.mark_price, BN_ZERO)!,
    last_price: parseNumber(marketStat.last_price, BN_ZERO)!,
    open_interest: parseNumber(marketStat.open_interest, BN_ZERO)!,
  }));
}

export const MarketTasks: { [key: string]: string } = {
  Stats: "@markets/marketStats",
};
