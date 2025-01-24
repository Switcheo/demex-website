import { TypeUtils } from "carbon-js-sdk";

export type EventAction =
  // General
  "launch_app" // Launch Demex web app

  // Trade
  | "click_market" // click specific market
  | "click_trade" // click link to Trade UI page

  // Swap
  | "click_swap" // click link to Swap page

  // Referrals
  | "click_referrals"

  // Markets
  | "click_markets" // click link to Markets UI page

  // Stake
  | "click_stake" // click link to Stake UI page

  // Pools
  | "click_pools" // click link to Pools UI page
  | "click_perp_pools" // click link to Perp Pools UI page

  // Leaderboard
  | "click_leaderboard" // click link to Leaderboard UI page

  // Competition
  | "click_competition" // click link to Competition UI page
  | "click_competition_registration" // click link to Competition UI page

  // Borrow
  | "click_nitron" // click link to Nitron page

  // Liquidations
  | "click_nitron_liquidations" // click link to Nitron Liquidations page

  // Promotion Hub
  | "click_promotion_hub"

  // Earn
  | "click_earn_now" // click link to Pools page

  // Rewards
  | "click_airdrop" // click link to Airdrop page

export const sendGaEvent = (eventAction: EventAction, args?: TypeUtils.SimpleMap<string>) => {
  const data = cleanUndefined({
    event: eventAction,
    ...args,
  });

  if (typeof window !== "undefined") {
    (window as any).logGoogleAnalytics?.(data);
    (window as any).dataLayer?.push(data);
  }
};

const cleanUndefined = (args: any = {}) => {
  for (const key in args) {
    if (typeof args[key] === "undefined") {
      delete args[key]; // eslint-disable-line no-param-reassign
    }
  }
  return args;
};