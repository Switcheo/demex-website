import { ExternalLink } from "@demex-info/assets";
import { CoinIcon, SvgIcon } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils";
import { Box, Button, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

import React from "react";

const PoweredBySwitcheo: React.FC = () => {
  const classes = useStyles();
	const theme = useTheme();

	const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));


  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        Secured by&nbsp;
        <Box className={classes.carbonSwth}>
          Carbon&nbsp;
          <CoinIcon className={classes.swthLogo} denom="SWTH" />
          &nbsp;SWTH
        </Box>
      </Box>
      <Box className={classes.description}>
          <b>Demex</b> is a Decentralized App (dApp) built on&nbsp;

          <Button
          className={classes.learnMoreLink}
          variant="text"
          target="_blank"
          href={StaticLinks.CarbonNetwork}
          classes={{
            label: classes.linkText,
          }}
          > 
          Carbon
          {isDesktop && <SvgIcon className={classes.externalLink} component={ExternalLink} />}
,
          </Button> 

         &nbsp;a Layer 2 protocol designed to support trading of <b>advanced financial instruments</b>. 
        <br /> <br />
        The native governance token of Carbon is <b>$SWTH</b>, which can be staked to <b>earn from all fees</b> paid on Demex.
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
		zIndex: 1,
    background: "linear-gradient(180deg, rgba(26, 29, 31, 0) 0%, rgba(41, 204, 196, 0.1) 50%, rgba(26, 29, 31, 0) 100%)",
    padding: "3.125rem 3.125rem 1rem",
    marginBottom: "10rem",
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
      minWidth: "8rem",
      minHeight: "2.5rem",
    },
  },
  externalLink: {
		"& path": {
			fill: theme.palette.text.primary,
		},
    width: "1.25rem",
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
