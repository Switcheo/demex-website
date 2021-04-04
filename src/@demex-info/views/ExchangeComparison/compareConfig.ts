import { BinanceFutures, Bitmex, Bybit, DemexLogo, Deribit, DerivaDex, Dydx, Injective, Kraken, Loopring, Serum } from "@demex-info/assets";

export type PropertyTab = "cex-trading" | "cex-security" | "cex-service" | "dex-technology" | "dex-trading" | "dex-decentralisation";

export interface TableTab {
  label: string;
  value: PropertyTab;
}

export interface LogoCell {
  value: string;
  component: any;
}

export const CexTableTabs: TableTab[] = [{
  label: "Trading",
  value: "cex-trading",
}, {
  label: "Security",
  value: "cex-security",
}, {
  label: "Service",
  value: "cex-service",
}];

export const DexTableTabs: TableTab[] = [{
  label: "Technology",
  value: "dex-technology",
}, {
  label: "Trading",
  value: "dex-trading",
}, {
  label: "Decentralisation",
  value: "dex-decentralisation",
}];

export const CexMarkets: LogoCell[] = [{
  value: "demex",
  component: DemexLogo,
}, {
  value: "kraken",
  component: Kraken,
}, {
  value: "deribit",
  component: Deribit,
}, {
  value: "bybit",
  component: Bybit,
}, {
  value: "bitmex",
  component: Bitmex,
}, {
  value: "binance",
  component: BinanceFutures,
}];

export const DexMarkets: LogoCell[] = [{
  value: "demex",
  component: DemexLogo,
}, {
  value: "dydx",
  component: Dydx,
}, {
  value: "injective",
  component: Injective,
}, {
  value: "loopring",
  component: Loopring,
}, {
  value: "derivadex",
  component: DerivaDex,
}, {
  value: "serum",
  component: Serum,
}];

export type RowVal = boolean | string;

export interface CexTradingRow {
  header: string;
  values: {
    [key: string]: RowVal;
  };
}

export const CexTradingVal: CexTradingRow[] = [{
  header: "Spot",
  values: {
    demex: true,
    kraken: true,
    deribit: false,
    bybit: true,
    bitmex: false,
    binance: true,
  },
}, {
  header: "Delivery Futures",
  values: {
    demex: true,
    kraken: true,
    deribit: true,
    bybit: true,
    bitmex: true,
    binance: true,
  },
}, {
  header: "Perpetual Swap",
  values: {
    demex: "Upcoming",
    kraken: true,
    deribit: true,
    bybit: true,
    bitmex: true,
    binance: true,
  },
}, {
  header: "Options",
  values: {
    demex: "Upcoming",
    kraken: false,
    deribit: true,
    bybit: false,
    bitmex: false,
    binance: true,
  },
}, {
  header: "Leverage",
  values: {
    demex: "150x",
    kraken: "5x",
    deribit: "100x",
    bybit: "100x",
    bitmex: "100x",
    binance: "125x",
  },
}];

export const CexSecurityVal: CexTradingRow[] = [{
  header: "User Verification",
  values: {
    demex: false,
    kraken: true,
    deribit: true,
    bybit: true,
    bitmex: true,
    binance: true,
  },
}, {
  header: "Account Creation Needed",
  values: {
    demex: false,
    kraken: true,
    deribit: true,
    bybit: true,
    bitmex: true,
    binance: true,
  },
}, {
  header: "Fund Custody",
  values: {
    demex: "User",
    kraken: "Platform",
    deribit: "Platform",
    bybit: "Platform",
    bitmex: "Platform",
    binance: "Platform",
  },
}];

export const CexServiceVal: CexTradingRow[] = [{
  header: "Withdrawal / Deposit",
  values: {
    demex: "Instant",
    kraken: "Instant",
    deribit: "Instant",
    bybit: "3 times a day",
    bitmex: "3 times a day",
    binance: "Instant",
  },
}, {
  header: "Fair API access",
  values: {
    demex: "Yes",
    kraken: "No",
    deribit: "No",
    bybit: true,
    bitmex: true,
    binance: true,
  },
}];

