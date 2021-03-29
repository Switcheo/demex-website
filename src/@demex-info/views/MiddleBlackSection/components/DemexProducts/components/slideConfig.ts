export type SlideCategory = "liquidityPools" | "staking" | "insuranceFund";

export interface SlideItem {
  label: string;
  value: SlideCategory;
}
