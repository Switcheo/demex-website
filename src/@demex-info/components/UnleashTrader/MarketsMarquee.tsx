import { AssetIcon } from "@demex-info/components";
import { Cards } from "@demex-info/components/Cards";
import { goToLink, Paths } from "@demex-info/constants";
import { toPercentage } from "@demex-info/utils";
import { isPerpetual } from "@demex-info/utils/markets";
import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { MarketCard } from "@demex-info/constants/markets";

interface Props {
  filteredCards: MarketCard[];
  direction?: "left" | "right";
}

const MarketsMarquee: React.FC<Props> = ({ filteredCards, direction = "left" }) => {
  const classes = useStyles();

  const [ready, setReady] = React.useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setReady(true));
  }, []);

  const goToMarket = (market: string) => {
    goToLink(`${Paths.Trade.Main}/${market ?? ""}`);
  };

  return (
    <React.Fragment>
      {ready && (
        <Suspense fallback={null}>
          <Marquee className={classes.root} gradient={false} gradientWidth={0} direction={direction} speed={50} pauseOnHover>
            {filteredCards.map((card: MarketCard, index: number) => {
              return (
                <Cards className={classes.marketsCard} key={`${card.baseSymbol}/${card.quoteSymbol}-${card.expiry}-${index}-card`} onClick={() => goToMarket(card.stat?.market_id ?? "")} display="flex" alignItems="center">
                  <Box display="flex" alignItems="center" gridGap={8}>
                    <AssetIcon denom={card.baseSymbol} />
                    <Box display="flex" className={classes.marketName}>
                      {card.baseSymbol}
                      {card.stat?.marketType === "futures" && !isPerpetual(card.expiry) && ` - ${card.expiry}`}
                      {card.stat?.marketType === "futures" && isPerpetual(card.expiry) && "-PERP"}
                      {card.stat?.marketType === "spot" && <Box>/{card.quoteSymbol}</Box>}
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="flex-end" mt={0.25}>
                    <Box className={classes.priceName}>
                      ${card.lastPrice.toFormat(card.lastPrice.gt(1) ? 2 : card.priceDp)}
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
      boxShadow: "none",
      cursor: "pointer",
      gap: theme.spacing(2),
      marginLeft: "1rem",
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
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
    },
  },
  priceName: {
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
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
    minWidth: "300px",
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #FFFFFF0A",
    borderRadius: theme.spacing(1),
    backdropFilter: "blur(64px)",
    boxShadow: "-16px 0px 40px 0px #482BFF1A inset",
    [theme.breakpoints.down("sm")]: {
      padding: "0.75rem 1rem",
      minHeight: "2.75rem",
      minWidth: "250px",
    },
  },
}));

export default React.memo(MarketsMarquee);
