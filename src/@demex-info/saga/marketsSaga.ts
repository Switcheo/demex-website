import { MarketStatItem, MarketTasks, parseMarketStats } from "@demex-info/store/markets/types";
import { Network, RestClient } from "tradehub-api-js";
import { all, call, delay, fork, put, select } from "redux-saga/effects";
import { logger, uuidv4 } from "@demex-info/utils";

import { RootState } from "@demex-info/store/types";
import actions from "@demex-info/store/actions";

function* handleQueryMarketStats(): Generator {
	logger("query market stats");
	while (true) {
		const network = yield select((state: RootState): Network => state.app.network);
		if (!network) continue;

		const marketUuid = uuidv4();
		yield put(actions.Layout.addBackgroundLoading(MarketTasks.Stats, marketUuid));
		try {
      const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
      const response: any = yield call([restClient, restClient.getMarketStats]);
      const marketStats: MarketStatItem[] = parseMarketStats(response);
      yield put(actions.Markets.setMarketStats(marketStats));
		} catch (err) {
      console.error(err);
    } finally {
			yield put(actions.Layout.removeBackgroundLoading(marketUuid));
			yield delay(15000);
		}
	}
}

export default function* marketsSaga() {
  yield all([
    fork(handleQueryMarketStats),
  ]);
}