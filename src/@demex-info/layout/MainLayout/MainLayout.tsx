import { useAsyncTask } from "@demex-info/hooks";
import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { BoxProps, makeStyles, Theme } from "@material-ui/core";
import { CarbonSDK } from "carbon-js-sdk";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";

interface Props extends BoxProps { }

const MainLayout: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;
  const [runInitSDK] = useAsyncTask("runInitSDK");
  const dispatch = useDispatch();
  const net = useSelector((store: RootState) => store.app.network);

  useEffect(() => {
    if (window.location.pathname !== "" && window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    runInitSDK(async () => {
      try {
        const sdk = await CarbonSDK.instance({
          network: net,
        });
        await sdk.token.reloadDenomGeckoMap().then(() => sdk.token.reloadUSDValues());
        dispatch(actions.App.setSDK(sdk));
      } catch (err) {
        console.error(err);
      }
    });
    return () => {};
  }, [net]);

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
