import { NavLink } from "@demex-info/constants";
import useHeaderLinks from "@demex-info/hooks/useHeaderLinks";
import { StyleUtils } from "@demex-info/utils/styles";
import { Box, Button, Hidden, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { ExternalLink } from "../assets";
import OptionsDropdown from "./OptionsDropdown";

const HeaderMenu: React.FC = () => {
  const classes = useStyles();
  const navLinksArr = useHeaderLinks();

  return (
    <Hidden smDown>
      {navLinksArr.map((navLink: NavLink) => {
        if (!!navLink.dropdownItems?.length) { // eslint-disable-line no-extra-boolean-cast
          return (
            <OptionsDropdown
              items={navLink.dropdownItems}
              key={`menu-tab-${navLink.label}`}
              title={navLink.label}
            />
          );
        } else {
          return (
            <Box key={`menu-tab-${navLink.label}`} className={classes.tabWrapper}>
              <Button
                variant="text"
                className={classes.navLink}
                key={navLink.label}
                href={navLink?.href ?? ""}
                target={navLink.showIcon ? "_blank" : "_self"}
              >
                {navLink.label}
                &nbsp;
                {navLink?.showIcon && (
                  <ExternalLink />
                )}
              </Button>
              <Box className={classes.activeIndicator} />
            </Box>
          );
        }
      })}
    </Hidden>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  navLink: {
    ...theme.typography.body2,
    height: "100%",
    padding: "0px 20px",
    borderRadius: 0,
    fontWeight: 400,
    opacity: 1,
    color: theme.palette.text.secondary,
    "&:hover": {
      textShadow: `.5px 0 0 ${theme.palette.text.secondary}`,
      backgroundColor: "transparent",
      textDecoration: "none",
      color: theme.palette.text.primary,
      "& svg path": {
        fill: theme.palette.text.primary,
      },
    },
    "@media (min-width: 960px) and (max-width: 1056px)": {
      padding: theme.spacing(0, 2.5),
    },
  },
  tabWrapper: {
    position: "relative",
    flex: 1,
    height: "4rem",
    "&:hover > $activeIndicator": {
      background: StyleUtils.primaryGradientHover(theme),
    },
  },
  activeIndicator: {
    height: "2px",
    position: "absolute",
    background: "transparent",
    borderRadius: "4px",
    width: "calc(100% - 40px)",
    marginLeft: "20px",
    marginTop: -2,
  },
}));

export default HeaderMenu;
