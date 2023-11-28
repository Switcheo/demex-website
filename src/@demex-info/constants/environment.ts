import { CarbonSDK } from "carbon-js-sdk";

export const HIDE_FIRST_PERP_POOL_MAINNET = (network: CarbonSDK.Network) => {
  return network === CarbonSDK.Network.MainNet;
};
