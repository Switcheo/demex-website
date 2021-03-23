import { BoxProps, Theme, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";

import { Header } from "./components";
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
			{children}
    </main>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    position: "relative",
  },
}));

export default MainLayout;
