import { USDPrices } from "@demex-info/store/app/types";
import { BN_ZERO } from "@demex-info/utils";
import BigNumber from "bignumber.js";

export const DEC_SHIFT = 18;

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
  busdt: {
    precision: 18,
  },
  bbelt: {
    precision: 18,
  },
  elink: {
    precision: 18,
  },
  euni: {
    precision: 18,
  },
  inch: {
    precision: 18,
  },
  ncgas: {
    precision: 8,
  },
  trb: {
    precision: 18,
  },
};

export const COMMON_ASSET_NAME: {
  [index: string]: string
} = {
  swth: "swth",
  "swth-n": "swth",
  "swth-b": "swth",
  "swth-e": "swth",
  dai: "dai",
  flm1: "flm",
  eth1: "eth",
  btc1: "btc",
  usdc1: "usdc",
  wbtc1: "wbtc",
  yam1: "yam",
  yam2: "yam",
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
  "trb1-3c2c697a0ad67fed978d3dd7ec61c464": "trb",
  "tru-e2de3f751ecb78216c447144c8c1f4bf": "tru",
  "usdt1-176391161fae2a4819870b05a720e642": "usdt",
  "grt-43b071c61ac0332f7c85cff55b60f9d7": "grt",
  "inch-1cf6e72a3b6db4bc509c5fa97df8865b": "inch",
  "okb.e.1": "okb",
  "aave.e.1": "aave",
  "mkr.e.1": "mkr",
  "cro.e.1": "cro",
  "dai.e.1": "dai",
  "comp.e.1": "comp",
  "tel.e.1": "tel",
  "snx.e.1": "snx",
  "sushi.e.1": "sushi",
  "chz.e.1": "chz",
  "hot.e.1": "hot",
  "enj.e.1": "enj",
  "nexo.e.1": "nexo",
  "bat.e.1": "bat",
  "yfi.e.1": "yfi",
  "grt.e.1": "grt",
  "omg.e.1": "omg",
  "bnt.e.1": "bnt",
  "zrx.e.1": "zrx",
  "one.e.1": "one",
  "chsb.e.1": "chsb",
  "crv.e.1": "crv",
  "nxm.e.1": "nxm",
  "snt.e.1": "snt",
  "bal.e.1": "bal",
  "rlc.e.1": "rlc",
  "lrc.e.1": "lrc",
  "ocean.e.1": "ocean",
  "btmx.e.1": "btmx",
  "band.e.1": "band",
  "knc.e.1": "knc",
  "inj.e.1": "inj",
  "gno.e.1": "gno",
  "fun.e.1": "fun",
  "sxp.e.1": "sxp",
  "iotx.e.1": "iotx",
  "nkn.e.1": "nkn",
  "stmx.e.1": "stmx",
  "agi.e.1": "agi",
  "oxt.e.1": "oxt",
  "nmr.e.1": "nmr",
  "sand.e.1": "sand",
  "poly.e.1": "poly",
  "ant.e.1": "ant",
  "ogn.e.1": "ogn",
  "storj.e.1": "storj",
  asa1: "asa",
  asa2: "asa",
  dbc1: "dbc",
  dbc2: "dbc",
  "lkt.7ef7febf": "lkt",
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
  trb: "tellor",
  tru: "truebit-protocol",
  usdt: "tether",
  grt: "the-graph",
  inch: "1inch",
  storj: "storj",
  ogn: "origin-protocol",
  ant: "aragon",
  poly: "polymath-network",
  sand: "the-sandbox",
  nmr: "numeraire",
  oxt: "orchid-protocol",
  agi: "singularitynet",
  stmx: "storm",
  nkn: "nkn",
  iotx: "iotex",
  sxp: "swipe",
  fun: "funfair",
  gno: "gnosis",
  inj: "injective-protocol",
  knc: "kyber-network",
  band: "band-protocol",
  btmx: "asd",
  ocean: "ocean-protocol",
  lrc: "loopring",
  rlc: "iexec-rlc",
  bal: "balancer",
  snt: "status",
  nxm: "nxm",
  crv: "curve-dao-token",
  chsb: "swissborg",
  one: "harmony",
  zrx: "0x",
  bnt: "bancor",
  omg: "omisego",
  yfi: "yearn-finance",
  bat: "basic-attention-token",
  nexo: "nexo",
  enj: "enjincoin",
  hot: "holotoken",
  chz: "chiliz",
  sushi: "sushi",
  snx: "havven",
  tel: "telcoin",
  comp: "compound-governance-token",
  cro: "crypto-com-chain",
  mkr: "maker",
  aave: "aave",
  okb: "okb",
  uni: "uniswap",
  link: "chainlink",
  helmet: "helmet-insure",
  belt: "belt",
  busdt: "tether",
  cgas: "gas",
  dbc: "deepbrain-chain",
  yam: "yam-2",
  asa: "asura",
  eps: "ellipsis",
  ada: "binance-peg-cardano",
  wbnb: "wbnb",
  doge: "binance-peg-dogecoin",
  xrp: "binance-peg-xrp",
  dot: "binance-peg-polkadot",
  bch: "binance-peg-bitcoin-cash",
  ltc: "binance-peg-litecoin",
  etc: "ethereum-classic",
  eos: "binance-peg-eos",
  trx: "tron-bsc",
  xtz: "tezos",
  cake: "pancakeswap-token",
  atom: "cosmos",
  safemoon: "safemoon",
  ust: "wrapped-ust-bsc",
  zec: "zcash",
  zil: "zilliqa",
  pax: "paxos-standard",
  near: "near",
  ont: "ontology",
  wrx: "wazirx",
  bake: "bakerytoken",
  ankr: "ankr",
  bcha: "bitcoin-cash-abc-2",
  bcfx: "conflux-token",
  mir: "mirror-protocol",
  reef: "reef-finance",
  xvs: "venus",
  btcst: "btc-standard-hashrate-token",
  tlm: "alien-worlds-bsc",
  prom: "prometeus",
  alpha: "alpha-finance",
  dodo: "dodo",
  math: "math",
  lkt: "locklet",
} as { [index: string]: string };
