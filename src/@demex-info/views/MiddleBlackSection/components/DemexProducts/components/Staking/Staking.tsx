import { Block } from "@cosmjs/stargate";
import { Attribute, BlockResultsResponse, Event } from "@cosmjs/tendermint-rpc";
import { useAsyncTask } from "@demex-info/hooks";
import useCheckSDK from "@demex-info/hooks/useCheckSDK";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, parseEventAttr, parseNumber, parseStakingStats, parseValidators, SECONDS_PER_YEAR, StakingStats, Validator } from "@demex-info/utils";
import { Hidden } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { Models } from "carbon-js-sdk";
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
  const [checkSDK] = useCheckSDK();

  const [stats, setStats] = React.useState<StakingStats>({
    totalStaked: BN_ZERO,
  });
  const [avgBlockTime, setAvgBlockTime] = React.useState<BigNumber>(BN_ZERO);
  const [avgReward, setAvgReward] = React.useState<BigNumber>(BN_ZERO);
  const [totalBonded, setTotalBonded] = React.useState<BigNumber>(BN_ZERO);

  const { sdk } = useSelector((state: RootState) => state.app);

  const blocksInYear = new BigNumber(SECONDS_PER_YEAR).div(avgBlockTime);
  const rewardsInYear = blocksInYear.times(avgReward);
  const apr = totalBonded.isZero() ? BN_ZERO : rewardsInYear.div(totalBonded);

  const reloadStaking = () => {
    runStaking(async () => {
      try {
        const response: Models.Staking.QueryPoolResponse = await sdk!.query.staking.Pool({});
        const stakingStats: StakingStats = parseStakingStats(response.pool, sdk);

        const validators: Models.Staking.QueryValidatorsResponse = await sdk!.query.staking.Validators({
          status: "",
        });
        const validatorsArr: Validator[] = parseValidators(validators.validators);
        let totalBonded: BigNumber = BN_ZERO;
        validatorsArr.forEach((val: Validator) => {
          if (val.status === Models.Staking.BondStatus.BOND_STATUS_BONDED) {
            const adjustedTokens = sdk?.token.toHuman("swth", val.tokens) ?? BN_ZERO;
            totalBonded = totalBonded.plus(adjustedTokens);
          }
        });

        let totalRewards = BN_ZERO;
        let blockCount = BN_ZERO;
        const lastBlock: Block = await sdk!.query.chain.getBlock();
        const evts: BlockResultsResponse = await sdk!.tmClient.blockResults(lastBlock.header.height ?? 0);
        evts.beginBlockEvents.forEach((evt: Event) => {
          if (evt.type !== "rewards") {
            return;
          }

          evt.attributes.forEach((c: Attribute) => {
            const key = parseEventAttr(c.key);
            const value = parseEventAttr(c.value);
            if (key === "amount" && value.substr(value.length - 4) === "swth") {
              const rewardsBN = parseNumber(value.substring(0, value.length - 4))!;
              const adjustedRewards = sdk?.token.toHuman("swth", rewardsBN) ?? BN_ZERO;
              totalRewards = totalRewards.plus(adjustedRewards);
            }
          });
        });
        blockCount = blockCount.plus(1);
        const avgReward = blockCount.isZero() ? BN_ZERO : totalRewards.div(blockCount);

        const evidenceParams = evts.consensusUpdates?.evidence;
        const maxAgeNumBlocks = parseNumber(evidenceParams?.maxAgeNumBlocks ?? 0, BN_ZERO)!;
        const maxAgeDuration = parseNumber(evidenceParams?.maxAgeDuration, BN_ZERO)!;
        const avgBlockTime = maxAgeNumBlocks.isZero() ? BN_ZERO : maxAgeDuration.dividedBy(maxAgeNumBlocks); // in nanoseconds
        const avgDuration = avgBlockTime.shiftedBy(-9); // convert to seconds

        setStats(stakingStats);
        setAvgBlockTime(avgDuration);
        setAvgReward(avgReward);
        setTotalBonded(totalBonded);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    if (checkSDK) {
      reloadStaking();
      stakingInterval = setInterval(() => {
        reloadStaking();
      }, 60000);
    }
    return () => {
      clearInterval(stakingInterval);
    };
  }, [checkSDK]);

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
