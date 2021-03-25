import { Box, Button, Divider, Hidden, Theme, Typography, makeStyles } from "@material-ui/core";
import { InsuranceFund, LiquidityPool, Staking } from "@demex-info/assets/graphic";
import { Paths, getDemexLink } from "@demex-info/constants";

import React from "react";
import { RootState } from "@demex-info/store/types";
import { TypographyLabel } from "@demex-info/components";
import { useSelector } from "react-redux";

interface Props {

}

const ProductScroll: React.FC<Props> = () => {
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  return (
    <Box className={classes.rootItem}>
      <Box id="liquidityPools"></Box>
      <Box className={classes.productItem}>
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
          <Hidden only="xs">
            <Box className={classes.statsBox}>
              <TypographyLabel color="textSecondary">
                Total Committed Value
              </TypographyLabel>
              <Typography variant="h4" color="textPrimary">
                8.72m
              </Typography>
            </Box>
          </Hidden>
        </Box>
        <Hidden only="sm">
          <Box className={classes.statsDiv}>
            <TypographyLabel color="textSecondary">
              Total Committed Value
            </TypographyLabel>
            <Typography variant="h4" color="textPrimary">
              8.72m
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
      </Box>
      <Box className={classes.productItem}>
        <img className={classes.liquidityImg} src={LiquidityPool} />
      </Box>
      <Box id="staking">
        &nbsp;
      </Box>
      <Box className={classes.productItem}>
        <Typography
          variant="h3"
          color="textPrimary"
          className={classes.title}
        >
          Staking
        </Typography>
        <TypographyLabel color="textSecondary" className={classes.subtitle}>
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
      <Box className={classes.productItem}>
        <img className={classes.stakingImg} src={Staking} />
      </Box>
      <Box id="insuranceFund">&nbsp;</Box>
      <Box className={classes.productItem}>
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
      <Box className={classes.productItem}>
        <InsuranceFund className={classes.insuranceImg} />
      </Box>
    </Box>
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
  insuranceImg: {
    display: "block",
    height: "100%",
    width: "100%",
    margin: theme.spacing(0, "auto"),
    maxHeight: "17rem",
    maxWidth: "26rem",
  },
  liquidityImg: {
    display: "block",
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
    maxWidth: "38rem",
    overflow: "hidden",
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(5, "auto", 0),
      maxWidth: "32rem",
    },
  },
  rootItem: {
    position: "relative",
  },
  stakingImg: {
    display: "block",
    maxWidth: "32rem",
    width: "100%",
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
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      "& h6": {
        height: "3rem",
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
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      "& h6": {
        height: "3rem",
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

export default ProductScroll;
