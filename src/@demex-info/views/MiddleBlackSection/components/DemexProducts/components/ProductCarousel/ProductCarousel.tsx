// import { Box, makeStyles } from "@material-ui/core";
import { InsuranceSlide, LiquidityPoolSlide, StakingSlide } from "./components";

import React from "react";

interface Props {
  liquidityRef: () => void;
  stakingRef: () => void;
  insuranceRef: () => void;
  liquidityView: boolean;
}

const ProductCarousel: React.FC<Props> = (props: Props) => {
  const { liquidityRef, stakingRef, insuranceRef, liquidityView } = props;

  return (
    <React.Fragment>
      <LiquidityPoolSlide liquidityRef={liquidityRef} liquidityView={liquidityView} />
      <StakingSlide stakingRef={stakingRef} />
      <InsuranceSlide insuranceRef={insuranceRef} />
    </React.Fragment>
  );
};

export default ProductCarousel;
