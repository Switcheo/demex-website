import { AppState } from "./app/types";
import { LayoutState } from "./layout/types";
import { MarketsState } from "./markets/types";
import { PoolsState } from "./pools/types";
import { StakingState } from "./staking/types";

export interface RootState {
  app: AppState;
  layout: LayoutState;
  markets: MarketsState;
  pools: PoolsState;
  staking: StakingState;
}
