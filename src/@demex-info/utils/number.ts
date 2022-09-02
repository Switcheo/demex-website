import BigNumber from "bignumber.js";

export const BN_ZERO = new BigNumber(0);
export const BN_HUNDRED = new BigNumber(100);

export const BN_TENTHOUSAND = new BigNumber(10000);
export const BN_MILLION = new BigNumber(1000000);
export const BN_BILLION = new BigNumber(1000000000);

export function parseNumber(number: string | number = "0", defaultValue?: BigNumber): BigNumber | null {
	const bnNumber = new BigNumber(number);
	if (bnNumber.isNaN() || !bnNumber.isFinite()) {
		return defaultValue || null;
	}
	return bnNumber;
}

export function toShorterNum(number: string | number | BigNumber): string {
  let numberBN = BN_ZERO;
  if (!BigNumber.isBigNumber(number)) {
    numberBN = new BigNumber(number);
  } else {
    numberBN = number;
  }
  if (numberBN.gte(BN_BILLION)) {
    return `${numberBN.dividedBy(BN_BILLION).decimalPlaces(2, 1).toString(10)}b`;
  }
  if (numberBN.gte(BN_MILLION) && numberBN.lt(BN_BILLION)) {
    return `${numberBN.dividedBy(BN_MILLION).decimalPlaces(2, 1).toString(10)}m`;
  }
  if (numberBN.gte(BN_TENTHOUSAND) && numberBN.lt(BN_MILLION)) {
    return `${numberBN.toFormat(0, 1)}`;
  }
  return formatUsdPrice(numberBN, false);
}

export function formatUsdPrice(number: string | number | BigNumber, includeDollarSign: boolean = true) {
  const dollarPortion = includeDollarSign ? "$" : "";
  if (!number) return `${dollarPortion}0.00`;

  let newNum = BN_ZERO;
  if (typeof number === "string" || typeof number === "number") {
    newNum = parseNumber(number, BN_ZERO)!;
  } else {
    newNum = number;
  }
  if (newNum.isNaN() || !newNum.isFinite()) {
    return "-";
  }

  if (newNum.isZero()) {
    return `${dollarPortion}0.00`;
  }
  if (newNum.gt(0) && newNum.lt(0.00001)) {
    return `< ${dollarPortion}0.00001`;
  }
  if (newNum.lt(0.1)) {
    return `${dollarPortion}${newNum.toFormat(5)}`;
  }
  return `${dollarPortion}${newNum.toFormat(2)}`;
}

export function toPercentage(number: any, dp: number = 3) {
  if (!number) {
    return BN_ZERO.toFormat(dp);
  }
  let finalBN = BN_ZERO;
  if (!BigNumber.isBigNumber(number)) {
    finalBN = parseNumber(number, BN_ZERO)!;
  } else {
    finalBN = number;
  }
  if (!finalBN.isFinite() || finalBN.isZero()) {
    return BN_ZERO.toFormat(dp);
  }
  return finalBN.times(100).toFormat(dp);
}

export function getDecimalPlaces(num?: string | number): number {
  if (typeof num === "undefined") return 0;
  const moduloResult = parseNumber(num, BN_ZERO)!.modulo(1);
  return moduloResult.decimalPlaces() ?? 0;
}