export const DexTechnologyVal: CexTradingRow[] = [{
  header: "> 10,000 Transactions/sec",
  values: {
    demex: true,
    dydx: false,
    injective: "Unknown",
    loopring: false,
    derivadex: "Unknown",
    serum: true,
  },
}, {
  header: "Block Time",
  values: {
    demex: "1s",
    dydx: "13s",
    injective: "1s",
    loopring: "13s",
    derivadex: "13s",
    serum: "400ms",
  },
}, {
  header: "Constrained by Public Blockchain",
  values: {
    demex: "No",
    dydx: "Ethereum",
    injective: "No",
    loopring: "Ethereum",
    derivadex: "Ethereum",
    serum: "Solana",
  },
}, {
  header: "Interoperability",
  values: {
    demex: "PolyNetwork Alliance, Cosmos Network IBC",
    dydx: "None",
    injective: "Cosmos Network IBC",
    loopring: "None",
    derivadex: "None",
    serum: "None",
  },
}];

export const DexTradingVal: CexTradingRow[] = [{
  header: "Spot",
  values: {
    demex: true,
    dydx: false,
    injective: false,
    loopring: true,
    derivadex: false,
    serum: true,
  },
}, {
  header: "Delivery Futures",
  values: {
    demex: true,
    dydx: true,
    injective: true,
    loopring: false,
    derivadex: true,
    serum: false,
  },
}, {
  header: "Perpetual Swap",
  values: {
    demex: "Upcoming",
    dydx: true,
    injective: true,
    loopring: false,
    derivadex: true,
    serum: false,
  },
}, {
  header: "Options",
  values: {
    demex: "Upcoming",
    dydx: false,
    injective: "Upcoming",
    loopring: false,
    derivadex: false,
    serum: false,
  },
}, {
  header: "Leverage",
  values: {
    demex: "150x",
    dydx: "10x",
    injective: "20x",
    loopring: "N/A",
    derivadex: "N/A",
    serum: "N/A",
  },
}];

export const DexDecentralisationVal: CexTradingRow[] = [{
  header: "Liquidity Pools",
  values: {
    demex: true,
    dydx: false,
    injective: false,
    loopring: true,
    derivadex: false,
    serum: true,
  },
}, {
  header: "DAO",
  values: {
    demex: true,
    dydx: false,
    injective: false,
    loopring: false,
    derivadex: true,
    serum: true,
  },
}, {
  header: "Community-Owned Insurance Fund",
  values: {
    demex: "Upcoming",
    dydx: false,
    injective: false,
    loopring: false,
    derivadex: true,
    serum: false,
  },
}, {
  header: "Listing New Markets",
  values: {
    demex: "Anyone",
    dydx: "Central Team",
    injective: "Central Team",
    loopring: "Anyone",
    derivadex: "Central Team",
    serum: "Anyone",
  },
}, {
  header: "Fees (Network fee/trade)",
  values: {
    demex: "0",
    dydx: "0",
    injective: "Unknown",
    loopring: "Unknown",
    derivadex: "Unknown",
    serum: "Unknown",
  },
}, {
  header: "Taker Fee",
  values: {
    demex: "0.25%",
    dydx: "0.05% - 0.20%",
    injective: "Unknown",
    loopring: "0.25%",
    derivadex: "Unknown",
    serum: "Unknown",
  },
}, {
  header: "Maker Rebate",
  values: {
    demex: "0.05%",
    dydx: "0% - 0.05%",
    injective: "Unknown",
    loopring: "0.15%",
    derivadex: "Unknown",
    serum: "Unknown",
  },
}, {
  header: "Create wallet fee / Depositing on Layer 2 fee?",
  values: {
    demex: "One-time on first ETH or ERC20 deposit for Layer 2 trading",
    dydx: "Deposit and withdrawal gas fees (depends on Ethereum)",
    injective: "Unknown",
    loopring: "One-time on first ETH or ERC20 deposit for Layer 2 trading",
    derivadex: "Unknown",
    serum: "Unknown",
  },
}];
