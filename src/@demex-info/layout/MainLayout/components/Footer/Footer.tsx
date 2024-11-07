import { Box, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { NavFooter } from "./components";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.innerFooter}>
        <NavFooter />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  innerFooter: {
    width: "100%",
    margin: "0 auto",
    padding: theme.spacing(0, 10),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 4),
    },
  },
  root: {
    display: "flex",
    justifyContent: "center",
    minHeight: "11rem",
  },
}));

export default Footer;
