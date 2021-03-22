import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { palette } from "./base"

export const darkPalette: PaletteOptions = {
  ...palette,
  type: "dark",
  action: {
    hover: "#21252F",
  },
  primary: {
    main: "#141925",
  },
  background: {
    default: "#0F121A",
    paper: "#191e2c",
  },
  text: {
    primary: "#FAFBFC",
    secondary: "#8E939B",
  },
};
