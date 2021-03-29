import { Box, Theme, Typography, makeStyles } from "@material-ui/core";

import React from "react";
import { TypographyLabel } from "@demex-info/components";

const NotATrader: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.innerDiv}>
      <Box>
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
    </Box>
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
