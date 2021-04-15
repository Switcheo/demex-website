import { CloseIcon, TickIcon } from "@demex-info/assets";
import { RenderGuard } from "@demex-info/components";
import {
  Box, fade, Hidden, makeStyles, TableCell, TableRow, Theme, Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import { CexTradingRow } from "../compareConfig";
import ListCell from "./ListCell";
import SubListCell from "./SubListCell";

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
          <Box height="8rem" alignItems="center" display="flex" className={classes.rowHeader}>
            {row.header}
          </Box>
        )}
      </TableCell>
      {
        Object.keys(row.values).map((newKey: string) => {
          const valueItem = row.values?.[newKey] ?? false;
          return (
            <TableCell className={clsx(classes.rowCell, "rowCell", newKey)} key={`${row.header}-${newKey}`}>
              <Box height="8rem" alignItems="center" display="flex" justifyContent="center">
                <RenderGuard renderIf={!load && typeof valueItem === "string"}>
                  <Typography className={classes.rowText} color="textSecondary">
                    {valueItem}
                  </Typography>
                </RenderGuard>
                <RenderGuard renderIf={!load && typeof valueItem === "boolean" && valueItem}>
                  <TickIcon className={classes.svgIcon} />
                </RenderGuard>
                <RenderGuard renderIf={!load && typeof valueItem === "boolean" && !valueItem}>
                  <CloseIcon className={clsx(classes.svgIcon, "cross")} />
                </RenderGuard>
                <RenderGuard renderIf={load}>
                  <Skeleton height="2.25rem" width="6rem" />
                </RenderGuard>
                <RenderGuard renderIf={!load && Array.isArray(valueItem)}>
                  <RenderGuard renderIf={Array.isArray(valueItem) && valueItem.length > 0 && typeof valueItem[0] === "string"}>
                    <ListCell valueItem={valueItem} newKey={newKey} />
                  </RenderGuard>
                </RenderGuard>
                <RenderGuard renderIf={!load && Array.isArray(valueItem)}>
                  <RenderGuard
                    renderIf={
                      Array.isArray(valueItem)
                        && valueItem.length > 0
                        && typeof valueItem[0] !== "string"
                        && Boolean(valueItem[0]?.header)
                    }
                  >
                      <SubListCell valueItem={valueItem}  newKey={newKey} />
                  </RenderGuard>
                </RenderGuard>
              </Box>
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
      maxHeight: "8rem",
      "&.headerCol, &.rowCell": {
        borderBottom: `1px solid ${theme.palette.divider}`,
        maxHeight: "8rem",
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
          maxHeight: "8rem",
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
    maxHeight: "8rem",
    maxWidth: "10rem",
    padding: theme.spacing(0, 3),
    [theme.breakpoints.only("xs")]: {
      borderRight: `1px solid ${theme.palette.divider}`,
      maxWidth: "8rem",
      minHeight: "8rem",
      minWidth: "8rem",
      padding: theme.spacing(0, 1, 0, 1.5),
    },
  },
  rowCell: {
    ...theme.typography.subtitle1,
    fontSize: "0.8rem",
    maxHeight: "8rem",
    padding: theme.spacing(0, 3),
    "&:last-child": {
      padding: theme.spacing(0, 0, 0, 3),
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 2),
      "&:last-child": {
        padding: theme.spacing(0, 2, 0, 1.5),
      },
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 1.5),
      "&:last-child": {
        padding: theme.spacing(0, 1.5),
      },
    },
  },
  rowHeader: {},
  rowText: {
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontSize: "0.85rem",
    maxWidth: "7.75rem",
  },
  svgIcon: {
    height: "0.875rem",
    "&.cross": {
      height: "0.95rem",
      "& path": {
        fill: theme.palette.error.main,
      },
    },
  },
}));

export default ComparisonRow;
