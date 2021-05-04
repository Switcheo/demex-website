import { MarketType } from "@demex-info/utils/markets";

export interface MarketTab {
  label: string;
  value: MarketType;
}

export interface FuturesTypes {
  futures: number;
  perpetuals: number;
}
