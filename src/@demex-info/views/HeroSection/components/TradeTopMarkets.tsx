import { TokenUtils } from "carbon-js-sdk";
import dayjs from "dayjs";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

import { AssetIcon, RenderGuard } from "@demex-info/components";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, getDecimalPlaces, toPercentage } from "@demex-info/utils";
import { getAdjustedTickLotSize, isPerpetual, MarketListMap, MarketStatItem, parseMarketListMap } from "@demex-info/utils/markets";
import { Box, Button, Card, CardContent, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useHeroSectionStyles } from "../styles";

interface Props {
  active: boolean;
  onClickButton: () => void;
}

const   TradeTopMarkets: React.FC<Props> = (props) => {
  const { active, onClickButton } = props;
  const classes = useStyles();
  const styles = useHeroSectionStyles();
  const isMobile = useMediaQuery("(max-width:930px)");

  const sdk = useSelector((store: RootState) => store.app.sdk);
  const tokenClient = sdk?.token;

  const listMarkets = useSelector((store: RootState) => store.app.marketList);
  const list: MarketListMap = parseMarketListMap(listMarkets);
  const stats = useSelector((store: RootState) => store.app.marketStats);
  const loadingTasks = useSelector((store: RootState) => store.layout.loadingTasks);
  const statLoading = Boolean(loadingTasks.runInitSDK);

  const topThreeMarkets = React.useMemo(() => {
    return stats.sort((marketA: MarketStatItem, marketB: MarketStatItem) => {
      const marketItemA = list?.[marketA.market_id] ?? {};
      const marketItemB = list?.[marketB.market_id] ?? {};
      const symbolUsdA = tokenClient?.getUSDValue(marketItemA?.quote ?? "") ?? BN_ZERO;
      const symbolUsdB = tokenClient?.getUSDValue(marketItemB?.quote ?? "") ?? BN_ZERO;
      const dailyVolumeA = tokenClient?.toHuman(marketItemA?.quote ?? "", marketA.volume) ?? BN_ZERO;
      const dailyVolumeB = tokenClient?.toHuman(marketItemB?.quote ?? "", marketB.volume) ?? BN_ZERO;
      const usdVolumeA = symbolUsdA.times(dailyVolumeA);
      const usdVolumeB = symbolUsdB.times(dailyVolumeB);
      return usdVolumeB.minus(usdVolumeA).toNumber();
    }).slice(0, 3);
  }, [list, stats, tokenClient]);

  const tokensStats = React.useMemo(() => {
    return topThreeMarkets.map((stat: MarketStatItem) => {
      const marketItem = list?.[stat.market_id] ?? {};
      const symbolOverride = marketItem.marketType === "spot" ? undefined : TokenUtils.FuturesDenomOverride;
      const expiry = marketItem.marketType === "futures" ? dayjs(marketItem.expiryTime).format("DD MMM YYYY") : "";
      const baseSymbol = sdk?.token.getTokenName(marketItem.base, symbolOverride) ?? "";
      const quoteSymbol = sdk?.token.getTokenName(marketItem.quote, symbolOverride) ?? "";

      const baseDp = sdk?.token.getDecimals(marketItem?.base ?? "") ?? 0;
      const quoteDp = sdk?.token.getDecimals(marketItem?.quote ?? "") ?? 0;
      const diffDp = baseDp - quoteDp;

      const { tickSize } = getAdjustedTickLotSize(marketItem, sdk);
      const priceDp = getDecimalPlaces(tickSize.toString(10));
      const lastPrice = stat?.lastPrice.shiftedBy(diffDp) ?? BN_ZERO;
      const openPrice = stat?.dayOpen.shiftedBy(diffDp) ?? BN_ZERO;
      const closePrice = stat?.dayClose.shiftedBy(diffDp) ?? BN_ZERO;
      const change24H = openPrice.isZero() ? BN_ZERO : closePrice.minus(openPrice).dividedBy(openPrice);

      return {
        expiry,
        priceDp,
        lastPrice,
        change24H,
        baseSymbol,
        quoteSymbol,
        marketType: marketItem.marketType,
      };
    });
  }, [list, stats, tokenClient]);

  return (
    <Card className={clsx(styles.card, { inactive: !active })}>
      <CardContent className={styles.cardContent}>
        <div className={styles.cardTitleWrapper}>
          <Typography variant="h3" className={styles.cardTitle}>Trade Top Markets</Typography>
          {isMobile && (
            <Button
              onClick={onClickButton}
              size="small"
              variant="contained"
              color="primary"
              className={clsx(styles.button, "isMobile")}
              fullWidth
            >
              Trade
            </Button>
          )}
        </div>
        <div className={classes.tokensWrapper}>
          <RenderGuard renderIf={statLoading || !tokensStats.length}>
            {[1, 2, 3].map((index) => (
              <Skeleton key={index} className={classes.standardSkeleton} />
            ))}
          </RenderGuard>
          {tokensStats.map((token, index) => (
            <Box
              key={`${token.baseSymbol}-${index}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gridGap={8}>
                <AssetIcon denom={token.baseSymbol} />
                <Box display="flex" className={classes.marketName}>
                  {token.baseSymbol}
                  {token.marketType === "futures" && !isPerpetual(token.expiry) && ` - ${token.expiry}`}
                  {token.marketType === "futures" && isPerpetual(token.expiry) && "-PERP"}
                  {token.marketType === "spot" && <Box>/{token.quoteSymbol}</Box>}
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <RenderGuard renderIf={statLoading}>
                  <Skeleton className={classes.standardSkeleton} />
                </RenderGuard>
                <Box className={classes.priceName}>
                  ${token.lastPrice.toFormat(token.priceDp)}
                </Box>
                <Box
                  className={clsx(
                    classes.changeText,
                    {
                      [classes.positive]: token.change24H.gt(0),
                      [classes.negative]: token.change24H.lt(0),
                    },
                  )}
                >
                  {token.change24H.gte(0) ? "+" : ""}{toPercentage(token.change24H, 2)}%
                </Box>
              </Box>
            </Box>
          ))}
        </div>
        {!isMobile && (
          <Button
            onClick={onClickButton}
            size="large"
            variant="contained"
            color="primary"
            className={clsx(styles.button, { inactive: !active })}
            fullWidth
          >
            Trade Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
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
  marketName: {
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
    "& > div": {
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.down("md")]: {
      ...theme.typography.body3,
    },
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.title3,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.title4,
    },
  },
  priceName: {
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      ...theme.typography.body3,
    },
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.title3,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.title4,
    },
  },
  standardSkeleton: {
    width: "100%",
    height: "36px",
    [theme.breakpoints.down("md")]: {
      height: "32px",
    },
  },
  tokensWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(3),
    },
  },
}));

export default TradeTopMarkets;
