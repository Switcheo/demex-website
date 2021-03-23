import BigNumber from "bignumber.js";

export const BN_ZERO = new BigNumber(0);

export function parseNumber(number: string | number = "0", defaultValue?: BigNumber): BigNumber | null {
	const bnNumber = new BigNumber(number);
	if (bnNumber.isNaN() || !bnNumber.isFinite()) {
		return defaultValue || null;
	}
	return bnNumber;
}
