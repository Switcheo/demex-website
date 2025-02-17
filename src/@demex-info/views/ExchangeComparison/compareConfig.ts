import {
  DemexLogo, Dydx, HyperLiquid, Drift,
} from "@demex-info/assets";

export interface LogoCell {
  value: string;
  component: any;
}

export const Markets: LogoCell[] = [{
  value: "demex",
  component: DemexLogo,
}, {
  value: "dydx",
  component: Dydx,
}, {
  value: "hyper",
  component: HyperLiquid,
}, {
  value: "drift",
  component: Drift,
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
  header: "Spot, Perps &\nPre-Launch Markets",
  values: {
    demex: true,
    dydx: false,
    hyper: true,
    drift: true,
  },
}, {
  header: "Multi-Asset\nCollateral",
  values: {
    demex: true,
    dydx: false,
    hyper: false,
    drift: true,
  },
}, {
  header: "Multi-Chain &\nWallet Access",
  values: {
    demex: true,
    dydx: true,
    hyper: false,
    drift: false,
  },
}, {
  header: "Integrated\nLending Market",
  values: {
    demex: true,
    dydx: false,
    hyper: false,
    drift: false,
  },
}, {
  header: "In-App\nNotifications",
  values: {
    demex: true,
    dydx: false,
    hyper: false,
    drift: false,
  },
}, {
  header: "Speed",
  values: {
    demex: "10,000 TPS",
    dydx: "10,000 TPS",
    hyper: "20,000 TPS",
    drift: "7,000 TPS",
  },
}, {
  header: "Interoperability",
  values: {
    demex: "20+ Chains Supported",
    dydx: "Cosmos IBC & Axelar",
    hyper: "Native Bridge",
    drift: "Solana",
  },
}];
