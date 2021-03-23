import app from "./app/reducers";
import { combineReducers } from "redux";
import layout from "./layout/reducers";
import markets from "./markets/reducers";

export default combineReducers({
  app,
  layout,
  markets,
});
