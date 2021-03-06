import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { palette } from "./base";

export const lightPalette: PaletteOptions = {
	...palette,
	type: "light",
	action: {
		hover: "#F2F5FA",
	},
	primary: {
		main: "#0e111a",
	},
	background: {
		default: "#fcfdff",
		paper: "#F5F7FA",
	},
	divider: "#E3E8F7",
	text: {
		primary: "#363B46",
		secondary: "#6B748B",
		hint: "#8E939B",
	},
};
