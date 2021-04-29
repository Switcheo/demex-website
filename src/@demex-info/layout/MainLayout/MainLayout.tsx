import { BoxProps, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import Loadable from "react-loadable";
import Header from "./components/Header";

interface Props extends BoxProps { }

const Footer = Loadable({
  loader: () => import("./components/Footer"),
  loading() {
    return null;
  },
  delay: 1800,
});

const MainLayout: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;

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
    maxWidth: "100%",
  },
  filler: {
    height: "3.3125rem",
  },
}));

export default MainLayout;
