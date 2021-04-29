import actions from "@demex-info/store/actions";
import { AppTasks, parseTokensArr, TokenObj, USDPrices } from "@demex-info/store/app/types";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, logger, parseNumber, uuidv4 } from "@demex-info/utils";
import RestClient from "@demex-info/utils/restClient";
import { all, call, delay, fork, put, select } from "redux-saga/effects";

function* handleQueryTokens(): Generator {
  while (true) {
    let setLoad: boolean = true;

    const restClient: any = yield select((state: RootState): RestClient => state.app.restClient);
    if (!restClient) continue;

    const tokensUuid = uuidv4();
    if (setLoad) {
      yield put(actions.Layout.addBackgroundLoading(AppTasks.Tokens, tokensUuid));
    }
    try {
      const response: any = yield call([restClient, restClient.getTokens]);
      const tokensData: TokenObj[] = parseTokensArr(response);
      yield put(actions.App.setTokens(tokensData));
    } catch (err) {
      yield put(actions.App.setTokens([]));
      console.error(err);
    } finally {
      if (setLoad) {
        yield put(actions.Layout.removeBackgroundLoading(tokensUuid));
        setLoad = false;
      }
      yield delay(60000);
    }
  }
}

function* watchBackupUSDPrice(): Generator {
  const COIN_GEKO_PRICES = {
    swth: "switcheo",
    btc: "bitcoin",
    dai: "dai",
    nneo: "neo",
    eth: "ethereum",
    flm: "flamingo-finance",
    usdc: "usd-coin",
    cel: "celsius-degree-token",
    nex: "neon-exchange",
    wbtc: "wrapped-bitcoin",
    bnb: "binancecoin",
    busd: "binance-usd",
    btcb: "binance-bitcoin",
  } as { [index: string]: string };

  while (true) {
    try {
      logger("updating price for", COIN_GEKO_PRICES.length, "denoms");
      const coinIds = Object.values(COIN_GEKO_PRICES);
      const coinKeys = Object.keys(COIN_GEKO_PRICES);

      const request: any = yield fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(",")}&vs_currencies=usd`);
      const response: any = yield request.json();

      if (response) {
        const newUsdPrices: USDPrices = {};
        coinKeys.forEach((commonDenom) => {
          const coinId = COIN_GEKO_PRICES[commonDenom];
          const price = parseNumber(response?.[coinId]?.usd, BN_ZERO)!;
          if (price?.gt(0)) {
            newUsdPrices[commonDenom] = price;
          }
        });

        yield put(actions.App.setUsdPrices(newUsdPrices));
      }
    } catch (err) {
      console.error(err);
      yield put(actions.App.setUsdPrices({}));
    } finally {
      // add to 60s for each refresh cycle
      yield delay(57000);
    }
  }
}

export default function* appSaga() {
  yield all([
    fork(handleQueryTokens),
    fork(watchBackupUSDPrice),
  ]);
}
