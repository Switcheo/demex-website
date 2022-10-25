import { CosmosNetwork, ExternalLink, InternetOfBlockchains, TendermintCore } from "@demex-info/assets/icons";
import { SvgIcon } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils/styles";
import { Box, Button, Container, Hidden, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const USPSection: React.FC = () => {
	const classes = useStyles();

	return (
		<Container maxWidth={false} className={classes.secondContainer}>
			<Hidden xsDown>
				<Box display="flex" justifyContent="center" alignItems="center" className={clsx(classes.text, classes.headline)}>
					Powered by&nbsp;
					<Box display="flex" justifyContent="center" alignItems="center">
						<Box className={classes.purpleGradient}>Cosmos SDK</Box>
						<SvgIcon className={classes.cosmosIcon} component={CosmosNetwork} />
					</Box>
				</Box>
			</Hidden>
			<Hidden smUp>
				<Box display="flex" alignItems="center" width="100%" justifyContent="space-between" className={clsx(classes.text, classes.headline)}>
					<Box display="flex" alignItems="start" justifyContent="center" flexDirection="column">
						Powered by
						<Box className={classes.purpleGradient}>Cosmos SDK</Box>
					</Box>
					<SvgIcon className={classes.cosmosIcon} component={CosmosNetwork} />
				</Box>
			</Hidden>
			<Box justifyContent="center" className={clsx(classes.text, classes.description)}>
				Cosmos SDK is an open-source framework secured by Proof-of-Stake
				consensus to build multi-asset public blockchains.&nbsp;
				<Button
					className={classes.learnMoreLink}
					variant="text"
					target="_blank"
					href={StaticLinks.Docs.Cosmos}
					classes={{
						label: classes.linkText,
					}}
				>
					Learn more
					<SvgIcon className={classes.externalLink} component={ExternalLink} />
				</Button>
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
						<Button
							className={classes.learnMoreLink}
							variant="text"
							target="_blank"
							href={StaticLinks.Docs.Tendermint}
							classes={{
								label: classes.linkText,
							}}
						>
							Learn More
							<SvgIcon className={classes.externalLink} component={ExternalLink} />
						</Button>
					</Box>
				</Box>
				<Box>
					<Box className={classes.headerSection}>
						<SvgIcon className={classes.iconClass} component={TendermintCore} />
						Tendermint Core
					</Box>
					<Box className={classes.contentSection}>
						Tendermint Core is a blockchain application platform; it provides the equivalent of a web-server, database, and supporting libraries for blockchain applications written in any programming language.&nbsp;
						<Button
							className={classes.learnMoreLink}
							variant="text"
							target="_blank"
							href={StaticLinks.Docs.Tendermint}
							classes={{
								label: classes.linkText,
							}}
						>
							Learn more
							<SvgIcon className={classes.externalLink} component={ExternalLink} />
						</Button>
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
		[theme.breakpoints.down("sm")]: {
			paddingTop: "5.5rem",
		},
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
		zIndex: 1,
		marginLeft: "7.5rem",
		whiteSpace: "nowrap",
		[theme.breakpoints.down("sm")]: {
			...theme.typography.h2,
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
			lineHeight: "38px",
			marginLeft: 0,
		},
	},
	purpleGradient: {
		background: StyleUtils.purpleGradient,
		backgroundClip: "text",
		WebkitTextFillColor: "transparent",
		WebkitBackgroundClip: "text",
	},
	description: {
		fontSize: "20px",
		lineHeight: "22px",
		margin: "0 auto",
		marginTop: "2.5rem",
		maxWidth: "625px",
		[theme.breakpoints.only("sm")]: {
			...theme.typography.body2,
			marginTop: "4px",
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
			marginTop: "4px",
			textAlign: "left",
		},
	},
	uspWrapper: {
		display: "flex",
		padding: "2.5rem 12.5rem 9.5rem",
		maxWidth: "1000px",
		margin: "0 auto",
		[theme.breakpoints.only("md")]: {
			paddingLeft: 0,
			paddingRight: 0,
		},
		[theme.breakpoints.up("md")]: {
			"& > div": {
				maxWidth: "488px",
				"&:not(:last-child)": {
					marginRight: "4rem",
				},
			},
		},
		[theme.breakpoints.down("sm")]: {
			padding: "2rem 1rem",
			flexDirection: "column",
			"& > div": {
				maxWidth: "unset",
				marginRight: 0,
				"&:not(:last-child)": {
					marginRight: 0,
					marginBottom: "2rem",
				},
			},
		},
		[theme.breakpoints.only("xs")]: {
			paddingRight: 0,
			paddingLeft: 0,
		},
	},
	headerSection: {
		...theme.typography.h2,
		color: theme.palette.text.primary,
		display: "flex",
		alignItems: "center",
		whiteSpace: "nowrap",
		[theme.breakpoints.down("sm")]: {
			...theme.typography.h3,
			flexDirection: "column",
			alignItems: "start",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "18px",
			lineHeight: "22px",
		},
	},
	contentSection: {
		...theme.typography.body1,
		color: theme.palette.text.secondary,
		marginTop: "1.5rem",
		"& > b": {
			color: theme.palette.text.primary,
		},
		[theme.breakpoints.down("sm")]: {
			...theme.typography.body2,
			marginTop: "0.75rem",
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
			textAlign: "left",
		},
	},
	iconClass: {
		marginRight: "1rem",
		[theme.breakpoints.down("sm")]: {
			marginRight: 0,
			marginBottom: "1rem",
		},
	},
	externalLink: {
		"& path": {
			fill: theme.palette.text.primary,
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
	cosmosIcon: {
		position: "relative",
		right: "50%",
		zIndex: 0,
		[theme.breakpoints.only("xs")]: {
			right: 0,
		},
		"@media (max-width: 319px)": {
			display: "none",
		},
	},
}));

export default USPSection;