import { useAsyncTask } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { MarketCandlesticks } from "@demex-info/utils/markets";
import { Box, makeStyles } from "@material-ui/core";
import { Candlestick } from "carbon-js-sdk/lib/codec/Switcheo/carbon/broker/candlestick";
import { QueryCandlesticksRequest } from "carbon-js-sdk/lib/codec/Switcheo/carbon/broker/query";
import { Market } from "carbon-js-sdk/lib/codec/Switcheo/carbon/market/market";
import Long from "long";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Sparklines, SparklinesLine, SparklinesLineProps } from "react-sparklines";

interface Props {
  market: Market,
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
      market: market.id,
      bars: [],
    };

    fetchBars(async () => {
      if (!sdk || !sdk?.query) return;

      const params: QueryCandlesticksRequest = {
        marketId: market.id,
        resolution: new Long(60),
        from: new Long(Math.floor(new Date(new Date().setDate(new Date().getDate() - 7)).getTime() / 1000)),
        to: new Long(Math.floor(new Date().getTime() / 1000)),
      };

      try {
        const response = await sdk?.query.broker.Candlesticks(params);

        marketBarsData = {
          market: market.id,
          bars: response.candlesticks.map((candleStick: Candlestick) => parseFloat(candleStick.close)),
        };
        setCandleStick(marketBarsData);
      } catch (err) {
        console.error(err);
      }
    });
  };

  // Only load on component mount w/o any intention for live updates
  useEffect(() => {
    if (!sdk || loadingBars) return;
    reloadBars();
  }, [sdk]);

  return (
    <Box className={classes.sparklineBox}>
      <Sparklines data={candleStick?.bars ?? []} svgWidth={100} svgHeight={60}>
        <SparklinesLine style={{ fill: "none", strokeWidth: 2 }} {...lineProps} />
      </Sparklines>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  sparklineBox: {
    width: "30%",
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
    width: "60px",
    height: "44px",
    [theme.breakpoints.only("xs")]: {
      height: "40px",
    },
  },
}));

export default MarketSparkline;
