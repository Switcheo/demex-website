import { Network, RestClient } from "tradehub-api-js";

export interface AppState {
  network: Network;
  restClient: RestClient;
}
