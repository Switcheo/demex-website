import { AssetIcon, RenderGuard, TypographyLabel } from "@demex-info/components";
import { getDemexLink, getUsd, goToLink, Paths } from "@demex-info/constants";
import { useAssetSymbol } from "@demex-info/hooks";
import {
  CandleStickItem, MarketListItem, MarketStatItem, MarketType, MarkType,
} from "@demex-info/store/markets/types";
import { RootState } from "@demex-info/store/types";
import { BN_ZERO, formatUsdPrice, toPercentage } from "@demex-info/utils";
import {
  Box, Button, Hidden, makeStyles, TableCell, TableRow,
  Theme, useMediaQuery, useTheme,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Area, AreaChart } from "recharts";

interface Props {
  listItem: MarketListItem;
  stat: MarketStatItem;
  candlesticks: CandleStickItem[] | undefined;
  marketOption: MarketType;
}

const COIN_OVERRIDE: {
  [symbol: string]: string
} = {
  WBTC: "BTC",
};

const MarketGridRow: React.FC<Props> = (props: Props) => {
  const { candlesticks, listItem, marketOption, stat } = props;
  const assetSymbol = useAssetSymbol();
  const classes = useStyles();
  const theme = useTheme();
  const widthSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { network, usdPrices } = useSelector((state: RootState) => state.app);

  const [load, setLoad] = React.useState<boolean>(true);

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

  const goToMarket = (market: string) => {
    goToLink(getDemexLink(`${Paths.Trade}/${market ?? ""}`, network));
  };

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);

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
          <RenderGuard renderIf={!load && marketType === MarkType.Spot}>
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

          <RenderGuard renderIf={load && marketType === MarkType.Spot}>
            <Box className={classes.skeletonBox}>
              <Skeleton className={clsx(classes.skeletonSvg, "left")} variant="circle" />
              <Skeleton className={clsx(classes.skeletonSvg, "right")} variant="circle" />
            </Box>
            <Box className={clsx(classes.title, "skeleton")}>
              <Skeleton className={clsx(classes.nextText, "noMargin")} variant="text" />
              <Hidden mdUp>
                <Skeleton className={classes.skeletonSubtitle} variant="text" />
              </Hidden>
            </Box>
          </RenderGuard>

          <RenderGuard renderIf={load && marketType === MarkType.Futures}>
            <Box className={classes.skeletonBox}>
              <Skeleton className={classes.skeletonSvg} variant="circle" />
            </Box>
            <Box className={clsx(classes.title, "skeleton")}>
              <Skeleton className={clsx(classes.nextText, "noMargin")} variant="text" />
              <Hidden mdUp>
                <Skeleton className={classes.skeletonSubtitle} variant="text" />
              </Hidden>
            </Box>
          </RenderGuard>

          <RenderGuard renderIf={!load && marketType === MarkType.Futures}>
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
        <Box className={clsx(classes.lastPriceCell, { load })}>
          <RenderGuard renderIf={load}>
            <Box flexDirection="column" flexWrap="wrap">
              <Skeleton className={classes.skeletonTitle} variant="text" />
              <Box display="flex" justifyContent="flex-end">
                <Skeleton className={classes.skeletonSubtitle} variant="text" />
              </Box>
            </Box>
          </RenderGuard>

          <RenderGuard renderIf={!load}>
            <TypographyLabel boxClass={classes.denomBox} className={classes.denomVal}>
              {stat?.last_price.toString(10) ?? BN_ZERO.decimalPlaces(2).toString(10)}
            </TypographyLabel>
            <TypographyLabel color="textSecondary" className={classes.usdValue}>
              {formatUsdPrice(lastPriceUsd)}
            </TypographyLabel>
          </RenderGuard>
        </Box>
      </TableCell>
      <TableCell
        className={clsx(
          classes.marketCell,
          {
            positive: change24H.gt(0),
            negative: change24H.lt(0),
          },
        )}
        align="right"
      >
        <RenderGuard renderIf={load}>
          <Box display="flex" justifyContent="flex-end">
            <Skeleton className={classes.skeletonTitle} variant="text" />
          </Box>
        </RenderGuard>
        <RenderGuard renderIf={!load}>
          <Box className={classes.change24h}>
            {change24H.gte(0) ? "+" : ""}{toPercentage(change24H, 2)}%
          </Box>
        </RenderGuard>
      </TableCell>
      <Hidden smDown>
        <TableCell className={classes.marketCell} align="right">
          <Box className={clsx(classes.volumeCell, { load })}>
            <RenderGuard renderIf={load}>
              <Box flexDirection="column" flexWrap="wrap">
                <Skeleton className={classes.skeletonTitle} variant="text" />
                <Box display="flex" justifyContent="flex-end">
                  <Skeleton className={classes.skeletonSubtitle} variant="text" />
                </Box>
              </Box>
            </RenderGuard>

            <RenderGuard renderIf={!load}>
              <TypographyLabel boxClass={classes.denomBox} className={classes.denomVal}>
                {stat?.day_volume.toFormat() ?? BN_ZERO.decimalPlaces(2).toString(10)}
              </TypographyLabel>
              <TypographyLabel color="textSecondary" className={classes.usdValue}>
                {formatUsdPrice(usdVolume)}
              </TypographyLabel>
            </RenderGuard>
          </Box>
        </TableCell>
        <TableCell className={classes.chartCell} align="right">
          <Box display="flex" justifyContent="flex-end">
            <RenderGuard renderIf={Boolean(!candlesticks)}>
              <Skeleton variant="rect" width={240} height={88} />
            </RenderGuard>
            <RenderGuard renderIf={Boolean(candlesticks)}>
              <AreaChart width={240} height={88} data={candlesticks}>
                <defs>
                  <linearGradient id={`graphGradient-${stat.market}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={graphLightColor} stopOpacity={0.6}/>
                    <stop offset="20%" stopColor={graphLightColor} stopOpacity={0.3}/>
                    <stop offset="100%" stopColor={graphLightColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  strokeWidth={1.5}
                  dot={false}
                  type="monotone"
                  dataKey="close"
                  xAxisId="timestamp"
                  yAxisId="close"
                  stroke={graphMainColor}
                  fill={`url(#graphGradient-${stat.market})`}
                />
              </AreaChart>
            </RenderGuard>
          </Box>
        </TableCell>
        <TableCell className={clsx(classes.marketCell, "trade")} align="right">
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
    "&.load": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  leftSvgClass: {
    width: "1.75rem",
    height: "1.75rem",
    transform: "translate(-0.75em, 0)",
    [theme.breakpoints.down("sm")]: {
      transform: "translate(-0.75em, 0) rotate(-45deg)",
    },
  },
  marketCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: "100%",
    // maxHeight: "6rem",
    padding: theme.spacing(2),
    "&.trade": {
      maxWidth: "4.1rem",
    },
    "&.positive": {
      color: theme.palette.success.main,
    },
    "&.negative": {
      color: theme.palette.error.main,
    },
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
  marketRow: {
    "& td": {
      fontSize: "0.95rem",
      fontWeight: 500,
    },
  },
  nextText: {
    marginLeft: theme.spacing(2.5),
    width: "8rem",
    height: "1.5rem",
    "&.noMargin": {
      marginLeft: 0,
    },
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
    "&.left": {
      width: "1.75rem",
      height: "1.75rem",
      transform: "translate(-0.75em, 0)",
      [theme.breakpoints.down("sm")]: {
        transform: "translate(-0.75em, 0) rotate(-45deg)",
      },
    },
    "&.right": {
      width: "1.75rem",
      height: "1.75rem",
      transform: "translate(0.75em, 0)",
      [theme.breakpoints.down("sm")]: {
        transform: "translate(0.75em, 0) rotate(-45deg)",
      },
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
    "&.load": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
}));

export default MarketGridRow;
