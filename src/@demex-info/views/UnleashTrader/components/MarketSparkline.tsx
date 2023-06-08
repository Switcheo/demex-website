import { RenderGuard } from "@demex-info/components";
import { useAsyncTask } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { MarketCandlesticks } from "@demex-info/utils/markets";
import { Box, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Models } from "carbon-js-sdk";
import { QueryCandlesticksRequest } from "carbon-js-sdk/lib/codec";
import Long from "long";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Sparklines, SparklinesLine, SparklinesLineProps } from "react-sparklines";

interface Props {
  market: Models.Market,
  lineProps?: Partial<SparklinesLineProps>,
}

export const MarketSparkline = ({
  market,
  lineProps,
}: Props) => {
  const classes = useStyles();

  const sdk = useSelector((store: RootState) => store.app.sdk);

  const [candleStick, setCandleStick] = React.useState<MarketCandlesticks | null>(null);
  const [fetchBars, loadingBars] = useAsyncTask("fetchBars");

  const reloadBars = () => {
    if (!sdk?.query) return;

    let marketBarsData: typeof candleStick = {
      market: market.name,
      bars: [],
    };
    const request: QueryCandlesticksRequest = {
      market: market.name,
      resolution: new Long(60),
      from: new Long(Math.floor(new Date(new Date().setDate(new Date().getDate() - 7)).getTime() / 1000)),
      to: new Long(Math.floor(new Date().getTime() / 1000)),
    };

    fetchBars(async () => {
      try {
        const result = await sdk.query.broker.Candlesticks(request);
        marketBarsData = {
          market: market.name,
          bars: result.candlesticks.map((candlestick: Models.Candlestick) => parseFloat(candlestick.close)),
        };
        setCandleStick(marketBarsData);
      } catch (err) {
        console.error(err);
      }
    });
  };

  // Only load on component mount w/o any intention for live updates
  useEffect(() => {
    reloadBars();
  }, []);

  return (
    <Fragment>
      <RenderGuard renderIf={loadingBars}>
        <Skeleton className={classes.standardSkeleton} />
      </RenderGuard>
      <RenderGuard renderIf={!loadingBars}>
        <Box className={classes.sparklineBox}>
          <Sparklines data={candleStick?.bars ?? []} svgWidth={100} svgHeight={60}>
            <SparklinesLine style={{ fill: "none", strokeWidth: 2 }} {...lineProps} />
          </Sparklines>
        </Box>
      </RenderGuard>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  sparklineBox: {
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  standardSkeleton: {
    width: "80px",
    height: "44px",
    [theme.breakpoints.only("xs")]: {
      height: "40px",
    },
  },
}));

export default MarketSparkline;
