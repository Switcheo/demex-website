import { Add, Remove } from "@demex-info/assets";
import { Box, Hidden, Table, TableBody, TableCell, TableHead, TableRow, Theme, makeStyles } from "@material-ui/core";
import { EmptyState, RenderGuard, withLightTheme } from "@demex-info/components";

import { HeaderCell } from "@demex-info/utils";
import MarketGridRow from "./MarketGridRow";
import MarketPaper from "./MarketPaper";
import { MarketStatItem } from "@demex-info/store/markets/types";
import React from "react";
import { RootState } from "@demex-info/store/types";
import clsx from "clsx";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { useSelector } from "react-redux";

interface Props {
  marketsList: MarketStatItem[];
}

const MarketGridTable: React.FC<Props> = (props: Props) => {
  const { marketsList } = props;
  const classes = useStyles();

  const { list, candlesticks } = useSelector((state: RootState) => state.markets);

  const [expand, setExpand] = React.useState<boolean>(false);

  const marketHeaders: HeaderCell[] = [{
    title: "Market",
    key: "market",
  }, {
    className: classes.alignRight,
    title: "Last Price",
    key: "lastPrice",
  }, {
    className: classes.alignRight,
    title: "24H Change",
    key: "24hChange",
  }, {
    className: classes.alignRight,
    title: "24H Volume",
    key: "24hVolume",
  }, {
    className: classes.alignRight,
    title: "Chart",
    key: "chart",
  }, {
    className: classes.alignRight,
    title: "Trade",
    key: "trade",
  }];

  let marketPaperHeight: string | number = 0;
  let tableHeight: string | number = 0;
  if (marketsList.length > 4 && expand) {
    tableHeight = "100%";
    marketPaperHeight = "100%";
  } else {
    tableHeight = 38 + (4 * 98);
    marketPaperHeight = tableHeight + 56;
  }

  return (
    <Box className={classes.root}>
      <MarketPaper className={classes.marketPaper} height={marketPaperHeight}>
        <Box className={classes.tableContainer} height={tableHeight}>
          <Table>
            <TableHead>
              <TableRow>
                <Hidden smDown>
                  <TableCell className={classes.fillerCell}></TableCell>
                </Hidden>
                {
                  marketHeaders.map((header: HeaderCell) => (
                    <TableCell className={clsx(classes.headerCell, header.className)} key={header?.key ?? header.title}>
                      {header.title}
                    </TableCell>
                  ))
                }
                <Hidden smDown>
                  <TableCell className={classes.fillerCell}></TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <RenderGuard renderIf={marketsList?.length > 0}>
              <TableBody>
                {
                  marketsList.map((stat: MarketStatItem) => {
                    const listItem = list?.[stat.market] ?? {};
                    const candleSticksArr = candlesticks?.[stat.market] ?? undefined;
                    return (
                      <MarketGridRow
                        key={stat.market}
                        stat={stat}
                        listItem={listItem}
                        candlesticks={candleSticksArr}
                      />
                    );
                  })
                }
              </TableBody>
            </RenderGuard>
          </Table>
          <RenderGuard renderIf={marketsList.length === 0}>
            <EmptyState theme="light" />
          </RenderGuard>
        </Box>
        {
          marketsList?.length > 4 && (
            <Box className={clsx(classes.viewBtn, { expand })} onClick={() => setExpand(!expand)}>
              {
                expand ? (
                  <Remove className={classes.addIcon} />
                ) : (
                  <Add className={classes.addIcon} />
                )
              }
              View { expand ? "Less" : "More" }
            </Box>
          )
        }
      </MarketPaper>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  addIcon: {
    marginRight: theme.spacing(1.5),
    width: "0.75rem",
    height: "0.75rem",
  },
  alignRight: {
    textAlign: "right",
  },
  fillerCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: 0,
    width: "1.75rem",
  },
  root: {
    marginTop: theme.spacing(2),
  },
  headerCell: {
    ...theme.typography.subtitle2,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    fontSize: "0.785rem",
    padding: theme.spacing(1, 2),
    maxHeight: "2.375rem",
    height: "100%",
    [theme.breakpoints.only("sm")]: {
      "&:first-child": {
        padding: theme.spacing(1, 2, 1, 3.5),
      },
      "&:last-child": {
        padding: theme.spacing(1, 3.5, 1, 2),
      },
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1, 1.5),
      "&:first-child": {
        padding: theme.spacing(1, 1.5, 1, 3.5),
      },
      "&:last-child": {
        padding: theme.spacing(1, 3.5, 1, 1.5),
      },
    },
  },
  marketPaper: {
    position: "relative",
    transition: "height 0.6s ease",
  },
  tableContainer: {
    transition: "height 0.8s ease",
    overflowX: "auto",
    overflowY: "hidden",
  },
  viewBtn: {
    ...theme.typography.button,
    alignItems: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    fontSize: "0.9rem",
    justifyContent: "center",
    height: "3.75rem",
    width: "100%",
    position: "absolute",
    bottom: 0,
    "&.expand": {
      position: "initial",
    },
    "& path": {
      fill: theme.palette.text.secondary,
    },
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, 0.04),
      color: theme.palette.secondary.main,
      "& path": {
        fill: theme.palette.secondary.main,
      },
    },
  },
}));

export default withLightTheme()(MarketGridTable);
