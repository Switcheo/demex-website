import {
  BinanceFutures, Bitmex, Bybit, DemexLogo, Deribit, Dydx,
  Injective, Kraken, Loopring, Serum,
} from "@demex-info/assets";

export type PropertyTab = "cex-trading" | "cex-security" | "cex-service" | "dex-technology" | "dex-trading" | "dex-decentralisation" | "cex-fees" | "dex-fees";

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
}, {
  label: "Fees",
  value: "cex-fees",
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
}, {
  label: "Fees",
  value: "dex-fees",
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
  value: "serum",
  component: Serum,
}];

export type RowVal = boolean | string | string[];

export interface CexTradingRow {
  header: string;
  values: {
    [key: string]: RowVal | ListItemHead[];
  };
}

export interface ListItemHead {
  header: string;
  values: string[];
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
  header: "No Private Info Required",
  values: {
    demex: true,
    kraken: false,
    deribit: false,
    bybit: false,
    bitmex: false,
    binance: false,
  },
}, {
  header: "No Registration Required",
  values: {
    demex: true,
    kraken: false,
    deribit: false,
    bybit: false,
    bitmex: false,
    binance: false,
  },
}, {
  header: "Login Methods",
  values: {
    demex: ["Encrypted Key", "Metamask", "Keplr", "Ledger"],
    kraken: ["Email", "KYC"],
    deribit: ["Email", "KYC"],
    bybit: ["Email", "KYC"],
    bitmex: ["Email", "KYC"],
    binance: ["Email", "KYC"],
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
  header: "Engine Performance",
  values: {
    demex: "Up to 10,000 TPS in burst",
    kraken: "Unknown",
    deribit: "Thousands per second",
    bybit: "100,000 TPS",
    bitmex: "200 TPS in burst",
    binance: "Up to 100,000 TPS",
  },
}, {
  header: "Withdrawal / Deposit",
  values: {
    demex: "Instant",
    kraken: "Instant",
    deribit: "10min - 1h depending on Bitcoin network",
    bybit: "3 times a day",
    bitmex: "3 times a day",
    binance: "Instant",
  },
}, {
  header: "Fair API access",
  values: {
    demex: true,
    kraken: false,
    deribit: false,
    bybit: true,
    bitmex: true,
    binance: true,
  },
}, {
  header: "Liquidation",
  values: {
    demex: ["Insurance Fund", "Liquidation Engine (Eventually community owned)"],
    kraken: ["Insurance Fund", "Liquidation Engine"],
    deribit: ["Insurance Fund", "Liquidation engine"],
    bybit: ["Insurance Fund", "Liquidation engine"],
    bitmex: ["Insurance Fund", "Liquidation engine"],
    binance: ["Insurance Fund", "Liquidation engine"],
  },
}];

export const CexFeesVal: CexTradingRow[] = [{
  header: "Spot Market Fees\n(-ve fees are rebates)",
  values: {
    demex: ["0.25% taker", "-0.05% maker"],
    kraken: "0.05% taker, 0.02% maker, depending on volume",
    deribit: "N/A",
    bybit: ["0.075% taker", "-0.025% maker"],
    bitmex: ["0.075% taker", "-0.025% maker"],
    binance: ["0.04% taker", "0.02% maker"],
  },
}, {
  header: "Futures Market Fees\n(-ve fees are rebates)",
  values: {
    demex: ["0.075% taker", "-0.005% maker"],
    kraken: "0.05% taker, 0.02% maker, depending on volume",
    deribit: ["0.05% taker", "0% maker"],
    bybit: ["0.075% taker", "-0.025% maker"],
    bitmex: ["0.075% taker", "-0.025% maker"],
    binance: ["0.04% taker", "0.02% maker"],
  },
}, {
  header: "Options Market Fees\n(-ve fees are rebates)",
  values: {
    demex: "N/A (Upcoming)",
    kraken: "N/A",
    deribit: ["0.03% taker", "0.03% maker"],
    bybit: "N/A",
    bitmex: "N/A",
    binance: ["0.04% taker", "0.02% maker"],
  },
}];

export const DexTechnologyVal: CexTradingRow[] = [{
  header: "> 10,000 Txns/sec",
  values: {
    demex: true,
    dydx: false,
    injective: "Unknown",
    loopring: false,
    serum: true,
  },
}, {
  header: "Block Time",
  values: {
    demex: "1s",
    dydx: "13s",
    injective: "1s",
    loopring: "13s",
    serum: "400ms",
  },
}, {
  header: "Constrained by Public Blockchain",
  values: {
    demex: "No",
    dydx: "Ethereum",
    injective: "No",
    loopring: "Ethereum",
    serum: "Solana",
  },
}, {
  header: "Interoperability",
  values: {
    demex: ["PolyNetwork Alliance", "Cosmos Network IBC"],
    dydx: false,
    injective: ["Cosmos Network IBC"],
    loopring: false,
    serum: false,
  },
}];

export const DexTradingVal: CexTradingRow[] = [{
  header: "Spot",
  values: {
    demex: true,
    dydx: false,
    injective: false,
    loopring: true,
    serum: true,
  },
}, {
  header: "Delivery Futures",
  values: {
    demex: true,
    dydx: true,
    injective: true,
    loopring: false,
    serum: false,
  },
}, {
  header: "Perpetual Swap",
  values: {
    demex: "Upcoming",
    dydx: true,
    injective: true,
    loopring: false,
    serum: false,
  },
}, {
  header: "Options",
  values: {
    demex: "Upcoming",
    dydx: false,
    injective: "Upcoming",
    loopring: false,
    serum: false,
  },
}, {
  header: "Leverage",
  values: {
    demex: "150x",
    dydx: "10x",
    injective: "20x",
    loopring: "N/A",
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
    serum: true,
  },
}, {
  header: "DAO",
  values: {
    demex: true,
    dydx: false,
    injective: false,
    loopring: false,
    serum: true,
  },
}, {
  header: "Community-Owned Insurance Fund",
  values: {
    demex: "Upcoming",
    dydx: false,
    injective: false,
    loopring: false,
    serum: false,
  },
}, {
  header: "Listing New Markets",
  values: {
    demex: "Anyone",
    dydx: "Central Team",
    injective: "Central Team",
    loopring: "Anyone",
    serum: "Anyone",
  },
}];

export const DexFeesVals: CexTradingRow[] = [{
  header: "Fees (Network fee/trade)",
  values: {
    demex: "0",
    dydx: "0",
    injective: "0",
    loopring: "0",
    serum: "$0.00001/txn",
  },
}, {
  header: "Taker Fee",
  values: {
    demex: "0.25%",
    dydx: "0.05% - 0.2%",
    injective: "0.2%",
    loopring: "0.25%",
    serum: "0.22%",
  },
}, {
  header: "Maker Rebate",
  values: {
    demex: "0.05%",
    dydx: "0% - 0.05%",
    injective: "0.1%",
    loopring: "0.15%",
    serum: "0.03%",
  },
}, {
  header: "Create wallet fee / Depositing on Layer 2 fee?",
  values: {
    demex: "One-time on first ETH or ERC20 deposit for Layer 2 trading",
    dydx: "Deposit and withdrawal gas fees",
    injective: "Deposit and withdrawal gas fees",
    loopring: "One-time on first ETH or ERC20 deposit for Layer 2 trading",
    serum: "$0.00001/txn",
  },
}];
