import { RootState } from "@demex-info/store/types";
import { BN_ZERO, getDecimalPlaces } from "@demex-info/utils";
import { getAdjustedTickLotSize, MarketStatItem } from "@demex-info/utils/markets";
import { Box, makeStyles } from "@material-ui/core";
import { TokenUtils } from "carbon-js-sdk";
import { Market } from "carbon-js-sdk/lib/codec/Switcheo/carbon/market/market";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MarketsMarquee from "./MarketsMarquee";
import { MarketCard } from "@demex-info/constants/markets";

const UnleashTrader: React.FC = () => {
  const classes = useStyles();

  const sdk = useSelector((store: RootState) => store.app.sdk);
  const markets = useSelector((store: RootState) => store.app.marketList);
  const marketStatsList = useSelector((store: RootState) => store.app.marketStats);

  const cards = React.useMemo((): MarketCard[] => {
    return markets.map((market: Market) => {
      const stat: MarketStatItem | undefined = marketStatsList.find(stat => stat.market_id === market.id);
      const symbolOverride = market.marketType === "spot" ? undefined : TokenUtils.FuturesDenomOverride;
      const expiry = market.marketType === "futures" ? dayjs(market.expiryTime).format("DD MMM YYYY") : "";
      const baseSymbol = sdk?.token.getTokenName(market.base, symbolOverride) ?? "";
      const quoteSymbol = sdk?.token.getTokenName(market.quote, symbolOverride) ?? "";
      const quoteUsd = sdk?.token.getUSDValue(market?.quote ?? "") ?? BN_ZERO;
      const baseDp = sdk?.token.getDecimals(market?.base ?? "") ?? 0;
      const quoteDp = sdk?.token.getDecimals(market?.quote ?? "") ?? 0;
      const diffDp = baseDp - quoteDp;
      const dailyVolume = stat?.volume.shiftedBy(-quoteDp) ?? 0;
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
  const filteredCards = React.useMemo(() => {
    return cards
      .filter((card: MarketCard) => card.usdVolume.gt(100))
      .sort((cardA: MarketCard, cardB: MarketCard) => cardB.usdVolume.comparedTo(cardA.usdVolume));
  }, [cards]);

  return (
    <Box className={classes.root}>
      <MarketsMarquee filteredCards={filteredCards} />
      <MarketsMarquee filteredCards={filteredCards} direction="right" />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    zIndex: 1,
    marginTop: "0.5rem",
    alignItems: "center",
    paddingTop: theme.spacing(20),
    marginBottom: theme.spacing(20),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      paddingTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
		},
  },
  mainHeader: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    marginBottom: "1.5rem",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.h2,
      padding: "4.5rem 1rem 0",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
      lineHeight: "38px",
      maxWidth: "calc(100% - 2rem)",
			margin: "0 auto",
      textAlign: "center",
		},
  },
  subtextBox: {
    maxWidth: "67rem",
    marginBottom: "1.75rem",
  },
  position: {
    position: "absolute",
    left: 0,
    width: "50%",
    overflow: "hidden",
    [theme.breakpoints.up("lg")]: {
      top: "-30rem",
      left: "50%",
      height: "calc(100vh + 40rem)",
    },
  },
  container: {
    zIndex: -2,
    position: "relative",
    margin: "0 auto",
    width: "1480px",
    [theme.breakpoints.only("md")]: {
      maxWidth: "unset",
      margin: "-70% ​-100%",
    },
  },
  padding: {
    height: "56.25%",
    [theme.breakpoints.down("md")]: {
      height: "25%",
    },
  },
  subtext: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.body2,
      padding: "0 1rem",
			marginTop: "0.75rem",
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
		},
  },
}));

export default React.memo(UnleashTrader);
