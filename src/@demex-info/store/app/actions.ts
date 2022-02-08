import { CarbonSDK, WSConnector } from "carbon-js-sdk";
import { USDPrices } from "./types";

export const AppActionTypes = {
	UPDATE_NETWORK: "UPDATE_NETWORK",
  SET_SDK: "SET_SDK",
  SET_WS_CONNECTOR: "SET_WS_CONNECTOR",
  SET_TOKENS: "SET_TOKENS",
  SET_USD_PRICES: "SET_USD_PRICES",
  SET_IS_APP_READY: "SET_IS_APP_READY",
};

export function setSDK(sdk: CarbonSDK) {
  return {
    type: AppActionTypes.SET_SDK,
    sdk,
  };
}

export function setWsConnector(ws: WSConnector) {
  return {
    type: AppActionTypes.SET_WS_CONNECTOR,
    ws,
  };
}

export function setUsdPrices(usdPrices: USDPrices) {
  return {
    type: AppActionTypes.SET_USD_PRICES,
    usdPrices,
  };
}

export function setIsAppReady(ready: boolean) {
  return {
    type: AppActionTypes.SET_IS_APP_READY,
    ready,
  };
}
