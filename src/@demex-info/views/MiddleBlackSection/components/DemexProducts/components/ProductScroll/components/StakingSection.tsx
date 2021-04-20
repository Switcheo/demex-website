import { Staking } from "@demex-info/assets";
import { RenderGuard, TypographyLabel } from "@demex-info/components";
import { getDemexLink, goToLink, lottieDefaultOptions, Paths } from "@demex-info/constants";
import { useTaskSubscriber } from "@demex-info/hooks";
import { StakingTasks } from "@demex-info/store/staking/types";
import { RootState } from "@demex-info/store/types";
import {
  BN_ZERO, parseNumber, SECONDS_PER_HOUR, SECONDS_PER_MINUTE,
  SECONDS_PER_YEAR, toPercentage, toShorterNum,
} from "@demex-info/utils";
import { Box, Button, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import Lottie from "lottie-react";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

const StakingSection: React.FC = () => {
  const classes = useStyles();

  const lottieRef = React.useRef<any>();
  const [stakingTxtRef, stakingTxtView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [stakingImgRef, stakingImgView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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
    if (stakingImgView) {
      lottieRef?.current?.goToAndPlay(0);
    }
  }, [stakingImgView]);

  return (
    <React.Fragment>
      <Box id="staking" className={classes.stakingFiller}>
        &nbsp;
      </Box>
      <div ref={stakingTxtRef} className={clsx(classes.productItem, { slideIn: stakingTxtView })}>
        <Typography
          variant="h3"
          color="textPrimary"
          className={classes.title}
        >
          Staking
        </Typography>
        <TypographyLabel color="textPrimary" className={classes.subtitle}>
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
                <Skeleton width="5rem" height="3rem" />
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
                <Skeleton width="5rem" height="3rem" />
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
      </div>
      <div ref={stakingImgRef} className={clsx(classes.productItem, { slideIn: stakingImgView })}>
        <Lottie
          lottieRef={lottieRef}
          { ...lottieDefaultOptions }
          animationData={Staking}
          loop={false}
          onComplete={delayAnimation}
        />
      </div>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.text.primary,
    height: theme.spacing(0.25),
    marginTop: theme.spacing(4),
    width: "4rem",
  },
  earningBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(4.5),
    padding: theme.spacing(1.75, 3.5),
  },
  poolsStats: {
    display: "flex",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  productItem: {
    margin: theme.spacing(7, "auto", 0),
    maxWidth: "34rem",
    overflow: "hidden",
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
    [theme.breakpoints.only("xs")]: {
      maxWidth: "32rem",
    },
  },
  stakingFiller: {
    height: "4rem",
    "@media (max-width: 360px)": {
      height: "3rem",
    },
  },
  stakingImg: {
    display: "block",
    margin: theme.spacing(0, "auto"),
    maxWidth: "32rem",
    width: "100%",
  },
  statsBox: {
    marginLeft: theme.spacing(4),
    "&:first-child": {
      marginLeft: 0,
    },
    "& h4": {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      "& h4": {
        fontSize: "1.75rem",
      },
      "& h6": {
        fontSize: "0.875rem",
      },
    },
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      "& h4": {
        fontSize: "1.625rem",
      },
      "& h6": {
        fontSize: "0.75rem",
      },
    },
  },
  subtitle: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  title: {},
}));

export default StakingSection;
