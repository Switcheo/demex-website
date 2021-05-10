export type SlideCategory = "liquidityPools" | "staking";

export interface SlideItem {
  label: string;
  value: SlideCategory;
  onClick?: () => void;
}
