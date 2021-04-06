import { Backdrop, Box, Button, Theme, Typography, makeStyles } from "@material-ui/core";
import { CoinIcon, RenderGuard, TypographyLabel } from "@demex-info/components";
import { FuturesTypes, MarketGridTable, MarketPaper, MarketTab, TokenPopover } from "./components";
import { MarkType, MarketStatItem, MarketTasks, MarketType } from "@demex-info/store/markets/types";
import { Paths, getDemexLink, getUsd, goToLink } from "@demex-info/constants";
import { useAssetSymbol, useRollingNum, useTaskSubscriber } from "@demex-info/hooks";

import { BN_ZERO } from "@demex-info/utils";
import BigNumber from "bignumber.js";
import React from "react";
import { RootState } from "@demex-info/store/types";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import { fade } from "@material-ui/core/styles/colorManipulator";
import moment from "moment";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

const MarketsTable: React.FC = () => {
  const assetSymbol = useAssetSymbol();
  const classes = useStyles();
  const [loading] = useTaskSubscriber(MarketTasks.Stats, MarketTasks.List);

  const { network, usdPrices } = useSelector((state: RootState) => state.app);
  const { list, stats } = useSelector((state: RootState) => state.markets);

  const [marketOption, setMarketOption] = React.useState<MarketType>(MarkType.Spot);
  const [openTokens, setOpenTokens] = React.useState<boolean>(false);

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

  const [tableRef, tableView] = useInView({
    threshold: [0.2, 0.8],
    triggerOnce: true,
  });
  
  return (
    <div ref={tableRef} className={classes.root}>
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
        <Box
          className={clsx(
            classes.tableRoot,
            classes.slide,
            "table",
            { open: tableView },
          )}
        >
          <Box className={classes.gridStats}>
            <MarketPaper className={classes.gridPaper}>
              <TypographyLabel mb={1.5} color="textSecondary" variant="subtitle2">
                Volume (24H)
              </TypographyLabel>
              <RenderGuard renderIf={loading}>
                <Skeleton width="80px" height="44px" />
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
                      <TypographyLabel color="textSecondary" variant="subtitle2">
                        Market Pairs
                      </TypographyLabel>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        mt={1.5}
                      >
                        <RenderGuard renderIf={loading}>
                          <Skeleton width="80px" height="44px" />
                        </RenderGuard>
                        <RenderGuard renderIf={!loading}>
                          <TypographyLabel color="textPrimary" variant="h4">
                            {spotCountUp}
                          </TypographyLabel>
                        </RenderGuard>
                        <Button onClick={() => goToLink(getDemexLink(Paths.Trade, network))} className={classes.viewAll} variant="text" color="secondary">
                          View All
                        </Button>
                      </Box>
                    </React.Fragment>
                  )
                }
                {
                  marketOption === MarkType.Futures && (
                    <React.Fragment>
                      <TypographyLabel color="textSecondary" variant="subtitle2">
                        Open Interest
                      </TypographyLabel>
                      <RenderGuard renderIf={loading}>
                        <Skeleton width="80px" height="44px" />
                      </RenderGuard>
                      <RenderGuard renderIf={!loading}>
                        <TypographyLabel color="textPrimary" mt={1.5} variant="h4">
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
                      <TypographyLabel color="textSecondary" variant="subtitle2">
                        Coins
                      </TypographyLabel>
                      <Box display="flex" alignItems="center" mt={1.5} justifyContent="space-between">
                        <RenderGuard renderIf={loading}>
                          <Skeleton width="80px" height="44px" />
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
                                  <TokenPopover tokens={coinsList} />
                                )
                              }
                            </Box>
                          </Box>
                        </RenderGuard>
                        <RenderGuard renderIf={loading}>
                          <Box alignItems="center" display="flex" justifyContent="center">
                            <Skeleton width="120px" height="44px" />
                          </Box>
                        </RenderGuard>
                      </Box>
                      <Backdrop className={classes.backdrop} open={openTokens} invisible onMouseLeave={handleClose} />
                    </React.Fragment>
                  )
                }
                {
                  marketOption === MarkType.Futures && (
                    <Box display="flex">
                      {
                        futureTypes.futures > 0 && (
                          <Box>
                            <TypographyLabel color="textSecondary" variant="subtitle2">
                              Delivery Futures
                            </TypographyLabel>
                            <RenderGuard renderIf={loading}>
                              <Skeleton width="80px" height="44px" />
                            </RenderGuard>
                            <RenderGuard renderIf={!loading}>
                              <TypographyLabel color="textPrimary" mt={1.5} variant="h4">
                                {futuresCountUp}
                              </TypographyLabel>
                            </RenderGuard>
                          </Box>
                        )
                      }
                      {
                        futureTypes.perpetuals > 0 && (
                          <Box ml={futureTypes.futures > 0 ? 2 : 0}>
                            <TypographyLabel color="textSecondary" variant="subtitle2">
                              Perpetual Swaps
                            </TypographyLabel>
                            <RenderGuard renderIf={loading}>
                              <Skeleton width="80px" height="44px" />
                            </RenderGuard>
                            <RenderGuard renderIf={!loading}>
                              <TypographyLabel color="textPrimary" mt={1.5} variant="h4">
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
          <MarketGridTable marketsList={marketsList} marketOption={marketOption} />
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: 0,
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
    padding: theme.spacing(4, 3),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
      maxWidth: "100%",
      width: "unset",
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2.5, 2),
      "& h4": {
        fontSize: "1.5rem",
      },
    },
  },
  gridPaperAlt: {
    marginLeft: theme.spacing(2),
    maxWidth: "50%",
    padding: theme.spacing(4, 3),
    width: "100%",
    [theme.breakpoints.only("sm")]: {
      "&:first-child": {
        marginLeft: 0,
      },
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "100%",
      marginLeft: 0,
      padding: theme.spacing(2.5, 2),
      width: "unset",
      "&:first-child": {
        marginBottom: theme.spacing(2),
      },
      "& h4": {
        fontSize: "1.5rem",
      },
    },
  },
  gridSecondGrid: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.only("xs")]: {
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
    padding: theme.spacing(0, 2.5),
  },
  root: {
    background: `linear-gradient(180deg, ${fade(theme.palette.background.paper, 0.05)} 0%, ${fade(theme.palette.background.paper, 0.5)} 25%, ${theme.palette.background.paper} 100%)`,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 0, 11),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 0, 6),
    },
  },
  tab: {
    ...theme.typography.button,
    color: theme.palette.text.secondary,
    fontSize: "1.5rem",
    marginLeft: theme.spacing(2.5),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.selected": {
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "1rem",
      lineHeight: 1.3,
      width: "calc(100% / 3)",
    },
  },
  tableRoot: {
    marginTop: theme.spacing(6),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  labelBox: {
    cursor: "pointer",
    zIndex: 5,
  },
  plusLabel: {
    fontSize: "1rem",
    marginLeft: theme.spacing(0.75),
  },
  slide: {
    opacity: 0,
    transform: "translate(0px, 60px)",
    "&.table": {
      transition: "opacity ease-in 0.4s, transform ease-in 0.5s",
    },
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
  },
  viewAll: {
    padding: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.875rem",
    },
  },
}));

export default MarketsTable;