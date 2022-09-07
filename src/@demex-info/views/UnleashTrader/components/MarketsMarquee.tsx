import { Cards } from "@demex-info/components/Cards";
import { DEC_SHIFT, getDemexLink, goToLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, formatUsdPrice, getDecimalPlaces, toPercentage } from "@demex-info/utils";
import { getAdjustedTickLotSize, MarketCandlesticks, MarketStatItem } from "@demex-info/utils/markets";
import { Box, makeStyles, useTheme } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { Models, TokenUtils } from "carbon-js-sdk";
import { QueryCandlesticksRequest } from "carbon-js-sdk/lib/codec";
import clsx from "clsx";
import dayjs from "dayjs";
import Long from "long";
import React, { useEffect } from "react";
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

  const [candleSticks, setCandleSticks] = React.useState<MarketCandlesticks[] | null>(null);

  const cards: MarketCard[] = markets.map((market:Models.Market) => {
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
    return volumeB.comparedTo(volumeA);
  });

  const goToMarket = (market: string) => {
    goToLink(getDemexLink(`${Paths.Trade}/${market ?? ""}`, network));
  };

  return (
    <Marquee className={classes.root} gradient={false} gradientWidth={0}  direction="right" pauseOnHover>
      {
        filteredCards.map((card: MarketCard) => {
          const sparklineColor: string = card.change24H.isPositive() ? `${theme.palette.success.main}` : `${theme.palette.error.main}`;
          return (
            <Cards key={`${card.baseSymbol}/${card.quoteSymbol}-card`} onClick={() => goToMarket(card.stat?.market ?? "")} display="flex" alignItems="center">
              <Box width="50%">
                <Box display="flex" className={classes.marketName}>
                  {card.baseSymbol}
                  {card.stat?.marketType === "futures" 
                    ? ` - ${card.expiry}`
                    : <Box>/{card.quoteSymbol}</Box>
                  }
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
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.base,
    marginTop: "1.5rem",
    width: "100%",
    "& > div > div": {
      display: "flex",
      alignItems: "center",
      boxShadow: "none",
      marginLeft: "2.25rem",
      cursor: "pointer",
    },
  },
  marketName: {
    ...theme.typography.title2,
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
    "& > div" : {
      color: theme.palette.text.secondary,
    },
  },
  priceName: {
    ...theme.typography.h4,
  },
  changeText: {
    ...theme.typography.body3,
    marginLeft: "0.5rem",
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
  },
  sparklineBox: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default MarketsMarquee;