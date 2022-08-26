import { DemexV2Animation } from "@demex-info/assets";
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

	const allAnimation = useMemo(() => getLottieConfig(DemexV2Animation, clsx(classes.generic)), [classes]);

	return (
		<Container className={classes.root} maxWidth="xl">
			<Box className={classes.position}>
				<Box className={classes.container}>
					<Box className={classes.padding} />
					<Lottie { ...allAnimation} />
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
		overflow: "hidden",
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		[theme.breakpoints.up("lg")]: {
			height: "calc(100vh + 40rem)",
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
