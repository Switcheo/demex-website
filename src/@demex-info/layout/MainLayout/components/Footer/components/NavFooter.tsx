import { Box, Link, Theme, makeStyles } from "@material-ui/core";
import { NavLink, Paths, StaticLinks, getDemexLink, getExplorerLink } from "@demex-info/constants";

import { DemexLogo } from "@demex-info/assets/logos";
import React from "react";
import { RootState } from "@demex-info/store/types";
import SocialLinkBox from "./SocialLinkBox";
import { TypographyLabel } from "@demex-info/components";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

interface NavLinkMap {
  title: string;
  items: NavLink[];
}

const NavFooter: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const net = useSelector((state: RootState) => state.app.network);

  const FooterNavMap: NavLinkMap[] = [{
    title: "Products",
    items: [{
      label: "Trade",
      href: getDemexLink(Paths.Trade, net),
    }, {
      label: "Pools",
      href: getDemexLink(Paths.Pools.List, net),
    }, {
      label: "Staking",
      href: getDemexLink(Paths.Stake.List, net),
    }, /* {
      label: "Leaderboard",
      href: getDemexLink(Paths.Leaderboard, net)
    }, {
      label: "Insurance Fund",
      href: getDemexLink(Paths.InsuranceFund, net),
    } */ ],
  }, {
    title: "Resources",
    items: [{
      label: "API",
      href: StaticLinks.Api.Home,
    }, {
      label: "Tradescan",
      href: getExplorerLink(net),
    }, {
      label: "Docs",
      href: StaticLinks.DemexDocs.Home,
    }, {
      label: "User Feedback",
      href: StaticLinks.Feedback,
    }],
  }, {
    title: "About Demex",
    items: [{
      label: "Ecosystem",
      href: StaticLinks.SwitcheoNetwork,
    }, {
      label: "T&C",
      href: StaticLinks.TermsConditions,
    }],
  }];

  return (
    <Box className={classes.root}>
      <DemexLogo className={classes.bottomLogo} />
      <Box className={classes.footerNav}>
        <Box className={classes.navBox}>
          {FooterNavMap.map((footerNav: NavLinkMap) => (
            <Box className={classes.navDiv} key={footerNav.title}>
              <TypographyLabel boxClass={classes.navTitleBox}>
                {footerNav.title}
              </TypographyLabel>
              {footerNav.items.map((navItem: NavLink) => {
                if (navItem.path) {
                  return (
                    <Link
                      // className={classes.navLink}
                      color="textPrimary"
                      key={navItem.label}
                      component="button"
                      onClick={() => history.push(navItem?.path ?? "")}
                    >
                      {navItem.label}
                    </Link>
                  );
                }
                if (navItem?.href) {
                  return (
                    <Link
                      // className={classes.navLink}
                      color="textPrimary"
                      key={navItem.label}
                      href={navItem?.href}
                      target="_blank"
                    >
                      {navItem.label}
                    </Link>
                  );
                }
                return null;
              })}
            </Box>
          ))}
        </Box>
        <SocialLinkBox />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(7, 0),
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(5.5, 0),
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
      padding: theme.spacing(2.5, 0, 3),
    },
  },
  bottomLogo: {
    width: "6.625rem",
    height: "1.5rem",
  },
  footerNav: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4.5),
    },
  },
  navBox: {
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  navDiv: {
    marginRight: theme.spacing(3.5),
    minWidth: "12rem",
    "&:last-child": {
      marginRight: 0,
    },
    "& a, & button": {
      display: "block",
      fontSize: "0.8375rem",
      fontWeight: "bold",
      marginTop: theme.spacing(2),
      "&:hover": {
        color: theme.palette.secondary.main,
        textDecoration: "none",
      },
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "unset",
    },
    [theme.breakpoints.only("sm")]: {
      width: "33%",
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(4.5),
      width: "100%",
      "&:first-child": {
        marginTop: 0,
      },
    },
  },
  navTitleBox: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.only("xs")]: {
      marginBottom: 0,
    },
    "& p, & h6": {
      color: theme.palette.text.secondary,
      fontSize: "0.8375rem",
      fontWeight: 500,
    },
  },
}));

export default NavFooter;
