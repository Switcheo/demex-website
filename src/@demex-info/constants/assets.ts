import { BN_ZERO } from "@demex-info/utils";
import BigNumber from "bignumber.js";
import { USDPrices } from "@demex-info/store/app/types";

interface Assets {
  [symbol: string]: {
    [precision: string]: number;
  };
}

export const ASSETS: Assets = {
  swth: {
    precision: 8,
  },
  iusd: {
    precision: 8,
  },
  usdc: {
    precision: 6,
  },
  dai: {
    precision: 18,
  },
  cel: {
    precision: 4,
  },
  nex: {
    precision: 8,
  },
  eth: {
    precision: 18,
  },
  busd: {
    precision: 18,
  },
  bnb: {
    precision: 18,
  },
  btcb: {
    precision: 18,
  },
  btc: {
    precision: 8,
  },
  wbtc: {
    precision: 8,
  },
  nneo: {
    precision: 8,
  },
};

export const COMMON_ASSET_NAME: {
  [index: string]: string
} = {
  swth: "swth",
  "swth-n": "swth",
  "swth-b": "swth",
  dai: "dai",
  flm1: "flm",
  eth1: "eth",
  btc1: "btc",
  usdc1: "usdc",
  wbtc1: "wbtc",
  cel1: "cel",
  nex1: "nex",
  nneo2: "nneo",
  bnb1: "bnb",
  bnb2: "bnb",
  busd1: "busd",
  btcb1: "btcb",
};

export const FuturesDenomOverride = {
  WBTC: "BTC",
  USDC: "USD",
};

export function getCoinCommonDenom(denom?: string) {
  if (typeof denom !== "string") return denom;
  return COMMON_ASSET_NAME[denom] ?? denom;
}

export function getUsd(usdPrices: USDPrices, denom: string): BigNumber {
  const usdPriceKey = getCoinCommonDenom(denom) ?? "";
  const usdPrice = usdPrices[usdPriceKey] ?? BN_ZERO;
  return usdPrice;
}

export const POOL_DECIMALS = 18;
