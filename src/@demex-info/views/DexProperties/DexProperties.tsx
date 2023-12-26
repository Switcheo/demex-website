import BlueVectorBottom from "@demex-info/assets/background/BlueVectorBottom.svg";
import { Box, Typography, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import TextLoop from "react-text-loop";
import {  Performance, Trade, Decentralized, Liquidity } from "./assets";
import { USPListItem } from "./components";

const DexProperties: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const items = ["Coinbase", "Bitfinex", "Binance", "KuCoin", "Gemini", "Huobi", "OKX"];

  return (
    <Box className={clsx(classes.root, classes.swirlBottom)}>
      <Box>
        <Box className={classes.mainHeader}>
          <Box className={classes.typoContainer}>
            <Typography variant="h1" className={classes.typography}>
              This is&nbsp;
              <TextLoop
                mask={true}
                interval={[1000, 1000, 1000, 1000, 1000, 1000, 1000]}
              >
                {items.map((item: string) => (
                  <span key={`${item}`}>{item}</span>
                ))}
              </TextLoop>
              ,&nbsp;
              {isMobile && <br />}
              If It Was Built Right
            </Typography>
          </Box>
        </Box>
        <Box className={classes.uspList}>
          <USPListItem icon={Decentralized} header="True Decentralization">
            <Box className={classes.description}>
              No registration or custody transfer required. <br/> Create any market and trade any asset, right from your wallet.
            </Box>
          </USPListItem>
          <USPListItem icon={Trade} header="Unrivalled Trading Instruments">
            <Box className={classes.description}>
              Perform any financial transaction you&apos;ll ever need.<br/> From money markets to perpetuals, we&apos;ve got you covered. 
            </Box>
          </USPListItem>
          <USPListItem icon={Performance} header="Nitro Fast Trades">
            <Box className={classes.description}>
              With a 1.9s blocktime, we&apos;re 400x faster than Ethereum. 
                {!isMobile && <br/>}
              &nbsp;Your trades execute instantly, just like on your favourite CEX. 
            </Box>
          </USPListItem>
          <USPListItem icon={Liquidity} header="Deep Liquidity" >
            <Box className={clsx(classes.description)}>
              Our unique combination of features promotes a liquidity 
                {!isMobile && <br/>} 
              &nbsp;flywheel and give traders the best of all worlds.
            </Box>
          </USPListItem>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    overflowY: "visible",
    paddingBottom: "10rem",
    paddingTop: "6rem",
		zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      marginBottom: "-10rem",
      
    },
  },
  mainHeader: { 
    [theme.breakpoints.down("md")]: {
      marginTop: "3rem",
      height: "100px",
    },
  },
  typoContainer: {
      height: "100%",
      width: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      textAlign: "center",
  },
  typography: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h2,
      whiteSpace: "wrap",
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
      maxWidth: "400px",
    },
  },
  uspList: {
    marginTop: "3rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      "&: nth-child(5)": {
        marginLeft: 0,
      },
    },
  },
  graphicsWrapper: {
    "@media (min-width: 2660px)": {
      width: "1800px",
    },
  },
  svgIcon: {
    position: "relative",
    zIndex: 1,
    top: "215px",
    left: "260px",
    "@media (min-width: 1280px) and (max-width: 1500px)": {
      left: "50px",
    },
  },
  // background animation:
  position: {
    width: "100%",
  },
  container: {
    maxWidth: "1480px",
    "& > div > svg": {
      width: "unset !important",
      top: "-250px !important",
    },
  },
  swirlTop: {
    width: "10rem",
    float: "right",
    marginRight: "-2rem",
  },
  swirlBottom: {
    [theme.breakpoints.down("md")]: {
      background: `url(${BlueVectorBottom}) no-repeat bottom left`,
      paddingBottom: "10rem",
    },
    [theme.breakpoints.only("md")]: {
      paddingBottom: "5rem",
    },
  },
}));

export default DexProperties;
