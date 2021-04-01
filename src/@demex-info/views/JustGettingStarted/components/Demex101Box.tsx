import { Box, Theme, makeStyles } from "@material-ui/core";
import { PaperBox, TypographyLabel } from "@demex-info/components";

import InfoLinkBox from "./InfoLinkBox";
import { Notebook } from "@demex-info/assets";
import React from "react";
import { StaticLinks } from "@demex-info/constants";

const Demex101Box: React.FC = () => {
  const classes = useStyles();

  return (
    <PaperBox className={classes.gridBox} padding={4}>
      <Notebook className={classes.cardSvg} />
      <TypographyLabel className={classes.cardTitle} mt={2} variant="h4">
        Demex 101
      </TypographyLabel>
      <Box mt={4}>
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
          href={StaticLinks.DemexDocs.Trade.Spot}
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
  },
  cardTitle: {
    fontSize: "1.75rem",
    fontWeight: 500,
  },
  gridBox: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(0.25),
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 5%), 0px 1px 1px 0px rgb(0 0 0 / 5%), 0px 1px 3px 0px rgb(0 0 0 / 5%)",
    height: "100%",
    marginRight: theme.spacing(1.25),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(0),
    },
  },
  infoLink: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      borderBottom: "none",
    },
  },
}));

export default Demex101Box;
