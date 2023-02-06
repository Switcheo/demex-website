import { getDemexLink, goToExternalLink, NavLink, Paths, StaticLinks } from "@demex-info/constants";
import { DropdownMenuItem } from "@demex-info/layout/MainLayout/common/MenuItem";
import { RootState } from "@demex-info/store/types";
import { StyleUtils } from "@demex-info/utils/styles";
import { Box, Button, Hidden, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ExternalLink, GLPCompounder, MenuPools, MenuStake } from "../assets";
import OptionsDropdown from "./OptionsDropdown";

const HeaderMenu: React.FC = () => {
  const classes = useStyles();
  const net = useSelector((state: RootState) => state.app.network);

  const navLinksArr: NavLink[] = [
    {
      label: "Trade",
      href: getDemexLink(Paths.Trade, net),
    },
    {
      label: "Nitron",
      href: getDemexLink(Paths.Nitron.Main, net),
    },
    {
      label: "Earn",
      href: undefined,
    },
    {
      label: "Competition",
      href: getDemexLink(Paths.Competition.Leaderboard, net),
    },
    {
      showIcon: true,
      label: "Ecosystem",
      href: StaticLinks.CarbonNetwork,
    },
  ];

  const earnLinks = React.useMemo((): DropdownMenuItem[] => {
    const initTextLinks: DropdownMenuItem[] = [{
      key: "pools",
      label: "Pools",
      onClick: () => goToExternalLink(getDemexLink(Paths.Pools.List, net)),
      startIcon: MenuPools,
      startIconType: "fill",
    }, {
      key: "glp-compounder",
      label: "GLP Compounder",
      onClick: () => goToExternalLink(getDemexLink(Paths.Strategy.GLPWrapper, net)),
      startIcon: GLPCompounder,
      startIconType: "fill",
    }, {
      key: "staking",
      onClick: () => goToExternalLink(StaticLinks.CarbonhubStake),
      label: "Stake",
      startIcon: MenuStake,
      startIconType: "stroke",
      endIcon: ExternalLink,
      endIconType: "fill",
    }];
    return initTextLinks;
  }, [net]) // eslint-disable-line

  return (
    <Hidden smDown>
      {navLinksArr.map((navLink: NavLink) => {
        if (navLink.href !== undefined) {
          return (
            <Box key={`menu-tab-${navLink.label}`} className={classes.tabWrapper}>
              <Button
                variant="text"
                className={classes.navLink}
                key={navLink.label}
                href={navLink?.href}
                target="_blank"
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
        } else {
          return (
            <OptionsDropdown
              items={earnLinks}
              key={`menu-tab-${navLink.label}`}
            />
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
