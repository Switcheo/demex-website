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

interface BrokenProps {
  str: string;
}

const BrokenHeader: React.FC<BrokenProps> = (props: BrokenProps) => {
  const { str } = props;
  const [frontStr, backStr] = str.split("\n");
  return (
    <React.Fragment>
      {frontStr}
      <Hidden smUp>
        &nbsp;
      </Hidden>
      <Hidden only="xs">
        <br />
      </Hidden>
      {backStr}
    </React.Fragment>
  );
};

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
          <Skeleton className={classes.headerSkeleton} />
        )}
        {!load && (
          <Box alignItems="center" display="flex" className={classes.rowHeader}>
            <RenderGuard renderIf={row.header.includes("\n")}>
              <BrokenHeader str={row.header} />
            </RenderGuard>
            <RenderGuard renderIf={!row.header.includes("\n")}>
              {row.header}
            </RenderGuard>
          </Box>
        )}
      </TableCell>
      {
        Object.keys(row.values).map((newKey: string) => {
          const valueItem = row.values?.[newKey] ?? false;
          return (
            <TableCell className={clsx(classes.rowCell, "rowCell", newKey)} key={`${row.header}-${newKey}`}>
              <Box className={classes.rowTextBox}>
                <RenderGuard renderIf={!load && typeof valueItem === "string"}>
                  <Typography className={classes.rowText} color="textPrimary">
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
      // maxHeight: "8rem",
      "&.headerCol, &.rowCell": {
        borderBottom: `1px solid ${theme.palette.divider}`,
        // maxHeight: "8rem",
      },
      "&.demex": {
        borderBottom: `1px solid ${theme.palette.divider}`,
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
    },
    "&:last-child": {
      "& td": {
        "&.headerCol, &.rowCell": {
          borderBottom: "none",
          // maxHeight: "8rem",
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
    fontSize: "0.875rem",
    fontWeight: 600,
    position: "sticky",
    left: 0,
    maxWidth: "6rem",
    minWidth: "6rem",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
      padding: theme.spacing(2, 1),
      minWidth: "6rem",
    },
    [theme.breakpoints.only("xs")]: {
      borderRight: `1px solid ${theme.palette.divider}`,
      fontSize: "0.75rem",
      lineHeight: "1.175rem",
      minWidth: "5rem",
    },
  },
  headerSkeleton: {
    height: "2.25rem",
    width: "6rem",
    [theme.breakpoints.only("xs")]: {
      width: "4.75rem",
    },
  },
  rowCell: {
    ...theme.typography.subtitle1,
    fontSize: "0.875rem",
    padding: theme.spacing(3, 2.5),
    "&:last-child": {
      padding: theme.spacing(3, 0, 3, 2.5),
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3, 2),
      "&:last-child": {
        padding: theme.spacing(3, 2),
      },
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.8rem",
      padding: theme.spacing(2),
      "&:last-child": {
        padding: theme.spacing(2),
      },
    },
  },
  rowHeader: {},
  rowText: {
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontSize: "0.875rem",
    maxWidth: "7.75rem",
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.8rem",
    },
  },
  rowTextBox: {
    minHeight: "3rem",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minWidth: "7.5rem",
    [theme.breakpoints.only("xs")]: {
      minWidth: "unset",
    },
  },
  svgIcon: {
    height: "1rem",
    "&.cross": {
      height: "1rem",
      "& path": {
        fill: theme.palette.error.main,
      },
    },
  },
}));

export default ComparisonRow;
