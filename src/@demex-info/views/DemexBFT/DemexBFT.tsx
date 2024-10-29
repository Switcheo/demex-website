import React from "react";
import { Fade } from "react-awesome-reveal";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DemexBFTIcon } from "./assets";
import { SvgIcon } from "@demex-info/components";

const DemexBFT: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.wrapper}>
        <Fade triggerOnce direction="left">
          <SvgIcon component={DemexBFTIcon} />
        </Fade>
        <Box className={classes.sidebar}>
          <Fade triggerOnce duration={2000}>
            <Typography className={classes.title}>
              Built on DemexBFT for Security and Speed
            </Typography>
          </Fade>
          <Fade triggerOnce delay={100} duration={2000}>
            <Typography className={classes.description}>
              DemexBFT is a proprietary consensus mechanism designed for enhanced
              security and speed. It is optimized to handle large volumes of trades
              efficiently.
            </Typography>
          </Fade>
          <Fade triggerOnce delay={200}>
            <Button variant="outlined" className={classes.button} disabled>Coming Soon</Button>
          </Fade>
        </Box>
      </div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(5, 0, 20),
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(8),
    maxWidth: "1346px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  sidebar: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "536px",
  },
  title: {
    ...theme.typography.h2,
    color: theme.palette.text.primary,
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(4),
  },
  description: {
    ...theme.typography.h4,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
  },
  button: {
    width: "fit-content",
    height: "48px",
  },
}));

export default DemexBFT;