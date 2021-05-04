import { CaretRight, HomeBorder2 as HomeBorderLeft, HomeBorder3 as HomeBorderRight } from "@demex-info/assets/icons";
import { EncryptedKey, Ledger, MetaMask } from "@demex-info/assets/logos";
import { TypographyLabel, withLightTheme } from "@demex-info/components";
import { getDemexLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

const ReadyToTrade: React.FC = () => {
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  const [sectionRef, sectionView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={sectionRef} className={classes.root}>
      <Box className={clsx(classes.innerDiv, classes.slide, { open: sectionView })}>
        <Typography variant="h5" className={classes.header}>
          Ready to Trade?
        </Typography>
        <TypographyLabel
          className={classes.subtitle}
          mt={2}
          color="textPrimary"
        >
          Choose your preferred gateway to limitless markets
        </TypographyLabel>
        <Box className={classes.buttonGroup}>
          <Button
            classes={{
              root: clsx(classes.buttonEach, "first"),
              label: classes.buttonLbl,
            }}
            color="secondary"
            onClick={() => goToLink(getDemexLink(Paths.Login.Ledger, network))}
          >
            <Ledger className={classes.ledgerIcon} />
            Ledger
          </Button>
          <Button
            classes={{
              root: classes.buttonEach,
              label: classes.buttonLbl,
            }}
            color="secondary"
            onClick={() => goToLink(getDemexLink(Paths.Login.MetaMask, network))}
          >
            <MetaMask className={classes.metamaskIcon} />
            Metamask
          </Button>
          <Button
            classes={{
              root: classes.buttonEach,
              label: classes.buttonLbl,
            }}
            color="secondary"
            onClick={() => goToLink(getDemexLink(Paths.Login.EncryptedKey, network))}
          >
            <EncryptedKey className={classes.keyIcon} />
            Encrypted Key
          </Button>
        </Box>
        <Button
          className={classes.tradingBtn}
          variant="text"
          color="secondary"
          onClick={() => goToLink(getDemexLink(Paths.Trade, network))}
        >
          View Live Trading
          <CaretRight className={classes.caretRight} />
        </Button>
        <HomeBorderLeft className={classes.borderLeft} />
        <HomeBorderRight className={classes.borderRight} />
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  borderLeft: {
    height: "3rem",
    maxWidth: "16.5rem",
    bottom: "2.25rem",
    left: 0,
    position: "absolute",
    [theme.breakpoints.only("sm")]: {
      height: "2.6rem",
      maxWidth: "14.3rem",
      bottom: "1.5rem",
    },
    [theme.breakpoints.only("xs")]: {
      bottom: "1.5rem",
      height: "2rem",
      maxWidth: "11rem",
    },
  },
  borderRight: {
    height: "3rem",
    maxWidth: "16.5rem",
    top: "2.25rem",
    right: 0,
    position: "absolute",
    [theme.breakpoints.only("sm")]: {
      height: "2.6rem",
      maxWidth: "14.3rem",
      top: "1.5rem",
    },
    [theme.breakpoints.only("xs")]: {
      height: "2rem",
      maxWidth: "11rem",
      top: "1.5rem",
    },
  },
  buttonEach: {
    ...theme.typography.button,
    margin: theme.spacing(0, 0, 0, 1.75),
    minHeight: "3rem",
    padding: theme.spacing(1.5, 2),
    width: "11rem",
    "&.first": {
      margin: 0,
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: theme.spacing(2, "auto", 0),
      width: "13rem",
      "&.first": {
        margin: theme.spacing(0, "auto"),
      },
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
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
  },
  header: {
    ...theme.typography.h5,
    lineHeight: "1.15",
    fontSize: "2rem",
    textAlign: "center",
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(8, 6),
    position: "relative",
    width: "calc(100% - 96px)",
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(8, 5),
      width: `calc(100% - ${theme.spacing(10)}px)`,
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(11, 5),
      width: `calc(100% - ${theme.spacing(10)}px)`,
    },
    [theme.breakpoints.only("xs")]: {
      margin: 0,
      padding: theme.spacing(10, 2.5),
      width: `calc(100% - ${theme.spacing(5)}px)`,
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
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  slide: {
    opacity: 0,
    transform: "translate(0px, 30px)",
    transition: "opacity ease-in 0.6s, transform ease-in 0.7s",
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
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
