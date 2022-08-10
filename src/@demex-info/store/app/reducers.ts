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
	default:
		return state;
	}
};

export default reducer;
