import { MarketStatItem } from "@demex-info/utils/markets";
import { CarbonSDK, Models, WSConnector } from "carbon-js-sdk";
import { USDPrices } from "./types";

export const AppActionTypes = {
	UPDATE_NETWORK: "UPDATE_NETWORK",
  SET_SDK: "SET_SDK",
  SET_WS_CONNECTOR: "SET_WS_CONNECTOR",
  SET_TOKENS: "SET_TOKENS",
  SET_USD_PRICES: "SET_USD_PRICES",
  SET_IS_APP_READY: "SET_IS_APP_READY",
  SET_MARKETS: "SET_MARKETS",
  SET_MARKET_STATS: "SET_MARKET_STATS",

  // component open state actions
  SET_EARN_DRAWER_OPEN: "SET_EARN_DRAWER_OPEN",
  SET_PROMOTIONS_DRAWER_OPEN: "SET_PROMOTIONS_DRAWER_OPEN",
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

export function setMarketList(list: Models.Market[]) {
  return {
    type: AppActionTypes.SET_MARKETS,
    list,
  };
}

export function setMarketStats(stats: MarketStatItem[]) {
  return {
    type: AppActionTypes.SET_MARKET_STATS,
    stats,
  };
}

export function setEarnDrawerOpen(earnOpen: boolean) {
  return {
    type: AppActionTypes.SET_EARN_DRAWER_OPEN,
    earnOpen,
  };
}

export function setPromotionsDrawerOpen(promotionsOpen: boolean) {
  return {
    type: AppActionTypes.SET_PROMOTIONS_DRAWER_OPEN,
    promotionsOpen,
  };
}
