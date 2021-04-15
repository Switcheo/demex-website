export type SlideCategory = "liquidityPools" | "staking" | "upcoming";

export interface SlideItem {
  label: string;
  value: SlideCategory;
  onClick?: () => void;
}
