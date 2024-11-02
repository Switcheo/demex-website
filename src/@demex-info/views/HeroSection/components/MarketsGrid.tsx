import { RenderGuard, SvgIcon, TypographyLabel } from "@demex-info/components";
import { Cards } from "@demex-info/components/Cards";
import { useAsyncTask, useRollingNum, useWebsocket } from "@demex-info/hooks";
import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO } from "@demex-info/utils"; // eslint-disable-line
import { getAllMarkets, getTokens, getTokenTotalSupplyAll, MarketListMap, MarketStatItem, parseMarketListMap, parseMarketStats } from "@demex-info/utils/markets";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import { TypeUtils, WSConnectorTypes, WSModels, WSResult } from "carbon-js-sdk";
import { Coin } from "carbon-js-sdk/lib/codec/cosmos/base/v1beta1/coin";
import { Token } from "carbon-js-sdk/lib/codec/Switcheo/carbon/coin/token";
import { Market } from "carbon-js-sdk/lib/codec/Switcheo/carbon/market/market";
import { Pool as PerpPool } from "carbon-js-sdk/lib/codec/Switcheo/carbon/perpspool/pool";
import { bnOrZero } from "carbon-js-sdk/lib/util/number";
import React, { useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "../assets";
import { Fade } from "react-awesome-reveal";

interface WSData {
  block_height: number;
  channel?: string;
  update_type: string;
}

interface MarketStatWSData extends WSData {
  result: TypeUtils.SimpleMap<WSModels.MarketStat>;
}

export interface PerpPoolProps {
  pool: PerpPool;
  poolInfo: PerpPoolInfo;
}

export interface PerpPoolInfo {
  availableAmount: BigNumber;
  totalInPositionAmount: BigNumber;
  totalShareAmount: BigNumber;
  totalNavAmount: BigNumber;
  totalUpnlAmount: BigNumber;
}

export interface SetPerpPoolProps extends PerpPoolProps {
  id: string;
}


const MarketsGrid: React.FC = () => {
  const [fetchData, loading] = useAsyncTask("fetchData");
  const [fetchTokenTotalSupplyPrices] = useAsyncTask("fetchTokenTotalSupplyPrices");
  const classes = useStyles();
  const [ws] = useWebsocket();
  const dispatch = useDispatch();

  const loadingTasks = useSelector((store: RootState) => store.layout.loadingTasks);
  const network = useSelector((state: RootState) => state.app.network);
  const sdk = useSelector((store: RootState) => store.app.sdk);
  const tokenClient = sdk?.token;
  const statLoading = loading || Boolean(loadingTasks.runInitSDK);

  const [tokenTotalSupplyAll, setTokenTotalSupplyAll] = React.useState<Coin[]>([]); // eslint-disable-line
  const [tokens, setTokens] = React.useState<Token[]>([]); // eslint-disable-line

  const reloadData = (marketSubcribeParams: WSConnectorTypes.WsSubscriptionParams) => {
    if (!sdk?.query || !ws || !ws.connected) return;

    fetchData(async () => {
      try {
        const listResponse: Market[] = await getAllMarkets(sdk);
        dispatch(actions.App.setMarketList(listResponse));

        // handle blacklist markets
        const configJsonResponse = await fetch(`https://raw.githubusercontent.com/Switcheo/demex-webapp-config/master/configs/${network}.json`);
        const configJsonData = await configJsonResponse.json();
        const blacklistedMarkets = configJsonData?.blacklisted_markets?.map((market: string) => market.toLowerCase()) ?? [];

        ws.subscribe(marketSubcribeParams, (result: any) => {
          const resultData = result as WSResult<MarketStatWSData>;
          if (resultData.data.update_type === "full_state") {
            const marketStatItems = Object.values(resultData.data.result ?? {});
            const filteredMarkets = marketStatItems.reduce((prev: MarketStatItem[], market: WSModels.MarketStat) => {
              if (blacklistedMarkets.includes(market.market_id)) return prev;
              const marketStatItem = parseMarketStats(market);
              prev.push(marketStatItem);
              return prev;
            }, []);
            dispatch(actions.App.setMarketStats(filteredMarkets));
            ws.unsubscribe(marketSubcribeParams);
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    const marketStatsSubscribeParams: WSConnectorTypes.WsSubscriptionParams = {
      channel: WSConnectorTypes.WSChannel.market_stats,
    };

    if (sdk && ws && ws?.connected) {
      reloadData(marketStatsSubscribeParams);
    }
    return () => {
      ws?.unsubscribe(marketStatsSubscribeParams);
    };
  }, [sdk, ws]);

  useEffect(() => {
    fetchTokenTotalSupplyPrices(async () => {
      if (!sdk) return;
      const totalSupply = await getTokenTotalSupplyAll(sdk);
      setTokenTotalSupplyAll(totalSupply);
      const tokensAll = await getTokens(sdk);
      setTokens(tokensAll);
    });
  }, [sdk]);


  const listResponse = useSelector((store: RootState) => store.app.marketList);
  const list: MarketListMap = parseMarketListMap(listResponse);
  const stats = useSelector((store: RootState) => store.app.marketStats);

  const marketsList = React.useMemo(() => {
    return stats.sort((marketA: MarketStatItem, marketB: MarketStatItem) => {
      const marketItemA = list?.[marketA.market_id] ?? {};
      const marketItemB = list?.[marketB.market_id] ?? {};
      const symbolUsdA = tokenClient?.getUSDValue(marketItemA?.quote ?? "") ?? BN_ZERO;
      const symbolUsdB = tokenClient?.getUSDValue(marketItemB?.quote ?? "") ?? BN_ZERO;
      const dailyVolumeA = tokenClient?.toHuman(marketItemA?.quote ?? "", marketA.volume) ?? BN_ZERO;
      const dailyVolumeB = tokenClient?.toHuman(marketItemB?.quote ?? "", marketB.volume) ?? BN_ZERO;
      const usdVolumeA = symbolUsdA.times(dailyVolumeA);
      const usdVolumeB = symbolUsdB.times(dailyVolumeB);
      return usdVolumeB.minus(usdVolumeA).toNumber();
    });
  }, [list, stats, tokenClient]);

  const totalValueLocked = React.useMemo((): BigNumber => {
    let totalLiquidity: BigNumber = BN_ZERO;
    if (tokenTotalSupplyAll.length !== 0 && tokens.length !== 0 && sdk) {
      tokenTotalSupplyAll.forEach((token) => {
        const denom = token.denom;
        const tokenPrice = sdk?.token.getUSDValue(denom) ?? BN_ZERO;
        const tokenSupply = tokenTotalSupplyAll.find((token) => token.denom === denom)?.amount ?? "";
        const decimals = tokens.find((token) => token.denom === denom)?.decimals ?? 0;
        const tokenValue = bnOrZero(tokenSupply).times(tokenPrice).shiftedBy(-decimals);
        totalLiquidity = totalLiquidity.plus(tokenValue);
      });
    }
    return totalLiquidity;
  }, [tokens, tokenTotalSupplyAll, sdk]);

  const { volume24H, openInterest } = React.useMemo((): {
    volume24H: BigNumber,
    openInterest: BigNumber,
  } => {
    let volume24H: BigNumber = BN_ZERO;
    let openInterest: BigNumber = BN_ZERO;

    marketsList.forEach((market: MarketStatItem) => {
      const marketItem = list?.[market.market_id] ?? {};
      const quoteDenom = marketItem?.quote ?? "";
      const martketStats = stats.find((stats) => stats.market_id === market.market_id);
      const baseDp = marketItem?.basePrecision.toNumber() ?? 0;
      const quoteDp = marketItem?.quotePrecision.toNumber() ?? 0;

      const marketOpenInterest = bnOrZero(martketStats?.open_interest).shiftedBy(-baseDp).times(bnOrZero(martketStats?.mark_price).shiftedBy(baseDp - quoteDp));
      openInterest = openInterest.plus(marketOpenInterest);

      const symbolUsd = sdk?.token.getUSDValue(quoteDenom) ?? BN_ZERO;
      const adjustedVolume = sdk?.token.toHuman(quoteDenom, market.volume) ?? BN_ZERO;
      const usdVolume = symbolUsd.times(adjustedVolume);
      volume24H = volume24H.plus(usdVolume);
    });

    return {
      volume24H,
      openInterest,
    };
  }, [marketsList, list, sdk?.token]);

  const volumeCountUp = useRollingNum(volume24H, 2, 4);
  const liquidityCountUp = useRollingNum(totalValueLocked, 2, 4);
  const marketsCountUp = useRollingNum(marketsList.length, 0, 4);
  const openInterestCountUp = useRollingNum(openInterest, 2, 4);

  return (
    <Box className={classes.innerDiv}>
      <div className={classes.boxShadow} />
      <Cards className={classes.marketsCard}>
        <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.gridHeader}>
          Total Value Locked
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={1}
        >
          <RenderGuard renderIf={statLoading}>
            <Skeleton className={classes.standardSkeleton} />
          </RenderGuard>
          <RenderGuard renderIf={!statLoading}>
            <Box display="flex" alignItems="baseline" width="100%" justifyContent="space-between">
              <TypographyLabel className={classes.gridContent}>
                ${liquidityCountUp}
              </TypographyLabel>
            </Box>
          </RenderGuard>
        </Box>
      </Cards>
      <Cards className={classes.marketsCard}>
        <Box
          display="flex"
          alignItems="center"
          mb={1}
        >
          <TypographyLabel className={classes.gridHeader}>
            Trading Volume (24H)
          </TypographyLabel>
        </Box>
        <RenderGuard renderIf={statLoading}>
          <Skeleton className={classes.standardSkeleton} />
        </RenderGuard>
        <RenderGuard renderIf={!statLoading}>
          <TypographyLabel className={classes.gridContent}>
            ${volumeCountUp}
          </TypographyLabel>
        </RenderGuard>
      </Cards>
      <Cards className={classes.marketsCard}>
        <Box
          display="flex"
          alignItems="center"
          mb={1}
        >
          <TypographyLabel className={classes.gridHeader}>
            Open Interest
          </TypographyLabel>
        </Box>
        <RenderGuard renderIf={statLoading}>
          <Skeleton className={classes.standardSkeleton} />
        </RenderGuard>
        <RenderGuard renderIf={!statLoading}>
          <TypographyLabel className={classes.gridContent}>
            ${openInterestCountUp}
          </TypographyLabel>
        </RenderGuard>
      </Cards>
      <Cards className={clsx(classes.marketsCard,  "market")}>
        <TypographyLabel className={classes.gridHeader}>
          Markets
        </TypographyLabel>
        <Box display="flex" alignItems="center" mt={1} justifyContent="space-between">
          <RenderGuard renderIf={statLoading}>
            <Skeleton className={classes.standardSkeleton} />
          </RenderGuard>
          <RenderGuard renderIf={!statLoading}>
            <TypographyLabel className={classes.gridContent}>
              {marketsCountUp}
            </TypographyLabel>
          </RenderGuard>
        </Box>
      </Cards>
      <div className={classes.linearGradient}>
        <Fade triggerOnce delay={1000} duration={1000}>
          <SvgIcon component={Line} />
        </Fade>
      </div>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  standardSkeleton: {
    width: "80px",
    height: "28px",
  },
  innerDiv: {
    position: "relative",
    display: "flex",
    gap: theme.spacing(4),
    justifyContent: "center",
    margin: theme.spacing(0, "auto"),
    background: "#1A1D1F",
    border: "1px solid #FFFFFF0A",
    borderRadius: theme.spacing(1),
    backdropFilter: "blur(64px)",
    maxWidth: "1200px",
    marginTop: "5vh",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      marginTop: "16vh",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "1000px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "6vh",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(2),
      padding: theme.spacing(2, 0),
      boxShadow: "-10px 10px 50px 0px #482BFF1F inset",
    },
  },
  boxShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: "-10px 10px 20px -5px #482BFF1F inset",
  },
  linearGradient: {
    position: "absolute",
    bottom: -10,
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  gridHeader: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.body3,
    },
  },
  gridContent: {
    ...theme.typography.h3,
    color: theme.palette.text.primary,
    fontWeight: 700,
  },
  marketsCard: {
    boxShadow: "none",
    borderRadius: 0,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    minWidth: "255px",
    "&.market": {
      maxWidth: "111px",
      minWidth: "111px",
    },
  },
}));

export default MarketsGrid;
