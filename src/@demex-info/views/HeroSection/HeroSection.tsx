import { BackgroundAnimation } from "@demex-info/components";
import { getDemexLink, Paths } from "@demex-info/constants";
import { Box, Button, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import MarketsGrid from "./components/MarketsGrid";

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
					<BackgroundAnimation positionClass={classes.position} containerClass={classes.container} paddingClass={classes.padding} />
				)
			}
			<Container maxWidth={false} className={classes.contentContainer}>
				<Box className={classes.content}>
					<Box className={clsx(classes.text, classes.tagline)}>
						Trade&nbsp;
						<Box>Anything</Box>
					</Box>
					<Box className={clsx(classes.text, classes.headline)}>
						The Order Book DEX for the&nbsp;
						<br />
						Cosmos and Ethereum Ecosystems
					</Box>

					<Box className={clsx(classes.text, classes.description)}>
						Trade spot, futures, perpetuals and more on CLOBs, with liquidity backstopped by AMMs.
					</Box>

					<Button
						className={classes.button}
						variant="contained"
						target="_blank"
						href={getDemexLink(Paths.Trade)}
					>
						Launch App
					</Button>
				</Box>
				<Suspense fallback={null}>
					<MarketsGrid />
				</Suspense>
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
	position: {
		position: "absolute",
		left: 0,
		width: "100%",
		[theme.breakpoints.up("lg")]: {
			top: "-288px",
			height: "calc(100vh + 40rem)",
		},
		[theme.breakpoints.down("md")]: {
			overflowX: "hidden",
			top: "-125px",
			minHeight: "60rem",
		},
		[theme.breakpoints.down("xs")]: {
			top: "-200px",
		},
	},
	container: {
		position: "relative",
		margin: "0 auto",
		maxWidth: "1590px",
		[theme.breakpoints.only("md")]: {
			maxWidth: "unset",
			margin: "-70% ​-100%",
		},
		[theme.breakpoints.down("sm")]: {
			margin: "-1rem -3rem",
		},
		[theme.breakpoints.only("xs")]: {
			margin: "-1rem -15rem",
		},
		"@media (max-width: 319px)": {
			margin: "-20% -106%",
		},
	},
	padding: {
		height: "56.25%",
		[theme.breakpoints.down("md")]: {
			height: "25%",
		},
	},
	content: {
		display: "flex",
		maxHeight: "800px",
		height: "calc(100vh - 400px)",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		[theme.breakpoints.down("md")]: {
			height: "unset",
			paddingTop: "2.265rem",
		},
		[theme.breakpoints.only("sm")]: {
			padding: "2.265rem 0.75rem 0",
			height: "unset",
			marginBottom: "80px",
		},
		[theme.breakpoints.only("xs")]: {
			padding: "2.265rem 0 0",
			height: "unset",
			marginBottom: "80px",
		},
	},
	contentContainer: {
		marginTop: "120px",
		position: "relative",
		padding: "0 3rem",
		[theme.breakpoints.down("md")]: {
			marginTop: "65px",
			height: "unset",
		},
		[theme.breakpoints.down("sm")]: {
			padding: "0 0.75rem",
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
		[theme.breakpoints.only("sm")]: {
			...theme.typography.body3,
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body4,
		},
	},
	headline: {
		...theme.typography.h1,
		fontSize: "72px",
		lineHeight: "72px",
		marginTop: "1.75rem",
		color: theme.palette.text.primary,
		[theme.breakpoints.only("md")]: {
			fontSize: "56px",
			lineHeight: "56px",
		},
		[theme.breakpoints.only("sm")]: {
			fontSize: "40px",
			lineHeight: "40px",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
			lineHeight: "28px",
		},
	},
	description: {
		marginTop: "1.75rem",
		fontSize: "20px",
		lineHeight: "24px",
		[theme.breakpoints.only("sm")]: {
			...theme.typography.body2,
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
		},
		"@media (max-width: 481px)": {
			width: "18.5rem",
		},
	},
	button: {
		marginTop: "1.75rem",
		minWidth: "16rem",
		minHeight: "4rem",
		[theme.breakpoints.down("md")]: {
			minWidth: "10.125rem",
			minHeight: "2.5rem",
		},
		"& .MuiButton-label": {
			[theme.breakpoints.down("md")]: {
				...theme.typography.title3,
			},
		},
	},
}));

export default HeroSection;
