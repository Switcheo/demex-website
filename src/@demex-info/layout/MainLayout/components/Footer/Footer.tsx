import { Box, Divider, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { HomeFooter, NavFooter } from "./components";

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
  },
  root: {
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(0, 6),
    minHeight: "17.5rem",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1.75),
    },
  },
}));

export default Footer;
