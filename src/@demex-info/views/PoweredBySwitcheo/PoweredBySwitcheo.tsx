import { ExternalLink, SWTH } from "@demex-info/assets";
import { SvgIcon } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils";
import { Box, Button, makeStyles } from "@material-ui/core";
import React from "react";

const PoweredBySwitcheo: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        Secured by&nbsp;
        <Box className={classes.carbonSwth}>
          Carbon&nbsp;
          <SvgIcon className={classes.swthLogo} component={SWTH} />
          &nbsp;SWTH
        </Box>
      </Box>
      <Box className={classes.description}>
        <Button
          className={classes.learnMoreLink}
          variant="text"
          target="_blank"
          href={StaticLinks.Docs.Cosmos}
          classes={{
            label: classes.linkText,
          }}
        >
          Carbon
          <SvgIcon className={classes.externalLink} component={ExternalLink} />
        </Button>
        is a Layer 2 protocol that&apos;s rooted at the core of <b>DeFi</b>, designed to support trading of  advanced financial instruments. The <b>native cryptocurrency</b> and <b>governance token</b> of Carbon is <b>SWTH</b>.
        <br /><br />
        <b>Demex</b> is a <b>Decentralised App (dApp)</b> built on Carbon, that serves as a decentralised exchange for a variety of crypto derivatives.&nbsp;
      </Box>
      <Box className={classes.actionBtn}>
        <Button
          className={classes.button}
          variant="contained"
          target="_blank"
          href={StaticLinks.Swth}
        >
          Get SWTH
          <SvgIcon className={classes.linkIcon} component={ExternalLink} />
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          target="_blank"
          href={StaticLinks.DemexDocs.About}
          classes={{
            label: classes.learnMoreLabel,
          }}
        >
          Learn More
          <SvgIcon className={classes.gradientIcon} component={ExternalLink} />
        </Button>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(180deg, rgba(41, 204, 196, 0.05) 0%, rgba(26, 29, 31, 0) 100%)",
    padding: "3.125rem 3.125rem 1rem",
    [theme.breakpoints.down("md")]: {
      padding: "3.75rem 1rem",
    },
  },
  header: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h2,
      display: "block",
      textAlign: "center",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "28px",
      lineHeight: "38px",
    },
  },
  carbonSwth: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  swthLogo: {
    height: "80px",
    width: "80px",
    margin: "0 0.5rem",
    "& circle": {
      fill: "#063C4F",
    },
    [theme.breakpoints.up("md")]: {
      boxShadow: "40px 24px 124px rgba(0, 189, 255, 0.5), inset 30px 44px 64px rgba(0, 255, 255, 0.24)",
      borderRadius: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "40px",
      width: "40px",
      margin: 0,
    },
  },
  description: {
    ...theme.typography.h4,
    fontWeight: 400,
    textAlign: "center",
    margin: "2.5rem auto",
    color: theme.palette.text.secondary,
    maxWidth: "64rem",
    "& > b": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "50rem",
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
      maxWidth: "46.5rem",
      margin: "2rem auto 0.75rem",
    },
  },
	learnMoreLink: {
		padding: "0 0 0.25rem",
		"&:hover": {
			backgroundColor: "transparent",
			textDecoration: "underline",
		},
	},
	linkText: {
		display: "flex",
		alignItems: "center",
		fontWeight: 700,
		color: theme.palette.text.primary,
		[theme.breakpoints.down("sm")]: {
			...theme.typography.body2,
			fontWeight: 700,
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
			fontWeight: 700,
		},
	},
  actionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& a:first-child": {
      marginRight: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      "& a:first-child": {
        marginRight: "1rem",
      },
    },
  },
  button: {
    marginTop: "1.75rem",
    minWidth: "12rem",
    minHeight: "4rem",
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title3,
      marginTop: "2em",
      minWidth: "7.5rem",
      minHeight: "2.5rem",
    },
  },
  externalLink: {
		"& path": {
			fill: theme.palette.text.primary,
		},
	},
  learnMoreLabel: {
    background: StyleUtils.primaryGradientHover(theme),
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  linkIcon: {
    "& path": {
      fill: theme.palette.text.primary,
    },
  },
  gradientIcon: {
    "& path": {
      fill: "url(#demexLinearGradient)",
    },
  },
}));

export default PoweredBySwitcheo;
