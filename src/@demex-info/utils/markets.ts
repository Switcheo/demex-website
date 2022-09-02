import { DEC_SHIFT } from "@demex-info/constants";
import BigNumber from "bignumber.js";
import { CarbonSDK, Models } from "carbon-js-sdk";
import Long from "long";
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

export interface MarketCandlesticks {
  market: string
  bars: number[]
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

export interface TickLotSizes {
  tickSize: BigNumber
  lotSize: BigNumber
}

export const MarkType: { [key: string]: MarketType } = {
  Spot: "spot",
  Futures: "futures",
};

export type MarketType = "spot" | "futures";

export async function getAllMarkets(sdk: CarbonSDK): Promise<Models.Market[]> {
  const limit = new Long(100);
  const offset = Long.UZERO;
  const countTotal = true;

  let allMarkets: Models.Market[] = [];
  let key = new Uint8Array();

  const initMarkets = await sdk.query.market.MarketAll({
    pagination: {
      limit, offset, countTotal, key, reverse: false,
    },
  });
  const grandTotal = initMarkets.pagination?.total.toNumber() ?? 0;
  key = initMarkets.pagination?.nextKey ?? new Uint8Array();
  allMarkets = allMarkets.concat(initMarkets.markets);

  if (initMarkets.markets.length === grandTotal) {
    return allMarkets;
  }

  const iterations = Math.ceil(grandTotal / limit.toNumber()) - 1;
  for (let ii = 0; ii < iterations; ii++) {
    // eslint-disable-next-line no-await-in-loop
    const markets = await sdk.query.market.MarketAll({
      pagination: {
        limit, offset, countTotal, key, reverse: false,
      },
    });
    key = markets.pagination?.nextKey ?? new Uint8Array();
    allMarkets = allMarkets.concat(markets.markets ?? []);
  }

  return allMarkets;
}

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

export function getAdjustedTickLotSize(
  market: Models.Market | null | undefined, sdk?: CarbonSDK,
): TickLotSizes {
  if (!market || !sdk?.token) {
    return {
      tickSize: BN_ZERO,
      lotSize: BN_ZERO,
    };
  }

  const requiredPrecision = sdk?.token.getDecimals(market?.base ?? "-") ?? 0;
  const quotePrecision = sdk?.token.getDecimals(market?.quote ?? "-") ?? 0;
  const diffDp = quotePrecision - requiredPrecision;

  const lotSize = parseNumber(market?.lotSize, BN_ZERO)!;
  const tickSize = parseNumber(market?.tickSize, BN_ZERO)!.shiftedBy(-DEC_SHIFT);

  const adjustedLotSize = sdk?.token.toHuman(market?.base ?? "-", lotSize);
  const adjustedTickSize = tickSize.shiftedBy(-diffDp);

  return {
    tickSize: adjustedTickSize,
    lotSize: adjustedLotSize,
  };
}
