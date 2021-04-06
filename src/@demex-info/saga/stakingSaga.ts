import { BN_ZERO, logger, uuidv4 } from "@demex-info/utils";
import { StakingStats, StakingTasks, Validator, parseStakingStats, parseValidators } from "@demex-info/store/staking/types";
import { all, call, delay, fork, put, select } from "redux-saga/effects";

import BigNumber from "bignumber.js";
import { RestClient } from "tradehub-api-js";
import { RootState } from "@demex-info/store/types";
import TendermintClient from "@demex-info/utils/tendermint";
import actions from "@demex-info/store/actions";

function* handleQueryStakingStats(): Generator {
	logger("query staking stats");
  let setLoad: boolean = true;

	while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const statsUuid = uuidv4();
    if (setLoad) {
      yield put(actions.Layout.addBackgroundLoading(StakingTasks.Stats, statsUuid));
    }
		try {
      const response: any = yield call([restClient, restClient.getStakingPool]);
      const stakingStats: StakingStats = parseStakingStats(response);
      yield put(actions.Staking.setStakingStats(stakingStats));
		} catch (err) {
      console.error(err);
    } finally {
      if (setLoad) {
        yield put(actions.Layout.removeBackgroundLoading(statsUuid));
        setLoad = false;
      }
			yield delay(30000);
		}
	}
}

function* pollAvgBlockTime(): Generator {
  logger("query avg block time");
  let setLoad: boolean = true;

  while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const avgUuid = uuidv4();
    if (setLoad) {
      yield put(actions.Layout.addBackgroundLoading(StakingTasks.AvgBlockTime, avgUuid));
    }
    try {
      const blockTime: any = yield call([
        restClient,
        restClient.getAverageBlocktime,
      ]);
      yield put(actions.Staking.setAvgBlockTime(blockTime));
    } catch (err) {
      console.error(err);
      yield put(actions.Staking.setAvgBlockTime("0.00"));
    } finally {
      if (setLoad) {
        yield put(actions.Layout.removeBackgroundLoading(avgUuid));
        setLoad = false;
      }
      yield delay(30000);
    }
  }
}

function* handleQueryValidators(): Generator {
  logger("query validators");
  let setLoad: boolean = true;

  while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const validatorsUuid = uuidv4();
    if (setLoad) {
      yield put(actions.Layout.addBackgroundLoading(StakingTasks.Validators, validatorsUuid));
    }
    try {
      const validators: any = yield call([restClient, restClient.getAllValidators]);
      let totalBonded: BigNumber = BN_ZERO;
      const validatorsArr: Validator[] = parseValidators(validators);

      validatorsArr.forEach((val: any) => {
        if (val.bondStatus === "bonded") {
          totalBonded = totalBonded.plus(val.tokens);
        }
      });
      yield put(actions.Staking.setValidators(validatorsArr));
      yield put(actions.Staking.setTotalBonded(totalBonded));
    } catch (err) {
      yield put(actions.Staking.setValidators([]));
      yield put(actions.Staking.setTotalBonded(BN_ZERO));
      console.error(err);
    } finally {
      if (setLoad) {
        yield put(actions.Layout.removeBackgroundLoading(validatorsUuid));
        setLoad = false;
      }
      yield delay(30000);
    }
  }
}

function* handleQueryBlocks(): Generator {
  logger("query blocks");
  let setLoad: boolean = true;

  while (true) {
    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const tendermintClient: any = yield select((state: RootState): TendermintClient => state.app.tendermintClient);
    if (!tendermintClient) continue;

    let totalRewards = BN_ZERO;
    let blockCount = BN_ZERO;

    const blocksUuid = uuidv4();
    if (setLoad) {
      yield put(actions.Layout.addBackgroundLoading(StakingTasks.Blocks, blocksUuid));
    }
    try {
      const blocksSummary: any = yield call(
        [restClient, restClient.getBlocks],
        { page: 1 },
      );
      const lastBlock: any = blocksSummary[0];
      const evts: any = yield call(
        [tendermintClient, tendermintClient.getBlockEvents],
        {
          height: parseInt(lastBlock?.block_height ?? "0"),
        },
      );

      evts.beginBlockEvents.forEach((evt: any) => {
        if (evt.type === "rewards") {
          evt.attributes.forEach((c: any) => {
            if (c.key === "amount") {
              if (c.value.substr(c.value.length - 4) === "swth") {
                totalRewards = totalRewards.plus(
                  new BigNumber(
                    c.value.substring(0, c.value.length - 4),
                  ).shiftedBy(-8),
                );
              }
              // tslint:disable:ter-indent
              // tslint:disable:prettier
            }
          });
        }
      });
      blockCount = blockCount.plus(1);
      const avgReward = blockCount.isZero() ? BN_ZERO : totalRewards.div(blockCount);
      yield put(actions.Staking.setAvgReward(avgReward));
    } catch (err) {
      yield put(actions.Staking.setAvgReward(BN_ZERO));
    } finally {
      if (setLoad) {
        yield put(actions.Layout.removeBackgroundLoading(blocksUuid));
        setLoad = false;
      }
      yield delay(30000);
    }
  }
}

export default function* stakingSaga() {
  yield all([
    fork(handleQueryStakingStats),
    fork(pollAvgBlockTime),
    fork(handleQueryValidators),
    fork(handleQueryBlocks),
  ]);
}
