import { Box, Theme, Typography, makeStyles } from "@material-ui/core";

import React from "react";
import { TypographyLabel } from "@demex-info/components";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

const NotATrader: React.FC = () => {
  const classes = useStyles();

  const [sectionRef, sectionView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={sectionRef} className={classes.innerDiv}>
      <Box className={clsx(classes.slide, { open: sectionView })}>
        <Typography
          color="textPrimary"
          variant="h3"
          className={classes.title}
        >
          Not a Trader?
        </Typography>
        <TypographyLabel
          color="textSecondary"
          className={classes.subtitle}
        >
          Let your cryptoassets work harder for you with more ways to earn.
        </TypographyLabel>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  innerDiv: {
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(11, 2.5, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(6, 2.5),
    },
  },
  slide: {
    opacity: 0,
    transform: "translate(0px, 20px)",
    transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
  },
  subtitle: {
    textAlign: "center",
    maxWidth: "36rem",
    margin: theme.spacing(4, "auto", 0),
  },
  title: {
    textAlign: "center",
  },
}));

export default NotATrader;