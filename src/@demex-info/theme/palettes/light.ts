
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { lightColors } from "./base";

export const lightPalette: PaletteOptions = {
	...lightColors,
	type: "light",
	primary: {
    main: lightColors.blue[100],
    light: lightColors.blue[50],
    dark: lightColors.blue[200],
    contrastText: lightColors.mono.text.contrast,
  },
  secondary: {
    main: lightColors.yellow[100],
  },
  success: {
    main: lightColors.green[100],
    light: lightColors.green[50],
  },
  error: {
    main: lightColors.red[100],
    light: lightColors.red[50],
  },
  info: {
    main: lightColors.blue[100],
    light: lightColors.blue[50],
  },
  warning: {
    main: lightColors.yellow[100],
    dark: lightColors.yellow[200],
  },
  text: {
    primary: lightColors.mono.text.primary,
    secondary: lightColors.mono.text.secondary,
    disabled: lightColors.mono.text.tertiary,
    hint: lightColors.mono.text.secondary,
  },
  divider: lightColors.mono.background.divider,
  action: {
    disabled: lightColors.mono.text.tertiary,
    disabledBackground: lightColors.mono.text.disabledBackground,
    active: lightColors.mono.background.active,
    selected: lightColors.mono.background.active,
    hover: lightColors.mono.background.active,
  },
  background: {
    default: lightColors.mono.background.primary,
    paper: lightColors.mono.background.secondary,
    base: lightColors.mono.background.base,
    primary: lightColors.mono.background.primary,
    secondary: lightColors.mono.background.secondary,
    tertiary: lightColors.mono.background.tertiary,
    divider: lightColors.mono.background.divider,
    active: lightColors.mono.background.active,
  },
  shadow: lightColors.mono.shadow,
	snow: lightColors.white,
};