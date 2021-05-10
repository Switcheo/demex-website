import { default as Staking } from "@demex-info/assets/animations/Staking.json";
import { RenderGuard, TypographyLabel } from "@demex-info/components";
import { defaultStakingOpts, getDemexLink, goToLink, Paths } from "@demex-info/constants";
import { useTaskSubscriber } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, StakingStats, toPercentage, toShorterNum } from "@demex-info/utils";
import { Box, Button, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

interface DataProps {
  apr: BigNumber;
  stats: StakingStats;
}

const Lottie = React.lazy(() => import("lottie-react"));

const StakingSection: React.FC<DataProps> = (props: DataProps) => {
  const { apr, stats } = props;
  const classes = useStyles();
  const [loading] = useTaskSubscriber("runStaking");

  const network = useSelector((state: RootState) => state.app.network);

  const lottieRef = React.useRef<any>();
  const [stakingTxtRef, stakingTxtView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [stakingImgRef, stakingImgView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const delayAnimation = () => {
    lottieRef?.current?.pause();
    setTimeout(() => {
      lottieRef?.current?.goToAndPlay(0);
    }, 10000);
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
            <TypographyLabel className={classes.statsH6}>
              Total Staked
            </TypographyLabel>
            <RenderGuard renderIf={loading}>
              <Box>
                <Skeleton width="5rem" height="3rem" />
              </Box>
            </RenderGuard>
            <RenderGuard renderIf={!loading}>
              <Typography className={classes.statsH4} variant="h4">
                {toShorterNum(stats.totalStaked ?? BN_ZERO)} SWTH
              </Typography>
            </RenderGuard>
          </Box>
          <Box className={classes.statsBox}>
            <TypographyLabel className={classes.statsH6}>
              Staking APR
            </TypographyLabel>
            <RenderGuard renderIf={loading}>
              <Box>
                <Skeleton width="5rem" height="3rem" />
              </Box>
            </RenderGuard>
            <RenderGuard renderIf={!loading}>
              <Typography className={classes.statsH4} variant="h4">
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
        <Suspense fallback={null}>
          <Lottie
            lottieRef={lottieRef}
            { ...defaultStakingOpts }
            animationData={Staking}
            onComplete={delayAnimation}
          />
        </Suspense>
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
    marginTop: theme.spacing(4),
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
    marginLeft: theme.spacing(5),
    "&:first-child": {
      marginLeft: 0,
    },
    "@media (max-width: 480px)": {
      width: "50%",
    },
  },
  statsH4: {
    color: theme.palette.text.primary,
    fontSize: "1.75rem",
    marginTop: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.625rem",
    },
  },
  statsH6: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.75rem",
    },
  },
  subtitle: {
    marginTop: theme.spacing(2),
  },
  title: {},
}));

export default StakingSection;
