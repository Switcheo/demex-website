import React, { useContext, FC } from "react";

interface IndicatorContextData {
  index: number;
  setIndex: () => void;
}

export const SECTION_COUNT = 8; // Number of sections in the homepage.

const IndicatorContext = React.createContext<IndicatorContextData>({
  index: 0,
  setIndex: () => {},
});

const IndicatorProvider: FC<IndicatorContextData> = ({
  children,
  index,
  setIndex,
}) => {
  return (
    <IndicatorContext.Provider
      value={{
        index,
        setIndex,
      }}
    >
      {children}
    </IndicatorContext.Provider>
  );
};

export default IndicatorProvider;

export const useIndicator: any = () => {
  const context = useContext(IndicatorContext);
  if (context === undefined) {
    throw new Error(
      "useIndicator must be used within a 'IndicatorContextProvider'",
    );
  }
  return context;
};
