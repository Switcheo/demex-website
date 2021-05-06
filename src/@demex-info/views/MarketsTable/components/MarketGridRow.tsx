import { AssetIcon, RenderGuard, TypographyLabel } from "@demex-info/components";
import { getDemexLink, getUsd, goToLink, Paths } from "@demex-info/constants";
import { useAssetSymbol, useAsyncTask } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, formatUsdPrice, SECONDS_PER_DAY, toPercentage } from "@demex-info/utils";
import {
  CandleStickItem,
  MarketListItem, MarketStatItem, MarketType, MarkType, parseMarketCandlesticks,
} from "@demex-info/utils/markets";
import {
  Box, Button, fade, Hidden, makeStyles, TableCell, TableRow,
  Theme, useMediaQuery, useTheme,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import moment from "moment";
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

interface Bounds {
  min: number;
  max: number;
}

const defaultBounds: Bounds = {
  min: 0,
  max: 0,
};

interface Props {
  listItem: MarketListItem;
  load: boolean;
  stat: MarketStatItem;
  marketOption: MarketType;
}

const COIN_OVERRIDE: {
  [symbol: string]: string
} = {
  WBTC: "BTC",
};

const MarketGridRow: React.FC<Props> = (props: Props) => {
  const { listItem, load, marketOption, stat } = props;
  const assetSymbol = useAssetSymbol();
  const classes = useStyles();
  const theme = useTheme();
  const widthSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [runCandleSticks, loading] = useAsyncTask("runCandleSticks");

  const { network, restClient, usdPrices } = useSelector((state: RootState) => state.app);

  const [candleSticks, setCandleSticks] = React.useState<CandleStickItem[] | null>(null);
  const [yBounds, setYBounds] = React.useState<Bounds>(defaultBounds);

  const baseSymbol = assetSymbol(listItem?.base, marketOption === MarkType.Spot ? {} : COIN_OVERRIDE);
  const quoteSymbol = assetSymbol(listItem?.quote, marketOption === MarkType.Spot ? {} : COIN_OVERRIDE);
  const marketType = stat?.market_type ?? MarkType.Spot;
  const expiryTime = moment(listItem?.expiryTime);

  const baseUsd = getUsd(usdPrices, listItem?.base ?? "");
  const quoteUsd = getUsd(usdPrices, listItem?.quote ?? "");
  const openPrice = stat?.day_open ?? BN_ZERO;
  const closePrice = stat?.day_close ?? BN_ZERO;
  const lastPriceUsd = quoteUsd.times(stat?.last_price ?? BN_ZERO);
  const change24H = openPrice.isZero() ? BN_ZERO : closePrice.minus(openPrice).dividedBy(openPrice);

  const usdVolume = baseUsd.times(stat?.day_volume ?? BN_ZERO);
  const graphMainColor = !change24H.isZero()
    ? (change24H.gt(0) ? theme.palette.success.main : theme.palette.error.main)
    : theme.palette.text.secondary;
  const graphLightColor = !change24H.isZero()
    ? (change24H.gt(0) ? theme.palette.success.light : theme.palette.error.light)
    : theme.palette.text.secondary;

  const graphOptions = {
    animation: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        ticks: {
          suggestedMin: yBounds.min,
          suggestedMax: yBounds.max,
        },
      },
      x: {
        display: false,
      },
    },
    tooltips: {
      custom : function(tooltipModel: any) {
        tooltipModel.opacity = 0;
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const goToMarket = (market: string) => {
    goToLink(getDemexLink(`${Paths.Trade}/${market ?? ""}`, network));
  };

  useEffect(() => {
    const currentDate = moment().unix();
    const monthAgo = currentDate - (SECONDS_PER_DAY * 7);
    runCandleSticks(async () => {
      const yBounds: Bounds = defaultBounds;
      
      try {
        const candlesticksResponse: any = await restClient.getCandlesticks({
          market: stat.market,
          resolution: 360,
          from: monthAgo,
          to: currentDate,
        });
        const candlestickArr: CandleStickItem[] = parseMarketCandlesticks(candlesticksResponse);
        
        if (candlestickArr.length > 0) {
          candlestickArr.forEach((candle: CandleStickItem) => {
            if (candle.close > yBounds.max) {
              yBounds.max = candle.close;
            } else if (candle.close < yBounds.min) {
              yBounds.min = candle.close;
            }
          });
        }
        if (candlestickArr.length > 0) {
          setCandleSticks(candlestickArr);
        }
        setYBounds(yBounds);
      } catch (err) {
        console.error(err);
      }
    });
  }, [stat.market]);

  return (
    <TableRow
      onClick={widthSm ? () => goToMarket(stat?.market ?? "") : () => { }}
      className={classes.marketRow}
    >
      <Hidden mdDown>
        <TableCell className={classes.fillerCell}></TableCell>
      </Hidden>
      <TableCell className={classes.marketCell}>
        <Box className={classes.spotCell} display="flex" alignItems="center">
          <RenderGuard renderIf={marketType === MarkType.Spot}>
            <AssetIcon
              className={classes.svgBox}
              leftSvgClass={classes.leftSvgClass}
              rightSvgClass={classes.rightSvgClass}
              denomA={baseSymbol}
              denomB={quoteSymbol}
            />
            <Box className={classes.title}>
              {`${baseSymbol} / ${quoteSymbol}`}
              <Hidden mdUp>
                <TypographyLabel color="textSecondary" className={classes.usdValue}>
                  {formatUsdPrice(usdVolume)}
                </TypographyLabel>
              </Hidden>
            </Box>
          </RenderGuard>

          <RenderGuard renderIf={marketType === MarkType.Futures}>
            <AssetIcon
              className={clsx(classes.svgBox, "futures")}
              svgClass={classes.normalSvg}
              denom={baseSymbol}
            />
            <Box className={classes.title}>
              {baseSymbol} - {expiryTime.unix() > 0 ? expiryTime.format("DD MMM YYYY") : "PERP"}
              <Hidden mdUp>
                <TypographyLabel color="textSecondary" className={classes.usdValue}>
                  {formatUsdPrice(usdVolume)}
                </TypographyLabel>
              </Hidden>
            </Box>
          </RenderGuard>
        </Box>
      </TableCell>
      <TableCell className={classes.marketCell} align="right">
        <Box className={classes.lastPriceCell}>
          <TypographyLabel boxClass={classes.denomBox} className={classes.denomVal}>
            {stat?.last_price.toString(10) ?? BN_ZERO.decimalPlaces(2).toString(10)}
          </TypographyLabel>
          <TypographyLabel color="textSecondary" className={classes.usdValue}>
            {formatUsdPrice(lastPriceUsd)}
          </TypographyLabel>
        </Box>
      </TableCell>
      <TableCell className={classes.marketCell} align="right">
        <Box
          className={clsx(
            classes.change24h,
            {
              [classes.positive]: change24H.gt(0),
              [classes.negative]: change24H.lt(0),
            },
          )}
        >
          {change24H.gte(0) ? "+" : ""}{toPercentage(change24H, 2)}%
        </Box>
      </TableCell>
      <Hidden smDown>
        <TableCell className={classes.marketCell} align="right">
          <Box className={classes.volumeCell}>
            <TypographyLabel boxClass={classes.denomBox} className={classes.denomVal}>
              {stat?.day_volume.toFormat() ?? BN_ZERO.decimalPlaces(2).toString(10)}
            </TypographyLabel>
            <TypographyLabel color="textSecondary" className={classes.usdValue}>
              {formatUsdPrice(usdVolume)}
            </TypographyLabel>
          </Box>
        </TableCell>
        <TableCell className={classes.chartCell} align="right">
          <Box display="flex" justifyContent="flex-end">
            <Box maxWidth={240}>
              <RenderGuard renderIf={loading && Boolean(!candleSticks)}>
                <Skeleton variant="rect" width={240} height={88} />
              </RenderGuard>
              {
                (!loading && !candleSticks) && (
                  <Box width={240} height={88} />
                )
              }
              {
                (!loading && candleSticks) && (
                  <Line
                    type="line"
                    data={(canvas: HTMLCanvasElement) => {
                      const ctx = canvas.getContext("2d");
                      const gradient = ctx?.createLinearGradient(0, 0, 0, 100);
                      gradient?.addColorStop(0, fade(graphLightColor, 0.6));
                      gradient?.addColorStop(0.5, fade(graphLightColor, 0.3));
                      gradient?.addColorStop(1, fade(graphLightColor, 0));
                      return {
                        labels: candleSticks.map((candle: CandleStickItem) => candle.timestamp),
                        datasets: [{
                          backgroundColor: gradient ?? graphLightColor,
                          borderColor: graphMainColor,
                          borderWidth: 1,
                          data: candleSticks,
                          fill: "start",
                          parsing: {
                            xAxisKey: "timestamp",
                            yAxisKey: "close",
                          },
                          pointRadius: 0,
                        }],
                      };
                    }}
                    width={240}
                    height={88}
                    options={graphOptions}
                  />
                )
              }
            </Box>
          </Box>
        </TableCell>
        <TableCell className={clsx(classes.marketCell, classes.tradeCell)} align="right">
          <Button
            className={classes.tradeBtn}
            color="secondary"
            variant="contained"
            onClick={() => goToMarket(stat?.market ?? "")}
            disabled={load}
          >
            Trade
          </Button>
        </TableCell>
      </Hidden>
      <Hidden mdDown>
        <TableCell className={classes.fillerCell}></TableCell>
      </Hidden>
    </TableRow>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  change24h: {
    minWidth: "5rem",
    [theme.breakpoints.down("sm")]: {
      minWidth: "3.5rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.8rem",
    },
  },
  chartCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: "100%",
    padding: theme.spacing(0.5),
  },
  denomBox: {
    [theme.breakpoints.only("xs")]: {
      maxHeight: "1.3rem",
    },
  },
  denomVal: {
    fontWeight: 500,
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.8rem",
    },
  },
  fillerCell: {
    borderBottom: "1px solid transparent",
    padding: 0,
    width: "2rem",
  },
  lastPriceCell: {
    minWidth: "5rem",
  },
  leftSvgClass: {
    width: "1.75rem",
    height: "1.75rem",
    transform: "translate(-0.75em, 0)",
    [theme.breakpoints.down("sm")]: {
      transform: "translate(-0.75em, 0) rotate(-45deg)",
    },
  },
  tradeCell: {
    maxWidth: "4.1rem",
  },
  marketCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(3, 1.5),
      "&:first-child": {
        padding: theme.spacing(3, 1.5, 3, 4),
      },
      "&:last-child": {
        padding: theme.spacing(3, 3, 3, 1.5),
      },
    },
    [theme.breakpoints.only("sm")]: {
      "&:first-child": {
        padding: theme.spacing(3, 2, 3, 4.5),
      },
      "&:last-child": {
        padding: theme.spacing(3, 4.5, 3, 2),
      },
    },
    [theme.breakpoints.only("xs")]: {
      height: "6rem",
      maxHeight: "unset",
      padding: 0,
      "&:first-child": {
        padding: theme.spacing(0, 1, 0, 2),
      },
      "&:last-child": {
        padding: theme.spacing(0, 2, 0, 1),
      },
    },
  },
  positive: {
    color: theme.palette.success.main,
  },
  negative: {
    color: theme.palette.error.main,
  },
  marketRow: {
    "& td": {
      fontSize: "0.95rem",
      fontWeight: 500,
    },
  },
  nextText: {
    marginLeft: 0,
    width: "8rem",
    height: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "5rem",
    },
  },
  normalSvg: {
    width: "1.75rem",
    height: "1.75rem",
    marginRight: theme.spacing(2.5),
  },
  rightSvgClass: {
    width: "1.75rem",
    height: "1.75rem",
    transform: "translate(0.75em, 0)",
    [theme.breakpoints.down("sm")]: {
      transform: "translate(0.75em, 0) rotate(-45deg)",
    },
  },
  spotCell: {
    minWidth: "13rem",
    [theme.breakpoints.only("xs")]: {
      minWidth: "8rem",
    },
  },
  svgBox: {
    paddingTop: 0,
    marginRight: theme.spacing(2.5),
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      transform: "rotate(45deg)",
      "&.futures": {
        transform: "none",
      },
    },
  },
  skeletonBox: {
    position: "relative",
    width: "2em",
    height: "2em",
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      transform: "rotate(45deg)",
    },
  },
  skeletonSvg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  skelLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "1.75rem",
    height: "1.75rem",
    transform: "translate(-0.75em, 0)",
    [theme.breakpoints.down("sm")]: {
      transform: "translate(-0.75em, 0) rotate(-45deg)",
    },
  },
  skelRight: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "1.75rem",
    height: "1.75rem",
    transform: "translate(0.75em, 0)",
    [theme.breakpoints.down("sm")]: {
      transform: "translate(0.75em, 0) rotate(-45deg)",
    },
  },
  skeletonTitle: {
    width: "5rem",
    height: "1.5rem",
  },
  skeletonSubtitle: {
    width: "3.5rem",
    height: "1.125rem",
  },
  title: {
    "&.skeleton": {
      marginLeft: theme.spacing(2.5),
    },
    [theme.breakpoints.only("sm")]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.8rem",
      marginLeft: theme.spacing(2.5),
    },
  },
  tradeBtn: {
    ...theme.typography.button,
    fontSize: "0.85rem",
    padding: theme.spacing(1.25, 2.5),
  },
  usdValue: {
    fontSize: "0.8rem",
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.7rem",
    },
  },
  volumeCell: {
    minWidth: "6rem",
  },
}));

export default MarketGridRow;
