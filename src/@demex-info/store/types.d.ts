import { AppState } from "./app/types";
import { LayoutState } from "./layout/types";
import { MarketsState } from "./markets/types";

export interface RootState {
  app: AppState;
  layout: LayoutState;
  markets: MarketsState,
}