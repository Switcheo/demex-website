import { makeTendermintClient } from "@demex-info/utils";
import { Network, RestClient } from "tradehub-api-js";
import { AppActionTypes } from "./actions";
import { AppState } from "./types";

const storedNetworkString = localStorage.getItem(AppActionTypes.UPDATE_NETWORK);
const networks: { [index: string]: Network | undefined } = Network;
const storedNetwork = networks[storedNetworkString || ""] || Network.MainNet;

const initial_state: AppState = {
	network: storedNetwork,
  restClient: new RestClient({ network: storedNetwork }),
  tendermintClient: makeTendermintClient(storedNetwork),
  tokens: [],
  usdPrices: {},
};

const reducer = (state: AppState = initial_state, actions: any) => {
	switch (actions.type) {
	case AppActionTypes.UPDATE_NETWORK:
		localStorage.setItem(AppActionTypes.UPDATE_NETWORK, actions.network);
		return {
			...state,
			network: actions.network,
		};
  case AppActionTypes.SET_REST_CLIENT:
    return {
      ...state,
      restClient: actions.restClient,
    };
  case AppActionTypes.SET_TENDERMINT_CLIENT:
    return {
      ...state,
      tendermintClient: actions.tendermintClient,
    };
  case AppActionTypes.SET_TOKENS:
    return {
      ...state,
      tokens: actions.tokens,
    };
  case AppActionTypes.SET_USD_PRICES:
    return {
      ...state,
      usdPrices: actions.usdPrices,
    };
	default:
		return state;
	}
};

export default reducer;
