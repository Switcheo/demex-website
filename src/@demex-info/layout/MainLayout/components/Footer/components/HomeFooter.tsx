import { Box, Theme, makeStyles } from "@material-ui/core";

import React from "react";
import { SwitcheoWordMark } from "@demex-info/assets/logos";
import { TypographyLabel } from "@demex-info/components";

const HomeFooter: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TypographyLabel className={classes.copyright}>
        &copy;2021 Demex. All rights reserved.
      </TypographyLabel>
      <SwitcheoWordMark className={classes.tradehubLogo} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  copyright: {
    color: theme.palette.text.primary,
    fontSize: "0.75rem",
  },
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5, 0),
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  tradehubLogo: {
    height: "0.85rem",
    width: "unset",
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(1),
    },
  },
}));

export default HomeFooter;
