import { TokenObj, USDPrices } from "./types";

export const AppActionTypes = {
	UPDATE_NETWORK: "UPDATE_NETWORK",
  SET_REST_CLIENT: "SET_REST_CLIENT",
  SET_TENDERMINT_CLIENT: "SET_TENDERMINT_CLIENT",
  SET_TOKENS: "SET_TOKENS",
  SET_USD_PRICES: "SET_USD_PRICES",
};

export function setTokens(tokens: TokenObj[]) {
  return {
    type: AppActionTypes.SET_TOKENS,
    tokens,
  };
}

export function setUsdPrices(usdPrices: USDPrices) {
  return {
    type: AppActionTypes.SET_USD_PRICES,
    usdPrices,
  };
}
