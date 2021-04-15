import React from "react";
import { useInView } from "react-intersection-observer";
import { DemexProducts, NotATrader, YourThoughts } from "./components";

const MiddleBlackSection: React.FC = () => {
  const [thoughtsRef, thoughtsView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <React.Fragment>
      <NotATrader />
      <DemexProducts thoughtsView={thoughtsView} />
      <YourThoughts sectionRef={thoughtsRef} sectionView={thoughtsView} />
    </React.Fragment>
  );
};

export default MiddleBlackSection;
