import { BackgroundAnimation, TypographyLabel } from "@demex-info/components";
import { Box, Hidden, makeStyles } from "@material-ui/core";
import React from "react";
import { MarketsMarquee, TokensMarquee } from "./components";

interface Props {

}
const UnleashTrader: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Hidden smDown>
        <BackgroundAnimation positionClass={classes.position} containerClass={classes.container} paddingClass={classes.padding} />
      </Hidden>
      <TypographyLabel className={classes.mainHeader}>
        Unlimited Connections 
      </TypographyLabel>
      <TypographyLabel boxClass={classes.subtextBox} className={classes.subtext}>
        We&apos;re connected to virtually any chain. Trade any market, token, or instrument right now.
      </TypographyLabel>
      <MarketsMarquee />
      <TokensMarquee />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.base,
    zIndex: 1,
    marginTop: "0.5rem",
    alignItems: "center",
    marginBottom: "10rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "5rem",
      
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
		},
  },
  mainHeader: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    marginBottom: "1.5rem",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.h2,
      padding: "4.5rem 1rem 0",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
      lineHeight: "38px",
      maxWidth: "calc(100% - 2rem)",
			margin: "0 auto",
      textAlign: "center",
		},
  },
  subtextBox: {
    maxWidth: "67rem",
    marginBottom: "1.75rem",
  },
  position: {
    position: "absolute",
    left: 0,
    width: "50vw",
    overflow: "hidden",
    [theme.breakpoints.up("lg")]: {
      top: "-30rem",
      left: "50%",
      height: "calc(100vh + 40rem)",
    },
    [theme.breakpoints.down("md")]: {
      overflow: "hidden",
      top: "-125px",
      minHeight: "60rem",
    },
    [theme.breakpoints.down("xs")]: {
      top: "-200px",
    },
  },
  container: {
    zIndex: -2,
    position: "relative",
    margin: "0 auto",
    width: "1480px",
    [theme.breakpoints.only("md")]: {
      maxWidth: "unset",
      margin: "-70% ​-100%",
    },
  },
  padding: {
    height: "56.25%",
    [theme.breakpoints.down("md")]: {
      height: "25%",
    },
  },
  subtext: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.body2,
      padding: "0 1rem",
			marginTop: "0.75rem",
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
		},
  },
}));

export default UnleashTrader;
