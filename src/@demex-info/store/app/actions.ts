import { Network, RestClient } from "tradehub-api-js";

export const AppActionTypes = {
	UPDATE_NETWORK: "UPDATE_NETWORK",
  SET_REST_CLIENT: "SET_REST_CLIENT",
};

export function updateNetwork(network: Network) {
	return {
		type: AppActionTypes.UPDATE_NETWORK,
		network,
	};
}

export function setRestClient(restClient: RestClient) {
	return {
		type: AppActionTypes.SET_REST_CLIENT,
		restClient,
	};
}
