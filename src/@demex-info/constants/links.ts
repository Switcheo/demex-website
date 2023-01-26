import { Discord, Facebook, GitHub, LinkedIn, Medium, Reddit, Telegram, Twitter, Youtube, GitBook } from "@demex-info/assets/logos";
import { CarbonSDK } from "carbon-js-sdk";

export enum LoginPage {
  Ledger = "ledger", // eslint-disable-line no-unused-vars
  Keplr = "keplr", // eslint-disable-line no-unused-vars
  Metamask = "metamask", // eslint-disable-line no-unused-vars
  EncryptedKey = "encryptedKey", // eslint-disable-line no-unused-vars
  Register = "register", // eslint-disable-line no-unused-vars
  Reset = "reset", // eslint-disable-line no-unused-vars
  Main = "main", // eslint-disable-line no-unused-vars
}

export const Paths = {
  Home: "/",

  PasswordReset: "/reset_password",
  Register: "/register",

  Account: {
    Home: "/account",
    Balance: "/account/balance",
    Deposit: "/account/balance/deposit",
    Withdraw: "/account/balance/withdraw",
    Transfer: "/account/transfers",
    Order: "/account/orders",
    Settings: "/account/settings",
    Trade: "/account/trades",
  },

  Errors: {
    Maintenance: "/maintenance",
    Error404: "/error_404",
  },

  Profile: "/profile",

  Markets: {
    List: "/markets",
    Create: "/markets/create",
    Import: "/markets/import",
  },

  Trade: "/trade",

  Stake: {
    List: "/stake",
    Manage: "/stake/manage",
    Rewards: "/stake/rewards",
  },

  Competition: {
    Leaderboard: "/competition",
    SignUp: "/competition/register",
  },

  Pools: {
    List: "/pools",
    Manage: "/pools/manage",
    Create: "/pools/create",
    AddLiquidity: "/pools/add/:pool_denom",
    RemoveLiquidity: "/pools/remove/:pool_denom",
    CommitTokens: "/pools/commit/:pool_denom",
    UnlockTokens: "/pools/unlock/:pool_denom",
  },

  Nitron: {
    Main: "/nitron",
    Liquidations: "/liquidations",
  },
};

export const DemexHosts: { [key: string]: string } = {
  [CarbonSDK.Network.MainNet]: "https://app.dem.exchange",
  [CarbonSDK.Network.TestNet]: "https://beta-app.dem.exchange",
  [CarbonSDK.Network.DevNet]: "https://dev-app.dem.exchange",
  [CarbonSDK.Network.LocalHost]: "http://127.0.0.1:3000",
};

export const StaticLinks = {
  JoinValidator: "https://github.com/Switcheo/tradehub",
  SwitcheoTokenArticle: "https://blog.switcheo.network/a-brave-new-chapter/",
  CarbonNetwork: "https://docs.carbon.network/",
  // TermsConditions: "https://switcheo.network/terms-of-use",
  Blog: "https://blog.switcheo.com/",
  Api: {
    Home: "https://docs.carbon.network/",
    Guide: "https://guide.carbon.network/",
    MatchingEngine: "https://guide.carbon.network/features/decentralized-orderbooks",
    LiquidityPool: "https://guide.carbon.network/features/liquidity-pools",
  },
  ContactUs: "https://support.switcheo.network/en/",
  Feedback: "https://ideas.dem.exchange/",
  Socials: {
    Facebook: "https://www.facebook.com/SwitcheoExchange",
    LinkedIn: "https://www.linkedin.com/company/switcheonetwork/",
    SwitcheoTwitter: "https://twitter.com/SwitcheoNetwork",
    DemexTwitter: "https://twitter.com/demexchange",
    Reddit: "https://www.reddit.com/r/Switcheo/",
    Telegram: "https://t.me/carbon_ecosystem",
    Youtube: "https://www.youtube.com/channel/UCqZ9sxvw-0UoHzno4-d97oQ",
    Medium: "https://medium.com/switcheo",
    Discord: "https://discord.gg/SPh62Hf",
    GitHub: "https://github.com/Switcheo/carbon-js-sdk",
  },
  ExternalBlockchains: {
    Eth: "https://etherscan.io/tx/",
    EthRopsten: "https://ropsten.etherscan.io/tx/",
    Neo: "https://neotube.io/transaction/",
    Bsc: "https://bscscan.com/tx/",
    BscTestnet: "https://testnet.bscscan.com/tx/",
  },
  DemexDocs: {
    Home: "https://guide.dem.exchange/",
    Start: {
      CreateAccount: "https://guide.dem.exchange/getting-started/creating-a-demex-account",
    },
    LiquidityPools: {
      LearnMore: "https://guide.dem.exchange/products/what-is-liquidity-pooling/",
      Instructions: "https://guide.dem.exchange/products/what-is-liquidity-pooling/providing-liquidity-on-demex",
      Faqs: "https://guide.dem.exchange/products/what-is-liquidity-pooling/faqs",
    },
    Trade: {
      Spot: "https://guide.dem.exchange/products/trading-spot-markets",
      Futures: "https://guide.dem.exchange/products/futures/trading-futures-on-demex",
    },
    Fees: "https://guide.dem.exchange/getting-started/fees",
    About: "https://guide.dem.exchange/about-demex/master",
    Features: {
      Orderbook: "https://guide.dem.exchange/about-demex/master/features-overview#orderbook-model-on-amms",
      Crosschain: "https://guide.dem.exchange/about-demex/master/features-overview#cross-chain-compatibility",
    },
    Nitron: "https://guide.dem.exchange/products/nitron",
    Competition: {
      Past: {
        Main: "https://guide.dem.exchange/competition/perpetuals-trading-competition/top-gainers-and-top-traders-2",
        TopGainers: "https://guide.dem.exchange/competition/perpetuals-trading-competition/top-gainers-and-top-traders-1#top-gainers",
        TopTraders: "https://guide.dem.exchange/competition/perpetuals-trading-competition/top-gainers-and-top-traders-1#top-traders",
      },
      Current: {
        Main: "https://guide.dem.exchange/competition/perpetuals-trading-competition/top-gainers-3-dec",
        TopGainers: "https://guide.dem.exchange/competition/perpetuals-trading-competition/top-gainers-3-dec#top-gainers",
        TopTraders: "https://guide.dem.exchange/competition/perpetuals-trading-competition/top-gainers-and-top-traders-2#top-traders",
      },
      Upcoming: {
        Main: "https://guide.dem.exchange/competition/usdosmo-perpetuals-airdrop-campaign-jan-2023",
        TopGainers: "https://guide.dem.exchange/competition/usdosmo-perpetuals-airdrop-campaign-jan-2023",
      },
    },
  },
  Tendermint: "https://tendermint.com/core/",
  Docs: {
    Cosmos: "https://docs.cosmos.network/main/intro/overview.html",
    IBC: "https://ibcprotocol.org/",
    Tendermint: "https://docs.tendermint.com/",
  },
  Swth: "https://hub.carbon.network/buy",
  CosmosIBC: "https://mapofzones.com/",
  PolyNetworkAlliance: "https://www.poly.network/#/",
};

