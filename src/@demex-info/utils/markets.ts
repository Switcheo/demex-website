import { DEC_SHIFT } from "@demex-info/constants";
import BigNumber from "bignumber.js";
import { CarbonSDK, Models, WSModels } from "carbon-js-sdk";
import moment from "moment";
import { BN_ZERO, parseNumber } from "./number";

export interface MarketsState {
  stats: MarketStatItem[];
  list: MarketListMap;
}

export interface CandleStickItem {
  time: Date;
  close: number;
  timestamp: number;
}

export interface MarketListItem {
  name: string;
  marketType: string;
  base: string
  quote: string;
  expiryTime: Date;
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

export function parseMarketListMap(marketList: Models.Market[]): MarketListMap {
  if (typeof marketList !== "object" || marketList.length <= 0) {
    return {};
  }

  const listMarket: MarketListMap = {};
  marketList.forEach((market: Models.Market) => {
    const {
      name = "",
      marketType = "",
      base = "",
      quote = "",
      expiryTime = new Date("1970-01-01T00:00:00"),
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

export function parseMarketStats(marketStats: WSModels.MarketStat): MarketStatItem {
  return {
    ...marketStats,
    day_open: parseNumber(marketStats.day_open, BN_ZERO)!,
    day_close: parseNumber(marketStats.day_close, BN_ZERO)!,
    day_volume: parseNumber(marketStats.day_volume, BN_ZERO)!,
    last_price: parseNumber(marketStats.last_price, BN_ZERO)!,
    // open_interest: parseNumber(marketStats.open_interest, BN_ZERO)!,
    open_interest: BN_ZERO,
    market_type: marketStats.market_type as MarketType,
  };
}

export function parseMarketCandlesticks(candlesticks: Models.Candlestick[], market: MarketListItem, sdk: CarbonSDK | undefined): CandleStickItem[] {
  if (typeof candlesticks !== "object" || candlesticks.length <= 0 || !sdk) {
    return [];
  }

  return candlesticks.map((candlestick: Models.Candlestick) => {
    const {
      time = new Date("1970-01-01T00:00:00"),
      close = "0",
    } = candlestick;
    const closeBN = parseNumber(close, BN_ZERO)!.shiftedBy(-DEC_SHIFT);
    const adjustedClose = shiftByDiffDp(market, sdk, closeBN);
    return {
      time,
      close: adjustedClose.toNumber(),
      timestamp: moment(time).unix(),
    };
  });
}

export const shiftByDiffDp = (
  market: MarketListItem,
  sdk: CarbonSDK | undefined,
  value: BigNumber | undefined,
): BigNumber => {
  if (!market || !sdk?.token || !value) {
    return BN_ZERO;
  }
  const baseDp = sdk.token.getDecimals(market.base) ?? 0;
  const quoteDp = sdk.token.getDecimals(market.quote) ?? 0;
  const diffDp = quoteDp - baseDp;
  if (value.isNaN() || !value.isFinite) {
    return BN_ZERO;
  }
  return value.shiftedBy(-diffDp);
};
