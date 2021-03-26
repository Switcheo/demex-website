import { StakingStats } from "./types";

export const StakingActionTypes = {
  SET_STAKING_STATS: "SET_STAKING_STATS",
};

export function setStakingStats(stats: StakingStats) {
	return {
		type: StakingActionTypes.SET_STAKING_STATS,
		stats,
	};
}
