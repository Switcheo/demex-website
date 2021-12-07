import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { BoxProps, makeStyles, Theme } from "@material-ui/core";
import { CarbonSDK, WSConnector } from "carbon-js-sdk";
import clsx from "clsx";
import React, { useEffect } from "react";
import Loadable from "react-loadable";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const net = useSelector((store: RootState) => store.app.network);

  useEffect(() => {
    if (window.location.pathname !== "" && window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    // let wsConnect: WSConnector | undefined;

    const initWsSDK = async () => {
      try {
        const sdk = await CarbonSDK.instance({
          network: net,
        });
        const wsConnector = new WSConnector({
          endpoint: sdk.networkConfig.wsUrl,
          timeoutConnect: 5000,
          // mainnet not updated with heartbeat support
          disableHeartbeat: net === CarbonSDK.Network.MainNet,
        });
        await wsConnector.connect();

        // wsConnect = wsConnector;
        dispatch(actions.App.setSDK(sdk));
        dispatch(actions.App.setWsConnector(wsConnector));
      } catch (err) {
        console.error(err);
      }
    };
    initWsSDK();

    return () => {};
  }, [net]);

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
