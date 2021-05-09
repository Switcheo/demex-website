import { default as ScrollingTextBold } from "@demex-info/assets/animations/ScrollingTextBold.json";
import { TypographyLabel, withLightTheme } from "@demex-info/components";
import { lottieDefaultOptions, StaticLinks } from "@demex-info/constants";
import {
  Box, Button, Hidden, Link, makeStyles, Theme, Typography,
  useMediaQuery, useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";

const Lottie = React.lazy(() => import("lottie-react"));

const PoweredBySwitcheo: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const widthSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [sectionRef, sectionView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={sectionRef} className={classes.root}>
      <Box className={classes.textRoot}>
        <Suspense fallback={null}>
          <Lottie
            { ...lottieDefaultOptions }
            animationData={ScrollingTextBold}
            style={{
              height: widthSmDown ? "8.8rem" : "10rem",
            }}
          />
        </Suspense>
      </Box>
      <Box className={classes.tradeHubBox}>
        <Box className={classes.leftDiv}>
          <Typography
            className={clsx(classes.slide, classes.tradehubH3, "title", { open: sectionView })}
            variant="h3"
          >
            Powered by&nbsp;
            <Hidden smDown>
              <br />
            </Hidden>
            Switcheo TradeHub
          </Typography>
        </Box>
        <Box className={classes.rightDiv}>
          <Box
            className={clsx(
              classes.tradeDescription,
              classes.slide,
              "subtitle",
              { open: sectionView },
            )}
          >
            <TypographyLabel className={classes.tradeH6}>
              {/* eslint-disable-next-line no-trailing-spaces */}
              <Link color="secondary" href={StaticLinks.Api.Home} target="_blank">Switcheo TradeHub</Link> is a custom layer 2 sidechain built for trading sophisticated financial instruments at scale. It comprises an <Link color="secondary" href={StaticLinks.Api.MatchingEngine} target="_blank">order matching engine</Link> and liquidity pool protocol that can simulate AMM liquidity on exchange order books.  
            </TypographyLabel>
            <TypographyLabel className={classes.tradeH6} mt={2}>
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
        </Box>
      </Box>
    </div>
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
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  leftDiv: {
    padding: theme.spacing(0, 6, 0, 0),
    maxWidth: "calc(100% / 12 * 5)",
    width: "100%",
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(0, 5, 0, 0),
      maxWidth: "calc(100% / 12 * 4)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      maxWidth: "unset",
    },
  },
  rightDiv: {
    width: "calc(100% / 12 * 7)",
    [theme.breakpoints.only("md")]: {
      width: "calc(100% / 12 * 8)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 0, 6.5),
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
    display: "flex",
    margin: theme.spacing(12.5, "auto"),
    maxWidth: "84rem",
    padding: 0,
    width: `calc(100% - ${theme.spacing(12)}px)`,
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(0, 5),
      width: `calc(100% - ${theme.spacing(10)}px)`,
    },
    [theme.breakpoints.only("sm")]: {
      display: "block",
      margin: theme.spacing(8, "auto", 0),
      maxWidth: "100%",
      width: "unset",
      padding: theme.spacing(0, 5, 9),
    },
    [theme.breakpoints.only("xs")]: {
      display: "block",
      margin: theme.spacing(8, "auto", 0),
      maxWidth: "100%",
      width: "unset",
      padding: theme.spacing(0, 4, 8),
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(0, 2.5, 8),
    },
  },
  tradehubH3: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2.5),
      paddingRight: 0,
    },
    [theme.breakpoints.only("xs")]: {
      marginBottom: theme.spacing(2),
    },
  },
  tradeH6: {
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
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
  textRoot: {
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(8),
    },
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(6),
    },
  },
  slide: {
    opacity: 0,
    transform: "translate(0px, 40px)",
    "&.title": {
      transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
    },
    "&.subtitle": {
      transition: "opacity ease-in 0.5s, transform ease-in 0.6s",
    },
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
  },
}));

export default withLightTheme()(PoweredBySwitcheo);
