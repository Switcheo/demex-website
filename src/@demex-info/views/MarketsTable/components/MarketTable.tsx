import { Box, Theme, makeStyles } from "@material-ui/core";

import React from "react";

const MarketTable: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      This is Market Table
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
}));

export default MarketTable;
