import { BN_ZERO, logger, parseNumber, uuidv4 } from "@demex-info/utils";
import { Pool, PoolsTasks, TotalCommitmentMap, parseLiquidityPools } from "@demex-info/store/pools/types";
import { all, call, delay, fork, put, select } from "redux-saga/effects";

import { RestClient } from "tradehub-api-js";
import { RootState } from "@demex-info/store/types";
import actions from "@demex-info/store/actions";

function* handlePoolsQuery(): Generator {
  logger("init pools saga");
  let setLoad: boolean = true;

  while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const poolsUuid = uuidv4();
    if (setLoad) {
      yield put(actions.Layout.addBackgroundLoading(PoolsTasks.List, poolsUuid));
    }
    try {
      const response: any = yield call([restClient, restClient.getLiquidityPools]);
      const poolsData: Pool[] = parseLiquidityPools(response);
      yield put(actions.Pools.setLiquidityPools(poolsData));

      const totalCommitMap: TotalCommitmentMap = {};
      for (const pool of poolsData) {
        if (!pool.denom) continue;
        const richListResponse: any = yield call([restClient, restClient.getRichList], { token: pool.denom });
        const totalCommitment = parseNumber(richListResponse?.[0]?.amount, BN_ZERO)!;
        totalCommitMap[pool.denom] = totalCommitment;
      }
      yield put(actions.Pools.setTotalCommitMap(totalCommitMap));
    } catch (err) {
      console.error(err);
    } finally {
      if (setLoad) {
        yield put(actions.Layout.removeBackgroundLoading(poolsUuid));
        setLoad = false;
      }
      yield delay(15000);
    }
  }
}

function* queryWeeklyPoolRewards(): Generator {
  let setLoad: boolean = true;

  while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const rewardsUuid = uuidv4();
    if (setLoad) {
      yield put(actions.Layout.addBackgroundLoading(PoolsTasks.Rewards, rewardsUuid));
    }
    try {
      const poolsRewards: any = yield call([restClient, restClient.getWeeklyPoolRewards]);
      yield put(actions.Pools.setWeeklyPoolRewards(poolsRewards));
    } catch (err) {
      console.error(err);
    } finally {
      if (setLoad) {
        yield put(actions.Layout.removeBackgroundLoading(rewardsUuid));
        setLoad = false;
      }
      yield delay(15000);
    }
  }
}

export default function* poolsSaga() {
  yield all([
    fork(handlePoolsQuery),
    fork(queryWeeklyPoolRewards),
  ]);
}
