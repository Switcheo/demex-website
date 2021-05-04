import { CoinIcon, RenderGuard, TypographyLabel } from "@demex-info/components";
import { getDemexLink, getUsd, goToLink, Paths } from "@demex-info/constants";
import {
  useAssetSymbol, useAsyncTask, useInitApp, useRollingNum,
} from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO } from "@demex-info/utils";
import {
  MarketListMap, MarketStatItem, MarketType, MarkType, parseMarketListMap, parseMarketStats,
} from "@demex-info/utils/markets";
import {
  Backdrop, Box, Button, fade, makeStyles, Theme, Typography, useMediaQuery, useTheme,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import moment from "moment";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FuturesTypes, MarketPaper, MarketTab,
} from "./components";

const MarketGridTable = React.lazy(() => import("./components/MarketGridTable"));
const TokenPopover = React.lazy(() => import("./components/TokenPopover"));

let leaderboardInterval: any;

const MarketsTable: React.FC = () => {
  const assetSymbol = useAssetSymbol();
  const [runMarkets, loading] = useAsyncTask("runMarkets");
  const classes = useStyles();
  const theme = useTheme();
  const widthXs = useMediaQuery(theme.breakpoints.only("xs"));

  const { network, restClient, usdPrices } = useSelector((state: RootState) => state.app);

  const [marketOption, setMarketOption] = React.useState<MarketType>(MarkType.Spot);
  const [openTokens, setOpenTokens] = React.useState<boolean>(false);
  const [list, setList] = React.useState<MarketListMap>({});
  const [stats, setStats] = React.useState<MarketStatItem[]>([]);

  const reloadMarkets = () => {
    runMarkets(async () => {
      try {
        const statsResponse: any = await restClient.getMarketStats();
        const statsData: MarketStatItem[] = parseMarketStats(statsResponse);
        setStats(statsData);

        const listResponse: any = await restClient.getMarkets();
        const listData: MarketListMap = parseMarketListMap(listResponse);
        setList(listData);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useInitApp();

  useEffect(() => {
    reloadMarkets();
    leaderboardInterval = setInterval(() => {
      reloadMarkets();
    }, 30000);
    return () => clearInterval(leaderboardInterval);
  }, []);

  const MarketTabs: MarketTab[] = [{
    label: "Spot",
    value: MarkType.Spot,
  }, {
    label: "Futures",
    value: MarkType.Futures,
  }];

  const handleChangeTab = (value: MarketType) => {
    setMarketOption(value);
  };

  const marketsList = stats?.filter((stat: MarketStatItem) => {
    return marketOption === MarkType.Spot
      ? (stat.market_type === MarkType.Spot)
      : (stat.market_type === MarkType.Futures);
  });

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
      const symbolUsd = getUsd(usdPrices, marketItem?.base);
      const usdVolume = symbolUsd.times(market.day_volume);
      volume24H = volume24H.plus(usdVolume);

      openInterest = openInterest.plus(symbolUsd.times(market.open_interest));

      const baseToken = assetSymbol(marketItem.base);
      const quoteToken = assetSymbol(marketItem.quote);
      if (!coinsList.includes(baseToken) && baseToken.length > 0) {
        coinsList.push(baseToken);
      }
      if (!coinsList.includes(quoteToken) && quoteToken.length > 0) {
        coinsList.push(quoteToken);
      }
    });

    return {
      openInterest,
      volume24H,
      coinsList,
    };
  }, [marketsList, list, usdPrices]);

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
        <Box className={classes.buttonDiv} display="flex" justifyContent="center">
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
        </Box>
        <Box className={classes.tableRoot}>
          <Box className={classes.gridStats}>
            <MarketPaper className={classes.gridPaper}>
              <TypographyLabel mb={widthXs ? 1 : 1.5} color="textPrimary" variant="subtitle2">
                Volume (24H)
              </TypographyLabel>
              <RenderGuard renderIf={loading}>
                <Skeleton className={classes.standardSkeleton} />
              </RenderGuard>
              <RenderGuard renderIf={!loading}>
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
                        <RenderGuard renderIf={loading}>
                          <Skeleton className={classes.standardSkeleton} />
                        </RenderGuard>
                        <RenderGuard renderIf={!loading}>
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
                      <RenderGuard renderIf={loading}>
                        <Skeleton className={classes.standardSkeleton} />
                      </RenderGuard>
                      <RenderGuard renderIf={!loading}>
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
                        <RenderGuard renderIf={loading}>
                          <Skeleton className={classes.numSkeleton} />
                        </RenderGuard>
                        <RenderGuard renderIf={!loading}>
                          <TypographyLabel color="textPrimary" variant="h4">
                            {coinsCountUp}
                          </TypographyLabel>
                        </RenderGuard>
                        <RenderGuard renderIf={!loading && coinsList.length > 0}>
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
                                  return (
                                    <CoinIcon
                                      className={clsx(classes.coinIcon, `coin-${index}`)}
                                      key={coin}
                                      denom={coin}
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
                                  <Suspense fallback={null}>
                                    <TokenPopover tokens={coinsList} />
                                  </Suspense>
                                )
                              }
                            </Box>
                          </Box>
                        </RenderGuard>
                        <RenderGuard renderIf={loading}>
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
                            <RenderGuard renderIf={loading}>
                              <Skeleton className={classes.standardSkeleton} />
                            </RenderGuard>
                            <RenderGuard renderIf={!loading}>
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
                            <RenderGuard renderIf={loading}>
                              <Skeleton className={classes.standardSkeleton} />
                            </RenderGuard>
                            <RenderGuard renderIf={!loading}>
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
          <Suspense fallback={<Box />}>
            <MarketGridTable list={list} marketsList={marketsList} marketOption={marketOption} />
          </Suspense>
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
