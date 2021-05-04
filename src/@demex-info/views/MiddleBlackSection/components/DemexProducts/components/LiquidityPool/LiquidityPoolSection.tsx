import { default as LiquidityPools } from "@demex-info/assets/animations/LiquidityPools.json";
import { RenderGuard, TypographyLabel } from "@demex-info/components";
import { getDemexLink, goToLink, lottieDefaultOptions, Paths } from "@demex-info/constants";
import { useTaskSubscriber } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { toShorterNum } from "@demex-info/utils";
import {
  Box, Button, Divider, Hidden, makeStyles, Theme, Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

interface DataProps {
  avgApy: BigNumber;
  totalCommit: BigNumber;
  totalLiquidity: BigNumber;
}

const Lottie = React.lazy(() => import("lottie-react"));

const LiquidityPoolSection: React.FC<DataProps> = (props: DataProps) => {
  const { avgApy, totalCommit, totalLiquidity } = props;
  const classes = useStyles();

  const [liquidityTextRef, liquidityTxtView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [liquidityImgRef, liquidityImgView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const lottieRef = React.useRef<any>();

  const [loading] = useTaskSubscriber("runPools");

  const network = useSelector((state: RootState) => state.app.network);

  const delayAnimation = () => {
    lottieRef?.current?.pause();
    setTimeout(() => {
      lottieRef?.current?.goToAndPlay(0);
    }, 5000);
  };

  useEffect(() => {
    lottieRef?.current?.stop();
    if (liquidityImgView) {
      lottieRef?.current?.goToAndPlay(0);
    }
  }, [liquidityImgView]);

  return (
    <React.Fragment>
      <Box id="liquidityPools" height="0px">
        &nbsp;
      </Box>
      <div ref={liquidityTextRef} className={clsx(classes.productItem, { slideIn: liquidityTxtView })}>
        <Typography
          variant="h3"
          color="textPrimary"
          className={classes.title}
        >
          Liquidity Pools
        </Typography>
        <TypographyLabel color="textPrimary" className={classes.subtitle}>
          Maximise liquidity rewards and boost earnings by committing LP tokens
        </TypographyLabel>
        <Divider className={classes.divider} />
        <Box className={classes.poolsStats}>
          <Box className={classes.statsBox}>
            <TypographyLabel className={classes.statBoxH6}>
              Total Liquidity
            </TypographyLabel>
            <RenderGuard renderIf={loading}>
              <Box>
                <Skeleton width="5rem" height="3rem" />
              </Box>
            </RenderGuard>
            <RenderGuard renderIf={!loading}>
              <Typography className={classes.statBoxH4} variant="h4">
                ${toShorterNum(totalLiquidity)}
              </Typography>
            </RenderGuard>
          </Box>
          <Box className={classes.statsBox}>
            <TypographyLabel className={classes.statBoxH6}>
              Avg APR
            </TypographyLabel>
            <RenderGuard renderIf={loading}>
              <Box>
                <Skeleton width="5rem" height="3rem" />
              </Box>
            </RenderGuard>
            <RenderGuard renderIf={!loading}>
              <Typography className={classes.statBoxH4} variant="h4">
                {avgApy.isFinite() ? `${avgApy.decimalPlaces(1, 1).toString(10)}%` : "-"}
              </Typography>
            </RenderGuard>
          </Box>
          <Hidden only="xs">
            <Box className={classes.statsBox}>
              <TypographyLabel className={classes.statBoxH6}>
                Total Committed Value
              </TypographyLabel>
              <RenderGuard renderIf={loading}>
                <Box>
                  <Skeleton width="5rem" height="3rem" />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!loading}>
                <Typography className={classes.statBoxH4} variant="h4">
                  ${toShorterNum(totalCommit)}
                </Typography>
              </RenderGuard>
            </Box>
          </Hidden>
        </Box>
        <Hidden only="sm">
          <Box className={clsx(classes.statsDiv, "alone")}>
            <TypographyLabel className={classes.statBoxH6}>
              Total Committed Value
            </TypographyLabel>
            <Typography className={classes.statsDivH4} variant="h4">
              ${toShorterNum(totalCommit)}
            </Typography>
          </Box>
        </Hidden>
        <Button
          className={classes.earningBtn}
          variant="contained"
          color="secondary"
          onClick={() => goToLink(getDemexLink(Paths.Pools.List, network))}
        >
          Start Earning
        </Button>
      </div>
      <div ref={liquidityImgRef} className={clsx(classes.productItem, { slideIn: liquidityImgView })}>
        <Suspense fallback={null}>
          <Lottie
            lottieRef={lottieRef}
            { ...lottieDefaultOptions }
            animationData={LiquidityPools}
            loop={false}
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
  liquidityImg: {
    display: "block",
    margin: theme.spacing(0, "auto"),
    maxWidth: "32rem",
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      width: "110%",
    },
  },
  poolsStats: {
    display: "flex",
    marginTop: theme.spacing(4),
  },
  productItem: {
    margin: theme.spacing(5, "auto", 0),
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
  statsBox: {
    marginLeft: theme.spacing(4),
    "&:first-child": {
      marginLeft: 0,
    },
    [theme.breakpoints.only("xs")]: {
      width: "50%",
    },
  },
  statBoxH4: {
    color: theme.palette.text.primary,
    fontSize: "1.75rem",
    marginTop: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.625rem",
    },
  },
  statBoxH6: {
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
    marginTop: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.75rem",
    },
  },
  statsDiv: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      "&.alone": {
        width: "100%",
      },
    },
  },
  statsDivH4: {
    color: theme.palette.text.primary,
    fontSize: "1.75rem",
    marginTop: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.625rem",
    },
  },
  subtitle: {
    marginTop: theme.spacing(2),
  },
  title: {},
}));

export default LiquidityPoolSection;
