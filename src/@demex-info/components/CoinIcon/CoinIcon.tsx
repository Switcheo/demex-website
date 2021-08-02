import * as COINS from "@demex-info/assets";
import { makeStyles, SvgIconProps } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const symbolToIcon: { [symbol: string]: any } = {
  ...COINS,
  "1INCH": COINS.INCH,
};

const tokenNameMap: {
  [index: string]: string;
} = {
  IUSD: "USD",
  NNEO: "NEO",
  BTCB: "BTC",
};

export interface CoinIconProps extends SvgIconProps {
  denom?: string;
  outlined?: boolean;
  hideUnknown?: boolean;
}

const CoinIcon: React.FunctionComponent<CoinIconProps> = (
  props: CoinIconProps,
) => {
  const { denom, className, outlined, hideUnknown, ...rest } = props;
  const classes = useStyles();

  let tokenName = (denom ?? "").toUpperCase();
  if (tokenNameMap[tokenName]) {
    tokenName = tokenNameMap[tokenName];
  }
  if (outlined) {
    tokenName += "Outlined";
  }
  let defaultIcon: any = COINS.AttachMoney;

  if (hideUnknown) {
    defaultIcon = undefined;
  }

  const Icon = symbolToIcon[tokenName] || defaultIcon;

  return (
    <Icon
      {...rest}
      className={clsx(classes.svg, className)}
    />
  );
};

const useStyles = makeStyles({
  svg: {
    fontSize: "inherit",
    width: "2em",
    height: "2em",
  },
});

export default CoinIcon;
