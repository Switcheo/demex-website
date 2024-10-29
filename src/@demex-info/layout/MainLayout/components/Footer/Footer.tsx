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
    margin: theme.spacing(0, "auto"),
  },
  root: {
    maxWidth: "1346px",
    margin: "0 auto",
    minHeight: "17.5rem",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1.75),
      margin: 0,
    },
  },
}));

export default Footer;
