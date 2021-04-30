import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";
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
  const [thoughtsRef, thoughtsView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <React.Fragment>
      <Suspense fallback={null}>
        <NotATrader />
      </Suspense>
      <DemexProducts thoughtsView={thoughtsView} />
      <Suspense fallback={null}>
        <YourThoughts sectionRef={thoughtsRef} sectionView={thoughtsView} />
      </Suspense>
    </React.Fragment>
  );
};

export default MiddleBlackSection;
