import { Box, Button, Theme, Typography, makeStyles } from "@material-ui/core";

import { CaretRight } from "@demex-info/assets/icons";
import React from "react";
import { StaticLinks } from "@demex-info/constants";
import { TypographyLabel } from "@demex-info/components";

const YourThoughts: React.FC = () => {
  const classes = useStyles();

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.innerDiv}>
        <Box  >
          <Typography
            color="textPrimary"
            variant="h3"
            className={classes.title}
          >
            Let Us Know Your Thoughts
          </Typography>
          <TypographyLabel
            color="textSecondary"
            className={classes.subtitle}
          >
            We value your thoughts to bring Demex further. Check out our forum for community to discuss, propose, and execute ideas.
          </TypographyLabel>
          <Button
            className={classes.shareBtn}
            color="secondary"
            variant="text"
            onClick={() => goToLink(StaticLinks.Feedback)}
          >
            Share Your Thoughts
            <CaretRight className={classes.caretRight} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  caretRight: {
    height: "0.625rem",
    width: "0.625rem",
    marginLeft: "0.2rem",
    transition: "margin 0.5s ease",
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(0, 2.5),
  },
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(11, 0),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(6, 0),
    },
  },
  shareBtn: {
    ...theme.typography.button,
    display: "block",
    margin: theme.spacing(4, "auto", 0),
    padding: theme.spacing(1.5, 2),
    "&:hover": {
      "& $caretRight": {
        marginRight: "-0.4rem",
        marginLeft: "0.6rem",
      },
    },
  },
  subtitle: {
    textAlign: "center",
    maxWidth: "36rem",
    margin: theme.spacing(4, "auto", 0),
  },
  title: {
    textAlign: "center",
  },
}));

export default YourThoughts;
