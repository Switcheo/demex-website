// Copy pasted from https://github.com/mui-org/material-ui/blob/9c053f85f0353cfc5ede1ce8cc0a87a618675277/packages/material-ui/src/SvgIcon/SvgIcon.js
// but removing the default 0 0 24 24 viewBox prop
// and removing the styles as it will be replaced by the real one.

// See issue https://github.com/mui-org/material-ui/issues/18782

import { withStyles } from "@material-ui/core";
import capitalize from "@material-ui/core/utils/capitalize";
import clsx from "clsx";
import React from "react";

export const styles = () => ({
  root: {},
  colorPrimary: {},
  colorSecondary: {},
  colorAction: {},
  colorError: {},
  colorDisabled: {},
  fontSizeInherit: {},
  fontSizeSmall: {},
  fontSizeLarge: {},
});

// eslint-disable-next-line react/display-name
const SvgIcon = React.forwardRef((props: any, ref) => {
  const {
    children,
    classes,
    className,
    color = "inherit",
    component: Component = "svg",
    fontSize = "default",
    htmlColor,
    titleAccess,
    viewBox,
    ...other
  } = props;

  const newProps = {
    className: clsx(
      classes.root,
      {
        [classes[`color${capitalize(color)}`]]: color !== "inherit",
        [classes[`fontSize${capitalize(fontSize)}`]]: fontSize !== "default",
      },
      className,
    ),
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : "true",
    role: titleAccess ? "img" : "presentation",
    ref,
    ...other,
  };
  if (viewBox) {
    newProps.viewBox = viewBox;
  }

  return React.createElement(
    Component,
    newProps,
    children,
    titleAccess ? <title>{titleAccess}</title> : null,
  );
});

// @ts-ignore
SvgIcon.muiName = "SvgIcon";

export default withStyles(styles, { name: "MuiSvgIcon" })(SvgIcon);
