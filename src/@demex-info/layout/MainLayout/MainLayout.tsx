import { startSagas } from "@demex-info/saga";
import { BoxProps, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Footer, Header } from "./components";

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
      <Footer />
    </main>
	);
};

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  filler: {
    height: "3.3125rem",
  },
}));

export default MainLayout;
