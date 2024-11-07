import TopGradient from "./assets/TopGradient.svg";
import Video1 from "./assets/Video1.svg";
import Video2 from "./assets/Video2.svg";
import React from "react";
import clsx from "clsx";
import { Box, Hidden, Typography, makeStyles } from "@material-ui/core";
import { Fade, Zoom } from "react-awesome-reveal";
import { UnleashTrader } from "@demex-info/components";

const PoweredBySwitcheo: React.FC = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <div className={classes.background} />
      <Hidden smDown>
        <UnleashTrader />
      </Hidden>
      <Fade triggerOnce duration={2000}>
        <Typography variant="h2" className={classes.header}>
          The Fastest Decentralized Trading Experience
        </Typography>
      </Fade>
      <Fade triggerOnce direction="up">
        <Box className={classes.description}>
          Experience perpetual trading with unmatched speed and liquidity. Get up to 50× leverage and low fees — perfect for traders looking to maximize their edge
        </Box>
      </Fade>
      <Zoom triggerOnce duration={2000}>
        <div className={classes.videoContainer}>
          <video className={classes.video} poster={Video1} autoPlay loop muted playsInline>
            <source src="videos/Trading.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video>
        </div>
      </Zoom>
      <Fade triggerOnce duration={2000}>
        <Typography variant="h2" className={clsx(classes.header, "header2")}>
          Decentralized Liquidity High-Yield Opportunities
        </Typography>
      </Fade>
      <Fade triggerOnce direction="up">
        <Box className={classes.description}>
          Provide liquidity and start earning immediately. Take advantage of competitive APYs across cross-chain pools with no lock-up periods.
        </Box>
      </Fade>
      <Zoom triggerOnce duration={2000}>
        <div className={classes.videoContainer}>
          <video className={classes.video} poster={Video2} autoPlay loop muted playsInline>
            <source src="videos/Example.mp4" type="video/mp4" />
          Your browser does not support the video tag.
          </video>
        </div>
      </Zoom>
    </section>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
		zIndex: 1,
    padding: theme.spacing(4, 0),
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundImage: `url(${TopGradient})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center -20rem",
    [theme.breakpoints.down("lg")]: {
      backgroundPosition: "center -8rem",
    },
  },
  header: {
    ...theme.typography.h2,
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    "&.header2": {
      marginTop: theme.spacing(16),
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h3,
      display: "block",
      textAlign: "center",
      "&.header2": {
        marginTop: theme.spacing(8),
      },
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "28px",
      lineHeight: "38px",
    },
  },
  description: {
    ...theme.typography.body1,
    fontWeight: 600,
    textAlign: "center",
    margin: "1rem auto 2.5rem",
    color: theme.palette.text.secondary,
    maxWidth: "50rem",
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
      maxWidth: "46.5rem",
      margin: "1rem auto 0.75rem",
    },
  },
  videoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1.5),
    },
  },
  video: {
    borderRadius: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: "auto",
      maxWidth: "60rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
    },
  },
}));

export default PoweredBySwitcheo;
