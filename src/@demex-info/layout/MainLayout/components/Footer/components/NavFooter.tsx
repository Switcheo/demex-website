import { DemexLogo } from "@demex-info/assets/logos";
import { CustomAccordion, TypographyLabel } from "@demex-info/components";
import { getExplorerLink, NavLink, StaticLinks } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { StyleUtils } from "@demex-info/utils/styles";
import { Box, Hidden, Link, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import SocialLinkBox from "./SocialLinkBox";

interface NavLinkMap {
  title: string;
  items: NavLink[];
}

const NavFooter: React.FC = () => {
  const classes = useStyles();
  const net = useSelector((state: RootState) => state.app.network);

  const FooterNavMap: NavLinkMap[] = [
    {
      title: "About Demex",
      items: [
        {
          label: "Blog",
          href: StaticLinks.DemexBlog,
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          label: "Explorer",
          href: getExplorerLink(net),
        }, {
          label: "GitHub",
          href: StaticLinks.Socials.GitHub,
        },
        {
          label: "Brand Assets",
          href: StaticLinks.BrandAssets,
        },
      ],
  }];

  return (
    <Box className={classes.root}>
      <Box className={classes.logoWrapper}>
        <DemexLogo className={classes.bottomLogo} />
        <Hidden smUp>
          <TypographyLabel className={classes.copyright}>
            © 2024 Demex. All rights reserved.
          </TypographyLabel>
        </Hidden>
        <Hidden only="xs">
          <SocialLinkBox />
        </Hidden>
      </Box>
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
          </Hidden>
          <Hidden smUp>
            <React.Fragment>
              <Box className={classes.mobileMenu}>
                {FooterNavMap.map((footerNav: NavLinkMap) => {
                  return (
                    <CustomAccordion
                      key={footerNav.title}
                      accordionSummary={footerNav.title}
                      accordionDetails={(
                        <React.Fragment>
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
                        </React.Fragment>
                      )}
                      accordionClasses={{
                        acordionSummary: classes.accordionSummary,
                      }}
                    />
                  );
                })}
              </Box>
            </React.Fragment>
          </Hidden>
        </Box>
      </Box>
      <Hidden smUp>
        <SocialLinkBox />
      </Hidden>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(12.5),
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(5.5, 0),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2.5, 0, 3),
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(3),
    },
  },
  logoWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  navBox: {
    display: "flex",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  navDiv: {
    minWidth: "12.5rem",
  },
  navLink: {
    ...theme.typography.body3,
    display: "block",
    marginTop: "0.625rem",
    color: theme.palette.text.secondary,
    "&:hover": {
      background: StyleUtils.primaryGradient(theme),
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
      textDecoration: "none",
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: 0,
      ...theme.typography.body4,
    },
  },
  navTxt: {
    ...theme.typography.body2,
    fontWeight: 700,
  },
  copyright: {
    ...theme.typography.body4,
    color: theme.palette.text.secondary,
    fontSize: "0.5625rem",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  accordionSummary: {
    ...theme.typography.title3,
  },
}));

export default NavFooter;
