import { lazy } from "@loadable/component";
import React, { Suspense } from "react";
import { DemexProducts } from "./components";

const NotATrader = lazy(() => import("./components/NotATrader/NotATrader"));
const YourThoughts = lazy(() => import("./components/YourThoughts/YourThoughts"));

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
