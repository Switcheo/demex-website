import { InsuranceFund } from "@demex-info/assets";
import { TypographyLabel } from "@demex-info/components";
import { getDemexLink, goToLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Button, Divider, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const InsuranceSection: React.FC = () => {
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  return (
    <React.Fragment>
      <Box id="insuranceFund" height="0.5rem">
        &nbsp;
      </Box>
      <Box className={classes.productItem}>
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
      <Box className={classes.productItem}>
        <InsuranceFund className={classes.insuranceImg} />
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
  insuranceImg: {
    display: "block",
    height: "100%",
    width: "100%",
    margin: theme.spacing(0, "auto"),
    maxHeight: "17rem",
    maxWidth: "26rem",
  },
  productItem: {
    margin: theme.spacing(7, "auto", 0),
    maxWidth: "34rem",
    overflow: "hidden",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "32rem",
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

export default InsuranceSection;
