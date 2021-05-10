import React, { Suspense } from "react";
import Loadable from "react-loadable";
import { DemexProducts } from "./components";

const NotATrader = Loadable({
  loader: () => import("./components/NotATrader/NotATrader"),
  loading() {
    return null;
  },
  delay: 960,
});
const YourThoughts = Loadable({
  loader: () => import("./components/YourThoughts/YourThoughts"),
  loading() {
    return null;
  },
  delay: 1140,
});

const MiddleBlackSection: React.FC = () => {
  return (
    <React.Fragment>
      <Suspense fallback={null}>
        <NotATrader />
      </Suspense>
      <DemexProducts />
      <Suspense fallback={null}>
        <YourThoughts />
      </Suspense>
    </React.Fragment>
  );
};

export default MiddleBlackSection;
