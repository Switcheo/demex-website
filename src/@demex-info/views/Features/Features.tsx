import TopGradient from "./assets/TopGradient.svg";
import BackgroundGrid from "./assets/BackgroundGrid.svg";
import { Box, Typography, makeStyles, useMediaQuery } from "@material-ui/core";
import React from "react";
import { CateredInfoDesktop, CateredInfoMobile } from "./components";
import { Fade } from "react-awesome-reveal";

const DexProperties: React.FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <Box className={classes.root}>
      <div className={classes.background} />
      <Box className={classes.mainHeader}>
        <Box className={classes.typoContainer}>
          <Fade triggerOnce duration={2000}>
            <Typography variant="h2" className={classes.typography}>
              Why Choose Demex?
            </Typography>
          </Fade>
          <Fade triggerOnce direction="up">
            <Typography variant="body1" className={classes.description}>
              Whether you’re looking to trade the hottest markets, or earn the highest yield, Demex brings the best of trading and earning.
            </Typography>
          </Fade>
        </Box>
      </Box>
      <Box className={classes.uspList}>
        {isMobile ? <CateredInfoMobile /> : <CateredInfoDesktop />}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    overflowY: "visible",
    paddingTop: "6rem",
		zIndex: 2,
    [theme.breakpoints.up("md")]: {
      background: `url(${BackgroundGrid}) no-repeat`,
      backgroundPosition: "center -90%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "2rem",
    },
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    background: `url(${TopGradient}) no-repeat top`,
    opacity: "90%",
    filter: "blur(40px)",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "250%",
    },
  },
  mainHeader: {
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(6),
      height: "100px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  typoContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    textAlign: "center",
    gap: theme.spacing(2),
  },
  typography: {
    ...theme.typography.h2,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h4,
      whiteSpace: "wrap",
      textAlign: "center",
    },
  },
  description: {
    color: theme.palette.text.secondary,
    "& > b": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("md")]: {
      padding: "0rem 1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
      padding: "0rem 1rem",
      maxWidth: "400px",
    },
  },
  uspList: {
    marginTop: theme.spacing(6),
    maxWidth: "58rem",

    dixplay: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: theme.spacing(0, 1.5),
      marginTop: theme.spacing(4),
    },
  },
  cateredTitle: {
    ...theme.typography.h3,
    color: theme.palette.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  graphicsWrapper: {
    "@media (min-width: 2660px)": {
      width: "1800px",
    },
  },
  svgIcon: {
    position: "relative",
    zIndex: 1,
    top: "215px",
    left: "260px",
    "@media (min-width: 1280px) and (max-width: 1500px)": {
      left: "50px",
    },
  },
  // background animation:
  position: {
    width: "100%",
  },
  container: {
    maxWidth: "1480px",
    "& > div > svg": {
      width: "unset !important",
      top: "-250px !important",
    },
  },
  swirlTop: {
    width: "10rem",
    float: "right",
    marginRight: "-2rem",
  },
}));

export default DexProperties;
