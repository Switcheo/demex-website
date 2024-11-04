import { AssetIcon } from "@demex-info/components";
import { Cards } from "@demex-info/components/Cards";
import { goToLink, Paths } from "@demex-info/constants";
import { formatUsdPrice, toPercentage } from "@demex-info/utils";
import { isPerpetual } from "@demex-info/utils/markets";
import { Box, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import Marquee from "react-fast-marquee";
import MarketSparkline from "./MarketSparkline";
import { MarketCard } from "@demex-info/constants/markets";

interface Props {
  filteredCards: MarketCard[];
  direction?: "left" | "right";
}

const MarketsMarquee: React.FC<Props> = ({ filteredCards, direction = "left" }) => {
  const theme = useTheme();
  const classes = useStyles();

  const [ready, setReady] = React.useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setReady(true));
  }, []);

  const goToMarket = (market: string) => {
    goToLink(`${Paths.Trade}/${market ?? ""}`);
  };

  const speed = useMediaQuery(theme.breakpoints.down("xs")) ? 8 : 20;

  return (
    <React.Fragment>
      {ready && (
        <Suspense fallback={null}>
          <Marquee className={classes.root} gradient={false} gradientWidth={0} direction={direction} speed={speed} pauseOnHover>
            {filteredCards.map((card: MarketCard) => {
              const sparklineColor: string = card.change24H.isPositive() ? `${theme.palette.success.main}` : `${theme.palette.error.main}`;
              return (
                <Cards className={classes.marketsCard} key={`${card.baseSymbol}/${card.quoteSymbol}-${card.expiry}-card`} onClick={() => goToMarket(card.stat?.market_id ?? "")} display="flex" alignItems="center">
                  <Box width="65%">
                    <Box display="flex" alignItems="center" gridGap={8}>
                      <AssetIcon denom={card.baseSymbol} />
                      <Box display="flex" className={classes.marketName}>
                        {card.baseSymbol}
                        {card.stat?.marketType === "futures" && !isPerpetual(card.expiry) && ` - ${card.expiry}`}
                        {card.stat?.marketType === "futures" && isPerpetual(card.expiry) && "-PERP"}
                        {card.stat?.marketType === "spot" && <Box>/{card.quoteSymbol}</Box>}
                      </Box>
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
    ...theme.typography.body2,
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
      ...theme.typography.body1,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.body2,
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
    minWidth: "287px",
    [theme.breakpoints.down("sm")]: {
      padding: "0.75rem 1rem",
      minHeight: "2.75rem",
      minWidth: "unset",
    },
  },
}));

export default React.memo(MarketsMarquee);
