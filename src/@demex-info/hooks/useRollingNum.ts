import { BN_ZERO, parseNumber } from "@demex-info/utils";
import BigNumber from "bignumber.js";
import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";

export default (value: number | BigNumber, decimals: number | undefined, duration: number = 1): string | number => {
  let endValue: BigNumber = BN_ZERO;
  if (BigNumber.isBigNumber(value)) {
    endValue = value;
  } else {
    endValue = parseNumber(value, BN_ZERO)!;
  }
  const endNum = endValue.toNumber();

  const { countUp, update } = useCountUp({
    start: 0,
    end: endNum,
    duration,
    separator: ",",
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  });

  const updateValue = useRef(update);

  useEffect(() => {
    updateValue.current(endNum);
  }, [endNum, updateValue]);

  return countUp;
};
