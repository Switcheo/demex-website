import { AllOrbitals, OrbitalGroup3, OrbitalGroup4, OrbitalGroup5 } from "@demex-info/assets";
import { Box, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Lottie from "lottie-react";
import React, { useMemo } from "react";

const getLottieConfig = (animationData: any, className: string) => {
	return {
		autoplay: true,
		animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
			className,
		},
	};
};

const BackgroundAnimation: React.FC = () => {
	const classes = useStyles();

	const allOrbitals = useMemo(() => getLottieConfig(AllOrbitals, clsx(classes.generic)), [classes]);
	const orbital3 = useMemo(() => getLottieConfig(OrbitalGroup3, clsx(classes.generic)), [classes]);
	const orbital4 = useMemo(() => getLottieConfig(OrbitalGroup4, clsx(classes.generic)), [classes]);
	const orbital5 = useMemo(() => getLottieConfig(OrbitalGroup5, clsx(classes.generic)), [classes]);

	return (
		<Container className={classes.root} maxWidth="xl">
			<Box className={classes.position}>
				<Box className={classes.container}>
					<Box className={classes.padding} />
					<Lottie { ...allOrbitals } />
					<Lottie { ...orbital3 } />
					<Lottie { ...orbital4 } />
					<Lottie { ...orbital5 } />
				</Box>
			</Box>
		</Container>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
	},
	position: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		[theme.breakpoints.up("lg")]: {
			height: "100vh",
		},
		[theme.breakpoints.only("md")]: {
			minHeight: "40rem",
		},
		[theme.breakpoints.down("sm")]: {
			minHeight: "30rem",
		},
	},
	container: {
		position: "relative",
		margin: "-38% -67%",
		[theme.breakpoints.down("lg")]: {
			margin: "-45% -100%",
		},
		"@media (max-width: 1600px)": {
			margin: "-56% -100%",
		},
		[theme.breakpoints.down("md")]: {
			margin: "-57% ​-100%",
		},
		[theme.breakpoints.down("sm")]: {
			margin: "-50% -100%",
		},
		[theme.breakpoints.down("xs")]: {
			margin: "-35% -103%",
		},
	},
	padding: {
		paddingTop: "56.25%",
	},
	generic: {
		position: "absolute",
		top: 0,
		left: 0,
	},
}));

export default BackgroundAnimation;
