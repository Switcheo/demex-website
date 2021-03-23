export const uuidv4 = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0; // eslint-disable-line no-bitwise
		const v = c === "x" ? r : ((r & 0x3) | 0x8); // eslint-disable-line no-bitwise
		return v.toString(16);
	});
};

export function truncateStr(str: string = "", frontNum: number = 8, backNum: number = 8, ellipsis: string = "...") {
	// Check if numbers are negative or zero
	// If negative, get absolute value. If zero, assign default value.
	const frontLimit = frontNum === 0 ? 8 : Math.abs(frontNum);
	const backLimit = backNum === 0 ? 8 : Math.abs(backNum);

	if (str.length > 0) {
		if (str.length > frontLimit + backLimit) {
			return `${str.substr(0, frontLimit)}${ellipsis}${str.substr(-backLimit)}`;
		}
		return str;
	}
	return "";
}
