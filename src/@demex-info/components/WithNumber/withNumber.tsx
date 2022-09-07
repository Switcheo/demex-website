import {
  createStyles, makeStyles, Theme,
} from "@material-ui/core";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import React from "react";

interface Props {
  children: string
  className?: string
  decimalPlaces?: number
  colorBySign?: boolean
  side?: string
  separateThousands?: boolean
  showDollarSign?: boolean
  showPercentage?: boolean
  showNegativeSign?: boolean
  showPositiveSign?: boolean
  roundMode?: BigNumber.RoundingMode
}
export type WithNumber = Props

function withNumber<T>(Component: React.ComponentType<T>): React.FC<Props & T> {
  const WrappedComponent = (props: Props) => {
    const {
      children, className,
      decimalPlaces, colorBySign, side, separateThousands = true,
      showDollarSign, showPercentage,
      showNegativeSign, showPositiveSign, roundMode = BigNumber.ROUND_UP,
      ...componentProps
    } = props;
    const classes = useStyles();

    let value: BigNumber = new BigNumber(children);

    const fmt: any = {
      decimalSeparator: ".",
      prefix: "",
    };

    if (separateThousands) {
      fmt.groupSeparator = ",";
      fmt.groupSize = 3;
    }

    if (showNegativeSign && value.isNegative()) {
      fmt.prefix += "-";
    }

    if (showPositiveSign && value.isPositive()) {
      fmt.prefix += "+";
    }

    if (showDollarSign) {
      fmt.prefix += "$";
    }

    if (showPercentage) {
      fmt.suffix = "%";
    }

    const classNames = clsx(
      className,
      classes.root,
      side,
      {
        positive: colorBySign && value.isPositive(),
        negative: colorBySign && value.isNegative(),
        zero: colorBySign && value.isZero(),
      },
    );

    // make value absolute because we manually prefix the negative sign before the dollar sign
    value = value.abs();
    const formattedValue: string = decimalPlaces === undefined
      ? value.toFormat(roundMode, fmt)
      : value.toFormat(decimalPlaces, roundMode, fmt);

    const component: any = React.createElement(
      Component,
      {
        ...componentProps,
        className: classNames,
      } as Props & T,
      value.isNaN() ? `${children}` : formattedValue,
    );

    return component;
  };

  WrappedComponent.displayName = `withNumber(${Component.displayName})`;
  return WrappedComponent;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    "&.buy": {
      color: theme.palette.success.main,
    },
    "&.sell": {
      color: theme.palette.error.main,
    },
    "&.positive": {
      color: theme.palette.success.main,
    },
    "&.negative": {
      color: theme.palette.error.main,
    },
    "&.zero": {
      color: theme.palette.text.secondary,
    },
  },
}));

export default withNumber;
