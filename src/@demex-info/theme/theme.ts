import { createMuiTheme, PaletteType, Theme } from "@material-ui/core";
import { PaletteColor, PaletteColorOptions, TypeDivider, TypeText, TypeAction } from "@material-ui/core/styles/createPalette";
import _overrides from "./overrides";
import { darkPalette, lightPalette } from "./palettes";
import React from "react";
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

// add custom typography types
declare module "@material-ui/core/styles/createTypography" {
  export interface Typography {
		title1: React.CSSProperties;
		title2: React.CSSProperties;
		title3: React.CSSProperties;
		title4: React.CSSProperties;
    body3: React.CSSProperties;
		body4: React.CSSProperties;
  }

  // allow configuration using `createMuiTheme`
  export interface TypographyOptions {
		title1?: React.CSSProperties;
		title2?: React.CSSProperties;
		title3?: React.CSSProperties;
		title4?: React.CSSProperties;
		body3?: React.CSSProperties;
		body4?: React.CSSProperties;
  }
}

declare module "@material-ui/core/Typography/Typography" {
  export interface TypographyPropsVariantOverrides {
		title1: true;
		title2: true;
		title3: true;
		title4: true;
    body3: true;
		body4: true;
  }
}

// add custom color type
declare module "@material-ui/core/styles/createPalette" {

	export interface TypeBackground {
		default: string;
		paper: string;
    base: string, // custom
    primary: string,
    secondary: string,
    tertiary: string,
    divider: string,
    active: string,
	}

	export interface Palette {
		primary: PaletteColor;
		secondary: PaletteColor;
		error: PaletteColor;
		warning: PaletteColor;
		info: PaletteColor;
		success: PaletteColor;
		text: TypeText;
		divider: TypeDivider;
		action: TypeAction;
		background: TypeBackground;
		shadow: string; // custom
		snow: string;
	}
	export interface PaletteOptions {
		primary?: PaletteColorOptions;
		secondary?: PaletteColorOptions;
		success?: PaletteColorOptions;
		error?: PaletteColorOptions;
		info?: PaletteColorOptions;
		warning?: PaletteColorOptions;
		text?: Partial<TypeText>;
		divider?: string;
		action?: Partial<TypeAction>;
		background?: Partial<TypeBackground>;
		shadow?: string; // custom
		snow?: string;
	}
}