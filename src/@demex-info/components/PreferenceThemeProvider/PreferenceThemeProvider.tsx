import { MuiThemeProvider, PaletteType } from "@material-ui/core";
import { loadTheme } from "@demex-info/theme";
import React from "react";

interface Props {
  children: React.ReactNode
  theme?: PaletteType
}

const PreferenceThemeProvider: React.FC<Props> = (props: Props) => {
  const { children, theme = "dark", ...rest } = props;
  const newTheme = loadTheme(theme);

  return (
    <MuiThemeProvider theme={newTheme} {...rest}>
      {children}
    </MuiThemeProvider>
  );
};

export default PreferenceThemeProvider;
