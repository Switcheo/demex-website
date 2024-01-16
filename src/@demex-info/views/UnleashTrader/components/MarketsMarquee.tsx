import { Cards } from "@demex-info/components/Cards";
import { goToLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, formatUsdPrice, getDecimalPlaces, toPercentage } from "@demex-info/utils";
import { getAdjustedTickLotSize, isPerpetual, MarketStatItem } from "@demex-info/utils/markets";
import { Box, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { TokenUtils } from "carbon-js-sdk";
import { Market } from "carbon-js-sdk/lib/codec/Switcheo/carbon/market/market";
import clsx from "clsx";
import dayjs from "dayjs";
import React, { Suspense, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import MarketSparkline from "./MarketSparkline";

interface MarketCard {
  stat?: MarketStatItem;
  baseSymbol: string;
  quoteSymbol: string;
  expiry: string;
  priceDp: number;
  lastPrice: BigNumber;
  usdVolume: BigNumber;
  change24H: BigNumber;
  market: Market;
}

interface Props {
}

const MarketsMarquee: React.FC<Props> = () => {
  const theme = useTheme();
  const classes = useStyles();

  const sdk = useSelector((store: RootState) => store.app.sdk);
  const markets = useSelector((store: RootState) => store.app.marketList);
  const marketStatsList = useSelector((store: RootState) => store.app.marketStats);
  const [ready, setReady] = React.useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setReady(true));
  }, []);

  const cards = React.useMemo((): MarketCard[] => {
    return markets.map((market: Market) => {
      const stat: MarketStatItem | undefined = marketStatsList.find(stat => stat.market === market.name);
      const symbolOverride = market.marketType === "spot" ? undefined : TokenUtils.FuturesDenomOverride;
      const expiry = market.marketType === "futures" ? dayjs(market.expiryTime).format("DD MMM YYYY") : "";
      const baseSymbol = sdk?.token.getTokenName(market.base, symbolOverride) ?? "";
      const quoteSymbol = sdk?.token.getTokenName(market.quote, symbolOverride) ?? "";
      const quoteUsd = sdk?.token.getUSDValue(market?.quote ?? "") ?? BN_ZERO;
      const baseDp = sdk?.token.getDecimals(market?.base ?? "") ?? 0;
      const quoteDp = sdk?.token.getDecimals(market?.quote ?? "") ?? 0;
      const diffDp = baseDp - quoteDp;
      const dailyVolume = stat?.dayQuoteVolume.shiftedBy(-quoteDp) ?? 0;
      const usdVolume = quoteUsd.times(dailyVolume);

      const { tickSize } = getAdjustedTickLotSize(market, sdk);
      const priceDp = getDecimalPlaces(tickSize.toString(10));
      const lastPrice = stat?.lastPrice.shiftedBy(diffDp) ?? BN_ZERO;
      const openPrice = stat?.dayOpen.shiftedBy(diffDp) ?? BN_ZERO;
      const closePrice = stat?.dayClose.shiftedBy(diffDp) ?? BN_ZERO;
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
        market,
      };
    });
  }, [markets, marketStatsList, sdk?.token]);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [cards]);

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
            {filteredCards.map((card: MarketCard) => {
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
                  <MarketSparkline
                    market={card.market}
                    lineProps={{
                      color: sparklineColor,
                    }}
                  />
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
    "& > div": {
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
  marketsCard: {
    [theme.breakpoints.down("sm")]: {
      padding: "0.75rem 1rem",
      minHeight: "2.75rem",
      minWidth: "unset",
    },
  },
}));

export default MarketsMarquee;
