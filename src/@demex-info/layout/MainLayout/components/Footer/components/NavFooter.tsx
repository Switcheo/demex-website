import { DemexLogo } from "@demex-info/assets/logos";
import { TypographyLabel } from "@demex-info/components";
import { getDemexLink, getExplorerLink, NavLink, Paths, StaticLinks } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { StyleUtils } from "@demex-info/utils/styles";
import { Box, Hidden, Link, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { ExternalLink } from "../../Header/assets";

interface NavLinkMap {
  title: string;
  items: NavLink[];
}

const NavFooter: React.FC = () => {
  const classes = useStyles();
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
      label: "Nitron",
      href: getDemexLink(Paths.Nitron.Main, net),
    }, {
      label: "GLP Compounder",
      href: getDemexLink(Paths.Strategy.GLPWrapper, net),
    }, {
      label: "Stake",
      href: getDemexLink(Paths.Stake.List, net),
    }],
  }, {
    title: "Resources",
    items: [{
      label: "API",
      href: StaticLinks.Api.Home,
      external: true,
    }, {
      label: "Explorer",
      href: getExplorerLink(net),
      external: true,
    }, {
      label: "Guide",
      href: StaticLinks.DemexDocs.Home,
      external: true,
    }, {
      label: "User Feedback",
      href: StaticLinks.Feedback,
      external: true,
    }],
  }, {
    title: "About Demex",
    items: [{
      label: "Ecosystem",
      href: StaticLinks.CarbonNetwork,
      external: true,
    }, {
      label: "Blog",
      href: StaticLinks.DemexBlog,
      external: true,
    }, /* {
      label: "T&C",
      href: StaticLinks.TermsConditions,
    } */],
  }];

  return (
    <Box className={classes.root}>
      <DemexLogo className={classes.bottomLogo} />
      <Box className={classes.footerNav}>
        <Box className={classes.navBox}>
          <Hidden only="xs">
            {FooterNavMap.map((footerNav: NavLinkMap) => {
              return (
                <Box className={classes.navDiv} key={footerNav.title}>
                  <TypographyLabel className={classes.navTxt}>
                    {footerNav.title}
                  </TypographyLabel>
                  {footerNav.items.map((navItem: NavLink) => {
                    if (navItem?.href) {
                      return (
                        <Link
                          className={classes.navLink}
                          color="textPrimary"
                          key={navItem.label}
                          href={navItem?.href}
                          target={navItem.external ? "_blank" : "_self"}
                        >
                          {navItem.label}
                          {navItem.external && <ExternalLink />}
                        </Link>
                      );
                    }
                    return null;
                  })}
                </Box>
              );
            })}
            {/* <SocialLinkBox /> */}
          </Hidden>
          <Hidden smUp>
            <React.Fragment>
              <Box className={classes.mobileMenu}>
                {FooterNavMap.map((footerNav: NavLinkMap, index: number) => {
                  if (index === 2) return null;
                  return (
                    <Box className={clsx(classes.navDiv, `child-${index}`)} key={footerNav.title}>
                      <TypographyLabel className={classes.navTxt}>
                        {footerNav.title}
                      </TypographyLabel>
                      {footerNav.items.map((navItem: NavLink) => {
                        if (navItem?.href) {
                          return (
                            <Link
                              className={classes.navLink}
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
                  );
                })}
              </Box>
              <Box display="flex" mt={3}>
                <Box className={clsx(classes.navDiv, "child-2")} key={FooterNavMap[2].title}>
                  <TypographyLabel className={classes.navTxt}>
                    {FooterNavMap[2].title}
                  </TypographyLabel>
                  {FooterNavMap[2].items.map((navItem: NavLink) => {
                    if (navItem?.href) {
                      return (
                        <Link
                          className={classes.navLink}
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
              </Box>
            </React.Fragment>
          </Hidden>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(6, 0),
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
  mobileMenu: {
    display: "flex",
  },
  navBox: {
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  navDiv: {
    minWidth: "12.5rem",
    [theme.breakpoints.only("sm")]: {
      minWidth: "unset",
      width: "33%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      marginRight: theme.spacing(0),
      minWidth: "unset",
      "&.child-0, &.child-2": {
        paddingRight: theme.spacing(4.5),
      },
      "&.child-1": {
        paddingLeft: theme.spacing(4.5),
      },
    },
    "@media (max-width: 360px)": {
      "&.child-0, &.child-2": {
        paddingRight: theme.spacing(0),
      },
      "&.child-1": {
        paddingLeft: theme.spacing(2.5),
      },
    },
  },
  navLink: {
    ...theme.typography.body3,
    display: "block",
    marginTop: "0.625rem",
    "& svg": {
      marginLeft: theme.spacing(0.5),
      scale: 0.8,
      "& path": {
        fill: theme.palette.text.primary,
      },
    },
    "&:hover": {
      background: StyleUtils.primaryGradient(theme),
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
      textDecoration: "none",
      "& svg path": {
        fill: "url(#demexLinearGradient)",
      },
    },
  },
  navTxt: {
    ...theme.typography.body3,
    color: theme.palette.text.secondary,
  },
}));

export default NavFooter;
