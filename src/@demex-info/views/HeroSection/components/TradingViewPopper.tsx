import { TradingView, TradingViewPreview } from "@demex-info/assets";
import { SvgIcon } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { Box, Fade, Link, makeStyles, Popper, Theme, Typography } from "@material-ui/core";
import React, { useState, useRef } from "react";


const TradingViewPopper: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // eslint-disable-line no-undef

  const handlePopoverOpen = () => {
    setOpen(true);
    timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
  };

  const handlePopoverClose = () => {
    timeoutIdRef.current && clearTimeout(timeoutIdRef.current);

    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 250);
    timeoutIdRef.current = timeoutId;
  };

  return (
    <React.Fragment>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        placement="top"
        transition
        className={classes.popperRootContainer}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <Box
              className={classes.popperContainer}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <Box className={classes.tradingViewPreview}>
                <SvgIcon component={TradingViewPreview} />
              </Box>
              <Typography className={classes.tradingViewBody}>
                Demex uses TradingView technology to display data on charts.
              </Typography>
              <Typography className={classes.tradingViewBody}>
                TradingView is globally recognized as a leading platform for charting and trading, offering an extensive array of technical, drawing, and analytical tools.
              </Typography>
              <Typography className={classes.tradingViewBody}>
                Powered by robust technologies available on web browsers, desktop applications, and mobile apps, this platform delivers unparalleled access to real-time data e.g.&nbsp;
                <Link href={StaticLinks.TradingView.BTCUSDChart} target="_blank">BTC USD chart</Link>, the latest financial news,&nbsp;
                <Link href={StaticLinks.TradingView.StockScreener} target="_blank">Stock screener</Link> and&nbsp;
                <Link href={StaticLinks.TradingView.EconomicCalendar} target="_blank">Economic calendar</Link>.
              </Typography>
            </Box>
          </Fade>
        )}
      </Popper>

      <div
        ref={anchorEl}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.tradingViewTextWrapper}
      >
        <Typography className={classes.tradingViewText}>Charts by </Typography>
        <SvgIcon component={TradingView} className={classes.tradingViewLogo} />
      </div>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  popperRootContainer: {
    boxSizing: "border-box",
    maxWidth: "100%",
  },
  popperContainer: {
    padding: theme.spacing(3, 3, 1.5, 3),
    background: theme.palette.background.primary,
    textAlign: "center",
    maxWidth: "100%",
    width: "356px",
    marginBottom: theme.spacing(1),
    borderRadius: "8px",
    boxShadow: theme.shadows[12],
    boxSizing: "border-box",
  },
  tradingViewPreview: {
    marginBottom: theme.spacing(3),
  },
  tradingViewLogo: {
    margin: theme.spacing(0.125, 0, 0, 0.5),
    cursor: "pointer",
  },
  tradingViewBody: {
    ...theme.typography.body3,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1.5),
  },
  tradingViewText: {
    ...theme.typography.body3,
    color: theme.palette.text.disabled,
    fontWeight: "bold",
  },
  tradingViewTextWrapper: {
    display: "flex",
  },
}));

export default TradingViewPopper;
