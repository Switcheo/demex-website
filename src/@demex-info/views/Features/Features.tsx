import { Cards, SvgIcon, TypographyLabel } from "@demex-info/components";
import { getDemexLink, Paths, StaticLinks } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { StyleUtils } from "@demex-info/utils";
import { Box, Button, Divider, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { Crosschain, Derivatives, LiquidityPools, Orderbooks } from "./assets";

const Features: React.FC = () => {
  const classes = useStyles();

  const net = useSelector((state: RootState) => state.app.network);

  return (
    <Box className={classes.root}>
      <TypographyLabel className={classes.header}>Our Features</TypographyLabel>
      <Box className={classes.featuresRow}>
        <Cards className={classes.cards}>
          <Box>
            <TypographyLabel className={classes.cardHeader}>Liquidity Pools</TypographyLabel>
            <TypographyLabel className={classes.description}>Maximize yields by contributing liquidity to earn from taker fees, maker rebates and liquidity rewards.</TypographyLabel>
            <Divider className={classes.gradientDivider} />
            <SvgIcon className={clsx(classes.assets, "noLeftMargin")} component={LiquidityPools}/>
          </Box>
          <Box className={classes.actionBtn}>
            <Button
              className={classes.button}
              variant="contained"
              target="_blank"
              href={getDemexLink(Paths.Pools.List, net)}
            >
              Start Earning
            </Button>
            <Button
              className={clsx(classes.button, "learnMore")}
              variant="outlined"
              target="_blank"
              href={StaticLinks.DemexDocs.LiquidityPools.LearnMore}
              classes={{
                label: classes.learnMoreLabel,
              }}
            >
              Learn More
            </Button>
          </Box>
        </Cards>
        <Cards className={classes.cards}>
          <Box>
            <TypographyLabel className={classes.cardHeader}>Derivatives</TypographyLabel>
            <TypographyLabel className={classes.description}>Trade any financial market imaginable with Demex — built on Carbon, optimized for derivatives.</TypographyLabel>
            <Divider className={classes.gradientDivider} />
            <SvgIcon className={classes.assets} component={Derivatives}/>
          </Box>
          <Button
            className={clsx(classes.button, "learnMore")}
            variant="outlined"
            target="_blank"
            href={StaticLinks.DemexDocs.Trade.Futures}
            classes={{
              label: classes.learnMoreLabel,
            }}
          >
            Learn More
          </Button>
        </Cards>
      </Box>
      <Box className={classes.featuresRow}>
        <Cards className={classes.cards}>
          <Box>
            <TypographyLabel className={clsx(classes.cardHeader, "orderBooks")}>Decentralized Central Limit Orderbooks</TypographyLabel>
            <TypographyLabel className={classes.description}>Enjoy low slippage and flexible trades with guaranteed liquidity from innovative AMM-backed orderbooks.</TypographyLabel>
            <Divider className={classes.gradientDivider} />
            <SvgIcon className={clsx(classes.assets, "orderBook")} component={Orderbooks}/>
          </Box>
          <Button
            className={clsx(classes.button, "learnMore")}
            variant="outlined"
            target="_blank"
            href={StaticLinks.DemexDocs.Features.Orderbook}
            classes={{
              label: classes.learnMoreLabel,
            }}
          >
            Learn More
          </Button>
        </Cards>
        <Cards className={classes.cards}>
          <Box>
            <Box className={clsx(classes.cardHeader, "crosschain")}>Cross-chain Interoperability<br /></Box> 
            <TypographyLabel className={classes.description}>Easily access any desired market with cross-chain interoperability enabled via PolyNetwork and Cosmos IBC. </TypographyLabel>
            <Divider className={classes.gradientDivider} />
            <SvgIcon className={clsx(classes.assets, "noLeftMargin")} component={Crosschain}/>
          </Box>
          <Button
            className={clsx(classes.button, "learnMore")}
            variant="outlined"
            target="_blank"
            href={StaticLinks.DemexDocs.Features.Crosschain}
            classes={{
              label: classes.learnMoreLabel,
            }}
          >
            Learn More
          </Button>
        </Cards>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10rem 2.5rem 0",
    margin: "0 auto",
    zIndex: 1,
    [theme.breakpoints.only("sm")]: {
      margin: 0,
      padding: "2.5rem 1.75rem 0rem",
    },
    [theme.breakpoints.only("xs")]: {
      margin: 0,
      padding: "2.5rem 0.75rem 0rem",
    },
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "648px",
    height: "100%",
    minWidth: "264px",
    minHeight: "516px",
    padding: "2.5rem",
    "@media (min-width: 1279px) and (max-width: 1429px)": {
      width: "50%",
      minWidth: "unset",
      minHeight: "560px",
    },
    [theme.breakpoints.only("md")]: {
      width: "50%",
      minWidth: "unset",
      minHeight: "470px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: "unset",
      minHeight: "unset",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "1rem 0.75rem",
    },
  },
  header: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2.5rem",
    },
    [theme.breakpoints.down("sm")]: {
			...theme.typography.h2,
    },
    [theme.breakpoints.only("xs")]: {
			fontSize: "28px",
      lineHeight: "38px",
    },
  },
  cardHeader: {
    ...theme.typography.h2,
    color: theme.palette.text.primary,
    marginBottom: "2.5rem",
    "&.orderBooks": {
      "@media (min-width: 1279px) and (max-width: 1429px)": {
        height: "4.75rem",
      },
      [theme.breakpoints.only("md")]: {
        minHeight: "3.5rem",
      },
    },
    "&.crosschain": {
      height: "4.75rem",
      [theme.breakpoints.only("md")]: {
        height: "3.5rem",
      },
      [theme.breakpoints.down("sm")]: {
        height: "unset",
      },
    },
    [theme.breakpoints.only("md")]: {
      ...theme.typography.h3,
      marginBottom: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h4,
      marginBottom: "1rem",
    },
  },
  featuresRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1392px",
    width: "100%",
    "& > div:first-child": {
      marginRight: "3rem",
    },
    "&:last-child": {
      marginTop: "3rem",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
      width: "100%",
      flexDirection: "column",
      "& > div:first-child": {
        marginRight: 0,
        marginBottom: "1.5rem",
      },
      "&:last-child": {
        marginTop: "1.5rem",
        marginBottom: 0,
      },
    },
  },
  description: {
    ...theme.typography.body1,
    maxWidth: "34.5rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("md")]: {
      ...theme.typography.body2,
      maxWidth: "unset",
      minHeight: "3.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
      minHeight: "unset",
    },
  },
  gradientDivider: {
    background: StyleUtils.primaryGradient(theme),
    marginTop: "2.5rem",
    width: "8rem", 
    radius: 4,
    [theme.breakpoints.only("md")]: {
      marginTop: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },
  assets: {
    [theme.breakpoints.up("lg")]: {
      "&.orderBook": {
        margin: "2.5rem 0",
      },
      "&.noLeftMargin": {
        marginLeft: "-3rem",
      },
    },
    "@media (min-width: 1279px) and (max-width: 1429px)": {
      width: "100%",
      height: "100%",
      minHeight: "2.25rem",
      "&.orderBook": {
        marginTop: "2rem",
      },
    },
    [theme.breakpoints.only("md")]: {
      width: "100%",
      height: "100%",
      minHeight: "2.25rem",
      "&.orderBook": {
        marginTop: "2rem",
      },
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "80vw",
      height: "100%",
      margin: "0 auto",
      "&.orderBook": {
        margin: "1rem auto",
      },
    },
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
    position: "relative",
    bottom: 0,
    "& a:first-child": {
      marginRight: "2rem",
      [theme.breakpoints.down("md")]: {
        marginRight: "1.5rem",
      },
    },
    "@media (max-width: 319px)": {
      flexDirection: "column",
      alignItems: "start",
      "& a:first-child": {
        marginRight: "0",
      },
    },
  },
  learnMoreLabel: {
    ...theme.typography.title1,
    background: StyleUtils.primaryGradientHover(theme),
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    textDecoration: "none",
    [theme.breakpoints.only("md")]: {
      ...theme.typography.title2,
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title3,
    },
  },
  button: {
		minWidth: "12rem",
		minHeight: "4rem",
    "&.learnMore": {
      maxWidth: "7.75rem",
    },
    [theme.breakpoints.down("md")]: {
      ...theme.typography.title2,
      minWidth: "7.75rem",
      minHeight: "2.5rem",
      marginTop: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title3,
    },
	},
}));

export default Features;
