import { Box, Theme, makeStyles } from "@material-ui/core";

import { MarketType } from "@demex-info/store/markets/types";
import React from "react";
import clsx from "clsx";

interface Props {
  marketOption: MarketType;
}

const SpotMarketTable: React.FC<Props> = (props: Props) => {
  const { marketOption } = props;
  const classes = useStyles();

  return (
    <Box className={clsx(
      classes.root,
      { out: marketOption !== "futures" },
    )}>
      This is Futures Market Table
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
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
      transform: "translateX(150%)",
    },
  },
}));

export default SpotMarketTable;