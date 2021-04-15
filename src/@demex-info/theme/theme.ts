import { createMuiTheme, PaletteType, Theme } from "@material-ui/core";
import _overrides from "./overrides";
import { darkPalette, lightPalette } from "./palettes";
import { typography } from "./typography";

const applyFlavour = (overrides: any, theme: Theme) => {
	const result: any = {};
	for (const key in overrides)
		result[key] = overrides[key](theme);
	return result;
};

const getPaletteForMode = (mode: PaletteType) => {
	if (mode === "dark") return darkPalette;
	return lightPalette;
};

export function loadTheme(paletteType: "light" | "dark") {
	const palette = getPaletteForMode(paletteType);
	const theme = createMuiTheme({
		palette,
		props: {
			MuiButton: {
				size: "medium",
				variant: "contained",
				disableElevation: true,
			},
			MuiButtonBase: {
				disableRipple: true,
			},
			MuiIconButton: {
				disableRipple: true,
			},
		},
		typography,
	});
	theme.overrides = applyFlavour(_overrides, theme);
	return theme;
}
