import { CloseV2Icon, TickIcon } from "@demex-info/assets";
import { RenderGuard, SvgIcon } from "@demex-info/components";
import {
  Box,
  Hidden, makeStyles, TableCell, TableRow, Theme, Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { GlowLight, BottomLeftLine, BottomLine, BottomRightLine } from "../assets";
import { TradingRow } from "../compareConfig";

interface Props {
  row: TradingRow;
  isLastRow?: boolean;
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
      <br />
      {backStr}
    </React.Fragment>
  );
};

const ComparisonRow: React.FC<Props> = (props: Props) => {
  const { row, isLastRow } = props;
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
              <Box className={clsx(classes.rowTextBox, newKey)}>
                <RenderGuard renderIf={typeof valueItem === "string"}>
                  <Typography className={classes.rowText} color="textPrimary">
                    {valueItem}
                  </Typography>
                </RenderGuard>
                <RenderGuard renderIf={typeof valueItem === "boolean" && valueItem}>
                  <TickIcon />
                </RenderGuard>
                <RenderGuard renderIf={typeof valueItem === "boolean" && !valueItem}>
                  <CloseV2Icon />
                </RenderGuard>
                {newKey === "demex" && isLastRow && (
                  <React.Fragment>
                    <SvgIcon className={classes.bottomLine} component={BottomLine} />
                    <SvgIcon className={classes.bottomLeftLine} component={BottomLeftLine} />
                    <SvgIcon className={classes.bottomRightLine} component={BottomRightLine} />
                    <SvgIcon className={classes.bottomGlowLight} component={GlowLight} />
                  </React.Fragment>
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
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  compareRow: {
    "& td": {
      "&.headerCol, &.rowCell": {
        borderBottom: "none",
      },
    },
    "&:last-child": {
      "& td": {
        "&.headerCol, &.rowCell": {
          borderBottom: "none",
          paddingBottom: theme.spacing(6),
          "&.demex": {
            paddingBottom: 0,
            "& > div > div": {
              height: "112px",
              borderBottom: "2px solid",
            },
            "& > div > p": {
              paddingTop: "1rem",
              paddingBottom: theme.spacing(6),
            },
          },
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
    width: "12rem",
    padding: theme.spacing(0, 3, 0, 0),
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
      ...theme.typography.title2,
      padding: theme.spacing(0, 1.5),
      minWidth: "6rem",
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.title3,
      lineHeight: "1.175rem",
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
    "&.demex": {
      padding: theme.spacing(0),
    },
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
    ...theme.typography.body1,
    fontSize: "18px",
    whiteSpace: "pre-wrap",
    width: "12rem",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
      width: "8rem",
    },
  },
  rowText: {
    ...theme.typography.body2,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    maxWidth: "11rem",
    flexWrap: "wrap",
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
    wordWrap: "break-word",
    [theme.breakpoints.only("xs")]: {
      minWidth: "unset",
    },
    "&.demex": {
      position: "relative",
      width: "255px",
      [theme.breakpoints.only("sm")]: {
        width: "192px",
      },
      [theme.breakpoints.only("xs")]: {
        width: "162px",
      },
    },
    "&.rowText": {
      position: "absolute",
    },
  },
  linkLabel: {
    ...theme.typography.body2,
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    whiteSpace: "nowrap",
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.body3,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.body4,
    },
  },
  button: {
    padding: 0,
    zIndex: 1,
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "underline",
    },
  },
  externalLink: {
    "& path": {
      fill: theme.palette.text.primary,
    },
    [theme.breakpoints.only("sm")]: {
      height: "16px",
      width: "16px",
    },
    [theme.breakpoints.only("xs")]: {
      height: "16px",
      width: "13px",
    },
  },
  ampersand: {
    ...theme.typography.body2,
    [theme.breakpoints.only("sm")]: {
      ...theme.typography.body3,
    },
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.body4,
    },
  },
  bottomLine: {
    position: "absolute",
    bottom: -15,
    zIndex: 2,
    [theme.breakpoints.down("sm")]: {
      bottom: -17,
    },
  },
  bottomRightLine: {
    position: "absolute",
    bottom: -14,
    right: -64,
    [theme.breakpoints.down("sm")]: {
      bottom: -16,
    },
  },
  bottomLeftLine: {
    position: "absolute",
    bottom: -14,
    left: -64,
    [theme.breakpoints.down("sm")]: {
      bottom: -16,
    },
  },
  bottomGlowLight: {
    position: "absolute",
    bottom: -350,
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default ComparisonRow;
