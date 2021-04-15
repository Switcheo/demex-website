import { Box, BoxProps, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

interface Props extends BoxProps { }

const SampleComponent: React.FC<Props> = (props: Props) => {
	const { className, ...rest } = props;
	const classes = useStyles();
	return (
		<Box {...rest} className={clsx(classes.root, className)}></Box>
	);
};

const useStyles = makeStyles(() => ({
	root: {},
}));

export default SampleComponent;
