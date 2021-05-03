import { COIN_GEKO_PRICES } from "@demex-info/constants";
import actions from "@demex-info/store/actions";
import { parseTokensArr, TokenObj, USDPrices } from "@demex-info/store/app/types";
import { RootState } from "@demex-info/store/types";
import { parseNumber, BN_ZERO } from "@demex-info/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

let initInterval: any;

export default (): void => {
  const dispatch = useDispatch();
  const restClient = useSelector((state: RootState) => state.app.restClient);

  const handleQueryTokens = async () => {
    try {
      const response: any = await restClient.getTokens();
      const tokensData: TokenObj[] = parseTokensArr(response);
      dispatch(actions.App.setTokens(tokensData));
    } catch (err) {
      dispatch(actions.App.setTokens([]));
      console.error(err);
    }
  };

  const handleQueryUsd = async () => {
    try {
      const coinIds = Object.values(COIN_GEKO_PRICES);
      const coinKeys = Object.keys(COIN_GEKO_PRICES);

      const request: any = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(",")}&vs_currencies=usd`);
      const response: any = await request.json();

      if (response) {
        const newUsdPrices: USDPrices = {};
        coinKeys.forEach((commonDenom) => {
          const coinId = COIN_GEKO_PRICES[commonDenom];
          const price = parseNumber(response?.[coinId]?.usd, BN_ZERO)!;
          if (price?.gt(0)) {
            newUsdPrices[commonDenom] = price;
          }
        });

        dispatch(actions.App.setUsdPrices(newUsdPrices));
      }
    } catch (err) {
      console.error(err);
      dispatch(actions.App.setUsdPrices({}));
    }
  };

  useEffect(() => {
    handleQueryTokens();
    handleQueryUsd();
    initInterval = setInterval(() => {
      handleQueryTokens();
      handleQueryUsd();
    }, 60000);
    return () => clearInterval(initInterval);
  }, []);
};
