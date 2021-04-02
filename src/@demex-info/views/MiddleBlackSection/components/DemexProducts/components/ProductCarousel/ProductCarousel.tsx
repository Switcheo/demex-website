// import { Box, makeStyles } from "@material-ui/core";
import { InsuranceSlide, LiquidityPoolSlide, StakingSlide } from "./components";

import React from "react";

interface Props {
  liquidityRef: () => void;
  stakingRef: () => void;
  insuranceRef: () => void;
  liquidityView: boolean;
  stakingView: boolean;
  insuranceView: boolean;
}

const ProductCarousel: React.FC<Props> = (props: Props) => {
  const { insuranceView, liquidityRef, stakingRef, insuranceRef, liquidityView, stakingView } = props;

  return (
    <React.Fragment>
      <LiquidityPoolSlide
        liquidityRef={liquidityRef}
        liquidityView={liquidityView}
        stakingView={stakingView}
      />
      <StakingSlide
        liquidityView={liquidityView}
        insuranceView={insuranceView}
        stakingView={stakingView}
        stakingRef={stakingRef}
      />
      <InsuranceSlide insuranceView={insuranceView} insuranceRef={insuranceRef} />
    </React.Fragment>
  );
};

export default ProductCarousel;
