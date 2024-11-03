import HeroBackground from "@demex-info/assets/background/HeroBackground.svg";
import { SvgIcon } from "@demex-info/components";
import { Box, Button, ButtonGroup, Card, CardContent, Container, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Fade, Rotate } from "react-awesome-reveal";
import { Demex } from "@demex-info/assets/logos";
import { MarketsGrid, TradeTopMarkets } from "./components";
import { Tokens } from "./assets";
import { useSelector } from "react-redux";
import { RootState } from "@demex-info/store/types";
import { EventAction, sendGaEvent } from "@demex-info/utils";
import { getDemexLink, goToDemexLink, Paths } from "@demex-info/constants";
import { useHeroSectionStyles } from "./styles";

const HeroSection: React.FC = () => {
	const classes = useStyles();
	const styles = useHeroSectionStyles();
	const net = useSelector((state: RootState) => state.app.network);
	const isMobile = useMediaQuery("(max-width:930px)");

	const handleClickDemexLink = (demexLink: string, gaEvent?: EventAction) => {
    goToDemexLink(demexLink);
    if (gaEvent) sendGaEvent(gaEvent);
  };

	const [isTradeCard, setIsTradeCard] = React.useState(true);

	return (
		<Box component="section" className={clsx(classes.root)}>
			<Box className={classes.emptySpacing} />
			<div className={classes.containerWrapper}>
				<Container maxWidth={false} className={classes.contentContainer}>
					<Box className={classes.left}>
						<Box className={classes.content}>
							<Rotate triggerOnce>
								<SvgIcon className={classes.demexLogo} component={Demex} />
							</Rotate>
							<Fade triggerOnce duration={2000}>
								<Typography variant="h1" className={classes.headline}>
									Trade. Earn.
									<br />
									Exponentially.
								</Typography>
							</Fade>
							<Fade triggerOnce direction="up">
								<Typography variant="h3" className={clsx(classes.text, classes.description)}>
									Trade Perpetuals or Earn Yield — All on One Platform
								</Typography>
							</Fade>
						</Box>
					</Box>
					<Fade triggerOnce direction="up">
						<div className={classes.right}>
							{isMobile && (
								<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
									<Button
										size="large"
										variant="contained"
										className={clsx(classes.tab, { inactive: !isTradeCard })}
										onClick={() => setIsTradeCard(true)}
									>
										Trade
									</Button>
									<Button
										size="large"
										variant="contained"
										className={clsx(classes.tab, { inactive: isTradeCard })}
										onClick={() => setIsTradeCard(false)}
									>
										Earn
									</Button>
								</ButtonGroup>
							)}
							<TradeTopMarkets active={isTradeCard} onClickButton={() => handleClickDemexLink(getDemexLink(Paths.Trade, net), "click_trade")}/>
							<Fade triggerOnce delay={50} direction="up">
								<Card
									className={clsx(styles.card, { inactive: isTradeCard })}
									onMouseEnter={() => setIsTradeCard(false)}
									onMouseLeave={() => setIsTradeCard(true)}
								>
									<CardContent className={clsx(styles.cardContent, "earn")}>
										<Box display="flex" flexDirection="column"alignItems="center" gridGap={16} width="100%">
											<div className={styles.cardTitleWrapper}>
												<Typography variant="h3" className={styles.cardTitle}>Earn High Yield</Typography>
												{isMobile && (
													<Button
														onClick={() => handleClickDemexLink(getDemexLink(Paths.Nitron.Main, net), "click_nitron")}
														size="small"
														variant="contained"
														color="primary"
														className={clsx(styles.button, "isMobile")}
														fullWidth
													>
														Earn
													</Button>
												)}
											</div>
											<SvgIcon className={classes.tokensLogo} component={Tokens} />
											<Typography className={classes.title}>Up to 100% APR</Typography>
											<Typography className={classes.subTitle}>Borrow, lend, mint assets</Typography>
										</Box>
										{!isMobile && (
											<Button
												onClick={() => handleClickDemexLink(getDemexLink(Paths.Nitron.Main, net), "click_nitron")}
												size="large"
												variant="contained"
												color="primary"
												className={clsx(styles.button, { inactive: isTradeCard })}
												fullWidth
											>
												Earn Now
											</Button>
										)}
									</CardContent>
								</Card>
							</Fade>
						</div>
					</Fade>
				</Container>
				<Fade triggerOnce direction="up" delay={500}>
					<MarketsGrid />
				</Fade>
			</div>
		</Box>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		backgroundImage: `url(${HeroBackground})`,
		backgroundSize: "cover",
		backgroundRepeat: "no-repeat",
		[theme.breakpoints.down("sm")]: {
			padding: "0 0.75rem",
			overflow: "hidden",
			paddingBottom: "15rem",
			marginBottom: "-15rem",
			backgroundSize: "contain",
			backgroundPosition: "center 11%",
		},
	},
	emptySpacing: {
		marginTop: "15rem",
		[theme.breakpoints.down("lg")]: {
			marginTop: "10rem",
		},
		[theme.breakpoints.down("sm")]: {
			marginTop: "5rem",
		},
		[theme.breakpoints.down("xs")]: {
			marginTop: 0,
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
		maxWidth: "380px",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",
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
			marginBottom: "30px",
		},
		[theme.breakpoints.only("xs")]: {
			padding: "2.265rem 0 0",
			height: "unset",
		},
	},
	right: {
		display: "flex",
		justifyContent: "flex-end",
		gap: theme.spacing(4),
		width: "100%",
		height: "100%",
		[theme.breakpoints.down("md")]: {
			gap: theme.spacing(3),
		},
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			gap: theme.spacing(1),
		},
	},
	contentContainer: {
		position: "relative",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 0,
		gap: theme.spacing(16),
		[theme.breakpoints.down("md")]: {
			marginTop: 0,
			height: "unset",
			overflow: "hidden",
			padding: theme.spacing(0, 4),
			gap: theme.spacing(10),
		},
		["@media (max-width: 1050px)"]: {
			marginTop: 0,
			height: "unset",
			overflow: "hidden",
			padding: 0,
			gap: theme.spacing(1),
		},
		["@media (max-width: 755px)"]: {
			padding: 0,
			justifyContent: "center",
			flexDirection: "column",
		},
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "center",
		gap: theme.spacing(4),
		["@media (max-width: 755px)"]: {
			alignItems: "center",
			gap: theme.spacing(2),
		},
	},
	text: {
		...theme.typography.body1,
		color: theme.palette.text.secondary,
		textAlign: "left",
		zIndex: 1,
	},
	headline: {
		...theme.typography.h1,
		lineHeight: "48px",
		textAlign: "left",
		color: theme.palette.text.primary,
		["@media (max-width: 1180px)"]: {
			...theme.typography.h2,
		},
		["@media (max-width: 755px)"]: {
			textAlign: "center",
		},
	},
	description: {
		...theme.typography.body1,
		maxWidth: "320px",
		["@media (max-width: 1180px)"]: {
			...theme.typography.title3,
		},
		["@media (max-width: 755px)"]: {
			textAlign: "center",
		},
	},
	demexLogo: {
		width: "60px",
		height: "60px",
	},
	tokensLogo: {
		width: "18.75rem",
		height: "auto",
	},
	containerWrapper: {
		maxWidth: "1346px",
		margin: "0 auto",
	},
	title: {
		...theme.typography.h3,
		color: theme.palette.text.primary,
		[theme.breakpoints.down("md")]: {
			...theme.typography.h4,
		},
	},
	subTitle: {
		...theme.typography.body2,
		color: theme.palette.text.secondary,
		[theme.breakpoints.down("md")]: {
			...theme.typography.body2,
		},
	},
	tab: {
		...theme.typography.body3,
		color: theme.palette.text.primary,

		width: "100%",
		"&.inactive": {
			background: theme.palette.background.tertiary,
			color: theme.palette.text.secondary,
		},
	},
}));

export default HeroSection;
