import { Box, Button, Theme, makeStyles } from "@material-ui/core";
import { FuturesMarketTable, SpotMarketTable } from "./components";
import { MarkType, MarketType } from "@demex-info/store/markets/types";

import { MarketTab } from "./components";
import React from "react";
import clsx from "clsx";
import { fade } from "@material-ui/core/styles/colorManipulator";

const MarketsTable: React.FC = () => {
  const classes = useStyles();

  const [marketOption, setMarketOption] = React.useState<MarketType>(MarkType.Spot);

  const MarketTabs: MarketTab[] = [{
    label: "Spot",
    value: MarkType.Spot,
  }, {
    label: "Futures",
    value: MarkType.Futures,
  }];

  const handleChangeTab = (value: MarketType) => {
    setMarketOption(value);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.innerDiv}>
        <Box className={classes.buttonDiv} display="flex" justifyContent="center">
          {MarketTabs.map((tab: MarketTab) => (
            <Button
              className={clsx(classes.tab, { selected: marketOption === tab.value })}
              key={tab.value}
              variant="text"
              onClick={() => handleChangeTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
        <Box className={classes.tableRoot}>
          <SpotMarketTable marketOption={marketOption} />
          <FuturesMarketTable marketOption={marketOption} />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(0, "auto"),
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(0, 2.5),
  },
  root: {
    background: `linear-gradient(180deg, ${fade(theme.palette.background.paper, 0.2)} 0%, ${fade(theme.palette.background.paper, 0.85)} 20%, ${theme.palette.background.paper} 100%)`,
    color: theme.palette.text.primary,
    height: "16rem",
    padding: theme.spacing(0, 0, 11),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 0, 6),
    },
  },
  tab: {
    ...theme.typography.button,
    color: theme.palette.text.secondary,
    fontSize: "1.375rem",
    marginLeft: theme.spacing(2.5),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.selected": {
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "1rem",
      lineHeight: 1.3,
      width: "calc(100% / 3)",
    },
  },
  tableRoot: {
    marginTop: theme.spacing(6),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
}));

export default MarketsTable;
