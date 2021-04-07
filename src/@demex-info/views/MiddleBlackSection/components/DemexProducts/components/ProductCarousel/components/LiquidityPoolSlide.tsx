import { BN_HUNDRED, BN_ZERO, calculateAPY, getBreakdownToken, toShorterNum } from "@demex-info/utils";
import { Box, Button, Divider, Theme, Typography, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink, getUsd, goToLink, lottieDefaultOptions } from "@demex-info/constants";
import { Pool, PoolsTasks } from "@demex-info/store/pools/types";
import React, { useEffect } from "react";
import { RenderGuard, TypographyLabel } from "@demex-info/components";

import BigNumber from "bignumber.js";
import { LiquidityPools } from "@demex-info/assets";
import Lottie from "lottie-react";
import { RootState } from "@demex-info/store/types";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useTaskSubscriber } from "@demex-info/hooks";

interface Props {
  liquidityRef: () => void;
  liquidityView: boolean;
  stakingView: boolean;
}

const LiquidityPoolSlide: React.FC<Props> = (props: Props) => {
  const { liquidityRef, liquidityView } = props;
  const classes = useStyles();

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

  const avgApy  = React.useMemo((): BigNumber => {
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
    if (liquidityView) {
      lottieRef?.current?.goToAndPlay(0);
    }
  }, [liquidityView]);

  return (
    <div
      ref={liquidityRef}
      id="liquidityPools"
      className={clsx(
        classes.slideItem,
        {
          slideIn: liquidityView,
        },
      )}
    >
      <Box className={classes.leftGrid}>
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
                <Skeleton width="9rem" height="3rem" />
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
                <Skeleton width="9rem" height="3rem" />
              </Box>
            </RenderGuard>
            <RenderGuard renderIf={!loading}>
              <Typography variant="h4" color="textPrimary">
                {avgApy.decimalPlaces(1, 1).toString(10)}%
              </Typography>
            </RenderGuard>
          </Box>
          <Box className={classes.statsBox}>
            <TypographyLabel color="textSecondary">
              Total Committed Value
            </TypographyLabel>
            <RenderGuard renderIf={loading}>
              <Box>
                <Skeleton width="9rem" height="3rem" />
              </Box>
            </RenderGuard>
            <RenderGuard renderIf={!loading}>
              <Typography variant="h4" color="textPrimary">
                ${toShorterNum(totalCommit)}
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
      <Box maxWidth="32rem" px={2.5}>
        <Lottie
          lottieRef={lottieRef}
          { ...lottieDefaultOptions }
          animationData={LiquidityPools}
          loop={false}
          onComplete={delayAnimation}
        />
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
  leftGrid: {
    maxWidth: "50%",
    padding: theme.spacing(0, 2.5),
    width: "100%",
  },
  liquidityImg: {
    display: "block",
    maxWidth: "32rem",
    width: "100%",
  },
  poolsStats: {
    alignItems: "center",
    display: "flex",
    marginTop: theme.spacing(6),
  },
  slideItem: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingTop: "14vh",
    paddingBottom: "16vh",
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
  statsBox: {
    marginLeft: theme.spacing(5),
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

export default LiquidityPoolSlide;
