import { DemexLogo } from "@demex-info/assets/logos";
import { TypographyLabel } from "@demex-info/components";
import { StyleUtils } from "@demex-info/utils/styles";
import { Box, Hidden, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import SocialLinkBox from "./SocialLinkBox";


const NavFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.logoWrapper}>
        <DemexLogo className={classes.bottomLogo} />
        <Hidden smUp>
          <TypographyLabel className={classes.copyright}>
            © 2024 Demex. All rights reserved.
          </TypographyLabel>
        </Hidden>
      </Box>
      <SocialLinkBox />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing(12.5),
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(5.5, 0),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2.5, 0, 3),
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
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
    width: "7.625rem",
    height: "2.5rem",
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
