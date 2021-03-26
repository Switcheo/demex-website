import { InsuranceSlide, LiquidityPoolSlide, StakingSlide } from "./components";

import { Box } from "@material-ui/core";
import React from "react";
import { SlideCategory } from "../slideConfig";

interface Props {
  slideItem: SlideCategory;
}

const ProductCarousel: React.FC<Props> = (props: Props) => {
  const { slideItem } = props;

  return (
    <Box position="relative" mt={7}>
      <LiquidityPoolSlide slideItem={slideItem} />
      <StakingSlide slideItem={slideItem} />
      <InsuranceSlide slideItem={slideItem} />
    </Box>
  );
};

export default ProductCarousel;
