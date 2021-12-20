import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { Models } from "carbon-js-sdk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

let initInterval: any;

export default (): void => {
  const dispatch = useDispatch();
  const sdk = useSelector((state: RootState) => state.app.sdk);

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
    if (sdk) {
      handleQueryTokens();
      initInterval = setInterval(() => {
        handleQueryTokens();
      }, 60000);
      return () => {
        clearInterval(initInterval);
      };
    }
    return () => { };
  }, [sdk]);
};
