import {
  Box,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  fade,
  makeStyles,
} from "@material-ui/core";
import {
  CexMarkets,
  CexTradingRow,
  DexMarkets,
  LogoCell,
  PropertyTab,
} from "../compareConfig";
import React, { useEffect } from "react";

import ComparisonRow from "./ComparisonRow";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";

interface Props {
  dexToggle: boolean;
  propertyTab: PropertyTab;
  tableSelect: CexTradingRow[];
}

const ComparisonTable: React.FC<Props> = (props: Props) => {
  const { dexToggle, propertyTab, tableSelect } = props;
  const classes = useStyles();

  const [load, setLoad] = React.useState<boolean>(true);

  const MarketHeaders = dexToggle ? DexMarkets : CexMarkets;

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, [propertyTab]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <Hidden mdDown>
              <TableCell className={classes.fillerCell} />
            </Hidden>
            <TableCell className={classes.headerAltCell} />
            {
              MarketHeaders.map((cex: LogoCell) => {
                const { component: Component } = cex;
                return (
                  <TableCell
                    align="center"
                    className={clsx(classes.headerCell, cex.value)}
                    key={`cex-${cex.value}`}
                  >
                    <Box className={classes.iconBox}>
                      {!load && (
                        <Component className={clsx(classes.iconClass, cex.value)} />
                      )}
                      {load && (
                        <Skeleton height="3rem" width="6rem" />
                      )}
                    </Box>
                  </TableCell>
                );
              })
            }
            <Hidden mdDown>
              <TableCell className={classes.fillerCell} />
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableSelect.map((tradingVal: CexTradingRow) => (
            <ComparisonRow load={load} key={`${tradingVal.header}-tradingVal`} row={tradingVal} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  fillerCell: {
    borderBottom: "none",
    padding: 0,
    width: theme.spacing(3.5),
  },
  headerAltCell: {
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
    left: 0,
    padding: theme.spacing(3, 1.5, 3, 0),
    position: "sticky",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3, 1.5, 3, 3),
    },
    [theme.breakpoints.only("xs")]: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  headerCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0, 1.5),
    minWidth: "calc((80% - 56px)/ 6)",
    maxHeight: "6rem",
    height: "100%",
    "&:last-child": {
      padding: theme.spacing(0, 0, 0, 1.5),
    },
    "&.demex": {
      backgroundColor: theme.palette.background.default,
      boxShadow: `0px 8px 12px 2px ${fade(theme.palette.text.secondary, 0.08)}`,
      position: "sticky",
      left: "10.5rem",
      [theme.breakpoints.only("xs")]: {
        position: "initial",
      },
    },
    "&.dydx": {
      padding: theme.spacing(0, 1.5),
    },
    [theme.breakpoints.down("md")]: {
      "&:last-child": {
        padding: theme.spacing(0, 3, 0, 1.5),
      },
    },
  },
  iconBox: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "4.875rem",
  },
  iconClass: {
    height: "1.875rem",
    maxWidth: "9rem",
    "&.demex path": {
      fill: theme.palette.secondary.main,
    },
    "&.dydx": {
      height: "3.75rem",
    },
    "&.derivadex": {
      height: "1rem",
      maxWidth: "9rem",
    },
  },
}));

export default ComparisonTable;
