import { InsuranceSection, LiquidityPoolSection, StakingSection } from "./components";

import { Box } from "@material-ui/core";
import React from "react";

interface Props {

}

const ProductScroll: React.FC<Props> = () => {
  return (
    <Box position="relative">
      <LiquidityPoolSection />
      <StakingSection />
      <InsuranceSection />
    </Box>
  );
};

export default ProductScroll;
