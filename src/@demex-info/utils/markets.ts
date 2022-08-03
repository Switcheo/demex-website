import { DEC_SHIFT } from "@demex-info/constants";
import BigNumber from "bignumber.js";
import { CarbonSDK, Models } from "carbon-js-sdk";
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
  dayOpen: BigNumber;
  dayClose: BigNumber;
  dayVolume: BigNumber;
  lastPrice: BigNumber;
  market: string;
  marketType: MarketType;
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

export function parseMarketStats(marketStats: Models.MarketStats): MarketStatItem {
  return {
    ...marketStats,
    dayOpen: parseNumber(marketStats.dayOpen, BN_ZERO)!,
    dayClose: parseNumber(marketStats.dayClose, BN_ZERO)!,
    dayVolume: parseNumber(marketStats.dayVolume, BN_ZERO)!,
    lastPrice: parseNumber(marketStats.lastPrice, BN_ZERO)!,
    // open_interest: parseNumber(marketStats.open_interest, BN_ZERO)!,
    open_interest: BN_ZERO, // TODO: Check on market open_interest
    marketType: marketStats.marketType as MarketType,
  };
}

export function isExpired(market: MarketListItem): boolean {
  const expiryTime = moment(market.expiryTime);
  return !moment().isBefore(expiryTime);
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
