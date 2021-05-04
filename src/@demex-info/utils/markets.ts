import { BN_ZERO, parseNumber } from "./number";
import BigNumber from "bignumber.js";
import moment from "moment";

export interface MarketsState {
  stats: MarketStatItem[];
  list: MarketListMap;
}

export interface CandleStickItem {
  time: string;
  close: number;
  timestamp: number;
}

export interface MarketListItem {
  name: string;
  marketType: string;
  base: string
  quote: string;
  expiryTime: string; // string representation of timestamp;
}

export interface MarketListMap {
  [key: string]: MarketListItem;
}

export interface MarketStatItem {
  day_open: BigNumber;
  day_close: BigNumber;
  day_volume: BigNumber;
  last_price: BigNumber;
  market: string;
  market_type: MarketType;
  open_interest: BigNumber;
}

export const MarkType: { [key: string]: MarketType } = {
  Spot: "spot",
  Futures: "futures",
};

export type MarketType = "spot" | "futures";

export function parseMarketListMap(marketList: any[]): MarketListMap {
  if (typeof marketList !== "object" || marketList.length <= 0) {
    return {};
  }

  const listMarket: MarketListMap = {};
  marketList.forEach((market: any) => {
    const {
      name = "",
      market_type: marketType = "",
      base = "",
      quote = "",
      expiry_time: expiryTime = "1970-01-01T00:00:00Z",
    } = market;
    listMarket[name] = {
      name,
      marketType,
      base,
      quote,
      expiryTime,
    };
  });
  return listMarket;
}

export function parseMarketStats(marketStats: any[]): MarketStatItem[] {
  if (typeof marketStats !== "object" || marketStats.length <= 0) {
    return [];
  }
  return marketStats.map((marketStat: any) => ({
    ...marketStat,
    day_open: parseNumber(marketStat.day_open, BN_ZERO)!,
    day_close: parseNumber(marketStat.day_close, BN_ZERO)!,
    day_volume: parseNumber(marketStat.day_volume, BN_ZERO)!,
    last_price: parseNumber(marketStat.last_price, BN_ZERO)!,
    open_interest: parseNumber(marketStat.open_interest, BN_ZERO)!,
  }));
}

export function parseMarketCandlesticks(candlesticks: any[]): CandleStickItem[] {
  if (typeof candlesticks !== "object" || candlesticks.length <= 0) {
    return [];
  }
  return candlesticks.map((candlestick: any) => {
    const {
      time = "1970-01-01T00:00:00Z",
      close = "0",
    } = candlestick;
    return {
      time,
      close: parseFloat(close),
      timestamp: moment(time).unix(),
    };
  });
}
