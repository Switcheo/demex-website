import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

import DevnetPromoBackground from "@demex-info/assets/background/DevnetPromo.png";
import { StaticLinks } from "@demex-info/constants";

const DevnetPromoBanner: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.bannerContainer}>
      <Typography className={classes.bannerText}>Try Perp Pools on our Incentivized Public Devnet!&nbsp;&#128293;</Typography>
      <Box className={classes.bannerButtonGroup}>
        <Button
          variant="contained"
          href={StaticLinks.FluoDocs.DevnetLaunch}
          target="_blank"
          className={classes.bannerButton}
        >
          Test Now
        </Button>
        <Button
          variant="outlined"
          href={StaticLinks.FluoDocs.Home}
          target="_blank"
          className={classes.bannerButton}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};


const useStyles = makeStyles((theme: Theme) => ({
  bannerContainer: {
    backgroundColor: theme.palette.background.secondary,
    backgroundImage: `url(${DevnetPromoBackground})`,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5),
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: 1100, //zIndex for menu drawer is 1200
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: theme.spacing(2, 1.5),
    },
  },
  bannerText: {
    ...theme.typography.body2,
  },
  bannerButtonGroup: {
    display: "flex",
    gap: "8px",
  },
  bannerButton: {
    "& .MuiButton-label": {
      ...theme.typography.title3,
    },
  },
}));

export default DevnetPromoBanner;
