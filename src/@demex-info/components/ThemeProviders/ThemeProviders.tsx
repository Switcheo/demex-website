import { loadTheme } from "@demex-info/theme";
import { MuiThemeProvider } from "@material-ui/core";
import React, { ComponentType, ReactElement } from "react";

// eslint-disable-next-line no-unused-vars
type WithComponent = <P = {}>(WrappedComponent: ComponentType<P>) => React.FunctionComponent<P>;

// used to enforce light/dark theme only for components
export const withTheme = (theme: "light" | "dark"): WithComponent => {
  const muiTheme = loadTheme(theme);
  return (
    <P extends {}>(ComponentToWrap: ComponentType<P>): React.FunctionComponent<P> => {
      const component = (props: P): ReactElement<P> => {
        return (
          <MuiThemeProvider theme={muiTheme}>
            <ComponentToWrap
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
            />
          </MuiThemeProvider>
        );
      };
      component.displayName = `withTheme("${ComponentToWrap.displayName}")`;
      return component;
    }
  );
};

export const withLightTheme = (): WithComponent => {
  return withTheme("light");
};

export const withDarkTheme = (): WithComponent => {
  return withTheme("dark");
};
