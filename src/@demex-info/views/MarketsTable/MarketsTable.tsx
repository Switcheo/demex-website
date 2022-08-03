import { CoinIcon, RenderGuard, TypographyLabel } from "@demex-info/components";
import { getDemexLink, goToLink, Paths } from "@demex-info/constants";
import {
  useAsyncTask, useRollingNum, useWebsocket,
} from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO } from "@demex-info/utils";
import {
  MarketListMap, MarketStatItem, MarketType, MarkType, isExpired, parseMarketListMap, parseMarketStats,
} from "@demex-info/utils/markets";
import { lazy } from "@loadable/component";
import {
  Backdrop, Box, Button, fade, makeStyles, Theme, Typography, useMediaQuery, useTheme,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import { CarbonSDK, Models } from "carbon-js-sdk";
import clsx from "clsx";
import Long from "long";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// TODO: Uncomment when futures markets are launched on Carbonated Demex
// import {
//   FuturesTypes, MarketPaper, MarketTab,
// } from "./components";
import {
  FuturesTypes, MarketPaper,
} from "./components";

const MarketGridTable = lazy(() => import("./components/MarketGridTable"));
const TokenPopover = lazy(() => import("./components/TokenPopover"));

const MarketsTable: React.FC = () => {
  const [runMarkets, loading] = useAsyncTask("runMarkets");
  const classes = useStyles();
  const theme = useTheme();
  const widthXs = useMediaQuery(theme.breakpoints.only("xs"));
  const [ws] = useWebsocket();

  const loadingTasks = useSelector((store: RootState) => store.layout.loadingTasks);
  const isAppReady = useSelector((state: RootState) => state.app.isAppReady);
  const network = useSelector((state: RootState) => state.app.network);
  const sdk = useSelector((store: RootState) => store.app.sdk);
  const tokenClient = sdk?.token;
  const statLoading = loading || Boolean(loadingTasks.runInitSDK);

  // TODO: Add setMarketOption when futures markets are launched on Carbonated Demex
  const [marketOption] = React.useState<MarketType>(MarkType.Spot);
  const [openTokens, setOpenTokens] = React.useState<boolean>(false);
  const [list, setList] = React.useState<MarketListMap>({});
  const [load, setLoad] = React.useState<boolean>(false);
  const [stats, setStats] = React.useState<MarketStatItem[]>([]);
  const [renderReady, setRenderReady] = React.useState<boolean>(false);
  const ready = isAppReady && renderReady;
  
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

  const reloadMarkets = () => {
    if (!sdk?.query || !ws || !ws.connected) return;

    setLoad(true);
    runMarkets(async () => {
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
      } finally {
        setLoad(false);
      }
    });
  };

  useEffect(() => {
    if (sdk && ws && ws?.connected) {
      reloadMarkets();
    }
    return () => { };
  }, [sdk, ws]);

  useEffect(() => {
    setTimeout(() => setRenderReady(true));
  }, []);

  // TODO: Uncomment when futures markets are launched on Carbonated Demex
  // const MarketTabs: MarketTab[] = [{
  //   label: "Spot",
  //   value: MarkType.Spot,
  // }, {
  //   label: "Futures",
  //   value: MarkType.Futures,
  // }];

  // TODO: Uncomment when futures markets are launched on Carbonated Demex
  // const handleChangeTab = (value: MarketType) => {
  //   setMarketOption(value);
  // };

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

  const { openInterest, volume24H, coinsList } = React.useMemo((): {
    openInterest: BigNumber,
    volume24H: BigNumber,
    coinsList: string[],
  } => {
    let openInterest: BigNumber = BN_ZERO;
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

      openInterest = openInterest.plus(symbolUsd.times(market.open_interest));

      if (!coinsList.includes(baseDenom) && baseDenom.length > 0) {
        coinsList.push(baseDenom);
      }
      if (!coinsList.includes(quoteDenom) && quoteDenom.length > 0) {
        coinsList.push(quoteDenom);
      }
    });

    return {
      openInterest,
      volume24H,
      coinsList,
    };
  }, [marketsList, list, sdk?.token]);

  const futureTypes = React.useMemo((): FuturesTypes => {
    const futureTypes: FuturesTypes = {
      perpetuals: 0,
      futures: 0,
    };
    if (marketOption === MarkType.Futures) {
      marketsList.forEach((market: MarketStatItem) => {
        const marketItem = list?.[market.market] ?? {};
        const expiryDayjs = moment(marketItem.expiryTime);
        if (expiryDayjs.unix() > 0) {
          futureTypes.futures += 1;
        } else {
          futureTypes.perpetuals += 1;
        }
      });
    }
    return futureTypes;
  }, [marketsList, list, marketOption]);

  const handleOpen = () => {
    setOpenTokens(true);
  };

  const handleClose = () => {
    setOpenTokens(false);
  };

  const volumeCountUp = useRollingNum(volume24H, 2, 2);
  const spotCountUp = useRollingNum(marketsList.length, 0, 2);
  const coinsCountUp = useRollingNum(coinsList.length, 0, 2);
  const interestCountUp = useRollingNum(openInterest, 2, 2);
  const futuresCountUp = useRollingNum(futureTypes.futures, 0, 2);
  const perpetualsCountUp = useRollingNum(futureTypes.perpetuals, 0, 2);

  return (
    <div className={classes.root}>
      <Box className={classes.innerDiv}>
        {/* TODO: Uncomment when futures markets are launched on Carbonated Demex */}
        {/* <Box className={classes.buttonDiv} display="flex" justifyContent="center">
          {MarketTabs.map((tab: MarketTab) => (
            <Button
              className={clsx(classes.tab, { selected: marketOption === tab.value })}
              key={tab.value}
              variant="text"
              onClick={() => handleChangeTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </Box> */}
        <Box className={classes.tableRoot}>
          <Box className={classes.gridStats}>
            <MarketPaper className={classes.gridPaper}>
              <Box
                display="flex"
                alignItems="center"
                mb={widthXs ? 1 : 1.5}
              >
                <Typography color="textPrimary" variant="subtitle2">
                  Volume (24H)
                </Typography>
              </Box>
              <RenderGuard renderIf={statLoading}>
                <Skeleton className={classes.standardSkeleton} />
              </RenderGuard>
              <RenderGuard renderIf={!statLoading}>
                <TypographyLabel color="textPrimary" variant="h4">
                  ${volumeCountUp}
                </TypographyLabel>
              </RenderGuard>
            </MarketPaper>
            <Box className={classes.gridSecondGrid}>
              <MarketPaper className={classes.gridPaperAlt}>
                {
                  marketOption === MarkType.Spot && (
                    <React.Fragment>
                      <TypographyLabel color="textPrimary" variant="subtitle2">
                        Market Pairs
                      </TypographyLabel>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={widthXs ? 1 : 1.5}
                      >
                        <RenderGuard renderIf={statLoading}>
                          <Skeleton className={classes.standardSkeleton} />
                        </RenderGuard>
                        <RenderGuard renderIf={!statLoading}>
                          <TypographyLabel color="textPrimary" variant="h4">
                            {spotCountUp}
                          </TypographyLabel>
                        </RenderGuard>
                        <Button
                          onClick={() => goToLink(getDemexLink(Paths.Trade, network))}
                          className={classes.viewAll}
                          variant="text"
                          color="secondary"
                        >
                          View All
                        </Button>
                      </Box>
                    </React.Fragment>
                  )
                }
                {
                  marketOption === MarkType.Futures && (
                    <React.Fragment>
                      <TypographyLabel color="textPrimary" variant="subtitle2">
                        Open Interest
                      </TypographyLabel>
                      <RenderGuard renderIf={statLoading}>
                        <Skeleton className={classes.standardSkeleton} />
                      </RenderGuard>
                      <RenderGuard renderIf={!statLoading}>
                        <TypographyLabel color="textPrimary" mt={widthXs ? 1 : 1.5} variant="h4">
                          ${interestCountUp}
                        </TypographyLabel>
                      </RenderGuard>
                    </React.Fragment>
                  )
                }
              </MarketPaper>
              <MarketPaper className={classes.gridPaperAlt}>
                {
                  marketOption === MarkType.Spot && (
                    <React.Fragment>
                      <TypographyLabel color="textPrimary" variant="subtitle2">
                        Coins
                      </TypographyLabel>
                      <Box display="flex" alignItems="center" mt={widthXs ? 1 : 1.5} justifyContent="space-between">
                        <RenderGuard renderIf={statLoading}>
                          <Skeleton className={classes.numSkeleton} />
                        </RenderGuard>
                        <RenderGuard renderIf={!statLoading}>
                          <TypographyLabel color="textPrimary" variant="h4">
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
                                      color="textPrimary"
                                      variant="h5"
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
                  )
                }
                {
                  marketOption === MarkType.Futures && (
                    <Box display="flex">
                      {
                        futureTypes.futures > 0 && (
                          <Box>
                            <TypographyLabel color="textPrimary" variant="subtitle2">
                              Delivery Futures
                            </TypographyLabel>
                            <RenderGuard renderIf={statLoading}>
                              <Skeleton className={classes.standardSkeleton} />
                            </RenderGuard>
                            <RenderGuard renderIf={!statLoading}>
                              <TypographyLabel color="textPrimary" mt={widthXs ? 1 : 1.5} variant="h4">
                                {futuresCountUp}
                              </TypographyLabel>
                            </RenderGuard>
                          </Box>
                        )
                      }
                      {
                        futureTypes.perpetuals > 0 && (
                          <Box ml={futureTypes.futures > 0 ? 2 : 0}>
                            <TypographyLabel color="textPrimary" variant="subtitle2">
                              Perpetual Swaps
                            </TypographyLabel>
                            <RenderGuard renderIf={statLoading}>
                              <Skeleton className={classes.standardSkeleton} />
                            </RenderGuard>
                            <RenderGuard renderIf={!statLoading}>
                              <TypographyLabel color="textPrimary" mt={widthXs ? 1 : 1.5} variant="h4">
                                {perpetualsCountUp}
                              </TypographyLabel>
                            </RenderGuard>
                          </Box>
                        )
                      }
                    </Box>
                  )
                }
              </MarketPaper>
            </Box>
          </Box>
          <MarketGridTable ready={ready} list={list} load={load} marketsList={marketsList} marketOption={marketOption} />
        </Box>
      </Box>
    </div>
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
    maxWidth: "33%",
    width: "100%",
    padding: theme.spacing(3, 4),
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
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(0, 6),
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
  root: {
    background: `linear-gradient(0deg, ${theme.palette.background.default} 0%, ${fade(theme.palette.background.default, 0.9)} 85%, ${fade(theme.palette.background.default, 0.2)} 100%)`,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 0, 11),
    zIndex: 20,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 0, 8),
    },
  },
  tab: {
    ...theme.typography.button,
    color: theme.palette.text.hint,
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
  tableRoot: {
    marginTop: theme.spacing(3),
    position: "relative",
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
    fontSize: "1rem",
    marginLeft: theme.spacing(0.75),
  },
  viewAll: {
    padding: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.875rem",
    },
  },
}));

export default MarketsTable;
