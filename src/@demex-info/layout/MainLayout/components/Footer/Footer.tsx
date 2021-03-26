import { Box, Divider, Theme, makeStyles } from "@material-ui/core";
import { HomeFooter, NavFooter } from "./components";

import React from "react";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.innerFooter}>
        <NavFooter />
        <Divider />
        <HomeFooter />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  innerFooter: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
  },
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0, 2.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1.75),
    },
  },
}));

export default Footer;
