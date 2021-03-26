import { Hidden, Link, Theme, makeStyles } from "@material-ui/core";
import { NavLink, Paths, StaticLinks, getDemexLink, getExplorerLink } from "@demex-info/constants";

import { ExternalLink } from "@demex-info/assets/icons";
import React from "react";
import { RootState } from "@demex-info/store/types";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const HeaderMenu: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const net = useSelector((state: RootState) => state.app.network);

  const navLinksArr: NavLink[] = [
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
    // {
    //   label: "Leaderboard",
    //   href: Paths.Leaderboard,
    // },
    {
      label: "Tradescan",
      href: getExplorerLink(net),
    },
    {
      showIcon: true,
      label: "Ecosystem",
      href: StaticLinks.SwitcheoNetwork,
    },
  ];

  return (
    <Hidden smDown>
      {navLinksArr.map((navLink: NavLink) => {
        if (navLink.path) {
          return (
            <Link
              color="textPrimary"
              className={classes.navLink}
              component="button"
              key={navLink.label}
              onClick={() => history.push(navLink?.path ?? "")}
            >
              {navLink.label}
            </Link>
          );
        }
        if (navLink?.href) {
          return (
            <Link
              color="textPrimary"
              className={classes.navLink}
              key={navLink.label}
              href={navLink?.href}
              target="_blank"
            >
              {navLink.label}
              {navLink?.showIcon && (
                <ExternalLink className={classes.externalLinkIcon} />
              )}
            </Link>
          );
        }
        return null;
      })}
    </Hidden>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  externalLinkIcon: {
    height: "1rem",
    marginLeft: theme.spacing(0.75),
  },
  navLink: {
    display: "flex",
    fontSize: "0.8375rem",
    fontWeight: 600,
    marginRight: theme.spacing(3.5),
    "&:hover": {
      color: theme.palette.secondary.main,
      textDecoration: "none",
    },
  },
}));

export default HeaderMenu;
