import { BackgroundAnimation, SvgIcon, TypographyLabel } from "@demex-info/components";
import { Box, Hidden, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Decentralised, Gateway, Graphic, Liquidity, Performance, Trade } from "./assets";
import SwirlBottom from "./assets/SwirlBottom.svg";
import SwirlTop from "./assets/SwirlTop.svg";
import { USPListItem } from "./components";

const DexProperties: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Hidden mdDown>
        <Box className={classes.graphics}>
          <SvgIcon className={classes.svgIcon} component={Graphic} />
          <BackgroundAnimation positionClass={classes.position} containerClass={classes.container} paddingClass={classes.padding} />
        </Box>
      </Hidden>
      <Box className={classes.mainHeader}>
        <TypographyLabel boxClass={classes.typoContainer} className={classes.typography}>A DEX Built Right</TypographyLabel>
      </Box>
      <Box className={classes.uspList}>
        <USPListItem icon={Decentralised} header="Truly Decentralized">
          <Box className={classes.description}>
            <b>You call the shots.</b>&nbsp;
            Tap into a world of permissionless token listings & market creations. Powered by SWTH — Make Demex your own, the power is in your hands. 
          </Box>
        </USPListItem>
        <USPListItem icon={Trade} header="Unrivalled Trading Journey">
          <Box className={classes.description}>
            <b>Designed to trade anything and everything.</b>&nbsp;
            From futures to perpetuals, we&apos;ve got you covered. <b>Gain a market advantage.</b> Interchain leverage up to 150x, coming soon.
          </Box>
        </USPListItem>
        <USPListItem icon={Gateway} header="Secure">
          <Box className={classes.description}>
            <b>Secured.</b>&nbsp;
            Built on Tendermint core, with over 20 validators. Robust insurance fund that mitigates socialized losses, coming soon.
          </Box>
        </USPListItem>
        <USPListItem iconClass={classes.nitroSvg} icon={Performance} header="Nitro Fast Trades">
          <Box className={classes.description}>
            <b>Think speed.</b>&nbsp;We&apos;re 400x faster than Ethereum.&nbsp;
            <b>Powerful and robust.</b> Transactions in the blink of an eye.&nbsp;
            <b>10,000 TPS bursts, 2s block times.</b>
          </Box>
        </USPListItem>
        <Box className={classes.swirlBottom}>
          <USPListItem icon={Liquidity} header="Liquidity/Interchain Gateway">
            <Box className={clsx(classes.description, "lastDescription")}>
              <b>Access cross-chain markets and liquidity pools</b>&nbsp;
              and a variety of blockchains like Ethereum, BSC, Ziliqa, Neo3, Cosmos, Osmosis, Juno, Terra. Unlock liquidity rewards.&nbsp;
              <b>In-built bridge, with access to native tokens.</b>
            </Box>
          </USPListItem>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    paddingLeft: "3.5rem",
    paddingBottom: "10rem",
    paddingTop: "10rem",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  mainHeader: {
    [theme.breakpoints.down("md")]: {
      height: "310px",
      background: `url(${SwirlTop}) no-repeat top right`,
    },
  },
  typoContainer: {
    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  typography: {
    ...theme.typography.h1,
    [theme.breakpoints.down("md")]: {
      ...theme.typography.h2,
      whiteSpace: "nowrap",
      textAlign: "center",
    },
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
      lineHeight: "38px",
      whiteSpace: "break-spaces",
		},
  },
  description: {
    color: theme.palette.text.secondary,
    "& > b": {
			color: theme.palette.text.primary,
		},
    [theme.breakpoints.down("md")]: {
      padding: "0rem 1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
      padding: "0rem 1rem",
    },
    "&.lastDescription" :{
      [theme.breakpoints.down("md")]: {
        maxWidth: "30%",
      },
    },
  },
  uspList: {
    marginTop: "3rem",
    "&: nth-child(5)": {
      marginLeft: "-32px",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: "-7.5rem",
      "&: nth-child(5)": {
        marginLeft: 0,
      },
    },
  },
  graphics: {
    position: "relative",
    top: 50,
    left: "40%",
  },
  svgIcon: {
    position: "absolute",
    top: 0,
    left: "27.5%",
    zIndex: 1,
    "@media (min-width: 1280px) and (max-width: 1500px)": {
      width: "80%",
      left: "15rem",
		},
  },
  // background animation:
	position: {
		position: "absolute",
		top: "-250px",
		left: 0,
		width: "100%",
	},
	container: {
		position: "relative",
		margin: "0 auto",
		maxWidth: "1480px",
	},
	padding: {
		paddingTop: 0,
	},
  swirlTop: {
    width: "10rem",
    float: "right",
    marginRight: "-2rem",
  },
  swirlBottom: {
    [theme.breakpoints.down("md")]: {
      height: "310px",
      background: `url(${SwirlBottom}) no-repeat bottom left`,
    },
  },
  nitroSvg: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "-3rem",
    },
  },
}));

export default DexProperties;
