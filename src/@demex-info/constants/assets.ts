import { USDPrices } from "@demex-info/store/app/types";
import { BN_ZERO } from "@demex-info/utils";
import BigNumber from "bignumber.js";

interface Assets {
  [symbol: string]: {
    [precision: string]: number;
  };
}

// Fallback Assets decimals incase API calls fail
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
  busdt1: "busdt",
  bbelt1: "bbelt",
  elink1: "elink",
  elink2: "elink",
  euni1: "euni",
  euni2: "euni",
  ncgas1: "ncgas",
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

export const lottieDefaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const defaultLiquidityOpts = {
  loop: false,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
    filterSize: {
      width: "200%",
      height: "200%",
      x: "-50%",
      y: "-25%",
    },
  },
};

export const defaultStakingOpts = {
  loop: false,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
    filterSize: {
      width: "200%",
      height: "200%",
      x: "-100%",
      y: "-75%",
    },
  },
};

export const COIN_GEKO_PRICES = {
  swth: "switcheo",
  btc: "bitcoin",
  dai: "dai",
  nneo: "neo",
  eth: "ethereum",
  flm: "flamingo-finance",
  usdc: "usd-coin",
  cel: "celsius-degree-token",
  nex: "neon-exchange",
  wbtc: "wrapped-bitcoin",
  bnb: "binancecoin",
  busd: "binance-usd",
  btcb: "binance-bitcoin",
} as { [index: string]: string };
