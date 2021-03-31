import { Area, AreaChart } from "recharts";
import { AssetIcon, RenderGuard, TypographyLabel } from "@demex-info/components";
import { BN_ZERO, formatUsdPrice, toPercentage } from "@demex-info/utils";
import { Box, Button, Hidden, TableCell, TableRow, Theme, makeStyles, useTheme } from "@material-ui/core";
import { CandleStickItem, MarkType, MarketListItem, MarketStatItem } from "@demex-info/store/markets/types";
import { Paths, getDemexLink, getUsd, goToLink } from "@demex-info/constants";
import React, { useEffect } from "react";

import { RootState } from "@demex-info/store/types";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import moment from "moment";
import { useAssetSymbol } from "@demex-info/hooks";
import { useSelector } from "react-redux";

interface Props {
  listItem: MarketListItem;
  stat: MarketStatItem;
  candlesticks: CandleStickItem[] | undefined;
}

const COIN_OVERRIDE: {
  [symbol: string]: string
} = {
  WBTC: "BTC",
};

const MarketGridRow: React.FC<Props> = (props: Props) => {
  const { candlesticks, listItem, stat } = props;
  const assetSymbol = useAssetSymbol();
  const classes = useStyles();
  const theme = useTheme();

  const { network, usdPrices } = useSelector((state: RootState) => state.app);

  const [load, setLoad] = React.useState<boolean>(true);

  const baseSymbol = assetSymbol(listItem?.base, COIN_OVERRIDE);
  const quoteSymbol = assetSymbol(listItem?.quote, COIN_OVERRIDE);
  const marketType = stat?.market_type ?? MarkType.Spot;
  const expiryTime = moment(listItem?.expiryTime);

  const baseUsd = getUsd(usdPrices, listItem?.base ?? "");
  const quoteUsd = getUsd(usdPrices, listItem?.quote ?? "");
  const openPriceUsd = quoteUsd.times(stat?.day_open ?? BN_ZERO);
  const closePriceUsd = quoteUsd.times(stat?.day_close ?? BN_ZERO);
  const lastPriceUsd = quoteUsd.times(stat?.last_price ?? BN_ZERO);
  const change24H = openPriceUsd.isZero() ? BN_ZERO : closePriceUsd.minus(openPriceUsd).dividedBy(openPriceUsd);

  const usdVolume = baseUsd.times(stat?.day_volume ?? BN_ZERO);
  const graphMainColor = !change24H.isZero()
    ? (change24H.gt(0) ? theme.palette.success.main : theme.palette.error.main)
    : theme.palette.text.secondary;
  const graphLightColor = !change24H.isZero()
    ? (change24H.gt(0) ? theme.palette.success.light : theme.palette.error.light)
    : theme.palette.text.secondary;

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);

  return (
    <TableRow className={classes.marketRow}>
      <Hidden smDown>
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
            {`${baseSymbol} / ${quoteSymbol}`}
          </RenderGuard>

          <RenderGuard renderIf={load && marketType === MarkType.Spot}>
            <Box className={classes.skeletonBox}>
              <Skeleton className={clsx(classes.skeletonSvg, "left")} variant="circle" />
              <Skeleton className={clsx(classes.skeletonSvg, "right")} variant="circle" />
            </Box>
            <Skeleton className={classes.nextText} variant="text" />
          </RenderGuard>

          <RenderGuard renderIf={load && marketType === MarkType.Futures}>
            <Box className={classes.skeletonBox}>
              <Skeleton className={classes.skeletonSvg} variant="circle" />
            </Box>
            <Skeleton className={classes.nextText} variant="text" />
          </RenderGuard>

          <RenderGuard renderIf={!load && marketType === MarkType.Futures}>
            <AssetIcon
              className={classes.svgBox}
              svgClass={classes.normalSvg}
              denom={baseSymbol}
            />
            {baseSymbol} - {expiryTime.unix() > 0 ? expiryTime.format("DD MMM YYYY") : "PERP"}
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
            <TypographyLabel className={classes.denomVal}>
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
            {toPercentage(change24H, 2)}%
          </Box>
        </RenderGuard>
      </TableCell>
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
            <TypographyLabel className={classes.denomVal}>
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
          onClick={() => goToLink(getDemexLink(`${Paths.Trade}/${stat?.market ?? ""}`, network))}
          disabled={load}
        >
          Trade
        </Button>
      </TableCell>
      <Hidden smDown>
        <TableCell className={classes.fillerCell}></TableCell>
      </Hidden>
    </TableRow>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  change24h: {
    minWidth: "5rem",
  },
  chartCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: "100%",
    maxHeight: "6rem",
    padding: theme.spacing(0.5),
  },
  denomVal: {
    fontWeight: 500,
  },
  fillerCell: {
    borderBottom: "1px solid transparent",
    padding: 0,
    width: "1.75rem",
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
  },
  marketCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: "100%",
    maxHeight: "6rem",
    padding: theme.spacing(3, 2),
    "&.trade": {
      maxWidth: "4rem",
    },
    "&.positive": {
      color: theme.palette.success.main,
    },
    "&.negative": {
      color: theme.palette.error.main,
    },
    [theme.breakpoints.down("sm")]: {
      "&:first-child": {
        padding: theme.spacing(3, 2, 3, 4.5),
      },
      "&:last-child": {
        padding: theme.spacing(3, 4.5, 3, 2),
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
  },
  spotCell: {
    minWidth: "13rem",
  },
  svgBox: {
    paddingTop: 0,
    marginRight: theme.spacing(2.5),
  },
  skeletonBox: {
    position: "relative",
    width: "2em",
    height: "2em",
    flexShrink: 0,
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
    },
    "&.right": {
      width: "1.75rem",
      height: "1.75rem",
      transform: "translate(0.75em, 0)",
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
  tradeBtn: {
    ...theme.typography.button,
    fontSize: "0.85rem",
    padding: theme.spacing(1.5, 3),
  },
  usdValue: {
    fontSize: "0.8rem",
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
