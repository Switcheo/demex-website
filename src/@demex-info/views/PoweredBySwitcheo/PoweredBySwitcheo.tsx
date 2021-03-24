import { Box, Button, Grid, Hidden, Link, Theme, Typography, makeStyles } from "@material-ui/core";
import { TypographyLabel, withLightTheme } from "@demex-info/components";

import { HomeBorder1 as HomeBorder } from "@demex-info/assets/icons";
import React from "react";
import { StaticLinks } from "@demex-info/constants";
import { fade } from "@material-ui/core/styles/colorManipulator";

const PoweredBySwitcheo: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.textRoot}>
        <Hidden smUp>
          <HomeBorder className={classes.homeBorder} />
        </Hidden>
        <Box className={classes.textAnimation}>
          Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.
        </Box>
      </Box>
      <Box className={classes.tradeHubBox}>
        <Grid container>
          <Grid item xs={12} md={5} lg={4}>
            <Typography variant="h3">
              Powered by Switcheo TradeHub
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Box className={classes.tradeDescription}>
              <TypographyLabel color="textSecondary">
                {/* eslint-disable-next-line no-trailing-spaces */}
                <Link color="secondary" href={StaticLinks.Api.Home} target="_blank">Switcheo TradeHub</Link> is a custom layer 2 sidechain built for trading sophisticated financial instruments at scale. It comprises an <Link color="secondary" href={StaticLinks.Api.MatchingEngine} target="_blank">order matching engine</Link> and liquidity pool protocol that can simulate AMM liquidity on exchange order books.  
              </TypographyLabel>
              <TypographyLabel color="textSecondary">
                The protocol uses <Link color="secondary" href={StaticLinks.Tendermint} target="_blank">Tendermint Core</Link> as the underlying consensus mechanism, and is run by validator nodes under the dPOS model to ensure stringent network security.
              </TypographyLabel>
              <Button
                className={classes.ecosystemBtn}
                color="secondary"
                component={Link}
                href={StaticLinks.SwitcheoNetwork}
                target="_blank"
              >
                See Our Ecosystem
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  ecosystemBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(6),
    padding: theme.spacing(1.75, 3.5),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(4.5),
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 0, 8),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  tradeDescription: {
    "& a": {
      cursor: "pointer",
    },
  },
  tradeHubBox: {
    margin: theme.spacing(8, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(0, 6),
    width: `calc(100% - ${theme.spacing(12)}px)`,
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(0, 5),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(0, 5, 7.5),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 2.5, 7.5),
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: theme.spacing(5, "auto", 0),
      maxWidth: "100%",
      width: "unset",
    },
    "& h3": {
      paddingRight: theme.spacing(5),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(2.5),
        paddingRight: 0,
      },
    },
    "& p": {
      ...theme.typography.subtitle1,
      lineHeight: "1.625rem",
      "&:first-child": {
        marginBottom: theme.spacing(2),
      },
    },
  },
  homeBorder: {
    marginBottom: theme.spacing(2.75),
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      maxHeight: "3.5rem",
      display: "block",
    },
  },
  textAnimation: {
    ...theme.typography.h1,
    fontSize: "4rem",
    animation: "$scrollLeft 300s infinite linear",
    display: "inline-block",
    whiteSpace: "nowrap",
    "-webkit-text-stroke": `1px ${fade(theme.palette.text.primary, 0.2)}`,
    "-webkit-text-fill-color": "transparent",
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.h3,
      fontSize: "3rem",
    },
  },
  textRoot: {
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(8),
    },
  },
  "@keyframes scrollLeft": {
    to: {
      transform: "translateX(-100%)",
    },
  },
}));

export default withLightTheme()(PoweredBySwitcheo);
