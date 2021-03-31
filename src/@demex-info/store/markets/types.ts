import { BN_ZERO, parseNumber } from "@demex-info/utils";

import BigNumber from "bignumber.js";
import moment from "moment";

export interface MarketsState {
  stats: MarketStatItem[];
  list: MarketListMap;
  candlesticks: CandleSticksMap;
}

export interface CandleStickItem {
  id: number;
  market: string;
  time: string;
  resolution: number;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  quoteVolume: number;
  timestamp: number;
}

export interface CandleSticksMap {
  [key: string]: CandleStickItem[];
}

export interface MarketListItem {
  type: string;
  name: string;
  displayName: string;
  description: string;
  marketType: string;
  base: string
  baseName: string
  basePrecision: number;
  quote: string;
  quoteName: string;
  quotePrecision: number;
  lotSize: BigNumber;
  tickSize: BigNumber;
  minQuantity: BigNumber;
  makerFee: BigNumber;
  takerFee: BigNumber;
  riskStepSize: BigNumber
  initialMarginBase: BigNumber;
  initialMarginStep: BigNumber;
  maintenanceMarginRatio: BigNumber;
  maxLiquidationOrderTicket: BigNumber;
  maxLiquidationOrderDuration: number;
  impactSize: BigNumber;
  markPriceBand: number;
  lastPriceProtectedBand: number;
  indexOracleId: string;
  expiryTime: string; // string representation of timestamp;
  isActive: boolean;
  isSettled: boolean;
  closedBlockHeight: number;
  createdBlockHeight: number;
}

export interface MarketListMap {
  [key: string]: MarketListItem;
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
      type = "",
      name = "",
      display_name: displayName = "",
      description = "",
      market_type: marketType = "",
      base = "",
      base_name: baseName = "",
      base_precision: basePrecision = 0,
      quote = "",
      quote_name: quoteName = "",
      quote_precision: quotePrecision = 0,
      lot_size: lotSize = BN_ZERO,
      tick_size: tickSize = BN_ZERO,
      min_quantity: minQuantity = BN_ZERO,
      maker_fee: makerFee = BN_ZERO,
      taker_fee: takerFee = BN_ZERO,
      risk_step_size: riskStepSize = BN_ZERO,
      initial_margin_base: initialMarginBase = BN_ZERO,
      initial_margin_step: initialMarginStep = BN_ZERO,
      maintenance_margin_ratio: maintenanceMarginRatio = BN_ZERO,
      max_liquidation_order_ticket: maxLiquidationOrderTicket = BN_ZERO,
      max_liquidation_order_duration: maxLiquidationOrderDuration = 0,
      impact_size: impactSize = BN_ZERO,
      mark_price_band: markPriceBand = 0,
      last_price_protected_band: lastPriceProtectedBand = 0,
      index_oracle_id: indexOracleId = "",
      expiry_time: expiryTime = "1970-01-01T00:00:00Z",
      is_active: isActive = false,
      is_settled: isSettled = false,
      closed_block_height: closedBlockHeight = 0,
      created_block_height: createdBlockHeight = 0,
    } = market;
    listMarket[name] = {
      type,
      name,
      displayName,
      description,
      marketType,
      base,
      baseName,
      basePrecision,
      quote,
      quoteName,
      quotePrecision,
      lotSize: parseNumber(lotSize, BN_ZERO)!,
      tickSize: parseNumber(tickSize, BN_ZERO)!,
      minQuantity: parseNumber(minQuantity, BN_ZERO)!,
      makerFee: parseNumber(makerFee, BN_ZERO)!,
      takerFee: parseNumber(takerFee, BN_ZERO)!,
      riskStepSize: parseNumber(riskStepSize, BN_ZERO)!,
      initialMarginBase: parseNumber(initialMarginBase, BN_ZERO)!,
      initialMarginStep: parseNumber(initialMarginStep, BN_ZERO)!,
      maintenanceMarginRatio: parseNumber(maintenanceMarginRatio, BN_ZERO)!,
      maxLiquidationOrderTicket: parseNumber(maxLiquidationOrderTicket, BN_ZERO)!,
      maxLiquidationOrderDuration,
      impactSize: parseNumber(impactSize, BN_ZERO)!,
      markPriceBand,
      lastPriceProtectedBand,
      indexOracleId,
      expiryTime,
      isActive,
      isSettled,
      closedBlockHeight,
      createdBlockHeight,
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

export function parseMarketCandlesticks(candlesticks: any[]): CandleStickItem[] {
  if (typeof candlesticks !== "object" || candlesticks.length <= 0) {
    return [];
  }
  return candlesticks.map((candlestick: any) => {
    const {
      id = 0,
      market = "",
      time = "1970-01-01T00:00:00Z",
      resolution = 1,
      open = "0",
      close = "0",
      high = "0",
      low = "0",
      volume = "0",
      quote_volume: quoteVolume = "0",
    } = candlestick;
    return {
      id,
      market,
      time,
      resolution,
      open: parseFloat(open),
      close: parseFloat(close),
      high: parseFloat(high),
      low: parseFloat(low),
      volume: parseFloat(volume),
      quoteVolume: parseFloat(quoteVolume),
      timestamp: moment(time).unix(),
    };
  });
}

export const MarketTasks: { [key: string]: string } = {
  List: "@markets/marketListMap",
  Stats: "@markets/marketStats",
};
