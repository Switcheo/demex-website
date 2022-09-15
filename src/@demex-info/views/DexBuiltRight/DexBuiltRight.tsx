import { SvgIcon, TypographyLabel } from "@demex-info/components";
import { Box, makeStyles } from "@material-ui/core";
// import clsx from "clsx"
import React from "react";
import { BackgroundAnimation } from "../HeroSection/components";
import { Decentralised, Gateway, Graphic, Liquidity, Performance, Trade } from "./assets";
import { USPListItem } from "./components";

const DexBuiltRight: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.graphics}>
        <SvgIcon className={classes.svgIcon} component={Graphic} />
        <BackgroundAnimation />
      </Box>
      <TypographyLabel className={classes.mainHeader}>
        A DEX Built Right
      </TypographyLabel>
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
        <USPListItem icon={Performance} header="Nitro Fast Trades">
          <Box className={classes.description}>
            <b>Think speed.</b>&nbsp;We&apos;re 400x faster than Ethereum.&nbsp;
            <b>Powerful and robust.</b> Transactions in the blink of an eye.&nbsp;
            <b>10,000 TPS bursts, 2s block times.</b>
          </Box>
        </USPListItem>
        <USPListItem icon={Liquidity} header="Liquidity/Interchain Gateway">
          <Box className={classes.description}>
            <b>Access cross-chain markets and liquidity pools</b>&nbsp;
            and a variety of blockchains like Ethereum, BSC, Ziliqa, Neo3, Cosmos, Osmosis, Juno, Terra. Unlock liquidity rewards.&nbsp;
            <b>In-built bridge, with access to native tokens.</b>
          </Box>
        </USPListItem>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    paddingLeft: "3.5rem",
    paddingBottom: "10rem",
  },
  mainHeader: {
    ...theme.typography.h1,
  },
  description: {
    color: theme.palette.text.secondary,
    "& > b": {
			color: theme.palette.text.primary,
		},
  },
  uspList: {
    "&: nth-child(5)": {
      marginLeft: "-32px",
    },
  },
  graphics: {
    position: "relative",
    top: 50,
    left: "50%",
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
}));

export default DexBuiltRight;
