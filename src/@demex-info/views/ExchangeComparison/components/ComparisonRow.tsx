import { CloseIcon, TickIcon } from "@demex-info/assets";
import { RenderGuard } from "@demex-info/components";
import {
  Box, Hidden, makeStyles, TableCell, TableRow, Theme, Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { TradingRow } from "../compareConfig";
import ListCell from "./ListCell";
import SubListCell from "./SubListCell";

interface Props {
  row: TradingRow;
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
  const { row } = props;
  const classes = useStyles();

  return (
    <TableRow className={classes.compareRow}>
      <Hidden mdDown>
        <TableCell className={classes.fillerCell} />
      </Hidden>
      <TableCell className={clsx(classes.headerCol, "headerCol")}>
        <Box alignItems="center" display="flex" className={classes.rowHeader}>
          <RenderGuard renderIf={row.header.includes("\n")}>
            <BrokenHeader str={row.header} />
          </RenderGuard>
          <RenderGuard renderIf={!row.header.includes("\n")}>
            {row.header}
          </RenderGuard>
        </Box>
      </TableCell>
      {
        Object.keys(row.values).map((newKey: string) => {
          const valueItem = row.values?.[newKey] ?? false;
          return (
            <TableCell className={clsx(classes.rowCell, "rowCell", newKey)} key={`${row.header}-${newKey}`}>
              <Box className={classes.rowTextBox}>
                <RenderGuard renderIf={typeof valueItem === "string"}>
                  <Typography className={classes.rowText} color="textPrimary">
                    {valueItem}
                  </Typography>
                </RenderGuard>
                <RenderGuard renderIf={typeof valueItem === "boolean" && valueItem}>
                  <TickIcon />
                </RenderGuard>
                <RenderGuard renderIf={typeof valueItem === "boolean" && !valueItem}>
                  <CloseIcon />
                </RenderGuard>
                <RenderGuard renderIf={Array.isArray(valueItem)}>
                  <RenderGuard renderIf={Array.isArray(valueItem) && valueItem.length > 0 && typeof valueItem[0] === "string"}>
                    <ListCell valueItem={valueItem} newKey={newKey} />
                  </RenderGuard>
                </RenderGuard>
                <RenderGuard renderIf={Array.isArray(valueItem)}>
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
      "&.headerCol, &.rowCell": {
        [theme.breakpoints.up("md")]: {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        [theme.breakpoints.down("sm")]: {
          borderBottom: "none",
        },
      },
    },
    "&:last-child": {
      "& td": {
        "&.headerCol, &.rowCell": {
          borderBottom: "none",
          paddingBottom: "3rem",
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
    ...theme.typography.title1,
    position: "sticky",
    background: theme.palette.background.primary,
    left: 0,
    maxWidth: "6rem",
    minWidth: "6rem",
    padding: theme.spacing(2, 3),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
      ...theme.typography.title2,
      padding: theme.spacing(2, 1.5),
      minWidth: "6rem",
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.title3,
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
    ...theme.typography.body2,
    padding: theme.spacing(2, 2.5),
    "&:last-child": {
      padding: theme.spacing(2, 0, 2, 2.5),
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
      "&:last-child": {
        padding: theme.spacing(2),
      },
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2),
      "&:last-child": {
        padding: theme.spacing(2),
      },
    },
  },
  rowHeader: {
    whiteSpace: "nowrap",
  },
  rowText: {
    ...theme.typography.body2,
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    maxWidth: "9.75rem",
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.body3,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.body4,
    },
  },
  rowTextBox: {
    minHeight: "3rem",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minWidth: "10rem",
    [theme.breakpoints.only("xs")]: {
      minWidth: "unset",
    },
  },
}));

export default ComparisonRow;
