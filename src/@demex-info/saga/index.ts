import createSagaMiddleware from "redux-saga";
import appSaga from "./appSaga";

const sagaMiddleware = createSagaMiddleware();

export function startSagas() {
  sagaMiddleware.run(appSaga);
}

export default sagaMiddleware;
