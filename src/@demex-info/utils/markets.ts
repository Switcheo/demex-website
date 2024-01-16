import { DEC_SHIFT } from "@demex-info/constants";
import BigNumber from "bignumber.js";
import { CarbonSDK, WSModels } from "carbon-js-sdk";
import { PageRequest } from "carbon-js-sdk/lib/codec/cosmos/base/query/v1beta1/pagination";
import { Market } from "carbon-js-sdk/lib/codec/Switcheo/carbon/market/market";
import Long from "long";
import moment from "moment";
import { BN_ZERO, parseNumber } from "./number";

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
  dayQuoteVolume: BigNumber;
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

export async function getAllMarkets(sdk: CarbonSDK): Promise<Market[]> {
  const limit = new Long(10000);
  const offset = Long.UZERO;

  const { markets } = await sdk.query.market.MarketAll({
    pagination: PageRequest.fromPartial({
      limit, offset,
    }),
  });
  return markets;
}

export function parseMarketListMap(marketList: Market[]): MarketListMap {
  if (typeof marketList !== "object" || marketList.length <= 0) {
    return {};
  }

  const listMarket: MarketListMap = {};
  marketList.forEach((market: Market) => {
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
    dayOpen: parseNumber(marketStats.day_open, BN_ZERO)!,
    dayClose: parseNumber(marketStats.day_close, BN_ZERO)!,
    dayQuoteVolume: parseNumber(marketStats.day_quote_volume, BN_ZERO)!,
    dayVolume: parseNumber(marketStats.day_volume, BN_ZERO)!,
    lastPrice: parseNumber(marketStats.last_price, BN_ZERO)!,
    open_interest: parseNumber(marketStats.open_interest, BN_ZERO)!,
    marketType: marketStats.market_type as MarketType,
  };
}

export function isPerpetual(expiryTime?: string | Date): boolean {
  const zeroDate = new Date("01 Jan 1970");
  const expiryDate = typeof expiryTime === "string" ? new Date(expiryTime) : expiryTime;
  return expiryDate?.getTime() === zeroDate.getTime();
}

export function isExpired(market: MarketListItem): boolean {
  const expiryTime = moment(market.expiryTime);
  return !moment().isBefore(expiryTime);
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
  market: Market | null | undefined, sdk?: CarbonSDK,
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
