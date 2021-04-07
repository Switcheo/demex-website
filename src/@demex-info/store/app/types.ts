import { BN_ZERO, parseNumber } from "@demex-info/utils";
import { Network, RestClient } from "tradehub-api-js";

import BigNumber from "bignumber.js";
import TendermintClient from "@demex-info/utils/tendermint";

export interface AppState {
  network: Network;
  restClient: RestClient;
  tendermintClient: TendermintClient;
  tokens: TokenObj[];
  usdPrices: USDPrices;
}

export interface USDPrices {
  [denom: string]: BigNumber;
}

export interface TokenObj {
  name: string;
  symbol: string;
  denom: string;
  decimals: number;
  blockchain: string;
  chainId: number;
  assetId: string;
  isActive: boolean;
  isCollateral: boolean;
  lockProxyHash: string;
  delegatedSupply: BigNumber;
  originator: string;
}

export const parseTokensArr = (data: any): TokenObj[] => {
  if (!data || data.length <= 0) return [];
  return data.map((token: any) => {
    const {
      name = "",
      symbol = "",
      denom = "",
      decimals = 0,
      blockchain = "",
      chain_id: chainId = 0,
      asset_id: assetId = "",
      is_active: isActive = false,
      is_collateral: isCollateral = false,
      lock_proxy_hash: lockProxyHash = "",
      delegated_supply: delegatedSupply = 0,
      originator = "",
    } = token;
    return {
      name,
      symbol,
      denom,
      decimals,
      blockchain,
      chainId,
      assetId,
      isActive,
      isCollateral,
      lockProxyHash,
      delegatedSupply: parseNumber(delegatedSupply, BN_ZERO)!,
      originator,
    };
  });
};

export const AppTasks: { [key: string]: string } = {
  Tokens: "tokens-app",
};
