import { MarketStatItem } from "@demex-info/utils/markets";
import BigNumber from "bignumber.js";
import { Market } from "carbon-js-sdk/lib/codec/Switcheo/carbon/market/market";

export const defaultMarketBlacklist: string[] = [
  "gm1_busd1", "swth_ust", "luna_swth",
];

export interface MarketCard {
  stat?: MarketStatItem;
  baseSymbol: string;
  quoteSymbol: string;
  expiry: string;
  priceDp: number;
  lastPrice: BigNumber;
  usdVolume: BigNumber;
  change24H: BigNumber;
  market: Market;
}