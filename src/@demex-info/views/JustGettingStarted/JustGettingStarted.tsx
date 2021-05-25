import { HomeBorderCircle1 } from "@demex-info/assets";
import { TypographyLabel, withLightTheme } from "@demex-info/components";
import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import Loadable from "react-loadable";

const ConversationBox = Loadable({
  loader: () => import("./components/ConversationBox"),
  loading() {
    return (<Box />);
  },
  delay: 1600,
});
const Demex101Box = Loadable({
  loader: () => import("./components/Demex101Box"),
  loading() {
    return (<Box />);
  },
  delay: 1600,
});

const JustGettingStarted: React.FC = () => {
  const classes = useStyles();

  const [titleRef, titleView] = useInView({
    threshold: 0.1,
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
            color="textPrimary"
            align="center"
            className={classes.slideSubtitle}
            variant="subtitle1"
          >
            Discover infinite possibilities with Demex. You are limited only by your own imagination. 
          </TypographyLabel>
        </Box>
        <Box className={clsx(classes.slide, "paperBox", { open: titleView }, classes.gridDiv)}>
          <Grid className={classes.gridContainer} container justify="center">
            <Grid item className={classes.gridItem} sm={12} md={6}>
              <Demex101Box />
            </Grid>

            <Grid item className={classes.gridItem} sm={12} md={6}>
              <ConversationBox />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <HomeBorderCircle1 className={classes.sideBorder} />
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
  gridContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  gridDiv: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(4),
    },
  },
  gridItem: {
    maxWidth: "30.5rem",
    width: "30.5rem",
    [theme.breakpoints.only("xs")]: {
      width: "unset",
      maxWidth: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0, "auto"),
      "&:first-child": {
        marginBottom: theme.spacing(2.5),
      },
    },
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(0, 5),
    zIndex: 10,
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 4),
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(0, 2.5),
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    display: "flex",
    padding: theme.spacing(10.5, 0, 13),
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(7.5, 0, 8),
    },
  },
  sideBorder: {
    height: "22rem",
    left: "-12.5rem",
    position: "absolute",
    bottom: "-12.5rem",
    width: "22rem",
    zIndex: 0,
    transform: "rotate(-15deg)",
    [theme.breakpoints.only("md")]: {
      bottom: "-10.25rem",
      height: "18rem",
      left: "-10.25rem",
      width: "18rem",
    },
    [theme.breakpoints.only("sm")]: {
      bottom: "-10rem",
      height: "18rem",
      left: "-10rem",
      width: "18rem",
    },
    [theme.breakpoints.only("xs")]: {
      bottom: "-7rem",
      height: "13rem",
      left: "-7rem",
      width: "13rem",
      transform: "rotate(-20deg)",
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
  slideSubtitle: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    "@media (min-width: 1601px)": {
      fontSize: "1.125rem",
      lineHeight: "1.555em",
    },
  },
}));

export default withLightTheme()(JustGettingStarted);
