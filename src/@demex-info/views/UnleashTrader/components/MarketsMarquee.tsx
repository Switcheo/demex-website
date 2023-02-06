import { Cards } from "@demex-info/components/Cards";
import { DEC_SHIFT, goToLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, formatUsdPrice, getDecimalPlaces, toPercentage } from "@demex-info/utils";
import { getAdjustedTickLotSize, isPerpetual, MarketCandlesticks, MarketStatItem } from "@demex-info/utils/markets";
import { Box, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { Models, TokenUtils } from "carbon-js-sdk";
import { QueryCandlesticksRequest } from "carbon-js-sdk/lib/codec";
import clsx from "clsx";
import dayjs from "dayjs";
import Long from "long";
import React, { Suspense, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface MarketCard {
  stat?: MarketStatItem;
  baseSymbol: string;
  quoteSymbol: string;
  expiry: string;
  priceDp: number;
  lastPrice: BigNumber;
  usdVolume: BigNumber;
  change24H: BigNumber;
}

interface Props {
}

const MarketsMarquee: React.FC<Props> = () => {
  const theme = useTheme();
  const classes = useStyles();

  const sdk = useSelector((store: RootState) => store.app.sdk);
  const network = useSelector((store: RootState) => store.app.network);
  const markets = useSelector((store: RootState) => store.app.marketList);
  const marketStatsList = useSelector((store: RootState) => store.app.marketStats);
	const [ready, setReady] = React.useState<boolean>(false);

  useEffect(() => {
		setTimeout(() => setReady(true));
	}, []);

  const [candleSticks, setCandleSticks] = React.useState<MarketCandlesticks[] | null>(null);

  const cards = React.useMemo((): MarketCard[] => {
    return markets.map((market: Models.Market) => {
      const stat: MarketStatItem | undefined = marketStatsList.find(stat => stat.market === market.name);
      const symbolOverride = market.marketType === "spot" ? undefined : TokenUtils.FuturesDenomOverride;
      const expiry = market.marketType === "futures" ? dayjs(market.expiryTime).format("DD MMM YYYY") : "";
      const baseSymbol = sdk?.token.getTokenName(market.base, symbolOverride).toUpperCase() ?? "";
      const quoteSymbol = sdk?.token.getTokenName(market.quote, symbolOverride).toUpperCase() ?? "";
      const baseUsd = sdk?.token.getUSDValue(market?.base ?? "") ?? BN_ZERO;
      const baseDp = sdk?.token.getDecimals(market?.base ?? "") ?? 0;
      const quoteDp = sdk?.token.getDecimals(market?.quote ?? "") ?? 0;
      const diffDp = baseDp - quoteDp;
      const dailyVolume = stat?.dayVolume.shiftedBy(-baseDp) ?? 0;
      const usdVolume = baseUsd.times(dailyVolume);

      const { tickSize } = getAdjustedTickLotSize(market, sdk);
      const priceDp = getDecimalPlaces(tickSize.toString(10));
      const lastPrice = stat?.lastPrice.shiftedBy(-DEC_SHIFT).shiftedBy(diffDp) ?? BN_ZERO;
      const openPrice = stat?.dayOpen.shiftedBy(-DEC_SHIFT).shiftedBy(diffDp) ?? BN_ZERO;
      const closePrice = stat?.dayClose.shiftedBy(-DEC_SHIFT).shiftedBy(diffDp) ?? BN_ZERO;
      const change24H = openPrice.isZero() ? BN_ZERO : closePrice.minus(openPrice).dividedBy(openPrice);

      return {
        stat,
        baseSymbol,
        quoteSymbol,
        expiry,
        priceDp,
        lastPrice,
        usdVolume,
        change24H,
      };
    });
  }, [markets, marketStatsList, sdk?.token]);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [cards]);

  useEffect(() => {
    const candlestickPromises = markets.map((market: Models.Market) => {
      try {
        const request: QueryCandlesticksRequest = {
          market: market.name,
          resolution: new Long(60),
          from: new Long(Math.floor(new Date(new Date().setDate(new Date().getDate() - 7)).getTime() / 1000)),
          to: new Long(Math.floor(new Date().getTime() / 1000)),
        };
        return sdk?.query.broker.Candlesticks(request).then((res) => {
          return {
            market: market.name,
            bars: res.candlesticks.map((candlestick: Models.Candlestick) => parseFloat(candlestick.close)),
          };
        }).catch((err) => {
          console.error(err);
          return {
            market: market.name,
            bars: [],
          };
        });
      } catch (err) {
        console.error(err);
        return {
          market: market.name,
          bars: [],
        };
      }
    });
    Promise.all(candlestickPromises).then((results: any) => {
      const candlesticks = results as MarketCandlesticks[];
      setCandleSticks(candlesticks);
    });
    return () => { };
  }, [markets, sdk, network]);
  
  // only display markets with 24H volume > $100 in desc order
  const filteredCards = cards.filter((card: MarketCard) => {
    return card.usdVolume.gt(100);
  }).sort((cardA: MarketCard, cardB: MarketCard) => {
    const volumeA = cardA.usdVolume;
    const volumeB = cardB.usdVolume;
    return volumeA.comparedTo(volumeB);
  });

  const goToMarket = (market: string) => {
    goToLink(`${Paths.Trade}/${market ?? ""}`);
  };

  const speed = useMediaQuery(theme.breakpoints.down("xs")) ? 8 : 20;


  return (
    <React.Fragment>
      {ready && (
      <Suspense fallback={null}>
        <Marquee className={classes.root} gradient={false} gradientWidth={0} direction="right" speed={speed} pauseOnHover>
          {
            filteredCards.map((card: MarketCard) => {
              const sparklineColor: string = card.change24H.isPositive() ? `${theme.palette.success.main}` : `${theme.palette.error.main}`;
              return (
                <Cards className={classes.marketsCard} key={`${card.baseSymbol}/${card.quoteSymbol}-${card.expiry}-card`} onClick={() => goToMarket(card.stat?.market ?? "")} display="flex" alignItems="center">
                  <Box width="50%">
                    <Box display="flex" className={classes.marketName}>
                      {card.baseSymbol} 
                      {card.stat?.marketType === "futures" && !isPerpetual(card.expiry) && ` - ${card.expiry}`}
                      {card.stat?.marketType === "futures" && isPerpetual(card.expiry) && "-PERP"}
                      {card.stat?.marketType === "spot" && <Box>/{card.quoteSymbol}</Box>}
                    </Box>
                    <Box display="flex" alignItems="baseline" mt={0.25}>
                      <Box className={classes.priceName}>
                        {card.lastPrice.toFormat(card.priceDp)}
                      </Box>
                      <Box
                        className={clsx(
                          classes.changeText,
                          {
                            [classes.positive]: card.change24H.gt(0),
                            [classes.negative]: card.change24H.lt(0),
                          },
                        )}
                      >
                        {card.change24H.gte(0) ? "+" : ""}{toPercentage(card.change24H, 2)}%
                      </Box>
                    </Box>
                    <Box className={classes.volumeText}>
                      24h Vol. &nbsp;
                      {formatUsdPrice(card.usdVolume)}
                    </Box>
                  </Box>
                  <Box className={classes.sparklineBox}>
                    <Sparklines data={candleSticks?.find((bar: any) => bar.market === card.stat?.market)?.bars} svgWidth={100} svgHeight={60}>
                      <SparklinesLine style={{ fill: "none", strokeWidth: 2 }} color={sparklineColor} />
                    </Sparklines>
                  </Box>
                </Cards>
              );
            })
          }
        </Marquee>
      </Suspense>
      )}
    </React.Fragment>

  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.base,
    width: "100%",
    "& > div > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "none",
      marginLeft: "2.25rem",
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      "& > div > div": {
        marginLeft: "0.75rem",
      },
    },
  },
  marketName: {
    ...theme.typography.title2,
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
    "& > div" : {
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.only("sm")]: {
			...theme.typography.title3,
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.title4,
		},
  },
  priceName: {
    ...theme.typography.h4,
    color: theme.palette.text.primary,
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.title1,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.title2,
    },
  },
  changeText: {
    ...theme.typography.body3,
    marginLeft: "0.5rem",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body4,
    },
  },
  positive: {
    color: theme.palette.success.main,
  },
  negative: {
    color: theme.palette.error.main,
  },
  volumeText: {
    ...theme.typography.body3,
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginTop: "0.25rem",
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body4,
    },
  },
  sparklineBox: {
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  marketsCard: {
    [theme.breakpoints.down("sm")]: {
      padding: "0.75rem 1rem",
      minHeight: "2.75rem",
      minWidth: "unset",
    },
  },
}));

export default MarketsMarquee;
