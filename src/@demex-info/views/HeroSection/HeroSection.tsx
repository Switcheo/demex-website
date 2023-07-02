// import { OSMOSAirdropBanner, OSMOSAirdropBannerMobile } from "@demex-info/assets";
import { BackgroundAnimation, SvgIcon } from "@demex-info/components";
// import { Banner } from "@demex-info/components/Banner";
import { getDemexLink, Paths } from "@demex-info/constants";
import { eskimi, StyleUtils } from "@demex-info/utils";
import { Box, Button, Container, Hidden, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
// import { renderToStaticMarkup } from "react-dom/server";
import { SWTH } from "@demex-info/assets";
import { useInView } from "react-intersection-observer";
import TextLoop from "react-text-loop";
import { DesktopMobile } from "./assets";
import { MarketsGrid, SocialsBar } from "./components";

const HeroSection: React.FC = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [ready, setReady] = React.useState<boolean>(false);

	const [titleRef, titleView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

	const items = ["Bitcoin", "Perpetuals", "Ethereum", "SWTH", "USDC", "Futures", "ATOM", "AAVE", "Gold", "Anything"];

	// const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	// const bannerAsString = encodeURIComponent(renderToStaticMarkup(isMobile ? <OSMOSAirdropBannerMobile /> : <OSMOSAirdropBanner />));

	useEffect(() => {
		setTimeout(() => setReady(true));
	}, []);

	const handleLaunchApp = () => {
		eskimi("track", "Conversion");
	};

	return (
		<Box component="section" className={clsx(classes.root)}>
			<SocialsBar />

			{/* TODO: Comment out when you uncomment ann banner */}
			<Box mt="5.5rem" />
			{/* TODO: Uncomment when you launch ann banner for competition */}
			{/* <Banner
				bannerIcon={OSMOGradient}
				headerText="$OSMO Perpetuals Airdrop Campaign is LIVE!"
				subHeader={<span>Trade OSMO, BTC & ETH Perpetual Contracts and <span className={classes.orangeStrong}>earn exciting rebates & rewards!</span></span>}
				ctaText="Learn more"
				ctaUrl={StaticLinks.DemexDocs.Competition.Upcoming.Main}
				buttonText="Join Now"
				buttonUrl={Paths.Competition.SignUp}
				backgroundImg={bannerAsString}
			/> */}

			<Box className={clsx(classes.text, classes.tagline)}>
				Trade&nbsp;
				<TextLoop
					interval={[1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 5000]}
				>
					{items.map((item: string) => (
						<span key={`${item}`}>{item}</span>
					))}
				</TextLoop>
			</Box>
			{ready && (
				<BackgroundAnimation positionClass={classes.position} containerClass={classes.container} paddingClass={classes.padding} />
			)}
			<div ref={titleRef} >
				<Container maxWidth={false} className={clsx(classes.contentContainer, { open: titleView })}>
					<Box className={classes.left}>
						<Box className={classes.content}>

							<Box className={clsx(classes.text, classes.headline)}>
								The Only DEX You Need
							</Box>

							<Box className={clsx(classes.text, classes.description)}>
								Trade derivatives, lend or borrow tokens,&nbsp;

								{isDesktop && <br />}

								mint stablecoins, and provide liquidity on the
								<span className={classes.altText}>
									&nbsp;
									{isDesktop && <br />}
									most extensive decentralized platform ever.
								</span>
							</Box>
							<Box display={isDesktop ? "flex" : "block"} className={clsx(classes.text, classes.altText)} style={{ fontWeight: 700 }}>
								<Box className={classes.carbonWrapper}>
									Powered by
									<SvgIcon className={classes.carbonLogo} component={SWTH} />
									<span style={{ color: "#8CF2FD" }}>Carbon</span>,
								</Box>
								a&nbsp;
								<span className={classes.purpleGradient}>Cosmos SDK</span>
								AppChain
							</Box>


							<Button
								className={classes.button}
								variant="contained"
								target="_blank"
								onClick={handleLaunchApp}
								href={getDemexLink(Paths.Trade)}
							>
								Launch App
							</Button>
						</Box>
					</Box>

					<Hidden mdDown>
						<Box className={classes.graphicsWrapper}>
							<SvgIcon className={classes.svgIcon} component={DesktopMobile} />
						</Box>
					</Hidden>

				</Container>
			</div>
			<Suspense fallback={null}>
				<MarketsGrid />
			</Suspense>
		</Box>

	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		marginBottom: "12px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "maxContent",

		[theme.breakpoints.down("sm")]: {
			padding: "0 0.75rem",
			overflow: "hidden",
			paddingBottom: "15rem",
			marginBottom: "-15rem",
		},
	},
	position: {
		position: "absolute",
		left: 0,
		width: "100%",
		zIndex: 0,
		[theme.breakpoints.up("lg")]: {
			left: "-30%",
			top: "-15rem",
		},
		[theme.breakpoints.down("md")]: {
			top: "-125px",
			minHeight: "60rem",
		},
		[theme.breakpoints.down("xs")]: {
			top: "-15rem",
		},
	},
	container: {
		position: "relative",
		margin: "0 auto",
		maxWidth: "1480px",
		[theme.breakpoints.only("lg")]: {
			width: "1480px",
		},
		[theme.breakpoints.down("md")]: {
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
	left: {
		display: "flex",
		maxHeight: "800px",
		height: "calc(100vh - 500px)",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "50%",
		[theme.breakpoints.down("md")]: {
			width: "100%",
			height: "unset",
			paddingTop: "2.265rem",
			alignItems: "center",
			padding: "0",
		},
		[theme.breakpoints.only("sm")]: {
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
		marginTop: "3rem",
		position: "relative",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: 0,
		opacity: 0,
		transform: "translate(0px, 60px)",
		transition: "opacity ease-in 0.5s, transform ease-in 0.6s",
		"&.open": {
			opacity: 1,
			transform: "translate(0px,0px)",
		},
		[theme.breakpoints.down("md")]: {
			marginTop: 0,
			height: "unset",
			overflow: "hidden",
		},
		[theme.breakpoints.down("sm")]: {
			padding: "0",
		},
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",
		[theme.breakpoints.up("lg")]: {
			paddingLeft: "4rem",
		},
		[theme.breakpoints.down("md")]: {
			alignItems: "center",
		},
	},
	text: {
		...theme.typography.body1,
		color: theme.palette.text.secondary,
		textAlign: "left",
		zIndex: 1,
	},
	tagline: {
		display: "flex",
		width: "150px",
		marginTop: "1rem",
		"& > div > div > div > span": {
			fontWeight: 700,
			textDecoration: "underline",
			color: theme.palette.text.primary,
		},
		[theme.breakpoints.down("md")]: {
			...theme.typography.body3,
			width: "107px",
			paddingLeft: "1.7rem",
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body4,
			width: "95px",
			paddingLeft: "1.2rem",
		},
	},
	headline: {
		...theme.typography.h1,
		fontSize: "48px",
		lineHeight: "48px",
		textAlign: "left",
		color: theme.palette.text.primary,
		[theme.breakpoints.down("md")]: {
			fontSize: "56px",
			lineHeight: "56px",
			textAlign: "center",
		},
		[theme.breakpoints.only("sm")]: {
			fontSize: "40px",
			lineHeight: "40px",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "32px",
			lineHeight: "38px",
			width: "80%",
		},
	},
	description: {
		marginTop: "1.75rem",
		fontSize: "20px",
		lineHeight: "24px",
		width: "70%",
		marginBottom: "2.5rem",
		[theme.breakpoints.down("lg")]: {
			width: "90%",
		},
		[theme.breakpoints.down("md")]: {
			textAlign: "center",
			marginBottom: "1.5rem",
		},
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
		marginTop: "2.5rem",
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
	orangeStrong: {
		fontWeight: 700,
		background: StyleUtils.orangeGradient,
		backgroundClip: "text",
		WebkitTextFillColor: "transparent",
		WebkitBackgroundClip: "text",
	},
	altText: {
		color: theme.palette.text.primary,
		[theme.breakpoints.only("sm")]: {
			...theme.typography.body2,
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
		},
	},
	graphicsWrapper: {
		overflow: "hidden",
		marginLeft: "-9rem",
		[theme.breakpoints.up("xl")]: {
			overflow: "visible",
		},
	},
	svgIcon: {
		position: "relative",
		left: "50px",
		[theme.breakpoints.down(1400)]: {
			width: "1000px",
		},
	},
	purpleGradient: {
		background: StyleUtils.purpleGradient,
		backgroundClip: "text",
		WebkitTextFillColor: "transparent",
		WebkitBackgroundClip: "text",
		marginRight: "0.25rem",
	},
	carbonWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"&.carbon": {
			color: "#8CF2FD",
		},
		[theme.breakpoints.up("sm")]: {
			marginRight: "0.25rem",
		},
	},
	carbonLogo: {
		margin: "0 0.25rem",
		width: "19px",
		height: "19px",
		[theme.breakpoints.only("xs")]: {
			width: "16px",
			height: "16px",
		},
	},
}));

export default HeroSection;
