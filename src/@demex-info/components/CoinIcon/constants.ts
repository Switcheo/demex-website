import { importAssets } from "@demex-info/utils";
import * as COINS from "@demex-info/assets";

export const SymbolToIcon: Record<string, any> = {
  ...COINS,
  "1INCH": COINS.INCH,
};

export const TokenNameMap: Record<string, string> = {
  IUSD: "USD",
  NNEO: "NEO",
  BTCB: "BTC",
  BCFX: "CFX",
  "LKT.BEP20": "LKT",
  LUNC: "LUNA",
  USTC: "UST",
  USD: "CUSD",
  AMPLUNA: "ampLUNA",
  AMPKUJI: "ampKUJI",
  "USDC.E": "USDC",
  "RATOM": "rATOM",
  "RSWTH": "rSWTH",
};

export const TokenAssets = importAssets(
  // eslint-disable-next-line no-undef
  require.context("@demex-info/assets/tokens", false, /\.(png|jpe?g|svg)$/),
);