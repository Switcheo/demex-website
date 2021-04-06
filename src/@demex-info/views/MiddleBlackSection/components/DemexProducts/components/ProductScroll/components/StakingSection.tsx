import { Box, Button, Divider, Theme, Typography, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink, goToLink, lottieDefaultOptions } from "@demex-info/constants";

import Lottie from "lottie-react";
import React from "react";
import { RootState } from "@demex-info/store/types";
import { Staking } from "@demex-info/assets";
import { TypographyLabel } from "@demex-info/components";
import { toShorterNum } from "@demex-info/utils";
import { useSelector } from "react-redux";

const StakingSection: React.FC = () => {
  const classes = useStyles();

  const lottieRef = React.useRef<any>();

  const network = useSelector((state: RootState) => state.app.network);
  const { totalStaked } = useSelector((state: RootState) => state.staking.stats);

  const delayAnimation = () => {
    lottieRef?.current?.pause();
    setTimeout(() => {
      lottieRef?.current?.goToAndPlay(0);
    }, 5000);
  };

  return (
    <React.Fragment>
      <Box id="staking" height="0.5rem">
        &nbsp;
      </Box>
      <Box className={classes.productItem}>
        <Typography
          variant="h3"
          color="textPrimary"
          className={classes.title}
        >
          Staking
        </Typography>
        <TypographyLabel color="textSecondary" className={classes.subtitle}>
          Accrue weekly rewards from trading fees and block rewards when you stake SWTH.
        </TypographyLabel>
        <Divider className={classes.divider} />
        <Box className={classes.poolsStats}>
          <Box className={classes.statsBox}>
            <TypographyLabel color="textSecondary">
              Total Staked
            </TypographyLabel>
            <Typography variant="h4" color="textPrimary">
              {toShorterNum(totalStaked)} SWTH
            </Typography>
          </Box>
          {/* <Box className={classes.statsBox}>
            <TypographyLabel color="textSecondary">
              Staking APR
            </TypographyLabel>
            <Typography variant="h4" color="textPrimary">
              70.72%
            </Typography>
          </Box> */}
        </Box>
        <Button
          className={classes.earningBtn}
          variant="contained"
          color="secondary"
          onClick={() => goToLink(getDemexLink(Paths.Stake.List, network))}
        >
          Start Earning
        </Button>
      </Box>
      <Box className={classes.productItem}>
        <Lottie
          lottieRef={lottieRef}
          { ...lottieDefaultOptions }
          animationData={Staking}
          loop={false}
          onComplete={delayAnimation}
        />
      </Box>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.text.secondary,
    height: theme.spacing(0.25),
    marginTop: theme.spacing(4),
    width: "4rem",
  },
  earningBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(4.5),
    padding: theme.spacing(1.75, 3.5),
  },
  poolsStats: {
    display: "flex",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  productItem: {
    margin: theme.spacing(7, "auto", 0),
    maxWidth: "34rem",
    overflow: "hidden",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "32rem",
    },
  },
  stakingImg: {
    display: "block",
    margin: theme.spacing(0, "auto"),
    maxWidth: "32rem",
    width: "100%",
  },
  statsBox: {
    marginLeft: theme.spacing(4),
    "&:first-child": {
      marginLeft: 0,
    },
    "& h6": {
      overflow: "hidden",
    },
    "& h4": {
      marginTop: theme.spacing(1),
    },
    [theme.breakpoints.only("xs")]: {
      width: "50%",
      "& h6": {
        height: "2rem",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& h4": {
        fontSize: "1.75rem",
      },
    },
  },
  subtitle: {
    marginTop: theme.spacing(3.5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
  title: {},
}));

export default StakingSection;
