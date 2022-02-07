import { PoweredByCarbon } from "@demex-info/assets/logos";
import { TypographyLabel } from "@demex-info/components";
import { Box, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const HomeFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TypographyLabel className={classes.copyright}>
        &copy;2021 Demex. All rights reserved.
      </TypographyLabel>
      <PoweredByCarbon className={classes.tradehubLogo} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  copyright: {
    color: theme.palette.text.primary,
    fontSize: "0.75rem",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 0),
    [theme.breakpoints.only("xs")]: {
      display: "block",
      padding: theme.spacing(1, 0, 2),
    },
  },
  tradehubLogo: {
    height: "1rem",
    width: "unset",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      margin: theme.spacing(0.75, "auto", 0),
    },
  },
}));

export default HomeFooter;
