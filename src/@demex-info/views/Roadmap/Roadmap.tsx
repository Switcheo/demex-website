import { Box, Button, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import { Timeline, TimelineMobile } from "./components";

import RightGradient from "./assets/RightGradient.svg";
import LeftGradient from "./assets/LeftGradient.svg";
import { Fade, Flip } from "react-awesome-reveal";
import { StaticLinks } from "@demex-info/constants";

const Features: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box className={classes.root}>
      <div className={classes.roadmapWrapper}>
        <div className={classes.headerWrapper}>
          <Fade triggerOnce direction="bottom-left">
            <div>
              <Typography variant="h2" className={classes.title}>
                Shaping The Future of Demex
              </Typography>
              <Typography variant="h4" className={classes.description}>
                Trade, Earn, and Multiply. Turning our vision into reality.
              </Typography>
            </div>
          </Fade>

          <Flip triggerOnce direction="vertical">
            <Button
              variant="outlined"
              color="primary"
              href={StaticLinks.DemexDocs.Roadmap}
              target="_blank"
              className={classes.button}
            >
              Roadmap
            </Button>
          </Flip>
        </div>
        {isMobile ? (
          <TimelineMobile />
        ) : (
          <Timeline />
        )}
      </div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(3),
    padding: theme.spacing(15, 0, 30),
    [theme.breakpoints.up("sm")]: {
      backgroundImage: `url(${RightGradient}), url(${LeftGradient})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right, left",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4, 0),
    },
  },
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      gap: theme.spacing(2),
    },
  },
  title: {
    ...theme.typography.h2,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      ...theme.typography.h3,
    },
    [theme.breakpoints.down("xs")]: {
			...theme.typography.h4,
      textAlign: "center",
    },
  },
  description: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      ...theme.typography.h5,
      maxWidth: "unset",
      minHeight: "3.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title3,
      minHeight: "unset",
      textAlign: "center",
    },
  },
  button: {
    width: "150px",
    height: "46px",
    color: "#66B8FF",
    border: "1px solid #148AFF",
    borderRadius: theme.spacing(1),
    boxShadow: "0px 0px 40px 0px #007AFF40 inset",
    textTransform: "uppercase",
    fontWeight: 600,
    lineHeight: "unset",
    "&:hover": {
      boxShadow: "0 0 1em 0.5em #007aff40 inset",
      filter: "drop-shadow(0 0 15px rgb(0,122,255, .8))",
    },
    [theme.breakpoints.down("xs")]: {
      ...theme.typography.body3,
      width: "98px",
      height: "33px",
      lineHeight: "unset",
    },
  },
  roadmapWrapper: {
    magin: "0 auto",
    maxWidth: "1346px",

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(3),
    },
  },
}));

export default Features;
