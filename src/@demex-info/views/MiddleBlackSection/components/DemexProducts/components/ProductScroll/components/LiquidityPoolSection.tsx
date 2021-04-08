import { BN_HUNDRED, BN_ZERO, calculateAPY, getBreakdownToken, toShorterNum } from "@demex-info/utils";
import { Box, Button, Divider, Hidden, Theme, Typography, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink, getUsd, goToLink, lottieDefaultOptions } from "@demex-info/constants";
import React, { useEffect } from "react";
import { RenderGuard, TypographyLabel } from "@demex-info/components";

import BigNumber from "bignumber.js";
import { LiquidityPools } from "@demex-info/assets";
import Lottie from "lottie-react";
import { Pool } from "@demex-info/store/pools/types";
import { PoolsTasks } from "@demex-info/store/pools/types";
import { RootState } from "@demex-info/store/types";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { useTaskSubscriber } from "@demex-info/hooks";

const LiquidityPoolSection: React.FC = () => {
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

  const [loading] = useTaskSubscriber(PoolsTasks.List, PoolsTasks.Rewards);

  const { network, tokens, usdPrices } = useSelector((state: RootState) => state.app);
  const { pools, totalCommitMap, weeklyRewards } = useSelector((state: RootState) => state.pools);

  const { totalLiquidity, totalCommit } = React.useMemo((): {
    totalLiquidity: BigNumber;
    totalCommit: BigNumber;
  } => {
    let totalUsd = BN_ZERO;
    let totalCommit = BN_ZERO;
    pools.forEach((pool: Pool) => {
      const { denom, denomA, amountA, denomB, amountB } = pool;
      const tokenAUsd = getUsd(usdPrices, denomA);
      const tokenBUsd = getUsd(usdPrices, denomB);
      totalUsd = totalUsd.plus(tokenAUsd.times(amountA)).plus(tokenBUsd.times(amountB));

      const commitToken = totalCommitMap?.[denom];
      if (!commitToken) {
        totalCommit = totalCommit.plus(BN_ZERO);
      } else {
        const [tokenAAmt, tokenBAmt] = getBreakdownToken(
          commitToken,
          pool,
          BN_HUNDRED,
          commitToken,
          tokens,
        );
        totalCommit = totalCommit.plus(tokenAUsd.times(tokenAAmt)).plus(tokenBUsd.times(tokenBAmt));
      }
    });
    return {
      totalLiquidity: totalUsd,
      totalCommit,
    };
  }, [pools, usdPrices, tokens, totalCommitMap]);

  const avgApy = React.useMemo((): BigNumber => {
    let weightTotal: BigNumber = BN_ZERO;
    let cumApy: BigNumber = BN_ZERO;

    pools.forEach((p: Pool) => {
      weightTotal = weightTotal.plus(p?.rewardsWeight ?? BN_ZERO);
    });
    pools.forEach((pool: Pool) => {
      const indivApy = calculateAPY(usdPrices, pool, weeklyRewards, weightTotal);
      cumApy = cumApy.plus(indivApy);
    });
    return weightTotal.isZero() ? BN_ZERO : cumApy.dividedBy(pools.length);
  }, [pools, weeklyRewards, usdPrices]);

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
        <TypographyLabel color="textSecondary" className={classes.subtitle} mt={3.5}>
          Maximise liquidity rewards and boost earnings by committing LP tokens
        </TypographyLabel>
        <Divider className={classes.divider} />
        <Box className={classes.poolsStats}>
          <Box className={classes.statsBox}>
            <TypographyLabel color="textSecondary">
              Total Liquidity
            </TypographyLabel>
            <RenderGuard renderIf={loading}>
              <Box>
                <Skeleton width="8rem" height="3rem" />
              </Box>
            </RenderGuard>
            <RenderGuard renderIf={!loading}>
              <Typography variant="h4" color="textPrimary">
                ${toShorterNum(totalLiquidity)}
              </Typography>
            </RenderGuard>
          </Box>
          <Box className={classes.statsBox}>
            <TypographyLabel color="textSecondary">
              Avg APR
            </TypographyLabel>
            <RenderGuard renderIf={loading}>
              <Box>
                <Skeleton width="8rem" height="3rem" />
              </Box>
            </RenderGuard>
            <RenderGuard renderIf={!loading}>
              <Typography variant="h4" color="textPrimary">
                {avgApy.isFinite() ? `${avgApy.decimalPlaces(1, 1).toString(10)}%` : "-"}
              </Typography>
            </RenderGuard>
          </Box>
          <Hidden only="xs">
            <Box className={classes.statsBox}>
              <TypographyLabel color="textSecondary">
                Total Committed Value
              </TypographyLabel>
              <RenderGuard renderIf={loading}>
                <Box>
                  <Skeleton width="8rem" height="3rem" />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!loading}>
                <Typography variant="h4" color="textPrimary">
                  ${toShorterNum(totalCommit)}
                </Typography>
              </RenderGuard>
            </Box>
          </Hidden>
        </Box>
        <Hidden only="sm">
          <Box className={classes.statsDiv}>
            <TypographyLabel color="textSecondary">
              Total Committed Value
            </TypographyLabel>
            <Typography variant="h4" color="textPrimary">
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
        <Lottie
          lottieRef={lottieRef}
          { ...lottieDefaultOptions }
          animationData={LiquidityPools}
          loop={false}
          onComplete={delayAnimation}
        />
      </div>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.text.secondary,
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
  statsBox: {
    marginLeft: theme.spacing(4),
    "&:first-child": {
      marginLeft: 0,
    },
    "& h6": {
      overflow: "hidden",
    },
    "& h4": {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      "& h4": {
        fontSize: "1.75rem",
      },
    },
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      "& h6": {
        height: "2rem",
      },
    },
  },
  statsDiv: {
    marginTop: theme.spacing(4),
    "& h6": {
      overflow: "hidden",
    },
    "& h4": {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      "& h4": {
        fontSize: "1.75rem",
      },
    },
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      "& h6": {
        height: "2rem",
      },
    },
  },
  subtitle: {
    marginTop: theme.spacing(3.5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  title: {},
}));

export default LiquidityPoolSection;
