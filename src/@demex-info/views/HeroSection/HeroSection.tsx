import { TypographyLabel } from "@demex-info/components";
import { getDemexLink, Paths } from "@demex-info/constants";
import { Box, Button, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";

import { BackgroundAnimation } from "./components";

const HeroSection: React.FC = () => {
	const classes = useStyles();
	const [ready, setReady] = React.useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => setReady(true));
	}, []);

	return (
		<Box component="section" className={clsx(classes.root)}>
			{
				ready && (
					<BackgroundAnimation />
				)
			}
			<Container maxWidth={false} className={classes.contentContainer}>
				<Box className={classes.content}>
					<TypographyLabel className={clsx(classes.text, classes.tagline)}>
						Trade&nbsp;
						<Box>Anything</Box>
					</TypographyLabel>
					<TypographyLabel className={clsx(classes.text, classes.headline)}>
						The Order Book DEX for the&nbsp;
						<br />
						Cosmos and Ethereum Ecosystem
					</TypographyLabel>

					<TypographyLabel className={clsx(classes.text, classes.description)}>
						Trade spot, futures, perpetuals and more on CLOBs, with liquidity backstopped by AMMs.
					</TypographyLabel>

					<Button
						className={classes.button}
						variant="contained"
						target="_blank"
						href={getDemexLink(Paths.Trade)}
					>
						Launch App
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
		[theme.breakpoints.only("lg")]: {
			marginBottom: "36px",
		},
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
			height: "360px",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "10px",
		},
		"@media (max-width: 319px)": {
			height: "400px",
		},
	},
	contentContainer: {
		marginTop: "120px",
		position: "relative",
		padding: "0 3rem",
		[theme.breakpoints.down("md")]: {
			marginTop: "70px",
		},
		[theme.breakpoints.down("sm")]: {
			minHeight: "48px",
		},
	},
	text: {
		...theme.typography.body1,
		color: theme.palette.text.secondary,
		textAlign: "center",
	},
	tagline: {
		display: "flex",
		"& > div": {
			fontWeight: 700,
			textDecoration: "underline",
			color: theme.palette.text.primary,
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "1.4em",
		},
	},
	headline: {
		...theme.typography.h1,
		fontSize: "72px",
		lineHeight: "72px",
		marginTop: "2.5rem",
		color: theme.palette.text.primary,
		[theme.breakpoints.only("sm")]: {
			fontSize: "3em",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "2.6em",
		},
	},
	description: {
		marginTop: "2.5rem",
		[theme.breakpoints.only("xs")]: {
			fontSize: "1.3em",
			marginTop: "2em",
		},
	},
	button: {
		marginTop: "2.5rem",
		minWidth: "16rem",
		minHeight: "4rem",
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
