import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { darkColors } from "./base";

export const darkPalette: PaletteOptions = {
	...darkColors,
	type: "dark",
	primary: {
    main: darkColors.blue[100],
    light: darkColors.blue[50],
    dark: darkColors.blue[200],
    contrastText: darkColors.mono.text.contrast,
  },
	secondary: {
    main: darkColors.yellow[100],
  },
  success: {
    main: darkColors.green[100],
    light: darkColors.green[50],
  },
  error: {
    main: darkColors.red[100],
    light: darkColors.red[50],
  },
  info: {
    main: darkColors.blue[100],
    light: darkColors.blue[50],
  },
  warning: {
    main: darkColors.yellow[100],
    dark: darkColors.yellow[200],
  },
  text: {
    primary: darkColors.mono.text.primary,
    secondary: darkColors.mono.text.secondary,
    disabled: darkColors.mono.text.tertiary,
    hint: darkColors.mono.text.secondary,
  },
  divider: darkColors.mono.background.divider,
  action: {
    disabled: darkColors.mono.text.tertiary,
    disabledBackground: darkColors.mono.text.disabledBackground,
    active: darkColors.mono.background.active,
    selected: darkColors.mono.background.active,
    hover: darkColors.mono.background.active,
  },
  background: {
    default: darkColors.mono.background.base,
    paper: darkColors.mono.background.secondary,
    base: darkColors.mono.background.base,
    primary: darkColors.mono.background.primary,
    secondary: darkColors.mono.background.secondary,
    tertiary: darkColors.mono.background.tertiary,
    divider: darkColors.mono.background.divider,
    active: darkColors.mono.background.active,
  },
  shadow: darkColors.mono.shadow,
	snow: darkColors.white,
};