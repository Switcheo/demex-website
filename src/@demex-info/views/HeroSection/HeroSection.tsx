import { OSMOGradient, OSMOSAirdropBanner, OSMOSAirdropBannerMobile } from "@demex-info/assets";
import { BackgroundAnimation } from "@demex-info/components";
import { Banner } from "@demex-info/components/Banner";
import { getDemexLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Button, Container, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { StyleUtils } from "@demex-info/utils";
import { renderToStaticMarkup } from "react-dom/server";
import { useSelector } from "react-redux";
import TextLoop from "react-text-loop";
import MarketsGrid from "./components/MarketsGrid";

const HeroSection: React.FC = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [ready, setReady] = React.useState<boolean>(false);

	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const net = useSelector((state: RootState) => state.app.network);

	const items = ["Bitcoin", "Perpetuals", "Ethereum", "SWTH", "USDC", "Futures", "Atom", "AAVE", "Wrapped Bitcoin", "Gold", "Anything"];

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const bannerAsString = encodeURIComponent(renderToStaticMarkup(isMobile ? <OSMOSAirdropBannerMobile /> : <OSMOSAirdropBanner />));

	useEffect(() => {
		setTimeout(() => setReady(true));
	}, []);

	return (
		<Box component="section" className={clsx(classes.root)}>
			<Banner
				bannerIcon={OSMOGradient}
				headerText="$OSMO Perpetuals Airdrop Campaign is LIVE!"
				subHeader={<span>Trade OSMO, BTC & ETH Perpetual Contracts and earn up to <span className={classes.orangeStrong}>110 USDC!</span></span>}
				ctaText="Learn more"
				ctaUrl={Paths.Competition.SignUp}
				buttonText="Join Now"
				buttonUrl={getDemexLink(Paths.Nitron, net)}
				backgroundImg={bannerAsString}
			/>
			{
				ready && (
					<BackgroundAnimation positionClass={classes.position} containerClass={classes.container} paddingClass={classes.padding} />
				)
			}
			<Container maxWidth={false} className={classes.contentContainer}>
				<Box className={classes.content}>
					<Box className={clsx(classes.text, classes.tagline)}>
						Trade&nbsp;
						<TextLoop
							interval={[1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 5000]}
						>
							{items.map((item: string) => (
								<span key={`${item}`}>{item}</span>
							))}
						</TextLoop>
					</Box>
					<Box className={clsx(classes.text, classes.headline)}>
						The Order Book DEX for the&nbsp;
						{isDesktop && <br />}
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
			marginTop: 0,
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
		width: "150px",
		"& > div > div > div > span": {
			fontWeight: 700,
			textDecoration: "underline",
			color: theme.palette.text.primary,
		},
		[theme.breakpoints.only("sm")]: {
			...theme.typography.body3,
			width: "107px",
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body4,
			width: "95px",
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
	orangeStrong: {
		fontWeight: 700,
		background: StyleUtils.orangeGradient,
		backgroundClip: "text",
		WebkitTextFillColor: "transparent",
		WebkitBackgroundClip: "text",
	},
}));

export default HeroSection;
