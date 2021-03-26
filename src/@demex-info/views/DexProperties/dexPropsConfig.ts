import { BeProtected, DeepLiquidity, HighPerformance, TakeBackControl } from "@demex-info/assets/animations";

export interface DexProp {
  title: string;
  points: PropItem[];
  animation: any;
}

export interface PropItem {
  label: string;
  statement: string;
}

export const dexPropsArr: DexProp[] = [{
  title: "High Performance Trading",
  points: [{
    label: "any-derivative",
    statement: "Supports any cryptocurrency derivative",
  }, {
    label: "10000TPS",
    statement: "Handles bursts of up to 10,000 TPS",
  }, {
    label: "streamingApis",
    statement: "Complete suite of streaming APIs",
  }],
  animation: HighPerformance,
}, {
  title: "Take Back Control",
  points: [{
    label: "completeOwnership",
    statement: "Complete ownership of your funds",
  }, {
    label: "governedHosted",
    statement: "Governed and hosted by the community",
  }, {
    label: "marketListings",
    statement: "Permissionless market listings",
  }],
  animation: TakeBackControl,
}, {
  title: "Be Protected",
  points: [{
    label: "insuranceFund",
    statement: "Robust insurance fund that mitigates socialized losses",
  }, {
    label: "censorshipResistent",
    statement: "Censorship-resistant",
  }, {
    label: "validators",
    statement: "All trades on-chain, verified by 20+ validators",
  }],
  animation: BeProtected,
}, {
  title: "Deep Liquidity",
  points: [{
    label: "ammBacked",
    statement: "AMM-backed order books",
  }, {
    label: "marketMakeLiquidity",
    statement: "Anyone can market-make using our liquidity pools",
  }, {
    label: "liquidityBackstops",
    statement: "Multiple liquidity backstops through Uniswap and Kyber Network",
  }],
  animation: DeepLiquidity,
}];
