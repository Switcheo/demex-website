import { RootState } from "@demex-info/store/types";
import { useSelector } from "react-redux";

const SYMBOL_OVERRIDE: {
  [symbol: string]: string
} = {
  NNEO: "nNEO",
  bnb1: "BNB",
  bnb2: "BNB",
};

interface NameMap {
  [denom: string]: string;
}

let tokenMap: NameMap = {};

export const assetSymbol = (denom?: string, overrideMap: NameMap = {}) => {
  if (typeof denom !== "string") return "";

  // Convert denom to lowercase in case developer inputs a denom with uppercase characters
  const symbol = (tokenMap?.[denom?.toLowerCase()] ?? denom ?? "-").toUpperCase();
  if (SYMBOL_OVERRIDE[symbol]) {
    return SYMBOL_OVERRIDE[symbol];
  }

  if (overrideMap[symbol]) return overrideMap[symbol];

  return symbol;
};

export default (overrideMap: NameMap = {}) => {
  const tokens = useSelector((state: RootState) => state.app.tokens);
  tokenMap = tokens?.reduce((accum, token) => {
    accum[token.denom ?? "-"] = token.symbol ?? token.denom ?? "-"; // eslint-disable-line no-param-reassign
    return accum;
  }, tokenMap);
  return (denom?: string, labelOverrides: NameMap = overrideMap) => assetSymbol(denom, labelOverrides);
};
