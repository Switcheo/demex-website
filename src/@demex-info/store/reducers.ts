import { combineReducers } from "redux";
import app from "./app/reducers";
import layout from "./layout/reducers";
import markets from "./markets/reducers";

export default combineReducers({
  app,
  layout,
  markets,
});
