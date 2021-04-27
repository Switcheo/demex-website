import { Box } from "@material-ui/core";
import React from "react";
import Loadable from "react-loadable";

interface Props {

}

const LiquidityPoolSection = Loadable({
  loader: () => import("./components/LiquidityPoolSection"),
  loading() {
    return (<Box />);
  },
});
const StakingSection = Loadable({
  loader: () => import("./components/StakingSection"),
  loading() {
    return (<Box />);
  },
});

const ProductScroll: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <LiquidityPoolSection />
      <StakingSection />
    </React.Fragment>
  );
};

export default ProductScroll;
