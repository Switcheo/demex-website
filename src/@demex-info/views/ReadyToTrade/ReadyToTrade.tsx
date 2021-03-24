import { Box, Button, Theme, Typography, makeStyles } from "@material-ui/core";
import { CaretRight, HomeBorder2 as HomeBorderLeft, HomeBorder3 as HomeBorderRight } from "@demex-info/assets/icons";
import { EncryptedKey, Ledger, MetaMask } from "@demex-info/assets/logos";
import { Paths, getDemexLink } from "@demex-info/constants";
import { TypographyLabel, withLightTheme } from "@demex-info/components";

import React from "react";
import { RootState } from "@demex-info/store/types";
import clsx from "clsx";
import { useSelector } from "react-redux";

const ReadyToTrade: React.FC = () => {
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  const [toggle, setToggle] = React.useState<boolean>(false);

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(getDemexLink(link, network), "_blank");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.innerDiv}>
        <Typography variant="h5" className={classes.header}>
          Ready to Trade?
        </Typography>
        <TypographyLabel
          className={classes.subtitle}
          mt={2}
          color="textSecondary"
        >
          Choose your preferred gateway to limitless markets
        </TypographyLabel>
        <Box className={classes.buttonGroup}>
          <Button
            classes={{
              label: classes.buttonLbl,
            }}
            color="secondary"
            onClick={() => goToLink(Paths.Login.Ledger)}
          >
            <Ledger className={classes.ledgerIcon} />
            Ledger
          </Button>
          <Button
            classes={{
              label: classes.buttonLbl,
            }}
            color="secondary"
            onClick={() => goToLink(Paths.Login.MetaMask)}
          >
            <MetaMask className={classes.metamaskIcon} />
            Metamask
          </Button>
          <Button
            classes={{
              label: classes.buttonLbl,
            }}
            color="secondary"
            onClick={() => goToLink(Paths.Login.EncryptedKey)}
          >
            <EncryptedKey className={classes.keyIcon} />
            Encrypted Key
          </Button>
        </Box>
        <Button
          className={classes.tradingBtn}
          variant="text"
          color="secondary"
          onClick={() => goToLink(Paths.Trade)}
          onMouseEnter={() => setToggle(true)}
          onMouseLeave={() => setToggle(false)}
        >
          View Live Trading
          <CaretRight className={clsx(classes.caretRight, { toggle })} />
        </Button>
      </Box>
      <HomeBorderLeft className={classes.borderLeft} />
      <HomeBorderRight className={classes.borderRight} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  borderLeft: {
    height: "3.25rem",
    maxWidth: "11.45rem",
    bottom: "2.25rem",
    left: 0,
    position: "absolute",
    [theme.breakpoints.only("xs")]: {
      bottom: "1.5rem",
      height: "2rem",
      maxWidth: "7.05rem",
    },
  },
  borderRight: {
    height: "3.25rem",
    maxWidth: "11.45rem",
    top: "2.25rem",
    right: 0,
    position: "absolute",
    [theme.breakpoints.only("xs")]: {
      height: "2rem",
      maxWidth: "7.05rem",
      top: "1.5rem",
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    "& button": {
      ...theme.typography.button,
      margin: theme.spacing(0, 0, 0, 1.75),
      minHeight: "3rem",
      padding: theme.spacing(1.5, 2),
      width: "11rem",
      "&:first-child": {
        margin: 0,
        [theme.breakpoints.down("sm")]: {
          margin: theme.spacing(0, "auto"),
        },
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
        margin: theme.spacing(2, "auto", 0),
        width: "13rem",
      },
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  buttonLbl: {
    alignItems: "center",
    display: "flex",
  },
  caretRight: {
    height: "0.625rem",
    width: "0.625rem",
    marginLeft: "0.2rem",
    transition: "margin 0.5s ease",
    "&.toggle": {
      margin: theme.spacing(0, 0, 0, 1.25),
    },
  },
  header: {
    ...theme.typography.h5,
    fontSize: "1.75rem",
    fontWeight: 500,
    textAlign: "center",
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(0, 6),
    width: "100%",
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(0, 5),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(0, 5),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 2.5),
    },
  },
  keyIcon: {
    height: "1.4rem",
    marginRight: theme.spacing(1.5),
    width: "1.4rem",
  },
  ledgerIcon: {
    height: "1.25rem",
    marginRight: theme.spacing(1.5),
    width: "1.25rem",
    "& path, & polygon": {
      fill: "#FFFFFF",
    },
  },
  metamaskIcon: {
    height: "1.375rem",
    marginRight: theme.spacing(1.5),
    width: "1.375rem",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(8, 0),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(10, 0),
    },
  },
  subtitle: {
    ...theme.typography.subtitle1,
    textAlign: "center",
  },
  tradingBtn: {
    display: "block",
    margin: theme.spacing(3, "auto", 0),
    padding: theme.spacing(1.5, 2),
    "&:hover": {
      "& $caretRight": {
        marginRight: "-0.4rem",
        marginLeft: "0.6rem",
      },
    },
  },
}));

export default withLightTheme()(ReadyToTrade);
