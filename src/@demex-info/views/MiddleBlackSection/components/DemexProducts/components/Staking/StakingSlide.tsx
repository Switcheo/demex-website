import { default as Staking } from "@demex-info/assets/animations/Staking.json";
import { RenderGuard, TypographyLabel } from "@demex-info/components";
import { defaultStakingOpts, getDemexLink, goToLink, Paths } from "@demex-info/constants";
import { useTaskSubscriber } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import {
  BN_ZERO, StakingStats, toPercentage, toShorterNum,
} from "@demex-info/utils";
import {
  Box, Button, Divider, makeStyles, Theme, Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

interface DataProps {
  apr: BigNumber;
  stats: StakingStats;
}

interface Props {
  data: DataProps
  stakingRef: () => void;
  stakingView: boolean;
}

const Lottie = React.lazy(() => import("lottie-react"));

const StakingSlide: React.FC<Props> = (props: Props) => {
  const { data, stakingRef, stakingView } = props;
  const classes = useStyles();

  const lottieRef = React.useRef<any>();

  const [loading] = useTaskSubscriber("runStaking");

  const network = useSelector((state: RootState) => state.app.network);

  const delayAnimation = () => {
    lottieRef?.current?.pause();
    setTimeout(() => {
      lottieRef?.current?.goToAndPlay(0);
    }, 10000);
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
      <Box className={classes.animationBox}>
        <Suspense fallback={null}>
          <Lottie
            className={classes.lottieBox}
            lottieRef={lottieRef}
            { ...defaultStakingOpts }
            animationData={Staking}
            onComplete={delayAnimation}
          />
        </Suspense>
      </Box>

      <Box className={classes.rightGrid}>
        <Box>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.title}
          >
            Staking
          </Typography>
          <TypographyLabel color="textPrimary" className={classes.subtitle}>
            Accrue weekly rewards from trading fees and&nbsp;
            <br />
            block rewards when you stake SWTH.
          </TypographyLabel>
          <Divider className={classes.divider} />
          <Box className={classes.poolsStats}>
            <Box className={classes.statsBox}>
              <TypographyLabel className={classes.statsH6}>
                Total Staked
              </TypographyLabel>
              <RenderGuard renderIf={loading}>
                <Box>
                  <Skeleton className={clsx(classes.skeleton, "total")} />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!loading}>
                <Typography className={classes.statsH4} variant="h4">
                  {toShorterNum(data.stats.totalStaked ?? BN_ZERO)} SWTH
                </Typography>
              </RenderGuard>
            </Box>
            <Box className={classes.statsBox}>
              <TypographyLabel className={classes.statsH6}>
                Staking APR
              </TypographyLabel>

              <RenderGuard renderIf={loading}>
                <Box>
                  <Skeleton className={classes.skeleton} />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!loading}>
                <Typography className={classes.statsH4} variant="h4">
                  {toPercentage(data.apr, 2)}%
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
  animationBox: {
    maxWidth: "42rem",
    padding: 0,
    width: "100%",
    "@media (min-width: 1280px) and (max-width: 1600px)": {
      maxWidth: "30rem",
      padding: theme.spacing(0, 2.5),
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "27.8rem",
    },
  },
  divider: {
    backgroundColor: theme.palette.text.primary,
    height: theme.spacing(0.25),
    marginTop: theme.spacing(5),
    width: "4rem",
    "@media (min-width: 1601px)": {
      marginTop: theme.spacing(7),
    },
  },
  earningBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(8),
    padding: theme.spacing(1.75, 3.5),
    "@media (min-width: 1601px)": {
      fontSize: "1.25rem",
      padding: theme.spacing(2.5, 5),
      marginTop: theme.spacing(9),
    },
  },
  lottieBox: {
    maxWidth: "35.4rem",
  },
  poolsStats: {
    alignItems: "center",
    display: "flex",
    marginTop: theme.spacing(5),
    "@media (min-width: 1601px)": {
      marginTop: theme.spacing(7),
    },
  },
  rightGrid: {
    maxWidth: "42rem",
    width: "100%",
    padding: "0 0 0 8rem",
    "@media (max-width: 1600px)": {
      display: "flex",
      justifyContent: "center",
      maxWidth: "32rem",
      padding: theme.spacing(0, 2.5),
    },
  },
  skeleton: {
    width: "7rem",
    height: "3rem",
    "&.total": {
      width: "10rem",
    },
    "@media (min-width: 1601px)": {
      height: "4rem",
    },
  },
  slideItem: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingTop: "6rem",
    paddingBottom: "6rem",
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
    marginLeft: theme.spacing(5),
    "&:first-child": {
      marginLeft: 0,
    },
  },
  statsH4: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    "@media (min-width: 1601px)": {
      fontSize: "2.5rem",
      marginTop: theme.spacing(2.5),
    },
  },
  statsH6: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    "@media (min-width: 1601px)": {
      fontSize: "1.125rem",
    },
  },
  subtitle: {
    lineHeight: "1.75rem",
    marginTop: theme.spacing(3),
    "@media (min-width: 1601px)": {
      fontSize: "1.125rem",
      lineHeight: "1.555em",
    },
  },
  title: {
    fontSize: "2.5rem",
    "@media (min-width: 1601px)": {
      fontSize: "3rem",
    },
  },
}));

export default StakingSlide;
