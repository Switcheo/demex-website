import { CandleStickItem, CandleSticksMap, MarketListItem, MarketListMap, MarketStatItem, MarketTasks, parseMarketCandlesticks, parseMarketListMap, parseMarketStats } from "@demex-info/store/markets/types";
import { SECONDS_PER_DAY, logger, uuidv4 } from "@demex-info/utils";
import { all, call, delay, fork, put, select } from "redux-saga/effects";

import { RestClient } from "tradehub-api-js";
import { RootState } from "@demex-info/store/types";
import actions from "@demex-info/store/actions";
import moment from "moment";
import { setCandleSticksMap } from "@demex-info/store/markets/actions";

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

function* handleQueryMarketCandlesticks(): Generator {
  logger("query market candlesticks map");
  while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const markets: any = yield select((state: RootState): MarketListMap => state.markets.list);
    if (!markets) continue;

    const candlesticksUuid = uuidv4();
    yield put(actions.Layout.addBackgroundLoading(MarketTasks.Candlesticks, candlesticksUuid));
    try {
      const currentDate = moment().unix();
      const monthAgo = currentDate - (SECONDS_PER_DAY * 30);

      const candlesticksMap: CandleSticksMap = {};
      const marketVals: MarketListItem[] = Object.values(markets) ?? [];
      for (const market of marketVals) {
        if (!market.name) continue;
        const candlesticksResponse: any = yield call([restClient, restClient.getCandlesticks], {
          market: market.name,
          resolution: 360,
          from: monthAgo,
          to: currentDate,
        });
        const candlestickArr: CandleStickItem[] = parseMarketCandlesticks(candlesticksResponse);
        candlesticksMap[market.name] = candlestickArr;
      }
      yield put(setCandleSticksMap(candlesticksMap));
    } catch (err) {
      console.error(err);
    } finally {
      yield put(actions.Layout.removeBackgroundLoading(candlesticksUuid));
      yield delay(15000);
    }
  }
}

export default function* marketsSaga() {
  yield all([
    fork(handleQueryMarketCandlesticks),
    fork(handleQueryMarketStats),
    fork(handleQueryMarketListMap),
  ]);
}
