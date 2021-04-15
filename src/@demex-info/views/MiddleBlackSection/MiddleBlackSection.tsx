import React from "react";
import { DemexProducts, NotATrader, YourThoughts } from "./components";

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
