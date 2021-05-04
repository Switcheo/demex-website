import { useAsyncTask } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, SECONDS_PER_HOUR, SECONDS_PER_MINUTE, SECONDS_PER_YEAR, parseNumber, StakingStats, Validator, parseStakingStats, parseValidators } from "@demex-info/utils";
import { Hidden } from "@material-ui/core";
import BigNumber from "bignumber.js";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StakingSection from "./StakingSection";
import StakingSlide from "./StakingSlide";

interface Props {
  stakingRef: () => void;
  stakingView: boolean;
}

let stakingInterval: any;

const Staking: React.FC<Props> = (props: Props) => {
  const { stakingRef, stakingView } = props;
  const [runStaking] = useAsyncTask("runStaking");

  const [stats, setStats] = React.useState<StakingStats>({
    totalStaked: BN_ZERO,
  });
  const [avgBlockTime, setAvgBlockTime] = React.useState<string>("0.00");
  const [avgReward, setAvgReward] = React.useState<BigNumber>(BN_ZERO);
  const [totalBonded, setTotalBonded] = React.useState<BigNumber>(BN_ZERO);

  const { tokens, restClient, tendermintClient } = useSelector((state: RootState) => state.app);

  const timeArray: any = avgBlockTime.split(":");
  const hours: BigNumber = parseNumber(timeArray[0], BN_ZERO)!.times(SECONDS_PER_HOUR);
  const minutes: BigNumber = parseNumber(timeArray[1], BN_ZERO)!.times(SECONDS_PER_MINUTE);
  const seconds: BigNumber = parseNumber(timeArray[2], BN_ZERO)!;
  const blockTimeBN: BigNumber = hours.plus(minutes).plus(seconds);
  const blocksInYear = new BigNumber(SECONDS_PER_YEAR).div(blockTimeBN);
  const rewardsInYear = blocksInYear.times(avgReward);
  const apr = totalBonded.isZero() ? BN_ZERO : rewardsInYear.div(totalBonded);

  const reloadStaking = () => {
    runStaking(async () => {
      try {
        const response: any = await restClient.getStakingPool();
        const stakingStats: StakingStats = parseStakingStats(response, tokens);

        const blockTime: any = await restClient.getAverageBlocktime();

        const validators: any = await restClient.getAllValidators();
        const validatorsArr: Validator[] = parseValidators(validators);
        let totalBonded: BigNumber = BN_ZERO;
        validatorsArr.forEach((val: any) => {
          if (val.bondStatus === "bonded") {
            totalBonded = totalBonded.plus(val.tokens);
          }
        });

        let totalRewards = BN_ZERO;
        let blockCount = BN_ZERO;
        const blocksSummary: any = await restClient.getBlocks({ page: 1 });
        const lastBlock: any = blocksSummary[0];
        const evts: any = await tendermintClient.getBlockEvents({
          height: parseInt(lastBlock?.block_height ?? "0"),
        });
        evts.beginBlockEvents.forEach((evt: any) => {
          if (evt.type !== "rewards") {
            return;
          }

          evt.attributes.forEach((c: any) => {
            if (c.key === "amount" && c.value.substr(c.value.length - 4) === "swth") {
              const rewardsBN = new BigNumber(c.value.substring(0, c.value.length - 4)).shiftedBy(-8);
              totalRewards = totalRewards.plus(rewardsBN);
            }
          });
        });
        blockCount = blockCount.plus(1);
        const avgReward = blockCount.isZero() ? BN_ZERO : totalRewards.div(blockCount);

        setStats(stakingStats);
        setAvgBlockTime(blockTime);
        setAvgReward(avgReward);
        setTotalBonded(totalBonded);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    reloadStaking();
    stakingInterval = setInterval(() => {
      reloadStaking();
    }, 60000);
    return () => clearInterval(stakingInterval);
  }, []);

  return (
    <React.Fragment>
      <Hidden smDown>
        <StakingSlide data={{ apr, stats }} stakingRef={stakingRef} stakingView={stakingView} />
      </Hidden>
      <Hidden mdUp>
        <StakingSection apr={apr} stats={stats} />
      </Hidden>
    </React.Fragment>
  );
};

export default Staking;
