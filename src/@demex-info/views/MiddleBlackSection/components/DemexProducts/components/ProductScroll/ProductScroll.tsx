import { LiquidityPoolSection, StakingSection } from "./components";

// import { Box } from "@material-ui/core";
import React from "react";

interface Props {

}

const ProductScroll: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <LiquidityPoolSection />
      <StakingSection />
      {/* <InsuranceSection /> */}
    </React.Fragment>
  );
};

export default ProductScroll;
