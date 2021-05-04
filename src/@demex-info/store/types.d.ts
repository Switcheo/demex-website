import { AppState } from "./app/types";
import { LayoutState } from "./layout/types";

export interface RootState {
  app: AppState;
  layout: LayoutState;
}
