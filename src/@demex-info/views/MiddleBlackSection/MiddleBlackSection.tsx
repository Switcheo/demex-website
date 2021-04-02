// import { Box, Theme, makeStyles } from "@material-ui/core";
import { DemexProducts, NotATrader, YourThoughts } from "./components";

import React from "react";

const MiddleBlackSection: React.FC = () => {
  return (
    <React.Fragment>
      <NotATrader />
      <DemexProducts />
      <YourThoughts />
    </React.Fragment>
  );
};

export default MiddleBlackSection;
