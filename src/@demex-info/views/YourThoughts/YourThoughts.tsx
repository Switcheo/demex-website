import { ExternalLink } from "@demex-info/assets/icons";
import { TypographyLabel } from "@demex-info/components";
import { getDemexLink, Paths, StaticLinks } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import vector from "./vector.svg";

const YourThoughts: React.FC = () =>  {
  const classes = useStyles();

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  return (
    <div id="yourThoughts" className={classes.background}>
      <Box className={classes.btnDiv}>
        <Button
          className={classes.btn}
          variant="contained"
          color="secondary"
          target="_blank"
          href={getDemexLink(Paths.Trade)}
        >
          Start Trading
        </Button>
      </Box>
      <Box className={classes.innerDiv}>
        <TypographyLabel className={classes.header}>
          Let Us Know Your Thoughts
        </TypographyLabel>
        <TypographyLabel
          color="textPrimary"
          className={classes.subtitle}
        >
          We value your thoughts to bring Demex further. Discuss, propose and execute ideas together with our community.
        </TypographyLabel>
        <Button
          className={clsx(classes.shareBtn, classes.btn)}
          classes={{
            label: classes.buttonLabel,
          }}
          variant="outlined"
          onClick={() => goToLink(StaticLinks.Feedback)}
        >
          Share Your Thoughts
          <ExternalLink className={classes.gradientIcon} />
        </Button>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.h2,
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
      lineHeight: "38px",
			margin: "0 auto",
		},
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(20, 2.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(12.5, 4),
    },
  },
  background: {
    background: `url(${vector})`,
    backgroundSize: "cover",
    width: "100%",
    height: "777px",
    marginTop: "-8rem",
    [theme.breakpoints.down("sm")]: {
      height: "unset",
      marginTop: "-5rem",
    },
  },
  btn: {
    ...theme.typography.title1,
    minWidth: "192px",
    minHeight: "64px",
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.title2,
      minWidth: "164px",
      minHeight: "48px",
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.title3,
      minWidth: "116px",
      minHeight: "40px",
    },
  },
  btnDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "11.5rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "6.5rem",
    },
  },
  shareBtn: {
    display: "block",
    margin: theme.spacing(5, "auto", 0),
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  subtitle: {
    textAlign: "center",
    maxWidth: "36rem",
    margin: theme.spacing(5, "auto", 0),
    fontSize: "20px",
		lineHeight: "22px",
    color: theme.palette.text.secondary,
    [theme.breakpoints.only("sm")]: {
			...theme.typography.body2,
      margin: theme.spacing(2, "auto", 0),
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.body3,
      marginTop: theme.spacing(1.5),
    },
  },
  title: {
    textAlign: "center",
  },
  buttonLabel: {
    ...theme.typography.title1,
    display: "flex",
    background: StyleUtils.primaryGradientHover(theme),
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    textDecoration: "none",
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.title2,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.title3,
    },
  },
  gradientIcon: {
    "& path": {
      fill: "url(#demexLinearGradient)",
    },
  },
}));

export default YourThoughts;
