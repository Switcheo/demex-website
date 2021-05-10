import { default as LiquidityPools } from "@demex-info/assets/animations/LiquidityPools.json";
import { RenderGuard, TypographyLabel } from "@demex-info/components";
import { defaultLiquidityOpts, getDemexLink, goToLink, Paths } from "@demex-info/constants";
import { useTaskSubscriber } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { toShorterNum } from "@demex-info/utils";
import {
  Box, Button, Divider, makeStyles, Theme, Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { SlideCategory } from "../slideConfig";

const Lottie = React.lazy(() => import("lottie-react"));

interface DataProps {
  avgApy: BigNumber;
  totalCommit: BigNumber;
  totalLiquidity: BigNumber;
}

interface Props {
  data: DataProps;
  liquidityRef: () => void;
  slide: SlideCategory | null;
}

const LiquidityPoolSlide: React.FC<Props> = (props: Props) => {
  const { data, liquidityRef, slide } = props;
  const classes = useStyles();

  const lottieRef = React.useRef<any>();

  const [loading] = useTaskSubscriber("runPools");

  const network = useSelector((state: RootState) => state.app.network);

  const delayAnimation = () => {
    lottieRef?.current?.pause();
    setTimeout(() => {
      lottieRef?.current?.goToAndPlay(0);
    }, 10000);
  };

  const handleResizeWindow = () => {
    const liquidityEl = document.querySelector("#rightGrid");
    const svgEl = document.querySelector("#liquidAnimation > svg");
    if (window.innerWidth > 1601) {
      svgEl?.setAttribute("style", "width: 662.2px; height: 550px; transform: translate(12px, 0px);");
    } else if (window.innerWidth > 1440 && window.innerWidth <= 1600) {
      svgEl?.setAttribute("style", "width: 602px; height: 500px; transform: translate(12px, 0px);");
    } else if (window.innerWidth > 1280 && window.innerWidth <= 1440) {
      const width = (liquidityEl?.clientWidth ?? 0) - 10;
      const height = width / 550 * 450;
      svgEl?.setAttribute("style", `width: ${width}px; height: ${height}px; transform: translate(${(height / 10) + 2}px, 0px);`);
    } else {
      svgEl?.setAttribute("style", "width: 105%; height: 100%;");
    }
  };

  useEffect(() => {
    lottieRef?.current?.stop();
    if (slide === "liquidityPools") {
      lottieRef?.current?.goToAndPlay(0);
    }
  }, [slide]);

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  return (
    <div
      ref={liquidityRef}
      id="liquidityPools"
      className={clsx(
        classes.slideItem,
        { slideIn: slide === "liquidityPools" },
      )}
    >
      <Box className={classes.leftGrid}>
        <Box>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.title}
          >
            Liquidity Pools
          </Typography>
          <TypographyLabel color="textPrimary" className={classes.subtitle}>
            Maximise liquidity rewards and boost earnings by&nbsp;
            <br />
            committing LP tokens
          </TypographyLabel>
          <Divider className={classes.divider} />
          <Box className={classes.poolsStats}>
            <Box className={classes.statsBox}>
              <TypographyLabel className={classes.statsH6}>
                Total Liquidity
              </TypographyLabel>
              <RenderGuard renderIf={loading}>
                <Box>
                  <Skeleton className={classes.skeleton} />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!loading}>
                <Typography className={classes.statsH4} variant="h4">
                  ${toShorterNum(data.totalLiquidity)}
                </Typography>
              </RenderGuard>
            </Box>
            <Box className={classes.statsBox}>
              <TypographyLabel className={classes.statsH6}>
                Avg APR
              </TypographyLabel>
              <RenderGuard renderIf={loading}>
                <Box>
                  <Skeleton className={classes.skeleton} />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!loading}>
                <Typography className={classes.statsH4} variant="h4">
                  {data.avgApy.isFinite() ? `${data.avgApy.decimalPlaces(1, 1).toString(10)}%` : "-"}
                </Typography>
              </RenderGuard>
            </Box>
            <Box className={classes.statsBox}>
              <TypographyLabel className={classes.statsH6}>
                Total Committed Value
              </TypographyLabel>
              <RenderGuard renderIf={loading}>
                <Box>
                  <Skeleton className={classes.skeleton} />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!loading}>
                <Typography className={classes.statsH4} variant="h4">
                  ${toShorterNum(data.totalCommit)}
                </Typography>
              </RenderGuard>
            </Box>
          </Box>
          <Button
            className={classes.earningBtn}
            variant="contained"
            color="secondary"
            onClick={() => goToLink(getDemexLink(Paths.Pools.List, network))}
          >
            Start Earning
          </Button>
        </Box>
      </Box>
      <Box className={classes.rightGrid} id="rightGrid">
        <Suspense fallback={null}>
          <Lottie
            lottieRef={lottieRef}
            { ...defaultLiquidityOpts }
            animationData={LiquidityPools}
            onComplete={delayAnimation}
            id="liquidAnimation"
            style={{
              paddingLeft: 20,
            }}
            onEnterFrame={handleResizeWindow}
          />
        </Suspense>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
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
  leftGrid: {
    alignItems: "flex-end",
    display: "flex",
    maxWidth: "42rem",
    width: "100%",
    "@media (min-width: 1280px) and (max-width: 1600px)": {
      maxWidth: "30rem",
      padding: theme.spacing(0, 2.5),
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "28rem",
    },
  },
  liquidityImg: {
    display: "block",
    maxWidth: "32rem",
    width: "100%",
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
    "@media (min-width: 960px) and (max-width: 1600px)": {
      maxWidth: "32rem",
      padding: theme.spacing(0, 2.5),
    },
  },
  skeleton: {
    width: "6rem",
    height: "3rem",
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
    height: "2.75rem",
    "@media (min-width: 1601px)": {
      fontSize: "1.125rem",
      height: "unset",
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

export default LiquidityPoolSlide;
