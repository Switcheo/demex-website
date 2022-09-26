import {
  Demex, Dydx, Serum, Uniswap,
} from "@demex-info/assets";

export interface LogoCell {
  value: string;
  component: any;
}

export const Markets: LogoCell[] = [{
  value: "demex",
  component: Demex,
}, {
  value: "uniswap",
  component: Uniswap,
}, {
  value: "dydx",
  component: Dydx,
}, {
  value: "serum",
  component: Serum,
}];

export type RowVal = boolean | string | string[];

export interface TradingRow {
  header: string;
  values: {
    [key: string]: RowVal | ListItemHead[];
  };
}

export interface ListItemHead {
  header: string;
  values: string[];
}

export const TradingVal: TradingRow[] = [{
  header: "Interoperability",
  values: {
    demex: "PolyNetwork Alliance & Cosmos IBC",
    uniswap: "Ethereum & all bridged assets chain",
    dydx: "N/A",
    serum: "Wormhole",
  },
}, {
  header: "Dated Futures",
  values: {
    demex: true,
    uniswap: false,
    dydx: false,
    serum: false,
  },
}, {
  header: "Perpetuals",
  values: {
    demex: true,
    uniswap: false,
    dydx: true,
    serum: false,
  },
}, {
  header: "Options",
  values: {
    demex: "Coming Soon",
    uniswap: false,
    dydx: false,
    serum: false,
  },
}, {
  header: "Leverage",
  values: {
    demex: "150x",
    uniswap: "N/A",
    dydx: "20x",
    serum: "Dependent on the DEX",
  }, 
}, {
  header: "Speed",
  values: {
    demex: "10,000 TPS",
    uniswap: "1.2 TPS",
    dydx: "1,000 TPS",
    serum: "65,000 TPS",
  }, 
}, {
  header: "Listing New Markets",
  values: {
    demex: "Anyone, Permissionless",
    uniswap: "Team, Permissionless",
    dydx: "Anyone, Permissionless",
    serum: "Anyone, Permissionless",
  },
}];
