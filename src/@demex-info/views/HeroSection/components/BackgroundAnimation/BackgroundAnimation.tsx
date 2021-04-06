import { AllOrbitals, OrbitalGroup3, OrbitalGroup4, OrbitalGroup5 } from "@demex-info/assets";
import { Box, Container, makeStyles } from "@material-ui/core";
import React, { useMemo } from "react";

import Lottie from "lottie-react";
import clsx from "clsx";

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
		overflow: "hidden",
		[theme.breakpoints.up("lg")]: {
			height: "100vh",
		},
		[theme.breakpoints.only("md")]: {
			minHeight: "45rem",
		},
		[theme.breakpoints.down("sm")]: {
			minHeight: "30rem",
		},
	},
	container: {
		position: "relative",
		margin: "-45vh -1268px",
		[theme.breakpoints.down("lg")]: {
			// margin: "-713px -1268px",
			margin: "-42% -1268px",
		},
		[theme.breakpoints.down("md")]: {
			margin: "-45% -897px",
		},
		[theme.breakpoints.down("sm")]: {
			margin: "-50vh -715px",
		},
		[theme.breakpoints.down("xs")]: {
			margin: "-15vh -397px",
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