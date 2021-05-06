import {
  Box, fade, Hidden, makeStyles, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import {
  CexMarkets, CexTradingRow, DexMarkets, LogoCell, PropertyTab,
} from "../compareConfig";
import ComparisonRow from "./ComparisonRow";

interface Props {
  dexNum: number;
  propertyTab: PropertyTab;
  tableSelect: CexTradingRow[];
}

const ComparisonTable: React.FC<Props> = (props: Props) => {
  const { dexNum, propertyTab, tableSelect } = props;
  const classes = useStyles();

  const [load, setLoad] = React.useState<boolean>(true);

  const MarketHeaders = dexNum === 1 ? DexMarkets : CexMarkets;

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 400);
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
                      <Component className={clsx(classes.iconClass, cex.value)} />
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
    height: "100%",
    "&:last-child": {
      padding: theme.spacing(0, 0, 0, 1.5),
    },
    "&.demex": {
      backgroundColor: theme.palette.background.default,
      boxShadow: `0px 8px 12px 2px ${fade(theme.palette.text.secondary, 0.08)}`,
      position: "sticky",
      left: "10.5rem",
      [theme.breakpoints.only("md")]: {
        left: "9rem",
      },
      [theme.breakpoints.down("sm")]: {
        left: "7rem",
      },
      [theme.breakpoints.only("xs")]: {
        position: "initial",
      },
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
      height: "1.5rem",
    },
  },
}));

export default ComparisonTable;
