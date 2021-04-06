import { StakingStats, Validator } from "./types";

import BigNumber from "bignumber.js";

export const StakingActionTypes = {
	SET_AVG_BLOCK_TIME: "SET_AVG_BLOCK_TIME",
	SET_AVG_REWARD: "SET_AVG_REWARD",
  SET_STAKING_STATS: "SET_STAKING_STATS",
	SET_TOTAL_BONDED: "SET_TOTAL_BONDED",
	SET_VALIDATORS: "SET_VALIDATORS",
};

export function setAvgBlockTime(avgBlockTime: string) {
	return {
		type: StakingActionTypes.SET_AVG_BLOCK_TIME,
		avgBlockTime,
	};
}

export function setAvgReward(avgReward: BigNumber) {
	return {
		type: StakingActionTypes.SET_AVG_REWARD,
		avgReward,
	};
}

export function setStakingStats(stats: StakingStats) {
	return {
		type: StakingActionTypes.SET_STAKING_STATS,
		stats,
	};
}

export function setTotalBonded(totalBonded: BigNumber) {
	return {
		type: StakingActionTypes.SET_TOTAL_BONDED,
		totalBonded,
	};
}

export function setValidators(validators: Validator[]) {
	return {
		type: StakingActionTypes.SET_VALIDATORS,
		validators,
	};
}
