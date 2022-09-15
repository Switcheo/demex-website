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

interface Props {
	positionClass: string
	containerClass: string
	paddingClass: string
}

const BackgroundAnimation: React.FC<Props> = (props: Props) => {
	const { positionClass, containerClass, paddingClass } = props;
	const classes = useStyles();

	const allAnimation = useMemo(() => getLottieConfig(DemexV2Animation, clsx(classes.generic)), [classes]);

	return (
		<Container className={classes.root} maxWidth="xl">
			<Box className={positionClass}>
				<Box className={containerClass}>
					<Box className={paddingClass} />
					<Lottie { ...allAnimation} />
				</Box>
			</Box>
		</Container>
	);
};

const useStyles = makeStyles(() => ({
	root: {
		position: "relative",
	},
	generic: {
		position: "absolute",
		top: 0,
		left: 0,
		height: "unset !important",
	},
}));

export default BackgroundAnimation;
