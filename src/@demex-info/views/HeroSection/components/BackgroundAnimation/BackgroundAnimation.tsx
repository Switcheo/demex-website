import { AllOrbitals, OrbitalGroup3, OrbitalGroup4, OrbitalGroup5 } from "@demex-info/assets";
import { Box, Container, makeStyles } from "@material-ui/core";
import React, { useMemo } from "react";

import Lottie from "react-lottie";
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
					<Lottie options={allOrbitals} />
					<Lottie options={orbital3} />
					<Lottie options={orbital4} />
					<Lottie options={orbital5} />
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
	},
	container: {
		position: "relative",
		margin: "-806px -1268px",
		[theme.breakpoints.down("lg")]: {
			margin: "-713px -1268px",
		},
		[theme.breakpoints.down("md")]: {
			margin: "-383px -897px",
		},
		[theme.breakpoints.down("sm")]: {
			margin: "-323px -715px",
		},
		[theme.breakpoints.down("xs")]: {
			margin: "-112px -397px",
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
