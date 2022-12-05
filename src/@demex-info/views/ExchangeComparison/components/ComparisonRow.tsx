import { CloseIcon, ExternalLink, TickIcon } from "@demex-info/assets";
import { RenderGuard, SvgIcon, TypographyLabel } from "@demex-info/components";
import { StaticLinks } from "@demex-info/constants";
import { StyleUtils } from "@demex-info/utils";
import {
  Box, Button, Hidden, makeStyles, TableCell, TableRow, Theme, Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { TradingRow } from "../compareConfig";

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
              <Box className={clsx(classes.rowTextBox, newKey)}>
                <RenderGuard renderIf={typeof valueItem === "string" && valueItem !== "Cosmos IBC & PolyNetwork Alliance"}>
                  {newKey === "demex" && <Box className={classes.gradientBorder} />}
                  <Typography className={classes.rowText} color="textPrimary">
                    {valueItem}
                  </Typography>
                </RenderGuard>
                <RenderGuard renderIf={typeof valueItem === "string" && valueItem === "Cosmos IBC & PolyNetwork Alliance"}>
                  <Box className={classes.gradientBorder} />
                  <Box className={classes.rowText}>
                    <Button
                      className={classes.button}
                      variant="text"
                      target="_blank"
                      href={StaticLinks.CosmosIBC}
                      classes={{
                        label: classes.linkLabel,
                      }}
                    >
                      Cosmos IBC
                      <SvgIcon className={classes.externalLink} component={ExternalLink} />
                    </Button>
                    <TypographyLabel className={classes.ampersand}>&</TypographyLabel>
                    <Button
                      className={classes.button}
                      variant="text"
                      target="_blank"
                      href={StaticLinks.PolyNetworkAlliance}
                      classes={{
                        label: classes.linkLabel,
                      }}
                    >
                      PolyNetwork Alliance
                      <SvgIcon className={classes.externalLink} component={ExternalLink} />
                    </Button>
                  </Box>
                </RenderGuard>
                <RenderGuard renderIf={typeof valueItem === "boolean" && valueItem}>
                  {newKey === "demex" && <Box className={classes.gradientBorder} />}
                  <TickIcon />
                </RenderGuard>
                <RenderGuard renderIf={typeof valueItem === "boolean" && !valueItem}>
                  {newKey === "demex" && <Box className={classes.gradientBorder} />}
                  <CloseIcon />
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
          "&.demex": {
            paddingBottom: 0,
            "& > div > div": {
              height: "112px",
              borderBottom: "2px solid",
            },
            "& > div > p": {
              paddingTop: "1rem",
              paddingBottom: "3rem",
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
    maxWidth: "6rem",
    minWidth: "6rem",
    padding: theme.spacing(2, 3),
    zIndex: 2,
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
    whiteSpace: "nowrap",
  },
  rowText: {
    ...theme.typography.body2,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    maxWidth: "9.75rem",
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
  gradientBorder: {
    position: "absolute",
    padding: theme.spacing(0, 2.5),
    height: "80.5px",
    width: "100%",
    boxSizing: "border-box",
    border: "2px solid",
    borderBottom: "none",
    borderTop: "none",
    borderImageSlice: 1,
    borderImageSource: StyleUtils.primaryGradient(theme),
    borderRadius: "12px",
    filter: "drop-shadow(0px 0px 12px #4035FF)",
  },
}));

export default ComparisonRow;
