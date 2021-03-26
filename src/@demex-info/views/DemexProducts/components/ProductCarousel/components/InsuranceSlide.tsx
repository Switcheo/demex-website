import { Box, Button, Divider, Theme, Typography, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink, goToLink } from "@demex-info/constants";

import { InsuranceFund } from "@demex-info/assets/graphic";
import React from "react";
import { RootState } from "@demex-info/store/types";
import { SlideCategory } from "../../slideConfig";
import { TypographyLabel } from "@demex-info/components";
import clsx from "clsx";
import { useSelector } from "react-redux";

interface Props {
  slideItem: SlideCategory;
}

const InsuranceSlide: React.FC<Props> = (props: Props) => {
  const { slideItem } = props;
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  return (
    <Box
      className={clsx(
        classes.slideItem,
        "insuranceFund",
        { out: slideItem !== "insuranceFund" },
      )}
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
      <Box className={classes.rightGrid}>
        <InsuranceFund className={classes.insuranceImg} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.text.secondary,
    height: theme.spacing(0.25),
    marginTop: theme.spacing(5),
    width: "4rem",
  },
  earningBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(6),
    padding: theme.spacing(1.75, 3.5),
  },
  insuranceImg: {
    display: "block",
    width: "100%",
    margin: theme.spacing(0, "auto"),
    maxWidth: "22rem",
  },
  leftGrid: {
    maxWidth: "50%",
    padding: theme.spacing(0, 2.5),
    width: "100%",
  },
  rightGrid: {
    maxWidth: "50%",
    padding: theme.spacing(0, 2.5),
    width: "100%",
  },
  slideItem: {
    display: "inline-flex",
    height: "100%",
    position: "absolute",
    top: 0,
    transition: "transform ease 0.6s",
    width: "100%",
    transform: "translateX(0%)",
    "&.out": {
      transform: "translateX(150%)",
    },
  },
  subtitle: {},
  title: {},
}));

export default InsuranceSlide;
