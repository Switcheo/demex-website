// import { Box, Theme, makeStyles } from "@material-ui/core";
import { DemexProducts, NotATrader } from "./components";

import React from "react";

const MiddleBlackSection: React.FC = () => {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <NotATrader />
      <DemexProducts />
      {/* <YourThoughts /> */}
    </React.Fragment>
  );
};

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(11, 0),
//     [theme.breakpoints.down("sm")]: {
//       padding: theme.spacing(6, 0),
//     },
//   },
// }));

export default MiddleBlackSection;
