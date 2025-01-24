import { NavLink } from "@demex-info/constants";
import useHeaderLinks from "@demex-info/hooks/useHeaderLinks";
import { Button, Hidden, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { ExternalLink } from "../assets";
import OptionsDropdown from "./OptionsDropdown";

const HeaderMenu: React.FC = () => {
  const classes = useStyles();
  const { fullNavLinks } = useHeaderLinks();

  return (
    <Hidden smDown>
      {fullNavLinks.map((navLink: NavLink) => {
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
            <Button
              variant="text"
              className={classes.navLink}
              key={navLink.label}
              href={navLink?.href ?? ""}
              target={navLink.showIcon ? "_blank" : "_self"}
              onClick={navLink.onClick}
            >
              {navLink.label}
              &nbsp;
              {navLink?.showIcon && (
                <ExternalLink />
              )}
            </Button>
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
    opacity: 1,
    color: theme.palette.text.primary,
    "&:hover": {
      textShadow: `.5px 0 0 ${theme.palette.text.secondary}`,
      backgroundColor: "transparent",
      textDecoration: "none",
      "& svg path": {
        fill: theme.palette.text.primary,
      },
    },
    "@media (min-width: 960px) and (max-width: 1056px)": {
      padding: theme.spacing(0, 2.5),
    },
  },
}));

export default HeaderMenu;
