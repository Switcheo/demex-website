import { BN_HUNDRED, BN_ZERO, calculateAPY, getBreakdownToken, toShorterNum } from "@demex-info/utils";
import { Box, Button, Divider, Theme, Typography, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink, getUsd, goToLink } from "@demex-info/constants";

import BigNumber from "bignumber.js";
import { LiquidityPool } from "@demex-info/assets/graphic";
import { Pool } from "@demex-info/store/pools/types";
import React from "react";
import { RootState } from "@demex-info/store/types";
import { SlideCategory } from "../../slideConfig";
import { TypographyLabel } from "@demex-info/components";
import clsx from "clsx";
import { useSelector } from "react-redux";

interface Props {
  slideItem: SlideCategory;
}

const LiquidityPoolSlide: React.FC<Props> = (props: Props) => {
  const { slideItem } = props;
  const classes = useStyles();

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

  return (
    <Box
      className={clsx(
        classes.slideItem,
        { out: slideItem !== "liquidityPools" },
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
            <Typography variant="h4" color="textPrimary">
              ${toShorterNum(totalLiquidity)}
            </Typography>
          </Box>
          <Box className={classes.statsBox}>
            <TypographyLabel color="textSecondary">
              Avg APR
            </TypographyLabel>
            <Typography variant="h4" color="textPrimary">
              {avgApy.decimalPlaces(1, 1).toString(10)}%
            </Typography>
          </Box>
          <Box className={classes.statsBox}>
            <TypographyLabel color="textSecondary">
              Total Committed Value
            </TypographyLabel>
            <Typography variant="h4" color="textPrimary">
              ${toShorterNum(totalCommit)}
            </Typography>
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
      <Box className={classes.rightGrid}>
        <img className={classes.liquidityImg} src={LiquidityPool} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.text.secondary,
    height: theme.spacing(0.25),
    marginTop: theme.spacing(5),
    width: "4rem",
  },
  earningBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(6),
    padding: theme.spacing(1.75, 3.5),
  },
  leftGrid: {
    maxWidth: "50%",
    padding: theme.spacing(0, 2.5),
    width: "100%",
  },
  liquidityImg: {
    display: "block",
    margin: theme.spacing(1, "auto", 0),
    maxWidth: "28rem",
    width: "100%",
  },
  poolsStats: {
    alignItems: "center",
    display: "flex",
    marginTop: theme.spacing(5),
  },
  rightGrid: {
    maxWidth: "50%",
    padding: theme.spacing(0, 2.5),
    width: "100%",
  },
  slideItem: {
    display: "inline-flex",
    height: "100%",
    position: "absolute",
    top: 0,
    transition: "transform ease 0.6s",
    width: "100%",
    transform: "translateX(0%)",
    "&.out": {
      transform: "translateX(-150%)",
    },
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
  subtitle: {},
  title: {},
}));

export default LiquidityPoolSlide;
