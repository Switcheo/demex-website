import React from "react";
import CateredCard from "../CateredCard";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { CompetitiveFields, CrossChain, HighLeverage, TradingInstruments } from "../../assets";

const CateredInfo = () => {
  const classes = useStyles();

  return (
    <div className={classes.cateredInfo}>
      <Box display="flex" flexDirection="column" gridGap={8}>
        <Typography className={classes.header}>For Traders</Typography>
        <CateredCard
          title="High Leverage"
          description="Maximize your capital efficiency with up to 100x leverage"
          svgIcon={HighLeverage}
          svgClassName={classes.svgIcon}
        />
        <CateredCard
          title="Deep Liquidity"
          description="Access large liquidity pools and minimize slippage"
        />
        <CateredCard
          title="Low Fees"
          description="Enjoy ultra-low trading fees with zero-gas costs"
        />
        <CateredCard
          title="Fast Execution"
          description="Lightning-fast trades executed in under 1 second"
          svgIcon={TradingInstruments}
          svgClassName={classes.svgIcon}
        />
      </Box>
      <Box display="flex" flexDirection="column" gridGap={8}>
        <Typography className={classes.header}>For Earners</Typography>
        <CateredCard
          title="Cross-Chain Liquidity Pools"
          description="Earn across multiple blockchain ecosystems with ease"
          svgIcon={CrossChain}
          svgClassName={classes.svgIcon}
        />
        <CateredCard
          title="Nitron Money Market"
          description="Lend and borrow assets on Nitron, our money market, with additional incentives and flexible terms"
        />
        <CateredCard
          title="Seamless Earning"
          description="No lock-up periods—add or remove liquidity anytime, earning transparently on-chain"
        />
        <CateredCard
          title="Competitive Yields"
          description="Earn high APYs with deep liquidity backing your assets"
          svgIcon={CompetitiveFields}
          svgClassName={classes.svgIcon}
        />
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cateredInfo: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
  svgIcon: {
    width: "100%",
  },
  header: {
    ...theme.typography.title2,
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

export default CateredInfo;