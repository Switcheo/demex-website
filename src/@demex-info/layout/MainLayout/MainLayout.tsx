import { startSagas } from "@demex-info/saga";
import { BoxProps, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Footer, Header, Loading } from "./components";

interface Props extends BoxProps { }

const MainLayout: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;

  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    startSagas();
    const bodyEl = document.querySelector("body");
    bodyEl?.setAttribute("style", "overflow:hidden;");

    setTimeout(() => {
      setLoading(false);
      bodyEl?.setAttribute("style", "overflow:unset;");
    }, 1500);
  }, []);

	const classes = useStyles();
	return (
    <main className={clsx(classes.app, className, { load: loading })} {...rest}>
      <Loading loading={loading} />
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
    "&.load": {
      overflow: "hidden",
    },
  },
  filler: {
    height: "3.3125rem",
  },
}));

export default MainLayout;
