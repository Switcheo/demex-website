/* eslint-disable no-unused-vars */
import AttachMoney from "@demex-info/assets/icons/AttachMoney.svg";
import { makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React, { ComponentPropsWithoutRef } from "react";
import { TokenAssets, TokenNameMap } from "./constants";

export interface CoinIconProps extends ComponentPropsWithoutRef<"img"> {
  denom?: string;
  outlined?: boolean;
  hideUnknown?: boolean;
}

const getTokenName = (
  denom: CoinIconProps["denom"],
  outlined: CoinIconProps["outlined"] = false,
): string => {
  let tokenName = (denom ?? "").toUpperCase();
  if (TokenNameMap[tokenName]) {
    tokenName = TokenNameMap[tokenName];
  }
  if (outlined) {
    tokenName += "Outlined";
  }
  return tokenName;
};

const CoinIcon: React.FunctionComponent<CoinIconProps> = ({
  denom,
  outlined = false,
  hideUnknown = false,
  className,
  ...rest
}: CoinIconProps) => {
  const classes = useStyles();

  const tokenName = getTokenName(denom, outlined);
  const iconFile = `${tokenName}.svg`;
  const fallbackIconFile = AttachMoney;

  const hasAsset: boolean = !!TokenAssets?.[iconFile];
  if (!hasAsset && hideUnknown) return null;
  return (
    <img
      src={TokenAssets?.[iconFile]?.default ?? fallbackIconFile}
      alt={tokenName}
      className={clsx(
        classes.svg, 
        className,
        { isDefault: !hasAsset },
      )}
      {...rest}
    />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  svg: {
    fontSize: "inherit",
    borderRadius: "100%",
    "&.isDefault": {
      filter: "invert(1)",
    },
  },
}));

export default CoinIcon;
