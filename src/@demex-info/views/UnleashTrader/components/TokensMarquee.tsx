import { CoinIcon } from "@demex-info/components";
import { Cards } from "@demex-info/components/Cards";
import { getDemexLink, goToLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, formatUsdPrice } from "@demex-info/utils";
import { MarketListMap, MarketStatItem, parseMarketListMap } from "@demex-info/utils/markets";
import { Box, makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

interface BaseDenomMarket {
  marketName: string
  base: string
  usdValue: string
}
interface Props {
}
const TokensMarquee: React.FC<Props> = () => {
  const classes = useStyles();
  const theme = useTheme();

  const sdk = useSelector((store: RootState) => store.app.sdk);
  const network = useSelector((store: RootState) => store.app.network);
  const markets = useSelector((store: RootState) => store.app.marketList);
  const marketList: MarketListMap = parseMarketListMap(markets);
  const marketStatsList = useSelector((store: RootState) => store.app.marketStats);

  const { baseMarketList } = React.useMemo((): {
    baseMarketList: BaseDenomMarket[],
  } => {
    const coinsList: string[] = [];
    const baseMarketList: BaseDenomMarket[] = [];

    marketStatsList.forEach((market: MarketStatItem) => {
      const marketItem = marketList?.[market.market] ?? {};
      const baseDenom = marketItem.marketType === "spot" ? marketItem.base ?? "" : "";
      const usd = sdk?.token.getUSDValue(baseDenom) ?? BN_ZERO;
      const baseMarkets: BaseDenomMarket = {
        marketName: marketItem.name ?? "",
        base: baseDenom,
        usdValue: formatUsdPrice(usd),
      };

      // only include base denoms and the first market with this base denom
      if (!coinsList.includes(baseDenom) && baseDenom.length > 0) {
        coinsList.push(baseDenom);
        baseMarketList.push(baseMarkets);
      }
    });

    return {
      baseMarketList,
    };
  }, [marketList, marketStatsList, sdk?.token]);

  const sortBaseMarkets = baseMarketList.sort((marketA: BaseDenomMarket, marketB: BaseDenomMarket) => {
    const baseA = sdk?.token.getTokenName(marketA.base).toLowerCase() ?? "";
    const baseB = sdk?.token.getTokenName(marketB.base).toLowerCase() ?? "";

    return baseA < baseB ? -1 : 1;
  });

  const goToMarket = (market: string) => {
    goToLink(getDemexLink(`${Paths.Trade}/${market ?? ""}`, network));
  };

  const speed = theme.breakpoints.down("sm") ? 8 : 20;

  return (
    <Marquee className={classes.root} gradient={false} gradientWidth={0} speed={speed} pauseOnHover>
      {sortBaseMarkets.map((baseMarket: BaseDenomMarket) => {
        const tokenName = sdk?.token.getTokenName(baseMarket.base) ?? "";
        return (
          <Cards key={baseMarket.base} onClick={() => goToMarket(baseMarket.marketName)} className={classes.cards}>
            <Box className={classes.text}>
              Token
              <Box>{tokenName}</Box>
              {baseMarket.usdValue}
            </Box>
            <CoinIcon className={classes.coinSvg} denom={tokenName.toLowerCase()} />
          </Cards>
        );
      })}
    </Marquee>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.base,
    marginTop: "1.25rem",
    width: "100%",
    "&.marquee": {
      duration: "60s !important",
    },
    "& > div > div": {
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
  cards: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0.75rem 1rem",
      minWidth: "9rem",
      minHeight: "5.25rem",
    },
  },
  text: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    "& > div": {
      ...theme.typography.h3,
      fontFamily: "Montserrat",
      color: theme.palette.text.primary,
      marginTop: "0.25rem",
    },
    [theme.breakpoints.only("sm")]: {
			...theme.typography.body3,
      "& > div": {
        ...theme.typography.h4,
        fontFamily: "Montserrat",
        color: theme.palette.text.primary,
        marginTop: "0.25rem",
      },
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body4,
      "& > div": {
        ...theme.typography.title1,
        fontFamily: "Montserrat",
        color: theme.palette.text.primary,
        marginTop: "0.25rem",
      },
		},
  },
  coinSvg: {
    height: "3.125rem",
    width: "3.125rem",
    [theme.breakpoints.only("sm")]: {
      height: "2.55rem",
      width: "2.55rem",
    },
    [theme.breakpoints.only("xs")]: {
      height: "2rem",
      width: "2rem",
    },
  },
}));

export default TokensMarquee;
