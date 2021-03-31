import { MarketType } from "@demex-info/store/markets/types";

export interface MarketTab {
  label: string;
  value: MarketType;
}

export interface FuturesTypes {
  futures: number;
  perpetuals: number;
}
