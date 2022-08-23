import { CoinIcon, RenderGuard, TypographyLabel } from "@demex-info/components";
import { getDemexLink, goToLink, Paths } from "@demex-info/constants";
import {
  useAsyncTask, useRollingNum, useWebsocket,
} from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, constantLP, estimateApyUSD, parseLiquidityPools, parseNumber, Pool } from "@demex-info/utils";
import {
  MarketListMap, MarketStatItem, MarketType, MarkType, isExpired, parseMarketListMap, parseMarketStats,
} from "@demex-info/utils/markets";
import { MarketPaper } from "@demex-info/views/HeroSection/components";
import { lazy } from "@loadable/component";
import {
  Backdrop, Box, Button, makeStyles, Theme, Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import { CarbonSDK, Models, WSModels, WSResult, WSConnectorTypes } from "carbon-js-sdk";
import clsx from "clsx";
import Long from "long";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const TokenPopover = lazy(() => import("./TokenPopover"));

const MarketsTable: React.FC = () => {
  const [fetchData, loading] = useAsyncTask("fetchData");
  const [runPools] = useAsyncTask("runPools");
  const classes = useStyles();
  const [ws] = useWebsocket();

  const loadingTasks = useSelector((store: RootState) => store.layout.loadingTasks);
  const network = useSelector((state: RootState) => state.app.network);
  const sdk = useSelector((store: RootState) => store.app.sdk);
  const tokenClient = sdk?.token;
  const statLoading = loading || Boolean(loadingTasks.runInitSDK);

  const [marketOption] = React.useState<MarketType>(MarkType.Spot);
  const [openTokens, setOpenTokens] = React.useState<boolean>(false);
  const [list, setList] = React.useState<MarketListMap>({});
  const [stats, setStats] = React.useState<MarketStatItem[]>([]);
  const [pools, setPools] = React.useState<Pool[]>([]);
  const [weeklyRewards, setWeeklyRewards] = React.useState<BigNumber>(BN_ZERO);
  const [commitCurve, setCommitCurve] = React.useState<Models.CommitmentCurve | undefined>(undefined);
  
  const getAllMarkets = async (sdk: CarbonSDK): Promise<Models.Market[]> => {
    const limit = new Long(100);
    const offset = Long.UZERO;
    const countTotal = true;
  
    let allMarkets: Models.Market[] = [];
    let key = new Uint8Array();
  
    const initMarkets = await sdk.query.market.MarketAll({
      pagination: {
        limit, offset, countTotal, key, reverse: false,
      },
    });
    const grandTotal = initMarkets.pagination?.total.toNumber() ?? 0;
    key = initMarkets.pagination?.nextKey ?? new Uint8Array();
    allMarkets = allMarkets.concat(initMarkets.markets);
  
    if (initMarkets.markets.length === grandTotal) {
      return allMarkets;
    }
  
    const iterations = Math.ceil(grandTotal / limit.toNumber()) - 1;
    for (let ii = 0; ii < iterations; ii++) {
      // eslint-disable-next-line no-await-in-loop
      const markets = await sdk.query.market.MarketAll({
        pagination: {
          limit, offset, countTotal, key, reverse: false,
        },
      });
      key = markets.pagination?.nextKey ?? new Uint8Array();
      allMarkets = allMarkets.concat(markets.markets ?? []);
    }
  
    return allMarkets;
  };

  const reloadPools = () => {
    if (!sdk?.query || !ws) return;

    runPools(async () => {
      try {
        const response = await ws.request<{ result: WSModels.Pool[] }>(WSConnectorTypes.WSRequest.Pools, {}) as WSResult<{ result: WSModels.Pool[] }>;
        const poolsData: Pool[] = parseLiquidityPools(response.data.result, sdk!.token);
        setPools(poolsData);

        const poolsRewards = await sdk!.lp.getWeeklyRewards();

        const curveResponse = await sdk.query.liquiditypool.CommitmentCurve({});
        setCommitCurve(curveResponse.commitmentCurve);

        setWeeklyRewards(poolsRewards ?? BN_ZERO);
      } catch (err) {
        console.error(err);
      }
    });
  };
  const reloadData = () => {
    if (!sdk?.query || !ws || !ws.connected) return;

    fetchData(async () => {
      try {
        const listResponse: Models.Market[] = await getAllMarkets(sdk);
        const listData: MarketListMap = parseMarketListMap(listResponse);
        setList(listData);

        const statsResponse = await sdk.query.marketstats.MarketStats({});
        const marketStatItems = statsResponse.marketstats.map((stat: Models.MarketStats) => (
          parseMarketStats(stat)),
        );
        setStats(marketStatItems);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    if (sdk && ws && ws?.connected) {
      reloadData();
      reloadPools();
    }
    return () => { };
  }, [sdk, ws]);

  const marketsList = React.useMemo(() => {
    return stats?.filter((stat: MarketStatItem) => {
      const marketItem = list?.[stat.market] ?? {};
      return marketOption === MarkType.Spot
        ? (stat.marketType === MarkType.Spot)
        : (stat.marketType === MarkType.Futures && !isExpired(marketItem));
    }).sort((marketA: MarketStatItem, marketB: MarketStatItem) => {
      const marketItemA = list?.[marketA.market] ?? {};
      const marketItemB = list?.[marketB.market] ?? {};
      const symbolUsdA = tokenClient?.getUSDValue(marketItemA?.base ?? "") ?? BN_ZERO;
      const symbolUsdB = tokenClient?.getUSDValue(marketItemB?.base ?? "") ?? BN_ZERO;
      const dailyVolumeA = tokenClient?.toHuman(marketItemA?.base ?? "", marketA.dayVolume) ?? BN_ZERO;
      const dailyVolumeB = tokenClient?.toHuman(marketItemB?.base ?? "", marketB.dayVolume) ?? BN_ZERO;
      const usdVolumeA = symbolUsdA.times(dailyVolumeA);
      const usdVolumeB = symbolUsdB.times(dailyVolumeB);
      return usdVolumeB.minus(usdVolumeA).toNumber();
    });
  }, [stats, tokenClient, list, marketOption]);

  const spotMarketsList = React.useMemo(() => {
    return stats?.filter((stat: MarketStatItem) => {
      return stat.marketType === MarkType.Spot;});
  }, [stats, tokenClient, list, marketOption]);

  const futuresMarketsList = React.useMemo(() => {
    return stats?.filter((stat: MarketStatItem) => {
      const marketItem = list?.[stat.market] ?? {};
      return (stat.marketType === MarkType.Futures && !isExpired(marketItem));
    });
  }, [stats, tokenClient, list, marketOption]);

  const { volume24H, coinsList } = React.useMemo((): {
    volume24H: BigNumber,
    coinsList: string[],
  } => {
    let volume24H: BigNumber = BN_ZERO;
    const coinsList: string[] = [];

    marketsList.forEach((market: MarketStatItem) => {
      const marketItem = list?.[market.market] ?? {};
      const baseDenom = marketItem?.base ?? "";
      const quoteDenom = marketItem?.quote ?? "";

      const symbolUsd = sdk?.token.getUSDValue(baseDenom) ?? BN_ZERO;
      const adjustedVolume = sdk?.token.toHuman(baseDenom, market.dayVolume) ?? BN_ZERO;
      const usdVolume = symbolUsd.times(adjustedVolume);
      volume24H = volume24H.plus(usdVolume);

      if (!coinsList.includes(baseDenom) && baseDenom.length > 0) {
        coinsList.push(baseDenom);
      }
      if (!coinsList.includes(quoteDenom) && quoteDenom.length > 0) {
        coinsList.push(quoteDenom);
      }
    });

    return {
      volume24H,
      coinsList,
    };
  }, [marketsList, list, sdk?.token]);

  const maxAPR = React.useMemo((): BigNumber => {
    let weightTotal: BigNumber = BN_ZERO;
    let weightedPools: number = 0;
    let maxVal: BigNumber = BN_ZERO;
    const maxBoostBN = parseNumber(commitCurve?.maxRewardMultiplier, BN_ZERO)!.dividedBy(100);

    pools.forEach((p: Pool) => {
      if (p.rewardsWeight.gt(0)) {
        weightedPools = weightedPools + 1;
      }
      weightTotal = weightTotal.plus(p.rewardsWeight ?? BN_ZERO);
    });
    pools.forEach((pool: Pool) => {
      if (pool.rewardsWeight.gt(0)) {
        const indivApy = estimateApyUSD({
          sdk,
          pool,
          poolsRewards: weeklyRewards,
          totalWeight: weightTotal,
          boostFactor: maxBoostBN,
          notionalLp: constantLP,
        });
        maxVal = maxVal.lt(indivApy) ? indivApy : maxVal;
      }
    });
    return maxVal;
  }, [pools, weeklyRewards, sdk, commitCurve]);

  const handleOpen = () => {
    setOpenTokens(true);
  };

  const handleClose = () => {
    setOpenTokens(false);
  };

  const volumeCountUp = useRollingNum(volume24H, 2, 2);
  const spotCountUp = useRollingNum(spotMarketsList.length, 0, 2);
  const coinsCountUp = useRollingNum(coinsList.length, 0, 2);
  const futuresCountUp = useRollingNum(futuresMarketsList.length, 0, 2);
  const poolsCountUp = useRollingNum(pools.length, 0, 2);

  return (
    <Box className={classes.innerDiv}>
      <MarketPaper className={classes.gridPaper}>
        <Box
          display="flex"
          alignItems="center"
          mb={1}
        >
          <Typography className={classes.gridHeader}>
            Volume (24H)
          </Typography>
        </Box>
        <RenderGuard renderIf={statLoading}>
          <Skeleton className={classes.standardSkeleton} />
        </RenderGuard>
        <RenderGuard renderIf={!statLoading}>
          <TypographyLabel className={classes.gridContent}>
            ${volumeCountUp}
          </TypographyLabel>
        </RenderGuard>
      </MarketPaper>
      <MarketPaper className={classes.gridPaper}>
        <TypographyLabel className={classes.gridHeader}>
          Markets
        </TypographyLabel>
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
            <Box display="flex">
              <Box display="flex" alignItems="baseline">
                <TypographyLabel className={classes.gridContent}>
                  {spotCountUp}
                </TypographyLabel>
                &nbsp;
                <TypographyLabel className={classes.gridSubtitle}>Spot</TypographyLabel>
              </Box>
              <Box display="flex" alignItems="baseline" ml={3}>
                <TypographyLabel className={classes.gridContent}>
                  {futuresCountUp}
                </TypographyLabel>
                &nbsp;
                <TypographyLabel className={classes.gridSubtitle}>Futures</TypographyLabel>
              </Box>
            </Box>
            <Button
              onClick={() => goToLink(getDemexLink(Paths.Trade, network))}
              className={classes.viewAll}
              variant="text"
              color="secondary"
            >
              View
            </Button>
          </RenderGuard>
        </Box>
      </MarketPaper>
      <MarketPaper className={classes.gridPaper}>
        <Box
          display="flex"
          alignItems="center"
          mb={1}
        >
          <Typography className={classes.gridHeader}>
            Liquidity Pools
          </Typography>
        </Box>
        <RenderGuard renderIf={statLoading}>
          <Skeleton className={classes.standardSkeleton} />
        </RenderGuard>
        <RenderGuard renderIf={!statLoading}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="baseline">
              <Box display="flex" alignItems="baseline">
                <TypographyLabel className={classes.gridContent}>
                  {poolsCountUp}
                </TypographyLabel>
              </Box>
              <Box display="flex" alignItems="baseline" ml={1}>
                <TypographyLabel className={clsx(classes.gridSubtitle, "pools")}>Up to</TypographyLabel>
                &nbsp;
                <TypographyLabel className={classes.yellowGradientText}>
                  {`${maxAPR.decimalPlaces(1, 1).toString(10)}% APR`}
                </TypographyLabel>
              </Box>
            </Box>
            <Button
              onClick={() => goToLink(getDemexLink(Paths.Pools.List, network))}
              className={classes.viewAll}
              variant="text"
              color="secondary"
            >
              View
            </Button>
          </Box>
        </RenderGuard>
      </MarketPaper>
      <MarketPaper className={classes.gridPaper}>
        {
          <React.Fragment>
            <TypographyLabel className={classes.gridHeader}>
              Tokens
            </TypographyLabel>
            <Box display="flex" alignItems="center" mt={1} justifyContent="space-between">
              <RenderGuard renderIf={statLoading}>
                <Skeleton className={classes.numSkeleton} />
              </RenderGuard>
              <RenderGuard renderIf={!statLoading}>
                <TypographyLabel className={classes.gridContent}>
                  {coinsCountUp}
                </TypographyLabel>
              </RenderGuard>
              <RenderGuard renderIf={!statLoading && coinsList.length > 0}>
                <Box position="relative">
                  <Box
                    className={classes.labelBox}
                    display="flex"
                    alignItems="center"
                    onMouseEnter={handleOpen}
                    onFocus={handleOpen}
                  >
                    {coinsList.map((coin: string, index: number) => {
                      if (index <= 3) {
                        const coinName = sdk?.token.getTokenName(coin) ?? "";
                        return (
                          <CoinIcon
                            className={clsx(classes.coinIcon, `coin-${index}`)}
                            key={coin}
                            denom={coinName.toLowerCase()}
                          />
                        );
                      }
                      return null;
                    })}
                    {
                      coinsList.length > 4 && (
                        <Box>
                          <Typography
                            className={classes.plusLabel}
                          >
                            +{coinsList.length - 4}
                          </Typography>
                        </Box>
                      )
                    }
                  </Box>
                  <Box className={classes.dropdownContainer}>
                    {
                      openTokens && (
                        <TokenPopover tokens={coinsList} />
                      )
                    }
                  </Box>
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={statLoading}>
                <Box alignItems="center" display="flex" justifyContent="center">
                  <Skeleton className={classes.coinSkeleton} />
                </Box>
              </RenderGuard>
            </Box>
            <Backdrop
              className={classes.backdrop}
              open={openTokens}
              invisible
              onClick={handleClose}
              onMouseEnter={handleClose}
            />
          </React.Fragment>
        }
      </MarketPaper>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: 1,
  },
  numSkeleton: {
    width: "80px",
    height: "44px",
    [theme.breakpoints.only("xs")]: {
      height: "40px",
      width: "40px",
    },
    "@media (max-width: 400px)": {
      width: "80px",
    },
  },
  standardSkeleton: {
    width: "80px",
    height: "44px",
    [theme.breakpoints.only("xs")]: {
      height: "40px",
    },
  },
  btnLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
  coinIcon: {
    transform: "translate(30px, 0px)",
    zIndex: 8,
    "&.coin-1": {
      transform: "translate(20px, 0px)",
      zIndex: 7,
    },
    "&.coin-2": {
      transform: "translate(10px, 0px)",
      zIndex: 6,
    },
    "&.coin-3": {
      transform: "none",
      zIndex: 5,
    },
    [theme.breakpoints.only("xs")]: {
      height: "1.75em",
      width: "1.75em",
    },
  },
  coinSkeleton: {
    width: "120px",
    height: "44px",
    [theme.breakpoints.only("xs")]: {
      width: "72px",
    },
    "@media (max-width: 400px)": {
      width: "120px",
    },
  },
  dropdownContainer: {
    position: "absolute",
    top: theme.spacing(4.25),
    right: theme.spacing(-1.25),
    zIndex: 5,
    [theme.breakpoints.only("xs")]: {
      width: "11rem",
    },
  },
  gridPaper: {
    maxWidth: "25%",
    width: "100%",
    backgroundColor: theme.palette.background.primary,
    padding: theme.spacing(2.25, 2.5),
    marginLeft: theme.spacing(4),
    "&:first-child": {
      marginLeft: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
      maxWidth: "100%",
      width: "unset",
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2, 2.5),
      "& h4": {
        fontSize: "1.625rem",
      },
      "& h6": {
        fontSize: "0.75rem",
      },
    },
  },
  gridPaperAlt: {
    marginLeft: theme.spacing(2),
    maxWidth: "50%",
    padding: theme.spacing(3, 4),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      "& h6": {
        lineHeight: "1.375rem",
      },
      "&:first-child": {
        marginLeft: 0,
      },
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2, 2.5),
      "& h4": {
        fontSize: "1.625rem",
      },
      "& h6": {
        fontSize: "0.75rem",
        lineHeight: "1.35rem",
      },
    },
    "@media (max-width: 400px)": {
      maxWidth: "100%",
      marginLeft: 0,
      width: "unset",
      "&:first-child": {
        marginBottom: theme.spacing(2),
      },
    },
  },
  gridSecondGrid: {
    display: "flex",
    width: "100%",
    "@media (max-width: 400px)": {
      display: "block",
    },
  },
  gridStats: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(0, "auto"),
  },
  innerDiv: {
    display: "flex",
    marginTop: "6rem",
    position: "relative",
    margin: theme.spacing(0, "auto"),
    [theme.breakpoints.between("sm", "md")]: {
      padding: theme.spacing(0, 5),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 4),
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(0, 2.5),
    },
  },
  tab: {
    ...theme.typography.title3,
    fontSize: "1.25rem",
    marginLeft: theme.spacing(3),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.selected": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.25rem",
    },
  },
  labelBox: {
    cursor: "pointer",
    zIndex: 5,
    [theme.breakpoints.only("xs")]: {
      width: "8rem",
    },
    "@media (max-width: 400px)": {
      width: "unset",
    },
  },
  plusLabel: {
    ...theme.typography.title2,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(0.75),
  },
  viewAll: {
    padding: theme.spacing(1, 1, 0),
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.875rem",
    },
  },
  gridHeader: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  },
  gridContent: {
    ...theme.typography.h2,
    color: theme.palette.text.primary,
  },
  gridSubtitle: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  },
  yellowGradientText: {
    ...theme.typography.title1,
    background: "linear-gradient(90deg, #FFA800 0%, #FF5107 100%)",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
  },
}));

export default MarketsTable;
