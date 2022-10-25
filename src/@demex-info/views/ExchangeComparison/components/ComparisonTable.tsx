import {
  Box, Hidden, makeStyles, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import {
  Markets, TradingRow, TradingVal, LogoCell,
} from "../compareConfig";
import ComparisonRow from "./ComparisonRow";

const ComparisonTable: React.FC = () => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableShadow}>
      <Table>
        <TableHead>
          <TableRow>
            <Hidden mdDown>
              <TableCell className={classes.fillerCell} />
            </Hidden>
            <TableCell className={classes.headerAltCell} />
            {
              Markets.map((cell: LogoCell) => {
                const { component: Component } = cell;
                return (
                  <TableCell
                    align="center"
                    className={clsx(classes.headerCell, cell.value)}
                    key={`svg-${cell.value}`}
                  >
                    <Box className={classes.iconBox}>
                      <Component className={clsx(classes.iconClass, cell.value)} />
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
          {TradingVal.map((tradingVal: TradingRow) => (
            <ComparisonRow key={`${tradingVal.header}-tradingVal`} row={tradingVal} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  tableShadow: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.background.primary}, ${theme.palette.background.primary}), 
      linear-gradient(to right, ${theme.palette.background.primary}, ${theme.palette.background.primary}),
      linear-gradient(to right, rgb(196 196 196 / 14%), rgba(255, 255, 255, 0)), 
      linear-gradient(to left, rgb(196 196 196 / 14%), rgba(255, 255, 255, 0))`,
    /* Shadows */
    /* Shadow covers */
    backgroundPosition: "left center, right center, left center, right center",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.background.primary,
    backgroundSize: "20px 100%, 20px 100%, 15px 100%, 15px 100%",
    backgroundAttachment: "local, local, scroll, scroll",
  },
  fillerCell: {
    borderBottom: "none",
    padding: 0,
    width: theme.spacing(3.5),
  },
  headerAltCell: {
    background: theme.palette.background.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
    minWidth: "12.5rem",
    left: 0,
    padding: theme.spacing(3, 1.5, 3, 0),
    position: "sticky",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3, 1.5, 3, 3),
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: "unset",
    },
  },
  headerCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0, 1.5),
    minWidth: "calc((80% - 56px)/ 6)",
    height: "100%",
    "&.demex": {
      borderLeft: `1px solid ${theme.palette.primary.main}`,
      borderRight: `1px solid ${theme.palette.primary.main}`,
      borderTop: `1px solid ${theme.palette.primary.main}`,
    },
    "&:last-child": {
      padding: theme.spacing(0, 0, 0, 1.5),
    },
    [theme.breakpoints.down("md")]: {
      "&:last-child": {
        padding: theme.spacing(0, 3, 0, 1.5),
        minWidth: "7rem",
      },
    },
  },
  iconBox: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  iconClass: {
    height: "1.875rem",
    maxWidth: "9rem",
  },
}));

export default ComparisonTable;
