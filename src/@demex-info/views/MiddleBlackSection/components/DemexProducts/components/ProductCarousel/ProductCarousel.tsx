// import { Box, makeStyles } from "@material-ui/core";
import { LiquidityPoolSlide, StakingSlide } from "./components";

import React from "react";

interface Props {
  liquidityRef: () => void;
  stakingRef: () => void;
  liquidityView: boolean;
  stakingView: boolean;
}

const ProductCarousel: React.FC<Props> = (props: Props) => {
  const { liquidityRef, stakingRef, liquidityView, stakingView } = props;

  return (
    <React.Fragment>
      <LiquidityPoolSlide
        liquidityRef={liquidityRef}
        liquidityView={liquidityView}
        stakingView={stakingView}
      />
      <StakingSlide
        liquidityView={liquidityView}
        stakingView={stakingView}
        stakingRef={stakingRef}
      />
      {/* <InsuranceSlide insuranceView={insuranceView} insuranceRef={insuranceRef} /> */}
    </React.Fragment>
  );
};

export default ProductCarousel;