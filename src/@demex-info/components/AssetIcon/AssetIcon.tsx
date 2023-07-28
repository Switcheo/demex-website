import { RootState } from "@demex-info/store/types";
import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CoinIcon, { CoinIconProps } from "../CoinIcon/CoinIcon";

interface Props extends CoinIconProps {
  denomA?: string;
  denomB?: string;
  svgClass?: string;
  rightSvgClass?: string;
  leftSvgClass?: string;
}

const AssetIcon: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const {
    className, denom, svgClass,
    denomA: inputDenomA, denomB: inputDenomB,
    rightSvgClass, leftSvgClass, ...rest } = props;
  const classes = useStyles();
  const sdk = useSelector((store: RootState) => store.app.sdk);

  let denomA = inputDenomA;
  let denomB = inputDenomB;

  let symbols: string[] = [];
  if (denom && !denom.startsWith("ibc/")) {
    symbols = sdk?.token.getTokenName(denom).split("-") ?? [];
  }

  if (symbols.length > 1) {
    [denomA, denomB] = symbols;
  }

  return (
    <Box className={clsx(classes.root, className)}>
      {(denomA && denomB) && (
        <Fragment>
          <CoinIcon denom={denomB} {...rest} className={clsx(classes.icon, classes.rightIcon, svgClass, rightSvgClass)} />
          <CoinIcon denom={denomA} {...rest} className={clsx(classes.icon, classes.leftIcon, svgClass, leftSvgClass)} />
        </Fragment>
      )}
      {(!denomA || !denomB) && (
        <CoinIcon denom={denom} {...rest} className={clsx(classes.icon, svgClass)} />
      )}
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    paddingTop: "2em",
    width: "2em",
    height: "2em",
    flexShrink: 0,
  },
  icon: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  leftIcon: {
    width: "1.75em",
    height: "1.75em",
    transform: "translate(-.25em, 0)",
  },
  rightIcon: {
    width: "1.75em",
    height: "1.75em",
    transform: "translate(.5em, 0)",
  },
}));

export default AssetIcon;
