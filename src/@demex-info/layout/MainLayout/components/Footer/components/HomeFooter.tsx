import { PoweredByCarbonFlat } from "@demex-info/assets/logos";
import { TypographyLabel } from "@demex-info/components";
import { Box, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const HomeFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TypographyLabel className={classes.copyright}>
        &copy;2022 Demex. All rights reserved.
      </TypographyLabel>
      <PoweredByCarbonFlat className={classes.tradehubLogo} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  copyright: {
    ...theme.typography.body3,
    color: theme.palette.text.secondary,
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    minHeight: "48px",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      padding: theme.spacing(1, 0, 2),
    },
  },
  tradehubLogo: {
    height: "1.25rem",
    width: "unset",
    [theme.breakpoints.only("xs")]: {
      display: "block",
      margin: theme.spacing(0.75, "auto", 0),
    },
  },
}));

export default HomeFooter;
