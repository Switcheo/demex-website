import { InsuranceFund } from "@demex-info/assets/graphic";
import { TypographyLabel } from "@demex-info/components";
import { getDemexLink, goToLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Button, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  insuranceRef: () => void;
  insuranceView: boolean;
}

const InsuranceSlide: React.FC<Props> = (props: Props) => {
  const { insuranceView, insuranceRef } = props;
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  return (
    <div
      ref={insuranceRef}
      id="insuranceFund"
      className={clsx(classes.slideItem, {
        slideIn: insuranceView,
      })}
    >
      <Box className={classes.leftGrid}>
        <Typography
          variant="h3"
          color="textPrimary"
          className={classes.title}
        >
          Insurance Fund
        </Typography>
        <TypographyLabel color="textSecondary" className={classes.subtitle} mt={3.5}>
          Gain premiums from insurance fund payouts as a SWTH staker or by contributing SWTH to the fund at launch.
        </TypographyLabel>
        <Divider className={classes.divider} />
        <Button
          className={classes.earningBtn}
          variant="contained"
          color="secondary"
          onClick={() => goToLink(getDemexLink(Paths.Stake.List, network))}
          disabled
        >
          Coming Soon
        </Button>
      </Box>
      <Box px={2.5}>
        <InsuranceFund className={classes.insuranceImg} />
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
  insuranceImg: {
    display: "block",
    width: "100%",
    maxWidth: "22rem",
  },
  leftGrid: {
    padding: theme.spacing(0, 2.5),
    width: "50%",
  },
  slideItem: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    // height: "50vh",
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
  },
  subtitle: {
    fontSize: "1.125rem",
  },
  title: {
    fontSize: "2.5rem",
  },
}));

export default InsuranceSlide;
