import { Box, BoxProps, Theme, makeStyles } from "@material-ui/core";
import { Footer, Header } from "./components";
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
    <main className={clsx(classes.app, className)} {...rest}>
      <Header />
      <Box className={classes.filler} />
			{children}
      <Footer />
    </main>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    position: "relative",
  },
  filler: {
    height: "3.3125rem",
  },
}));

export default MainLayout;
