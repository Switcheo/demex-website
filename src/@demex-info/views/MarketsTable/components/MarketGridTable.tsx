import { EmptyState, RenderGuard, withLightTheme } from "@demex-info/components";
import { useTaskSubscriber } from "@demex-info/hooks";
import { HeaderCell } from "@demex-info/utils";
import { MarketListMap, MarketStatItem, MarketType, MarkType } from "@demex-info/utils/markets";
import {
  Box, CircularProgress, Hidden, makeStyles, Table, TableBody,
  TableCell, TableHead, TableRow, Theme, useMediaQuery, useTheme,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import clsx from "clsx";
import React from "react";
import MarketGridRow from "./MarketGridRow";
import MarketPaper from "./MarketPaper";

interface Props {
  list: MarketListMap;
  load: boolean;
  marketsList: MarketStatItem[];
  marketOption: MarketType;
}

const MarketGridTable: React.FC<Props> = (props: Props) => {
  const { list, load, marketsList, marketOption } = props;
  const classes = useStyles();
  const theme = useTheme();
  const widthSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading] = useTaskSubscriber("runMarkets");

  const marketHeaders: HeaderCell[] = [{
    title: widthSmDown ? "Market / 24H Vol" : "Market",
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
    showCol: widthSmDown ? false : true,
  }, {
    className: classes.alignRight,
    title: "Chart",
    key: "chart",
    showCol: widthSmDown ? false : true,
  }, {
    className: classes.alignRight,
    title: "Trade",
    key: "trade",
    showCol: widthSmDown ? false : true,
  }];

  return (
    <Box className={classes.root}>
      <MarketPaper className={classes.marketPaper}>
        <Box className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <Hidden mdDown>
                  <TableCell className={classes.fillerCell}></TableCell>
                </Hidden>
                {
                  marketHeaders.map((header: HeaderCell) => {
                    const { showCol = true } = header;
                    if (!showCol) return null;
                    return (
                      <TableCell className={clsx(classes.headerCell, header.className)} key={header?.key ?? header.title}>
                        {header.title}
                      </TableCell>
                    );
                  })
                }
                <Hidden mdDown>
                  <TableCell className={classes.fillerCell}></TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <RenderGuard renderIf={!loading && marketsList?.length > 0}>
              <TableBody>
                {
                  marketsList.map((stat: MarketStatItem, index: number) => {
                    if (index <= 3) {
                      const listItem = list?.[stat.market] ?? {};
                      return (
                        <MarketGridRow
                          key={stat.market}
                          stat={stat}
                          listItem={listItem}
                          load={load}
                          marketOption={marketOption}
                        />
                      );
                    }
                  })
                }
              </TableBody>
            </RenderGuard>
          </Table>
          <RenderGuard renderIf={!loading && marketsList.length === 0}>
            <EmptyState
              className={classes.emptyState}
              helperText={`No ${marketOption === MarkType.Spot ? "Spot" : "Futures"} found at the moment`}
              theme="light"
            />
          </RenderGuard>
          <RenderGuard renderIf={loading}>
            <Box className={classes.loadingState}>
              <CircularProgress color="secondary" size="3rem" />
            </Box>
          </RenderGuard>
        </Box>
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
  emptyState: {
    minHeight: "25rem",
  },
  loadingState: {
    minHeight: "25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  fillerCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: 0,
    width: "2rem",
  },
  root: {
    marginTop: theme.spacing(2),
  },
  headerCell: {
    ...theme.typography.subtitle2,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    fontSize: "0.785rem",
    padding: theme.spacing(1, 2),
    maxHeight: "2.375rem",
    height: "100%",
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(1, 1.5),
      "&:first-child": {
        padding: theme.spacing(1, 1.5, 1, 3),
      },
      "&:last-child": {
        padding: theme.spacing(1, 3, 1, 1.5),
      },
    },
    [theme.breakpoints.only("sm")]: {
      "&:first-child": {
        padding: theme.spacing(1, 2, 1, 3.5),
      },
      "&:last-child": {
        padding: theme.spacing(1, 3.5, 1, 2),
      },
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.7rem",
      padding: theme.spacing(1, 0.5),
      "&:first-child": {
        padding: theme.spacing(1, 0.5, 1, 2),
      },
      "&:last-child": {
        padding: theme.spacing(1, 2, 1, 0.5),
      },
    },
  },
  marketPaper: {
    position: "relative",
    transition: "height 0.6s ease",
  },
  tableContainer: {
    height: "100%",
    transition: "height 0.8s ease",
    overflowX: "auto",
    overflowY: "hidden",
  },
  viewBtn: {
    ...theme.typography.button,
    alignItems: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
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
