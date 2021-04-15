import createSagaMiddleware from "redux-saga";
import appSaga from "./appSaga";
import marketsSaga from "./marketsSaga";
import poolsSaga from "./poolsSaga";
import stakingSaga from "./stakingSaga";

const sagaMiddleware = createSagaMiddleware();

export function startSagas() {
  sagaMiddleware.run(appSaga);
	sagaMiddleware.run(marketsSaga);
  sagaMiddleware.run(poolsSaga);
  sagaMiddleware.run(stakingSaga);
}

export default sagaMiddleware;
