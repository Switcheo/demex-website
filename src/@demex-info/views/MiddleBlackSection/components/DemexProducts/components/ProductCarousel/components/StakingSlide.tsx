import { Box, Button, Divider, Theme, Typography, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink, goToLink, lottieDefaultOptions } from "@demex-info/constants";

import React from "react";
import { RootState } from "@demex-info/store/types";
import { Staking } from "@demex-info/assets";
import { TypographyLabel } from "@demex-info/components";
import clsx from "clsx";
import { toShorterNum } from "@demex-info/utils";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";

interface Props {
  liquidityView: boolean;
  stakingRef: () => void;
  stakingView: boolean;
  insuranceView: boolean;
}

const StakingSlide: React.FC<Props> = (props: Props) => {
  const { stakingRef, stakingView } = props;
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
    <div
      ref={stakingRef}
      id="staking"
      className={clsx(classes.slideItem,
        {
          slideIn: stakingView,
        },
      )}
    >
      <Box maxWidth="30rem" px={2.5}>
        <Lottie
          lottieRef={lottieRef}
          animationData={Staking}
          { ...lottieDefaultOptions }
          loop={false}
          onComplete={delayAnimation}
        />
      </Box>

      <Box className={classes.rightGrid}>
        <Box pl={2.5}>
          <Typography
            variant="h3"
            color="textPrimary"
            className={classes.title}
          >
            Staking
          </Typography>
          <TypographyLabel color="textSecondary" className={classes.subtitle} mt={3.5}>
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
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.text.secondary,
    height: theme.spacing(0.25),
    marginTop: theme.spacing(6),
    width: "4rem",
  },
  earningBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(9),
    padding: theme.spacing(1.75, 3.5),
  },
  poolsStats: {
    alignItems: "center",
    display: "flex",
    marginTop: theme.spacing(6),
  },
  rightGrid: {
    maxWidth: "50%",
    padding: theme.spacing(0, 2.5),
    width: "100%",
  },
  slideItem: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    // height: "52vh",
    margin: "1rem 0",
    paddingTop: "22vh",
    paddingBottom: "22vh",
    opacity: 0,
    transform: "translate(0px, 60px)",
    transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
    "&.slideIn": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
    "&.slideOutTop": {
      opacity: 0,
      transform: "translate(0px,-60px)",
    },
    "&.slideOutBottom": {
      opacity: 0,
      transform: "translate(0px, 60px)",
    },
  },
  stakingImg: {
    display: "block",
    maxWidth: "30rem",
    width: "100%",
  },
  statsBox: {
    marginLeft: theme.spacing(4),
    "&:first-child": {
      marginLeft: 0,
    },
    "& h4": {
      marginTop: theme.spacing(1),
    },
    "& h6": {
      height: "3rem",
      overflow: "hidden",
    },
  },
  subtitle: {
    fontSize: "1.125rem",
  },
  title: {
    fontSize: "2.5rem",
  },
}));

export default StakingSlide;