export function getNetworkQueryParam(net: CarbonSDK.Network) {
  if (net === CarbonSDK.Network.LocalHost) {
    return `net=${net.toLowerCase().replace(/host$/, "")}`;
  }
  return `net=${net.toLowerCase().replace(/net$/, "")}`;
}
export function getExplorerHost(net: CarbonSDK.Network) {
  if (net === CarbonSDK.Network.MainNet) {
    return "https://scan.carbon.network/";
  }
  return "https://beta-scan.carbon.network/";
}

export function getDemexHost(net: CarbonSDK.Network) {
  if (net) {
    return DemexHosts[net];
  }
  return "";
}

export function getDemexLink(path: string, net: CarbonSDK.Network = CarbonSDK.Network.MainNet) {
  return `${getDemexHost(net)}${path}`;
}

export function getExplorerLink(net: CarbonSDK.Network) {
  return `${getExplorerHost(net)}?${getNetworkQueryParam(net)}`;
}

export function goToLink(link: string) {
  if (!link) return;
  window.open(`https://app.dem.exchange${link}`, "_blank");
}

export function goToExternalLink(link: string) {
  if (!link) return;
  window.open(`${link}`, "_blank");
}

export interface NavLink {
  showIcon?: boolean | undefined;
  label: string;
  path?: string;
  href?: string;
}

export interface ExtSocialLnk {
  label: string;
  href: string;
  component: any;
  color?: string;
}

export const SocialLnks: { [key: string]: ExtSocialLnk } = {
  Facebook: {
    label: "facebook",
    href: StaticLinks.Socials.Facebook,
    component: Facebook,
  },
  LinkedIn: {
    label: "linkedin",
    href: StaticLinks.Socials.LinkedIn,
    component: LinkedIn,
  },
  Twitter: {
    label: "twitter",
    href: StaticLinks.Socials.DemexTwitter,
    component: Twitter,
  },
  Reddit: {
    label: "reddit",
    href: StaticLinks.Socials.Reddit,
    component: Reddit,
  },
  Telegram: {
    label: "telegram",
    href: StaticLinks.Socials.Telegram,
    component: Telegram,
  },
  Youtube: {
    label: "youtube",
    href: StaticLinks.Socials.Youtube,
    component: Youtube,
  },
  Medium: {
    label: "medium",
    href: StaticLinks.Socials.Medium,
    component: Medium,
  },
  Discord: {
    label: "discord",
    href: StaticLinks.Socials.Discord,
    component: Discord,
  },
  GitHub: {
    label: "github",
    href: StaticLinks.Socials.GitHub,
    component: GitHub,
  },
  GitBook: {
    label: "gitbook",
    href: StaticLinks.DemexDocs.Home,
    component: GitBook,
  },
};
