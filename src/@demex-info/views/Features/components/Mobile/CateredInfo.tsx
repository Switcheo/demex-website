import React from "react";
import CateredCard from "../CateredCard";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { SvgIcon } from "@demex-info/components";

import { Demex } from "@demex-info/assets/logos";

const CateredInfo = () => {
  const classes = useStyles();

  return (
    <div className={classes.cateredInfo}>
      <Box display="flex" flexDirection="column" gridGap={8}>
        <div className={classes.headerWrapper}>
          <SvgIcon className={classes.svgIcon} component={Demex} />
          <Typography className={classes.header}>For Traders</Typography>
          <SvgIcon className={classes.svgIcon} component={Demex} />
        </div>
        <CateredCard
          title="High Leverage"
          description="Maximize your capital efficiency with up to 100x leverage"
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
        />
      </Box>
      <Box display="flex" flexDirection="column" gridGap={8}>
        <div className={classes.headerWrapper}>
          <SvgIcon className={classes.svgIcon} component={Demex} />
          <Typography className={classes.header}>For Earners</Typography>
          <SvgIcon className={classes.svgIcon} component={Demex} />
        </div>
        <CateredCard
          title="Cross-Chain Liquidity Pools"
          description="Earn across multiple blockchain ecosystems with ease"
        />
        <CateredCard
          title="Money Market"
          description="Lend and borrow assets on Demex with additional incentives and flexible terms"
        />
        <CateredCard
          title="Seamless Earning"
          description="No lock-up periods—add or remove liquidity anytime, earning transparently on-chain"
        />
        <CateredCard
          title="Competitive Yields"
          description="Earn high APYs with deep liquidity backing your assets"
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
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1),

    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: theme.spacing(1),

    background: "#FFFFFF0A",
    boxShadow: "0px 1px 0px 0px #FFFFFF14 inset",
    backdropFilter: "blur(24px)",
  },
  header: {
    ...theme.typography.title2,
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  svgIcon: {
    width: "1rem",
    height: "1rem",
  },
}));

export default CateredInfo;