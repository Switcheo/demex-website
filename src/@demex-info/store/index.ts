import { Middleware, applyMiddleware, createStore } from "redux";

import combinedReducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import sagaMiddleware from "@demex-info/saga";
import thunk from "redux-thunk";

const middlewares: Middleware[] = [thunk, sagaMiddleware];
// eslint-disable-next-line no-undef
if ((!process.env.NODE_ENV || process.env.NODE_ENV === "development") && !process.env.REACT_APP_DISABLE_REDUX_LOGGER) {
  middlewares.push(createLogger({
    predicate: (getState, action) => !["ADD_BACKGROUND_LOADING", "REMOVE_BACKGROUND_LOADING"].includes(action.type),
  }));
}

// redux 4 does not have a easy workaround createStore needing 4 type arguments.
// @ts-ignore
const AppStore = createStore(combinedReducers, composeWithDevTools(
  applyMiddleware(...middlewares)
));

export { default as actions } from "./actions";

export default AppStore;
