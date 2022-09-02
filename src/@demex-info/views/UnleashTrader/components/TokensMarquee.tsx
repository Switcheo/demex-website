import { CoinIcon } from "@demex-info/components";
import { Cards } from "@demex-info/components/Cards";
import { getDemexLink, goToLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { MarketListMap, MarketStatItem, parseMarketListMap } from "@demex-info/utils/markets";
import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";

interface BaseDenomMarket {
  marketName: string
  base: string
}
interface Props {
}
const TokensMarquee: React.FC<Props> = () => {
  const classes = useStyles();

  const sdk = useSelector((store: RootState) => store.app.sdk);
  const network = useSelector((store: RootState) => store.app.network);
  const markets = useSelector((store: RootState) => store.app.marketList);
  const marketList: MarketListMap = parseMarketListMap(markets);
  const marketStatsList = useSelector((store: RootState) => store.app.marketStats);

  const { baseMarketList } = React.useMemo((): {
    baseMarketList: BaseDenomMarket[],
  } => {
    const coinsList: String[] = [];
    const baseMarketList: BaseDenomMarket[] = [];

    marketStatsList.forEach((market: MarketStatItem) => {
      const marketItem = marketList?.[market.market] ?? {};
      const baseDenom = marketItem.marketType === "spot" ? marketItem.base ?? "" : "";
      const baseMarkets: BaseDenomMarket = {
        marketName: marketItem.name ?? "",
        base: baseDenom,
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

  return (
    <Marquee className={classes.root} gradient={false} gradientWidth={0} pauseOnHover>
      {sortBaseMarkets.map((baseMarket: BaseDenomMarket) => {
        const tokenName = sdk?.token.getTokenName(baseMarket.base) ?? "";
        return (
          <Cards key={baseMarket.base} onClick={() => goToMarket(baseMarket.marketName)} className={classes.cards} >
            <Box className={classes.text}>
              Token
              <Box>{tokenName}</Box>
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
  },
  cards: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
  coinSvg: {
    height: "3.125rem",
    width: "3.125rem",
  },
}));

export default TokensMarquee;
