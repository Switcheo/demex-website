import { Box, Grid, Theme, makeStyles } from "@material-ui/core";
import { ConversationBox, Demex101Box } from "./components";
import { TypographyLabel, withLightTheme } from "@demex-info/components";

import React from "react";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

const JustGettingStarted: React.FC = () => {
  const classes = useStyles();

  const [titleRef, titleView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div ref={titleRef} className={classes.root}>
      <Box className={classes.innerDiv}>
        <Box className={clsx(classes.slide, "title", { open: titleView })}>
          <TypographyLabel
            align="center"
            variant="h3"
          >
            Just Getting Started?
          </TypographyLabel>
          <TypographyLabel
            color="textSecondary"
            align="center"
            mt={4}
            variant="subtitle1"
          >
            Discover infinite possibilities with Demex. You are limited only by your own imagination. 
          </TypographyLabel>
        </Box>
        <Box className={clsx(classes.slide, "paperBox", { open: titleView })} mt={6}>
          <Grid container>
            <Grid item className={classes.gridItem} xs={12} md={6}>
              <Demex101Box />
            </Grid>

            <Grid item className={classes.gridItem} xs={12} md={6}>
              <ConversationBox />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  cardSvg: {
    width: "2.5rem",
    height: "2.5rem",
  },
  cardTitle: {
    fontSize: "1.75rem",
    fontWeight: 500,
  },
  gridBox: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(0.25),
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 5%), 0px 1px 3px 0px rgb(0 0 0 / 5%)",
    height: "100%",
    "&:last-child": {
      marginLeft: theme.spacing(1.25),
    },
    "&:first-child": {
      marginRight: theme.spacing(1.25),
    },
    [theme.breakpoints.down("sm")]: {
      "&:last-child": {
        marginLeft: theme.spacing(0),
      },
      "&:first-child": {
        marginRight: theme.spacing(0),
      },
    },
  },
  gridItem: {
    [theme.breakpoints.down("sm")]: {
      "&:first-child": {
        marginBottom: theme.spacing(2.5),
      },
    },
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(0, 2.5),
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(11, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(6, 0),
    },
  },
  slide: {
    opacity: 0,
    transform: "translate(0px, 20px)",
    "&.paperBox": {
      transform: "translate(0px, 60px)",
      transition: "opacity ease-in 0.8s, transform ease-in 0.9s",
    },
    "&.title": {
      transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
    },
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
  },
}));

export default withLightTheme()(JustGettingStarted);
