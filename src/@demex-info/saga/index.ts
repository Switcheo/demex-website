import createSagaMiddleware from "redux-saga";
import marketsSaga from "./marketsSaga";

const sagaMiddleware = createSagaMiddleware();

export function startSagas() {
	sagaMiddleware.run(marketsSaga);
}

export default sagaMiddleware;
