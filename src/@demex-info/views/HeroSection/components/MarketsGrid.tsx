import { CoinIcon, RenderGuard, TypographyLabel } from "@demex-info/components";
import { Cards } from "@demex-info/components/Cards";
import { getDemexLink, goToExternalLink, Paths } from "@demex-info/constants";
import {
  useAsyncTask, useRollingNum, useWebsocket,
} from "@demex-info/hooks";
import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, constantLP, estimateApyUSD, parseLiquidityPools, parseNumber, Pool, getTotalUSDPrice, getCollateral } from "@demex-info/utils";
import {
  MarketListMap, MarketStatItem, parseMarketListMap, parseMarketStats, getAllMarkets, 
} from "@demex-info/utils/markets";
import { StyleUtils } from "@demex-info/utils/styles";
import { lazy } from "@loadable/component";
import {
  Backdrop, Box, Button, Grid, Hidden, makeStyles, Theme,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import { Models, WSModels, WSResult, WSConnectorTypes } from "carbon-js-sdk";
import clsx from "clsx";
// import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TokenPopover = lazy(() => import("./TokenPopover"));

const MarketsGrid: React.FC = () => {
  const [fetchData, loading] = useAsyncTask("fetchData");
  const [runPools] = useAsyncTask("runPools");
  const [runCollateral] = useAsyncTask("runCollateral");
  const classes = useStyles();
  const [ws] = useWebsocket();
  const dispatch = useDispatch();

  const loadingTasks = useSelector((store: RootState) => store.layout.loadingTasks);
  const network = useSelector((state: RootState) => state.app.network);
  const sdk = useSelector((store: RootState) => store.app.sdk);
  const tokenClient = sdk?.token;
  const statLoading = loading || Boolean(loadingTasks.runInitSDK);

  const [openTokens, setOpenTokens] = React.useState<boolean>(false);
  const [pools, setPools] = React.useState<Pool[]>([]);
  const [collateral, setCollateral] = React.useState<BigNumber>(BN_ZERO);
  const [weeklyRewards, setWeeklyRewards] = React.useState<BigNumber>(BN_ZERO);
  const [commitCurve, setCommitCurve] = React.useState<Models.CommitmentCurve | undefined>(undefined);

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
        dispatch(actions.App.setMarketList(listResponse));

        const statsResponse = await sdk.query.marketstats.MarketStats({});
        const marketStatItems = statsResponse.marketstats.map((stat: Models.MarketStats) => (
          parseMarketStats(stat)),
        );
        dispatch(actions.App.setMarketStats(marketStatItems));
      } catch (err) {
        console.error(err);
      }
    });
  };

  const reloadCollateral = () => {
    if (!sdk?.query || !ws) return;

    runCollateral(async () => {
      try {
        const response = await getCollateral(sdk);
        setCollateral(response);
      } catch (err) {
        console.error(err);
      }
    });
  }; 

  useEffect(() => {
    if (sdk && ws && ws?.connected) {
      reloadData();
      reloadPools();
      reloadCollateral();
    }
    return () => { };
  }, [sdk, ws]);


  const listResponse = useSelector((store: RootState) => store.app.marketList);
  const list: MarketListMap = parseMarketListMap(listResponse);
  const stats = useSelector((store: RootState) => store.app.marketStats);

  const marketsList = React.useMemo(() => {
    return stats.sort((marketA: MarketStatItem, marketB: MarketStatItem) => {
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
  }, [list, stats, tokenClient]);

  const totalValueLocked = React.useMemo((): BigNumber => {
    let totalLiquidity : BigNumber = BN_ZERO;

    pools.forEach((p : Pool) => {
      totalLiquidity = totalLiquidity.plus(getTotalUSDPrice(sdk, p));
    });

    return totalLiquidity.plus(collateral);
  }, [pools, collateral]);

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
  const liquidityCountUp = useRollingNum(totalValueLocked, 2, 2);
  // const spotCountUp = useRollingNum(spotMarketsList.length, 0, 2);
  const coinsCountUp = useRollingNum(coinsList.length, 0, 2);
  // const futuresCountUp = useRollingNum(futuresMarketsList.length, 0, 2);
  const poolsCountUp = useRollingNum(pools.length, 0, 2);

  return (
    <Grid container spacing={4} className={classes.innerDiv}>
      <Grid item xs={12} sm={6} lg={3}>
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
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Cards className={classes.marketsCard}>
          <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.gridHeader}>
            Total Value Locked
            {/* <Hidden xsDown>
              <Button
                onClick={() => goToLink(getDemexLink(Paths.Trade, network))}
                className={classes.viewAll}
                variant="text"
                color="secondary"
              >
                View
              </Button>
            </Hidden> */}
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
                {/* <Box display="flex" alignItems="baseline">
                  <TypographyLabel className={classes.gridContent}>
                    {spotCountUp}
                  </TypographyLabel>
                  &nbsp;
                  <TypographyLabel className={classes.gridSubtitle}>Spot</TypographyLabel>
                  <TypographyLabel className={classes.gridContent} marginLeft={2}>
                    {futuresCountUp}
                  </TypographyLabel>
                  &nbsp;
                  <TypographyLabel className={classes.gridSubtitle}>Futures</TypographyLabel>
                  <TypographyLabel className={clsx(classes.gridSubtitle, "primary")}>and more</TypographyLabel>
                </Box>
                <Hidden smUp>
                  <Button
                    onClick={() => goToLink(getDemexLink(Paths.Trade, network))}
                    className={classes.viewAll}
                    variant="text"
                    color="secondary"
                  >
                    View
                  </Button>
                </Hidden> */}
              </Box>
            </RenderGuard>
          </Box>
        </Cards>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Cards className={classes.marketsCard}>
          <Box
            display="flex"
            alignItems="center"
            mb={1}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" className={classes.gridHeader}>
              Liquidity Pools
              <Hidden xsDown>
                <Button
                  onClick={() => goToExternalLink(getDemexLink(Paths.Pools.List, network))}
                  className={classes.viewAll}
                  variant="text"
                  color="secondary"
                >
                  View
                </Button>
              </Hidden>
            </Box>
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
              <Hidden smUp>
                <Button
                  onClick={() => goToExternalLink(getDemexLink(Paths.Pools.List, network))}
                  className={classes.viewAll}
                  variant="text"
                  color="secondary"
                >
                  View
                </Button>
              </Hidden>
            </Box>
          </RenderGuard>
        </Cards>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Cards className={classes.marketsCard}>
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
                            <TypographyLabel
                              className={classes.plusLabel}
                            >
                              +{coinsList.length - 4}
                            </TypographyLabel>
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
        </Cards>
      </Grid>
    </Grid>
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
  },
  innerDiv: {
    display: "flex",
    marginTop: "8.25rem",
    position: "relative",
    margin: theme.spacing(0, "auto"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1344px",
      "& > .MuiGrid-item:first-child": {
        paddingLeft: 0,
      },
      "& > .MuiGrid-item:last-child": {
        paddingRight: 0,
      },
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("xs")]: {
      "& > .MuiGrid-item": {
        padding: "0.375rem 0",
      },
    },
  },
  labelBox: {
    cursor: "pointer",
    zIndex: 100,
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
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.title3,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.title4,
    },
  },
  viewAll: {
    padding: 0,
    ...theme.typography.title2,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title3,
    },
  },
  gridHeader: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.body3,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.body4,
    },
  },
  gridContent: {
    ...theme.typography.h2,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h3,
    },
  },
  gridSubtitle: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    "&.primary": {
      color: theme.palette.text.primary,
      marginLeft: "1rem",
    },
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.body3,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.body4,
    },
  },
  yellowGradientText: {
    ...theme.typography.title1,
    background: StyleUtils.warningGradient,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h4,
    },
  },
  marketsCard: {
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
      minHeight: "2.75rem",
      minWidth: "unset",
    },
  },
}));

export default MarketsGrid;
