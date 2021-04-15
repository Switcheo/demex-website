import { Notebook } from "@demex-info/assets";
import { PaperBox, TypographyLabel } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { Box, fade, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import InfoLinkBox from "./InfoLinkBox";

const Demex101Box: React.FC = () => {
  const classes = useStyles();

  return (
    <PaperBox className={classes.gridBox}>
      <Notebook className={classes.cardSvg} />
      <TypographyLabel className={classes.cardTitle} variant="h4">
        Demex 101
      </TypographyLabel>
      <Box className={classes.linkBox}>
        <InfoLinkBox
          titleClass={classes.infoLink}
          href={StaticLinks.DemexDocs.Start.CreateAccount}
          title="How to create a Demex account?"
        />
        <InfoLinkBox
          titleClass={classes.infoLink}
          href={StaticLinks.DemexDocs.Trade.Spot}
          title="How to Trade Spot on Demex?"
        />
        <InfoLinkBox
          titleClass={classes.infoLink}
          href={StaticLinks.DemexDocs.Trade.Futures}
          title="How to Trade Futures on Demex?"
        />
      </Box>
    </PaperBox>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  cardSvg: {
    width: "2.5rem",
    height: "2.5rem",
    [theme.breakpoints.only("xs")]: {
      height: "2.25rem",
      width: "2.25rem",
    },
  },
  cardTitle: {
    fontWeight: 500,
    marginTop: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.75rem",
      lineHeight: 1.15,
    },
  },
  gridBox: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(0.25),
    boxShadow: `0px 8px 12px 2px ${fade(theme.palette.text.secondary, 0.08)}`,
    height: "calc(100% - 4rem)",
    padding: theme.spacing(4),
    marginRight: theme.spacing(1.25),
    zIndex: 5,
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(0),
    },
    [theme.breakpoints.only("xs")]: {
      height: "calc(100% - 3.5rem)",
      padding: theme.spacing(3.5, 2.5),
    },
  },
  infoLink: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
  linkBox: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
}));

export default Demex101Box;
