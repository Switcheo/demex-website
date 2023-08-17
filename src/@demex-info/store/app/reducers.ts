import { CarbonSDK } from "carbon-js-sdk";
import { AppActionTypes } from "./actions";
import { AppState } from "./types";

const storedNetworkString = localStorage.getItem(AppActionTypes.UPDATE_NETWORK);
const storedNetwork = CarbonSDK.parseNetwork(storedNetworkString || "", CarbonSDK.Network.MainNet);

const initial_state: AppState = {
	network: storedNetwork!,
  sdk: undefined,
  ws: undefined,
  usdPrices: {},
  isAppReady: false,
  marketList: [],
  marketStats: [],

  // component open state
  earnOpen: false,
  promotionsOpen: false,
};

const reducer = (state: AppState = initial_state, actions: any) => {
	switch (actions.type) {
	case AppActionTypes.UPDATE_NETWORK:
		localStorage.setItem(AppActionTypes.UPDATE_NETWORK, actions.network);
		return {
			...state,
			network: actions.network,
		};
  case AppActionTypes.SET_SDK:
    return {
      ...state,
      sdk: actions.sdk,
    };
  case AppActionTypes.SET_WS_CONNECTOR:
    return {
      ...state,
      ws: actions.ws,
    };
  case AppActionTypes.SET_USD_PRICES:
    return {
      ...state,
      usdPrices: actions.usdPrices,
    };
  case AppActionTypes.SET_IS_APP_READY:
    return {
      ...state,
      isAppReady: actions.ready,
    };
  case AppActionTypes.SET_MARKETS:
    return {
      ...state,
      marketList: actions.list,
    };
  case AppActionTypes.SET_MARKET_STATS:
    return {
      ...state,
      marketStats: actions.stats,
    };
  case AppActionTypes.SET_EARN_DRAWER_OPEN:
    return {
      ...state,
      earnOpen: actions.earnOpen,
    };
  case AppActionTypes.SET_PROMOTIONS_DRAWER_OPEN:
    return {
      ...state,
      promotionsOpen: actions.promotionsOpen,
    };
	default:
		return state;
	}
};

export default reducer;
