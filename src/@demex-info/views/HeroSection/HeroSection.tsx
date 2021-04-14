import { Box, Button, Container, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink } from "@demex-info/constants";

import { BackgroundAnimation } from "./components";
import React from "react";
import { TypographyLabel } from "@demex-info/components";
import clsx from "clsx";

const HeroSection: React.FC = () => {
	const classes = useStyles();

	return (
		<Box component="section" className={clsx(classes.root)}>
			<BackgroundAnimation />
			<Container maxWidth="lg" className={classes.contentContainer}>
				<Box className={classes.content}>
					<TypographyLabel className={clsx(classes.text, classes.tagline)}>
						Powerful. Permissionless. Secure.
					</TypographyLabel>
					<TypographyLabel className={clsx(classes.text, classes.headline)}>
						Decentralized Trading for
						<br />
						Any Financial Asset Imaginable
					</TypographyLabel>

					<TypographyLabel className={clsx(classes.text, classes.description)}>
						Unleashing the true power of DeFi with the world&apos;s first fully decentralized derivatives platform. Reimagine open markets with Demex.
					</TypographyLabel>

					<Button
						className={classes.button}
						color="secondary"
						variant="contained"
						target="_blank"
						href={getDemexLink(Paths.Trade)}
					>
						View Live Trading
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		marginBottom: "12px",
		[theme.breakpoints.down("sm")]: {
			minHeight: "400px",
		},
	},
	content: {
		fontSize: "16px",
		display: "flex",
		height: "calc(100vh - 270px)",
		maxHeight: "800px",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		[theme.breakpoints.down("lg")]: {
			fontSize: "15px",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "10px",
			minHeight: "360px",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "10px",
		},
	},
	contentContainer: {
		marginTop: "120px",
		position: "relative",
		[theme.breakpoints.down("md")]: {
			marginTop: "70px",
		},
		[theme.breakpoints.down("sm")]: {
			minHeight: "48px",
		},
	},
	text: {
		fontFamily: "Graphik",
		color: "#fff",
		textAlign: "center",
	},
	tagline: {
		fontSize: "1.375em",
		lineHeight: "1.27em",
	},
	headline: {
		fontSize: "3.75em",
		fontWeight: 600,
		lineHeight: "1.333em",
		marginTop: "0.4em",
		[theme.breakpoints.down("sm")]: {
			fontSize: "3em",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "2.2em",
		},
	},
	description: {
		fontSize: "1.125em",
		lineHeight: "1.555em",
		maxWidth: "35.55em",
		marginTop: "2.222em",
	},
	button: {
		marginTop: "4em",
		padding: "0.8125em 1.75em",
		[theme.breakpoints.down("sm")]: {
			marginTop: "2em",
		},
		"& .MuiButton-label": {
			[theme.breakpoints.down("sm")]: {
				fontSize: ".75rem",
			},
		},
	},
}));

export default HeroSection;
