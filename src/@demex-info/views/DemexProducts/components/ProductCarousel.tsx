import { Box, Button, Divider, Theme, Typography, makeStyles } from "@material-ui/core";
import { InsuranceFund, LiquidityPool, Staking } from "@demex-info/assets/graphic";
import { Paths, getDemexLink } from "@demex-info/constants";

import React from "react";
import { RootState } from "@demex-info/store/types";
import { SlideCategory } from "../DemexProducts";
import { TypographyLabel } from "@demex-info/components";
import clsx from "clsx";
import { useSelector } from "react-redux";

interface Props {
  slideItem: SlideCategory;
}

const ProductCarousel: React.FC<Props> = (props: Props) => {
  const { slideItem } = props;
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  return (
    <Box position="relative" mt={7}>
      <Box
        className={clsx(
          classes.slideItem,
          "liquidPools",
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
                Total Value Locked
              </TypographyLabel>
              <Typography variant="h4" color="textPrimary">
                $23.4m
              </Typography>
            </Box>
            <Box className={classes.statsBox}>
              <TypographyLabel color="textSecondary">
                Avg APR
              </TypographyLabel>
              <Typography variant="h4" color="textPrimary">
                94.5%
              </Typography>
            </Box>
            <Box className={classes.statsBox}>
              <TypographyLabel color="textSecondary">
                Total Committed Value
              </TypographyLabel>
              <Typography variant="h4" color="textPrimary">
                8.72m
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

      <Box
        className={clsx(
          classes.slideItem,
          "staking",
          {
            leftOut: slideItem !== "staking" && slideItem === "insuranceFund",
            rightOut: slideItem !== "staking" && slideItem === "liquidityPools",
          },
        )}
      >
        <Box className={classes.leftGrid}>
          <img className={classes.stakingImg} src={Staking} />
        </Box>

        <Box className={classes.rightGrid}>
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
              <Typography variant="h4" color="textPrimary">
                949m SWTH
              </Typography>
            </Box>
            <Box className={classes.statsBox}>
              <TypographyLabel color="textSecondary">
                Staking APR
              </TypographyLabel>
              <Typography variant="h4" color="textPrimary">
                70.72%
              </Typography>
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

      <Box
        className={clsx(
          classes.slideItem,
          "insuranceFund",
          { out: slideItem !== "insuranceFund" },
        )}
      >
        <Box className={classes.leftGrid}>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.title}
          >
            Insurance Fund
          </Typography>
          <TypographyLabel color="textSecondary" className={classes.subtitle} mt={3.5}>
            Gain premiums from insurance fund payouts as a SWTH staker or by contributing SWTH to the fund at launch.
          </TypographyLabel>
          <Divider className={classes.divider} />
          <Button
            className={classes.earningBtn}
            variant="contained"
            color="secondary"
            onClick={() => goToLink(getDemexLink(Paths.Stake.List, network))}
            disabled
          >
            Coming Soon
          </Button>
        </Box>
        <Box className={classes.rightGrid}>
          <InsuranceFund className={classes.insuranceImg} />
        </Box>
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
  insuranceImg: {
    display: "block",
    width: "100%",
    margin: theme.spacing(0, "auto"),
    maxWidth: "22rem",
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
    "&.liquidPools": {
      transform: "translateX(0%)",
      "&.out": {
        transform: "translateX(-150%)",
      },
    },
    "&.staking": {
      transform: "translateX(0%)",
      "&.leftOut": {
        transform: "translateX(-150%)",
      },
      "&.rightOut": {
        transform: "translateX(150%)",
      },
    },
    "&.insuranceFund": {
      transform: "translateX(0%)",
      "&.out": {
        transform: "translateX(150%)",
      },
    },
  },
  stakingImg: {
    display: "block",
    margin: theme.spacing(2.5, "auto", 0),
    maxWidth: "25rem",
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
  subtitle: {},
  title: {},
}));

export default ProductCarousel;
