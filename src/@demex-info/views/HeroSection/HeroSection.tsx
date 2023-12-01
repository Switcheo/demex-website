import { BackgroundAnimation, CoinIcon, SvgIcon } from "@demex-info/components";
import { getDemexLink, Paths } from "@demex-info/constants";
import { eskimi, StyleUtils } from "@demex-info/utils";
import { Box, Button, Container, Hidden, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import TextLoop from "react-text-loop";
import { DesktopMobile, Mobile } from "./assets";
import { MarketsGrid, SocialsBar, TradingViewPopper } from "./components";

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
			<Box mt="8vh" />
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
			<div className={classes.containerWrapper} ref={titleRef}>
				<Container maxWidth={false} className={clsx(classes.contentContainer, { open: titleView })}>
					<Box className={classes.left}>
						<Box className={classes.content}>

							<Box className={clsx(classes.text, classes.headline)}>
								The Only DEX <br></br>You Need
							</Box>

							<Box className={clsx(classes.text, classes.description)}>
								Trade derivatives, lend or borrow tokens, mint stablecoins, and provide liquidity on the
								<span className={classes.altText}>
									&nbsp;most extensive decentralized platform ever.
								</span>
							</Box>
							<Box display={isDesktop ? "flex" : "block"} className={clsx(classes.text, classes.altText)} style={{ fontWeight: 700 }}>
								<Box className={classes.carbonWrapper}>
									Powered by
									<CoinIcon className={classes.carbonLogo} denom="SWTH" />
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

					<Hidden smDown>
						<Box className={classes.graphicsWrapper}>
							<SvgIcon className={classes.svgIcon} component={DesktopMobile} />
							<Box className={classes.tradingViewWrapper}>
								<TradingViewPopper />
							</Box>
						</Box>
					</Hidden>

					<Hidden mdUp>
						<Box className={classes.mobileGraphicsWrapper}>
							<SvgIcon component={Mobile} />
							<TradingViewPopper />
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
			width: "auto",
			height: "unset",
			paddingTop: "2.265rem",
			alignItems: "center",
			padding: "0",
			marginBottom: "50px",
		},
		[theme.breakpoints.down("sm")]: {
			height: "unset",
			width: "100%",
		},
		[theme.breakpoints.only("xs")]: {
			padding: "2.265rem 0 0",
			height: "unset",
		},
	},
	contentContainer: {
		position: "relative",
		display: "flex",
		justifyContent: "space-between",
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
			justifyContent: "center",
			flexDirection: "column",
		},
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",
		[theme.breakpoints.up("md")]: {
			paddingLeft: "5rem",
		},
		[theme.breakpoints.down("sm")]: {
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
		[theme.breakpoints.up("xl")]: {
			whiteSpace: "nowrap",
			"& > br": {
				display: "none",
			},
		},
		[theme.breakpoints.down("sm")]: {
			textAlign: "center",
			"& > br": {
				display: "none",
			},
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "56px",
			lineHeight: "56px",
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
		// on headline text break, always break in between DEX and You Need
		"& > br": {
			"@media (max-width: 630px)": {
				display: "block",
			},
		},
	},
	description: {
		maxWidth: "380px",
		marginTop: "1.75rem",
		fontSize: "20px",
		lineHeight: "24px",
		width: "100%",
		marginBottom: "2.5rem",
		[theme.breakpoints.down("lg")]: {
			width: "90%",
		},
		[theme.breakpoints.up("xl")]: {
			maxWidth: "none",
			width: "700px",
		},
		[theme.breakpoints.down("md")]: {
			marginBottom: "1.5rem",
		},
		[theme.breakpoints.down("sm")]: {
			textAlign: "center",
		},
		[theme.breakpoints.only("md")]: {
			...theme.typography.body1,
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
		[theme.breakpoints.only("md")]: {
			...theme.typography.body1,
		},
		[theme.breakpoints.only("sm")]: {
			...theme.typography.body2,
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
		},
	},
	graphicsWrapper: {
		position: "relative",
		overflow: "hidden",
		marginLeft: "-9rem",
		[theme.breakpoints.down("md")]: {
			width: "60%",
		},
	},
	mobileGraphicsWrapper: {
		display: "flex",
		justifyContent: "center",
		marginBottom: "50px",
		flexDirection: "column",
		alignItems: "center",
	},
	tradingViewWrapper: {
		position: "absolute",
		bottom: "5%",
		right: "20%",
		"@media only screen and (min-width: 1720px) and (max-width: 1920px) ": {
			right: "25%!important",
		},
		"@media only screen and (min-width: 1630px) and (max-width: 1720px) ": {
			right: "22%!important",
		},
		[theme.breakpoints.down("lg")]: {
			right: "15%",
		},
		[theme.breakpoints.down("md")]: {
			bottom: "5%",
		},
		"@media (max-width: 1000px)": {
			bottom: "15%",
		},
	},
	svgIcon: {
		height: "500px",
		position: "relative",
		[theme.breakpoints.down(1400)]: {
			width: "55vw",
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
	containerWrapper: {
		[theme.breakpoints.only("lg")]: {
			width: "100%",
		},
		[theme.breakpoints.only("md")]: {
			width: "100%",
		},
	},
}));

export default HeroSection;
