import { InternetOfBlockchains, TendermintCore } from "@demex-info/assets/icons";
import { SvgIcon } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils/styles";
import { Box, Container, Link, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const USPSection: React.FC = () => {
	const classes = useStyles();

	return (
    <Container maxWidth={false} className={classes.secondContainer}>
      <Box display="flex" justifyContent="center" className={clsx(classes.text, classes.headline)}>
        Powered by&nbsp;
        <Box>Cosmos SDK</Box>
      </Box>
      <Box justifyContent="center" className={clsx(classes.text, classes.description)}>
        Cosmos SDK is an open-source framework secured by Proof-of-Stake
        <br />
        consensus to build multi-asset public blockchains.&nbsp;
				<Link
					className={classes.linkText}
					color="textPrimary"
					key="cosmosLink"
					href={StaticLinks.Docs.Cosmos}
					target="_blank"
				>
					Learn more
				</Link>
      </Box>
      <Box className={classes.uspWrapper}>
				<Box>
					<Box className={classes.headerSection}>
						<SvgIcon className={classes.iconClass} component={InternetOfBlockchains} />
						Internet of Blockchains
					</Box>
					<Box className={classes.contentSection}>
						<b>Cosmos</b> is the <b>Internet of Blockchains.</b>&nbsp;
						It solves the hurdle of interoperatability by building a decentralized network of independent and scalable blockchains.&nbsp;
						It has enabled streamlining of transactions, providing for the foundation for a new token economy.&nbsp;
						<Link
							className={classes.linkText}
							color="textPrimary"
							key="IBCLink"
							href={StaticLinks.Docs.IBC}
							target="_blank"
						>
							Learn more
						</Link>
					</Box>
				</Box>
				<Box>
					<Box className={classes.headerSection}>
						<SvgIcon className={classes.iconClass} component={TendermintCore} />
						Tendermint Core
					</Box>
					<Box className={classes.contentSection}>
						Tendermint Core is a blockchain application platform; it provides the equivalent of a web-server, database, and supporting libraries for blockchain applications written in any programming language.&nbsp;
						<Link
							className={classes.linkText}
							color="textPrimary"
							key="TendermintLink"
							href={StaticLinks.Docs.Tendermint}
							target="_blank"
						>
							Learn more
						</Link>
					</Box>
				</Box>
			</Box>
    </Container>
	);
};

const useStyles = makeStyles((theme) => ({
	secondContainer: {
		paddingTop: "7.75rem",
		zIndex: 2,
	},
	text: {
		...theme.typography.body1,
		color: theme.palette.text.secondary,
		textAlign: "center",
		"& > b": {
			color: theme.palette.text.primary,
		},
	},
	headline: {
		...theme.typography.h1,
		color: theme.palette.text.primary,
		"& > div": {
			background: StyleUtils.purpleGradient,
			backgroundClip: "text",
			WebkitTextFillColor: "transparent",
			WebkitBackgroundClip: "text",
		},
		[theme.breakpoints.only("sm")]: {
			fontSize: "3em",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "2.6em",
		},
	},
	description: {
		fontSize: "20px",
		lineHeight: "22px",
		marginTop: "2.5rem",
		[theme.breakpoints.only("xs")]: {
			fontSize: "1.3em",
			marginTop: "2em",
		},
	},
  uspWrapper: {
		display: "flex",
    padding: "2.5rem 12.5rem 9.5rem",
		maxWidth: "1000px",
		margin: "0 auto",
		"& > div": {
			maxWidth: "488px",
			"&:not(:last-child)": {
				marginRight: "4rem",
			},
		},
  },
	headerSection: {
    ...theme.typography.h2,
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
		whiteSpace: "nowrap",
  },
	contentSection: {
		...theme.typography.body1,
		color: theme.palette.text.secondary,
		marginTop: "1.5rem",
		"& > b": {
			color: theme.palette.text.primary,
		},
	},
  iconClass: {
    marginRight: "1rem",
  },
	linkText: {
		textDecoration: "underline",
		fontWeight: 700,
		color: theme.palette.text.primary,
	},
}));

export default USPSection;