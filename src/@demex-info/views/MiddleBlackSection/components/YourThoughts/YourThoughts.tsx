import { CaretRight } from "@demex-info/assets/icons";
import { TypographyLabel } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";

interface Props {

}

const YourThoughts: React.FC<Props> = () => {
  const classes = useStyles();

  const [thoughtsRef, thoughtsView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  return (
    <div id="yourThoughts" ref={thoughtsRef} className={classes.innerDiv}>
      <Box className={clsx(classes.slide, { open: thoughtsView })}>
        <Typography
          color="textPrimary"
          variant="h3"
          className={classes.title}
        >
          Let Us Know Your Thoughts
        </Typography>
        <TypographyLabel
          color="textPrimary"
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
    </div>
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
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(8, 2.5, 13),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(6, 4, 8),
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(6, 2.5, 8),
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
  slide: {
    opacity: 0,
    transform: "translate(0px, 20px)",
    transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
  },
  subtitle: {
    textAlign: "center",
    maxWidth: "36rem",
    margin: theme.spacing(4, "auto", 0),
    "@media (min-width: 1601px)": {
      fontSize: "1.125rem",
      lineHeight: "1.555em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      margin: theme.spacing(2, "auto", 0),
    },
  },
  title: {
    textAlign: "center",
  },
}));

export default YourThoughts;
