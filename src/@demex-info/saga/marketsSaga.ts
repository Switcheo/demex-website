import actions from "@demex-info/store/actions";
import { MarketListMap, MarketStatItem, MarketTasks, parseMarketListMap, parseMarketStats } from "@demex-info/store/markets/types";
import { RootState } from "@demex-info/store/types";
import { logger, uuidv4 } from "@demex-info/utils";
import { all, call, delay, fork, put, select } from "redux-saga/effects";
import { RestClient } from "tradehub-api-js";

function* handleQueryMarketStats(): Generator {
	logger("query market stats");
  let startLoad: boolean = true;
	while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const marketUuid = uuidv4();
    if (startLoad) {
      yield put(actions.Layout.addBackgroundLoading(MarketTasks.Stats, marketUuid));
    }
		try {
      const response: any = yield call([restClient, restClient.getMarketStats]);
      const marketStats: MarketStatItem[] = parseMarketStats(response);
      yield put(actions.Markets.setMarketStats(marketStats));
		} catch (err) {
      console.error(err);
    } finally {
      if (startLoad) {
        yield put(actions.Layout.removeBackgroundLoading(marketUuid));
        startLoad = false;
      }
			yield delay(15000);
		}
	}
}

function* handleQueryMarketListMap(): Generator {
  logger("query market list map");
  let startLoad: boolean = true;
  while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

		const marketListUuid = uuidv4();
    if (startLoad) {
      yield put(actions.Layout.addBackgroundLoading(MarketTasks.List, marketListUuid));
    }
		try {
      const response: any = yield call([restClient, restClient.getMarkets]);
      const marketListMap: MarketListMap = parseMarketListMap(response);
      yield put(actions.Markets.setMarketListMap(marketListMap));
		} catch (err) {
      console.error(err);
    } finally {
      if (startLoad) {
        yield put(actions.Layout.removeBackgroundLoading(marketListUuid));
        startLoad = false;
      }
			yield delay(15000);
		}
  }
}

export default function* marketsSaga() {
  yield all([
    fork(handleQueryMarketStats),
    fork(handleQueryMarketListMap),
  ]);
}
