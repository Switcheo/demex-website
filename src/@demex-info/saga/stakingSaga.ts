import { StakingStats, parseStakingStats } from "@demex-info/store/staking/types";
import { all, call, delay, fork, put, select } from "redux-saga/effects";

import { RestClient } from "tradehub-api-js";
import { RootState } from "@demex-info/store/types";
import actions from "@demex-info/store/actions";
import { logger } from "@demex-info/utils";

function* handleQueryStakingStats(): Generator {
	logger("query staking stats");
	while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

		try {
      const response: any = yield call([restClient, restClient.getStakingPool]);
      const stakingStats: StakingStats = parseStakingStats(response);
      yield put(actions.Staking.setStakingStats(stakingStats));
		} catch (err) {
      console.error(err);
    } finally {
			yield delay(30000);
		}
	}
} 

export default function* stakingSaga() {
  yield all([
    fork(handleQueryStakingStats),
  ]);
}
