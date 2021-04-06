import { Box, Button, Container, makeStyles } from "@material-ui/core";
import { Paths, getDemexLink } from "@demex-info/constants";

import { BackgroundAnimation } from "./components";
import React from "react";
import { TypographyLabel } from "@demex-info/components";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

const HeroSection: React.FC = () => {
	const classes = useStyles();

	const [sectionRef, sectionView] = useInView({
		threshold: 0.8,
		triggerOnce: true,
	});

	return (
		<section ref={sectionRef} className={clsx(classes.root)}>
			<BackgroundAnimation />
			<Container maxWidth="lg" className={clsx(classes.contentContainer, classes.slide, { open: sectionView })}>
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
		</section>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		minHeight: "45rem",
		marginBottom: "12px",
		[theme.breakpoints.up("lg")]: {
			height: "100vh",
		},
		[theme.breakpoints.down("sm")]: {
			minHeight: "480px",
		},
	},
	content: {
		fontSize: "16px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		[theme.breakpoints.down("md")]: {
			fontSize: "15px",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "10px",
		},
	},
	contentContainer: {
		marginTop: "120px",
		position: "relative",
		[theme.breakpoints.up("lg")]: {
			display: "flex",
			justifyContent: "center",
			marginTop: "calc((100vh - 420px) / 2)",
		},
		[theme.breakpoints.only("md")]: {
			height: "100%",
			marginTop: 0,
			maxHeight: "45rem",
			paddingTop: "calc((50% - 200px)/2)",
		},
		[theme.breakpoints.only("sm")]: {
			marginTop: 0,
			paddingTop: "calc((50% - 108px)/2)",
		},
		[theme.breakpoints.only("xs")]: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			marginTop: 0,
			height: "100%",
		},
		[theme.breakpoints.down("sm")]: {
			minHeight: "480px",
		},
	},
	slide: {
    opacity: 0,
    transform: "translate(0px, 50px)",
		transition: "opacity ease-in 0.6s, transform ease-in 0.7s",
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
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
		[theme.breakpoints.only("xs")]: {
			marginTop: "1.75em",
		},
	},
	button: {
		marginTop: "4em",
		padding: "0.8125em 1.75em",
		[theme.breakpoints.only("sm")]: {
			marginTop: "2em",
		},
		[theme.breakpoints.only("xs")]: {
			marginTop: "1.75em",
		},
		"& .MuiButton-label": {
			[theme.breakpoints.down("sm")]: {
				fontSize: ".75rem",
			},
		},
	},
}));

export default HeroSection;
