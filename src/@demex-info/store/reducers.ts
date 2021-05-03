import { combineReducers } from "redux";
import app from "./app/reducers";
import layout from "./layout/reducers";

export default combineReducers({
  app,
  layout,
});
