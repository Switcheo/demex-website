import { ExternalLink } from "@demex-info/assets/icons";
import { getDemexLink, NavLink, Paths, StaticLinks } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Button, Hidden, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const HeaderMenu: React.FC = () => {
  const classes = useStyles();
  const net = useSelector((state: RootState) => state.app.network);

  const navLinksArr: NavLink[] = [
    {
      label: "Markets",
      href: getDemexLink(Paths.Markets.List, net),
    },
    {
      label: "Trade",
      href: getDemexLink(Paths.Trade, net),
    },
    {
      label: "Pools",
      href: getDemexLink(Paths.Pools.List, net),
    },
    {
      label: "Staking",
      href: getDemexLink(Paths.Stake.List, net),
    },
    {
      label: "Competiton",
      href: getDemexLink(Paths.Competition.Leaderboard, net),
    },
    // {
    //   label: "Leaderboard",
    //   href: Paths.Leaderboard,
    // },
    // {
    //   label: "Explorer",
    //   href: getExplorerLink(net),
    // },
    {
      showIcon: true,
      label: "Ecosystem",
      href: StaticLinks.CarbonNetwork,
    },
  ];

  return (
    <Hidden smDown>
      {navLinksArr.map((navLink: NavLink) => {
        if (navLink?.href) {
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
                {navLink?.showIcon && (
                  <ExternalLink />
                )}
              </Button>
              <Box className={classes.activeIndicator} />
            </Box>
          );
        }
        return null;
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
      background: "linear-gradient(270deg, #007AFF 0%, #00B2FF 100%)",
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
