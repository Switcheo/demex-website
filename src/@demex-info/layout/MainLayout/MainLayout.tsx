import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

import clsx from "clsx";
import { startSagas } from "@demex-info/saga";

interface Props extends BoxProps { }

const MainLayout: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;

  useEffect(() => {
    startSagas();
  }, []);

	const classes = useStyles();
	return (
		<Box {...rest} className={clsx(classes.root, className)}>
			{children}
		</Box>
	);
};

const useStyles = makeStyles(() => ({
	root: {},
}));

export default MainLayout;
