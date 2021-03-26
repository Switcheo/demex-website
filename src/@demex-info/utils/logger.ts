export default function logger(...args: any) {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === "development" || (window as any).debugMode) { // eslint-disable-line no-undef
		console.log(...args); // eslint-disable-line no-console
	}
}
