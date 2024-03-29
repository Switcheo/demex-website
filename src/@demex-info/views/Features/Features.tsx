import { ExternalLink } from "@demex-info/assets";
import { Cards, SvgIcon } from "@demex-info/components";
import { getDemexLink, Paths, StaticLinks } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { StyleUtils } from "@demex-info/utils";
import { Box, Button, Divider, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { Crosschain, Derivatives, LiquidityPools, Orderbooks, Nitron } from "./assets";
import OrangeVectorTop from "@demex-info/assets/background/OrangeVectorTop.svg";


const Features: React.FC = () => {
  const classes = useStyles();

  const net = useSelector((state: RootState) => state.app.network);

  return (
    <Box className={classes.root}>
      <Typography variant="h1" className={classes.header}>
        Our Features
      </Typography>
      <Box className={classes.features}>
        <Cards className={clsx(classes.cards, "card")}>
          <Box>
            <Typography variant="h2" className={classes.cardHeader}>
              Decentralized Central Limit Orderbooks
            </Typography>
            <Typography variant="h3" className={classes.description}>
              Enjoy limit orders with the lowest slippage through liquidity backstopped by our AMMs.
            </Typography>
            <Divider className={classes.gradientDivider} />
            <SvgIcon className={clsx(classes.assets)} component={Orderbooks}/>
          </Box>
          <Button
              className={classes.button}
              variant="contained"
              target="_blank"
              href={getDemexLink(Paths.Trade, net)}
            >
              Start Trading
            </Button>
        </Cards>
        <Cards className={clsx(classes.cards, "card")}>
          <Box>
            <Typography variant="h2" className={classes.cardHeader}>
              Nitron, the Money Market for Cosmos
            </Typography>
            <Typography variant="h3" className={classes.description}>
              Earn passive yield on your assets through lending, or borrow tokens via secured loans.
            </Typography>
            <Divider className={classes.gradientDivider} />
            <SvgIcon className={clsx(classes.assets)} component={Nitron}/>
          </Box>
          <Button
              className={classes.button}
              variant="contained"
              target="_blank"
              href={getDemexLink(Paths.Nitron.Main, net)}
            >
              Explore Nitron
            </Button>
        </Cards>
        <Cards className={clsx(classes.cards, "card")}>
          <Box>
            <Typography variant="h2" className={classes.cardHeader}>
              Cross-chain Interoperability<br />
            </Typography> 
            <Typography variant="h3" className={classes.description}>
              Easily access any desired asset or market via Cosmos IBC and PolyNetwork.
            </Typography>
            <Divider className={classes.gradientDivider} />
            <SvgIcon className={clsx(classes.assets)} component={Crosschain}/>
          </Box>
          <Box className={classes.actionBtn}>
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
            <SvgIcon className={classes.gradientIcon} component={ExternalLink} />
          </Button>
          </Box>
        </Cards>
        <Cards className={clsx(classes.cards, "card")}>
          <Box>
            <Typography variant="h2" className={classes.cardHeader}>
              Liquidity Pools
            </Typography>
            <Typography variant="h3" className={classes.description}>
              Maximise yields by earning from swap fees, maker rebates and liquidity rewards.
            </Typography>
            <Divider className={classes.gradientDivider} />
            <SvgIcon className={clsx(classes.assets)} component={LiquidityPools}/>
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
          </Box>
        </Cards>
        <Cards className={clsx(classes.cards, "card")}>
          <Box>
            <Typography variant="h2" className={classes.cardHeader}>
              Derivatives
            </Typography>
            <Typography variant="h3" className={classes.description}>
              Trade spot, futures and perpetuals on any financial market imaginable.
            </Typography>
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
            <SvgIcon className={classes.gradientIcon} component={ExternalLink} />
          </Button>
        </Cards>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    padding: "0 2rem",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      background: `url(${OrangeVectorTop}) no-repeat top right`,
      padding: "13rem 0 0",
      marginTop: "-10rem",
    },
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    padding: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 0.75rem",
      marginBottom: "1rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: "1.5rem 0.75rem",
      marginBottom: "1rem",
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
    marginBottom: "1.5rem",
    [theme.breakpoints.only("md")]: {
      ...theme.typography.h3,
      marginBottom: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h4,
      marginBottom: "1rem",
    },
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "2rem",
    //Arranging of cards
    "& .card:nth-child(-1n + 3)": {
      gridColumn: "span 4",
    },
    "& .card:nth-last-child(2)": {
      gridRowStart: "2",
      gridColumn: "3 / span 4",
    },
    "& .card:nth-last-child(1)": {
      gridRowStart: "2",
      gridColumn: "7 / span 4",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0",
      width: "92.5%",
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
    marginTop: "1.5rem",
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
    width: "100%",
    margin: "-2rem auto",
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
    whiteSpace: "nowrap",
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
    maxWidth: "8.75rem",

    [theme.breakpoints.down("md")]: {
      ...theme.typography.title2,
      minWidth: "max-content",
      minHeight: "2.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title3,
    },
	},
  gradientIcon: {
    "& path": {
      fill: "url(#demexLinearGradient)",
    },
  },
}));

export default Features;
