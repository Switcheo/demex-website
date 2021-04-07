import { BN_ZERO, SECONDS_PER_HOUR, SECONDS_PER_MINUTE, SECONDS_PER_YEAR, parseNumber, toPercentage, toShorterNum } from "@demex-info/utils";
import { Box, Button, Divider, Theme, Typography, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink, goToLink, lottieDefaultOptions } from "@demex-info/constants";
import React, { useEffect } from "react";
import { RenderGuard, TypographyLabel } from "@demex-info/components";

import BigNumber from "bignumber.js";
import Lottie from "lottie-react";
import { RootState } from "@demex-info/store/types";
import { Skeleton } from "@material-ui/lab";
import { Staking } from "@demex-info/assets";
import { StakingTasks } from "@demex-info/store/staking/types";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useTaskSubscriber } from "@demex-info/hooks";

interface Props {
  liquidityView: boolean;
  stakingRef: () => void;
  stakingView: boolean;
}

const StakingSlide: React.FC<Props> = (props: Props) => {
  const { stakingRef, stakingView } = props;
  const classes = useStyles();

  const lottieRef = React.useRef<any>();

  const [statsLoading] = useTaskSubscriber(StakingTasks.Stats);
  const [aprLoading] = useTaskSubscriber(StakingTasks.Blocks, StakingTasks.AvgBlockTime, StakingTasks.Validators);

  const network = useSelector((state: RootState) => state.app.network);
  const { avgBlockTime, avgReward, stats, totalBonded } = useSelector((state: RootState) => state.staking);

  const timeArray: any = avgBlockTime.split(":");
  const hours: BigNumber = parseNumber(timeArray[0], BN_ZERO)!.times(SECONDS_PER_HOUR);
  const minutes: BigNumber = parseNumber(timeArray[1], BN_ZERO)!.times(SECONDS_PER_MINUTE);
  const seconds: BigNumber = parseNumber(timeArray[2], BN_ZERO)!;
  const blockTimeBN: BigNumber = hours.plus(minutes).plus(seconds);
  const blocksInYear = new BigNumber(SECONDS_PER_YEAR).div(blockTimeBN);
  const rewardsInYear = blocksInYear.times(avgReward);
  const apr = totalBonded.isZero() ? BN_ZERO : rewardsInYear.div(totalBonded);

  const delayAnimation = () => {
    lottieRef?.current?.pause();
    setTimeout(() => {
      lottieRef?.current?.goToAndPlay(0);
    }, 5000);
  };

  useEffect(() => {
    lottieRef?.current?.stop();
    if (stakingView) {
      lottieRef?.current?.goToAndPlay(0);
    }
  }, [stakingView]);

  return (
    <div
      ref={stakingRef}
      id="staking"
      className={clsx(classes.slideItem,
        {
          slideIn: stakingView,
        },
      )}
    >
      <Box maxWidth="30rem" px={2.5}>
        <Lottie
          lottieRef={lottieRef}
          { ...lottieDefaultOptions }
          animationData={Staking}
          loop={false}
          onComplete={delayAnimation}
        />
      </Box>

      <Box className={classes.rightGrid}>
        <Box pl={2.5}>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.title}
          >
            Staking
          </Typography>
          <TypographyLabel color="textSecondary" className={classes.subtitle} mt={3.5}>
            Accrue weekly rewards from trading fees and block rewards when you stake SWTH.
          </TypographyLabel>
          <Divider className={classes.divider} />
          <Box className={classes.poolsStats}>
            <Box className={classes.statsBox}>
              <TypographyLabel color="textSecondary">
                Total Staked
              </TypographyLabel>
              <RenderGuard renderIf={statsLoading}>
                <Box>
                  <Skeleton width="10rem" height="3rem" />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!statsLoading}>
                <Typography variant="h4" color="textPrimary">
                  {toShorterNum(stats.totalStaked ?? BN_ZERO)} SWTH
                </Typography>
              </RenderGuard>
            </Box>
            <Box className={classes.statsBox}>
              <TypographyLabel color="textSecondary">
                Staking APR
              </TypographyLabel>

              <RenderGuard renderIf={aprLoading}>
                <Box>
                  <Skeleton width="10rem" height="3rem" />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!aprLoading}>
                <Typography variant="h4" color="textPrimary">
                  {toPercentage(apr, 2)}%
                </Typography>
              </RenderGuard>
            </Box>
          </Box>
          <Button
            className={classes.earningBtn}
            variant="contained"
            color="secondary"
            onClick={() => goToLink(getDemexLink(Paths.Stake.List, network))}
          >
            Start Earning
          </Button>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.text.secondary,
    height: theme.spacing(0.25),
    marginTop: theme.spacing(6),
    width: "4rem",
  },
  earningBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(9),
    padding: theme.spacing(1.75, 3.5),
  },
  poolsStats: {
    alignItems: "center",
    display: "flex",
    marginTop: theme.spacing(6),
  },
  rightGrid: {
    maxWidth: "50%",
    padding: theme.spacing(0, 2.5),
    width: "100%",
  },
  slideItem: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    // height: "52vh",
    margin: "1rem 0",
    paddingTop: "22vh",
    paddingBottom: "22vh",
    opacity: 0,
    transform: "translate(0px, 60px)",
    transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
    "&.slideIn": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
    "&.slideOutTop": {
      opacity: 0,
      transform: "translate(0px,-60px)",
    },
    "&.slideOutBottom": {
      opacity: 0,
      transform: "translate(0px, 60px)",
    },
  },
  stakingImg: {
    display: "block",
    maxWidth: "30rem",
    width: "100%",
  },
  statsBox: {
    marginLeft: theme.spacing(4),
    "&:first-child": {
      marginLeft: 0,
    },
    "& h4": {
      marginTop: theme.spacing(1),
    },
    "& h6": {
      height: "3rem",
      overflow: "hidden",
    },
  },
  subtitle: {
    fontSize: "1.125rem",
  },
  title: {
    fontSize: "2.5rem",
  },
}));

export default StakingSlide;
