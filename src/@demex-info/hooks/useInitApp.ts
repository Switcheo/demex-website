import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { Models } from "carbon-js-sdk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useCheckSDK from "./useCheckSDK";

let initInterval: any;

export default (): void => {
  const dispatch = useDispatch();
  const sdk = useSelector((state: RootState) => state.app.sdk);
  const [checkSDK, setCheckSDK] = useCheckSDK();

  const handleQueryTokens = async () => {
    try {
      const response: Models.QueryAllTokenResponse = await sdk!.query.coin.TokenAll({});
      dispatch(actions.App.setTokens(response.tokens));
    } catch (err) {
      dispatch(actions.App.setTokens([]));
      console.error(err);
    }
  };

  useEffect(() => {
    if (checkSDK) {
      handleQueryTokens();
      initInterval = setInterval(() => {
        handleQueryTokens();
      }, 60000);
      return () => {
        setCheckSDK(false);
        clearInterval(initInterval);
      };
    }
  }, [checkSDK]);
};
