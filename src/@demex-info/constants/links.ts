import { Discord, Facebook, LinkedIn, Medium, Reddit, Telegram, Twitter, Youtube } from "@demex-info/assets/logos";
import { Network } from "@demex-info/utils/restClient";

export const Paths = {
  Home: "/",

  Login: {
    Main: "/login",
    Ledger: "/login/ledger",
    MetaMask: "/login/metamask",
    EncryptedKey: "/login/encrypted_key",
    Keplr: "/login/keplr",
  },

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

  Trade: "/trade",

  Stake: {
    List: "/stake",
    Manage: "/stake/manage",
    Rewards: "/stake/rewards",
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
};

export const DemexHosts: { [key: string]: string } = {
  [Network.MainNet]: "https://app.dem.exchange",
  [Network.TestNet]: "https://beta-app.dem.exchange",
  [Network.DevNet]: "https://dev-app.dem.exchange",
  [Network.LocalHost]: "http://127.0.0.1:3000",
};

export const StaticLinks = {
  JoinValidator: "https://github.com/Switcheo/tradehub",
  SwitcheoTokenArticle: "https://blog.switcheo.network/a-brave-new-chapter/",
  CarbonNetwork: "https://carbon.network/",
  TermsConditions: "https://switcheo.network/terms-of-use",
  Api: {
    Home: "https://docs.switcheo.org/",
    MatchingEngine: "https://docs.switcheo.org/#/?id=matching-engine",
  },
  ContactUs: "https://support.switcheo.network/en/",
  Feedback: "https://ideas.dem.exchange/",
  Socials: {
    Facebook: "https://www.facebook.com/SwitcheoExchange",
    LinkedIn: "https://www.linkedin.com/company/switcheonetwork/",
    SwitcheoTwitter: "https://twitter.com/SwitcheoNetwork",
    DemexTwitter: "https://twitter.com/demexchange",
    Reddit: "https://www.reddit.com/r/Switcheo/",
    Telegram: "https://t.me/switcheo",
    Youtube: "https://www.youtube.com/channel/UCqZ9sxvw-0UoHzno4-d97oQ",
    Medium: "https://medium.com/switcheo",
    Discord: "https://discord.gg/SPh62Hf",
  },
  ExternalBlockchains: {
    Eth: "https://etherscan.io/tx/",
    EthRopsten: "https://ropsten.etherscan.io/tx/",
    Neo: "https://neotube.io/transaction/",
    Bsc: "https://bscscan.com/tx/",
    BscTestnet: "https://testnet.bscscan.com/tx/",
  },
  DemexDocs: {
    Home: "https://docs.dem.exchange",
    Start: {
      CreateAccount: "https://docs.dem.exchange/getting-started/creating-a-demex-account",
    },
    LiquidityPools: {
      Instructions: "https://docs.dem.exchange/getting-started/committing-liquidity-pool-tokens",
      Faqs: "https://docs.dem.exchange/products/what-is-liquidity-pooling/faqs",
    },
    Trade: {
      Spot: "https://docs.dem.exchange/products/trading-spot-markets",
      Futures: "https://docs.dem.exchange/products/futures/trading-futures-on-demex",
    },
    Fees: "https://docs.dem.exchange/getting-started/fees",
  },
  Tendermint: "https://tendermint.com/core/",
};

export function getNetworkQueryParam(net: Network) {
  if (net === Network.LocalHost) {
    return `net=${net.toLowerCase().replace(/host$/, "")}`;
  }
  return `net=${net.toLowerCase().replace(/net$/, "")}`;
}
export function getExplorerHost(net: Network) {
  if (net === Network.MainNet) {
    return "https://switcheo.org";
  }
  return "https://staging.switcheo.org";
}

export function getDemexHost(net: Network) {
  if (net) {
    return DemexHosts[net];
  }
  return "";
}

export function getDemexLink(path: string, net: Network = Network.MainNet) {
  return `${getDemexHost(net)}${path}`;
}

export function getExplorerLink(net: Network) {
  return `${getExplorerHost(net)}?${getNetworkQueryParam(net)}`;
}

export function goToLink(link: string) {
  if (!link) return;
  window.open(link, "_blank");
}

export const BUY_SWITCHEO_LINK: string = "https://switcheo.exchange/markets/SWTH_NEO";

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
};
