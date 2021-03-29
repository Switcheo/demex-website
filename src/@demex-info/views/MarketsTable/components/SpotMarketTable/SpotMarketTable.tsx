import { Box, Theme, makeStyles } from "@material-ui/core";
import { MarkType, MarketType } from "@demex-info/store/markets/types";

import MarketPaper from "../../MarketPaper";
import React from "react";
// import { RootState } from "@demex-info/store/types";
import { TypographyLabel } from "@demex-info/components";
import clsx from "clsx";

// import { useSelector } from "react-redux";

interface Props {
  marketOption: MarketType;
}

const SpotMarketTable: React.FC<Props> = (props: Props) => {
  const { marketOption } = props;
  const classes = useStyles();

  // const { marketStats } = useSelector((state: RootState) => state.markets);
  // const spotMarkets = marketStats.find((market: MarketStatItem) => market.market_type === MarkType.Spot);

  return (
    <Box className={clsx(
      classes.root,
      { out: marketOption !== MarkType.Spot },
    )}>
      <Box className={classes.spotStats}>
        <MarketPaper className={classes.paper} px={4} py={3.25}>
          <TypographyLabel variant="body1" color="textSecondary">
            Volume (24H)
          </TypographyLabel>
          <TypographyLabel
            className={classes.numTitle}
            variant="h4"
            color="textPrimary"
          >
            $200,000
          </TypographyLabel>
        </MarketPaper>
        <MarketPaper className={classes.paper} px={4} py={3.25}>
          <TypographyLabel variant="body1" color="textSecondary">
            Market Pairs
          </TypographyLabel>
          <TypographyLabel
            className={classes.numTitle}
            variant="h4"
            color="textPrimary"
          >
            $200,000
          </TypographyLabel>
        </MarketPaper>
        <MarketPaper className={classes.paper} px={4} py={3.25}>
          <TypographyLabel variant="body1" color="textSecondary">
            Coins
          </TypographyLabel>
          <TypographyLabel
            className={classes.numTitle}
            variant="h4"
            color="textPrimary"
          >
            $200,000
          </TypographyLabel>
        </MarketPaper>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  numTitle: {
    fontSize: "2rem",
    marginTop: theme.spacing(1.5),
  },
  paper: {
    width: "100%",
    maxWidth: "calc(100% / 3)",
    marginLeft: theme.spacing(3),
    "&:first-child": {
      marginLeft: 0,
    },
  },
  root: {
    display: "inline-flex",
    height: "100%",
    margin: theme.spacing(0, "auto"),
    position: "absolute",
    top: 0,
    transition: "transform ease 0.8s",
    width: "100%",
    transform: "translateX(0%)",
    "&.out": {
      transform: "translateX(-150%)",
    },
  },
  spotStats: {
    display: "flex",
    minHeight: "7rem",
    width: "100%",
  },
}));

export default SpotMarketTable;