import { ExternalLink, SWTH } from "@demex-info/assets";
import { SvgIcon } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils";
import { Box, Button, Link, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const CarbonSecured: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        Secured by &nbsp;
        <Box className={classes.carbonSwth}>
          Carbon
          <SvgIcon className={classes.svgIcon} component={SWTH} />
          SWTH
        </Box>
      </Box>
      <Box className={classes.description}>
        <b>Carbon</b> is a Layer 2 protocol that&apos;s rooted at the core of <b>DeFi</b>, designed to support trading of  advanced financial instruments. The <b>native cryptocurrency</b> and <b>governance token</b> of Carbon is <b>SWTH</b>.
        <br /><br />
        <b>Demex</b> is a <b>Decentralised App (dApp)</b> built on Carbon, that serves as a decentralised exchange for a variety of crypto derivatives.&nbsp;
        <Link
					className={classes.linkText}
					color="textPrimary"
					key="cosmosLink"
					href={StaticLinks.DemexDocs.About}
					target="_blank"
				>
					Learn more
				</Link>
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
          className={clsx(classes.button, "learnMore")}
          variant="contained"
          target="_blank"
          href={StaticLinks.DemexDocs.About}
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
    [theme.breakpoints.down("md")]: {
      ...theme.typography.h2,
      display: "block",
      textAlign: "center",
    },
  },
  carbonSwth: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  svgIcon: {
    height: "80px",
    width: "80px",
    margin: "0 0.5rem",
    "& circle": {
      fill: "#063C4F",
    },
    [theme.breakpoints.down("md")]: {
      height: "40px",
      width: "40px",
    },
  },
  description: {
    ...theme.typography.h4,
    textAlign: "center",
    margin: "2.5rem auto",
    color: theme.palette.text.secondary,
    maxWidth: "64rem",
    "& > b": {
			color: theme.palette.text.primary,
		},
    [theme.breakpoints.down("md")]: {
      ...theme.typography.body3,
    },
  },
	linkText: {
		textDecoration: "underline",
		fontWeight: 700,
		color: theme.palette.text.primary,
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
		"&.learnMore, &:active:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      background: StyleUtils.primaryGradientHover(theme),
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
      textDecoration: "none",
    },
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

export default CarbonSecured;
