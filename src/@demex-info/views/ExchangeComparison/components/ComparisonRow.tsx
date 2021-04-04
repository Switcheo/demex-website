import { Box, Hidden, TableCell, TableRow, Theme, Typography, fade, makeStyles } from "@material-ui/core";
import { CloseIcon, TickIcon } from "@demex-info/assets";

import { CexTradingRow } from "../compareConfig";
import React from "react";
import { RenderGuard } from "@demex-info/components";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";

interface Props {
  load: boolean;
  row: CexTradingRow;
}

const ComparisonRow: React.FC<Props> = (props: Props) => {
  const { load, row } = props;
  const classes = useStyles();

  return (
    <TableRow className={classes.compareRow}>
      <Hidden mdDown>
        <TableCell className={classes.fillerCell} />
      </Hidden>
      <TableCell className={clsx(classes.headerCol, "headerCol")}>
        {load && (
          <Skeleton height="2.25rem" width="6rem" />
        )}
        {!load && (
          <Box height="6rem" alignItems="center" display="flex" className={classes.rowHeader}>
            {row.header}
          </Box>
        )}
      </TableCell>
      {
        Object.keys(row.values).map((newKey: string) => {
          const valueItem = row.values?.[newKey] ?? false;
          return (
            <TableCell className={clsx(classes.rowCell, "rowCell", newKey)} key={`${row.header}-${newKey}`}>
              <RenderGuard renderIf={!load && typeof valueItem === "string"}>
                <Box height="6rem" display="flex" justifyContent="center">
                  <Typography className={classes.rowText} color="textSecondary">
                    {valueItem}
                  </Typography>
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!load && typeof valueItem === "boolean" && valueItem}>
                <Box height="6rem" display="flex" justifyContent="center" alignItems="center">
                  <TickIcon className={classes.svgIcon} />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={!load && typeof valueItem === "boolean" && !valueItem}>
                <Box height="6rem" display="flex" justifyContent="center" alignItems="center">
                  <CloseIcon className={clsx(classes.svgIcon, "cross")} />
                </Box>
              </RenderGuard>
              <RenderGuard renderIf={load}>
                <Box height="6rem" display="flex" justifyContent="center" alignItems="center">
                  <Skeleton height="2.25rem" width="6rem" />
                </Box>
              </RenderGuard>
            </TableCell>
          );
        })
      }
      <Hidden mdDown>
        <TableCell className={classes.fillerCell} />
      </Hidden>
    </TableRow>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  compareRow: {
    "& td": {
      maxHeight: "6rem",
      "&.headerCol, &.rowCell": {
        borderBottom: `1px solid ${theme.palette.divider}`,
        maxHeight: "6rem",
      },
      "&.demex": {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
        boxShadow: `0px 8px 12px 2px ${fade(theme.palette.text.secondary, 0.08)}`,
        position: "sticky",
        left: "10.5rem",
        [theme.breakpoints.only("xs")]: {
          position: "initial",
        },
      },
    },
    "&:last-child": {
      "& td": {
        "&.headerCol, &.rowCell": {
          borderBottom: "none",
          maxHeight: "6rem",
        },
      },
    },
  },
  fillerCell: {
    borderBottom: "1px solid transparent",
    padding: 0,
    width: theme.spacing(3.5),
  },
  headerCol: {
    ...theme.typography.subtitle1,
    backgroundColor: theme.palette.background.default,
    fontSize: "0.9rem",
    fontWeight: 600,
    position: "sticky",
    left: 0,
    minWidth: "7.5rem",
    maxHeight: "6rem",
    padding: theme.spacing(0, 3),
    [theme.breakpoints.only("xs")]: {
      borderRight: `1px solid ${theme.palette.divider}`,
      minHeight: "6rem",
      minWidth: "6rem",
      padding: theme.spacing(0, 1, 0, 1.5),
    },
  },
  rowCell: {
    ...theme.typography.subtitle1,
    fontSize: "0.9rem",
    maxHeight: "6rem",
    padding: theme.spacing(0, 3),
    "&:last-child": {
      padding: theme.spacing(0, 0, 0, 3),
    },
    [theme.breakpoints.down("md")]: {
      "&:last-child": {
        padding: theme.spacing(0, 3, 0, 1.5),
      },
    },
  },
  rowHeader: {
    justifyContent: "center",
    [theme.breakpoints.only("xs")]: {
      justifyContent: "initial",
    },
  },
  rowText: {
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontSize: "0.9rem",
    maxWidth: "7.75rem",
  },
  svgIcon: {
    height: "0.75rem",
    "&.cross": {
      height: "0.875rem",
      "& path": {
        fill: theme.palette.error.main,
      },
    },
  },
}));

export default ComparisonRow;
