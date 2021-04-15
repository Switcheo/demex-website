import { HomeBorderCircle1 } from "@demex-info/assets";
import { PaperBox, TypographyLabel, withLightTheme } from "@demex-info/components";
import {
  Box, Button, Divider, fade, makeStyles, Switch, Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  CexFeesVal, CexSecurityVal, CexServiceVal, CexTableTabs, CexTradingVal,
  DexDecentralisationVal, DexFeesVals, DexTableTabs, DexTechnologyVal,
  DexTradingVal, PropertyTab, TableTab,
} from "./compareConfig";
import { ComparisonTable } from "./components";

const cexDefault = "cex-trading";
const dexDefault = "dex-technology";

const ExchangeComparison: React.FC = () => {
  const classes = useStyles();

  const [dexToggle, setDexToggle] = React.useState<boolean>(true);
  const [propertyTab, setPropertyTab] = React.useState<PropertyTab>(cexDefault);

  const [titleRef, titleView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (dexToggle) {
      setPropertyTab(dexDefault);
    } else {
      setPropertyTab(cexDefault);
    }
  }, [dexToggle]);

  const tableSelect = React.useMemo(() => {
    if (dexToggle) {
      switch (propertyTab) {
        case "dex-trading":
          return DexTradingVal;
        case "dex-decentralisation":
          return DexDecentralisationVal;
        case "dex-fees":
          return DexFeesVals;
        default:
          return DexTechnologyVal;
      }
    } else {
      switch (propertyTab) {
        case "cex-security":
          return CexSecurityVal;
        case "cex-service":
          return CexServiceVal;
        case "cex-fees":
          return CexFeesVal;
        default:
          return CexTradingVal;
      }
    }
  }, [dexToggle, propertyTab]);

  // tabs list = 67px
  // header row = 78px
  // each row height = 128px
  const paperHeight = 67 + 80 + (128 * tableSelect.length);

  return (
    <div ref={titleRef} className={classes.root}>
      <HomeBorderCircle1 className={classes.sideBorder} />
      <Box className={classes.innerDiv}>
        <Box className={clsx(classes.slide, "textSection", { open: titleView })}>
          <TypographyLabel
            align="center"
            variant="h3"
          >
            Comparison with Other Exchanges
          </TypographyLabel>
        </Box>
        <Box className={clsx(
          classes.slide,
          classes.tableSection,
          "tableSection",
          { open: titleView },
        )}>
          <Box className={classes.switchDiv}>
            <TypographyLabel
              className={clsx(classes.switchSub, { toggle: !dexToggle })}
              variant="subtitle1"
              onClick={() => setDexToggle(false)}
            >
              Centralised Exchanges
            </TypographyLabel>
            <Switch
              checked={dexToggle}
              classes={{
                root: classes.switchRoot,
                thumb: classes.switchThumb,
                track: classes.switchTrack,
              }}
              onChange={() => setDexToggle(!dexToggle)}
              color="default"
            />
            <TypographyLabel
              className={clsx(classes.switchSub, { toggle: dexToggle })}
              variant="subtitle1"
              onClick={() => setDexToggle(true)}
            >
              Decentralised Exchanges
            </TypographyLabel>
          </Box>

          <PaperBox height={paperHeight} className={classes.tablePaper}>
            <Box position="relative">
              <Box className={clsx(classes.tabSlide, "cex", { out: dexToggle })}>
                {
                  CexTableTabs.map((tableTab: TableTab) => (
                    <Button
                      className={clsx(
                        classes.tabBtn,
                        { selected: propertyTab === tableTab.value },
                      )}
                      onClick={() => setPropertyTab(tableTab.value)}
                      variant="text"
                      key={`cex-${tableTab.value}`}
                    >
                      {tableTab.label}
                    </Button>
                  ))
                }
              </Box>
              <Box className={clsx(classes.tabSlide, "dex", { out: !dexToggle })}>
                {
                  DexTableTabs.map((tableTab: TableTab) => (
                    <Button
                      className={clsx(
                        classes.tabBtn,
                        { selected: propertyTab === tableTab.value },
                      )}
                      onClick={() => setPropertyTab(tableTab.value)}
                      variant="text"
                      key={tableTab.value}
                    >
                      {tableTab.label}
                    </Button>
                  ))
                }
              </Box>
              <Box className={classes.tableContent}>
                <Divider className={classes.divider} />
                <ComparisonTable dexToggle={dexToggle} propertyTab={propertyTab} tableSelect={tableSelect} />
              </Box>
            </Box>
          </PaperBox>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.divider,
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "78rem",
    padding: theme.spacing(0, 6),
    width: `calc(100% - ${theme.spacing(12)}px)`,
    zIndex: 10,
    [theme.breakpoints.between("sm", "md")]: {
      padding: theme.spacing(0, 5),
      width: `calc(100% - ${theme.spacing(10)}px)`,
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 4),
      width: `calc(100% - ${theme.spacing(8)}px)`,
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(0, 2.5),
      width: `calc(100% - ${theme.spacing(5)}px)`,
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    display: "flex",
    overflow: "hidden",
    padding: theme.spacing(13, 0, 6.5),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 0, 5),
    },
  },
  sideBorder: {
    height: "30rem",
    right: "-36vh",
    position: "absolute",
    top: "-36vh",
    width: "30rem",
    zIndex: 0,
    transform: "rotate(180deg)",
    [theme.breakpoints.only("md")]: {
      top: "-31vh",
      height: "26rem",
      right: "-31vh",
      width: "26rem",
    },
    [theme.breakpoints.only("sm")]: {
      top: "-24vh",
      height: "20rem",
      right: "-24vh",
      width: "20rem",
    },
    [theme.breakpoints.only("xs")]: {
      top: "-21vh",
      height: "17rem",
      right: "-21vh",
      width: "17rem",
    },
  },
  slide: {
    opacity: 0,
    transform: "translate(0px, 30px)",
    "&.tableSection": {
      transform: "translate(0px, 60px)",
      transition: "opacity ease-in 0.5s, transform ease-in 0.6s",
    },
    "&.textSection": {
      transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
    },
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
  },
  slideSubtitle: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  switchDiv: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(0, "auto", 4),
  },
  switchRoot: {
    padding: theme.spacing(0.75),
  },
  switchSub: {
    cursor: "pointer",
    fontWeight: "bold",
    lineHeight: "1.125rem",
    textAlign: "center",
    "&:first-child": {
      marginRight: theme.spacing(1),
    },
    "&:last-child": {
      marginLeft: theme.spacing(1),
    },
    "&.toggle": {
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "7rem",
      "&:first-child": {
        marginRight: theme.spacing(0.5),
      },
      "&:last-child": {
        marginLeft: theme.spacing(0.5),
      },
    },
  },
  switchThumb: {
    color: theme.palette.secondary.main,
  },
  switchTrack: {
    backgroundColor: theme.palette.divider,
    borderRadius: theme.spacing(7),
  },
  tabBtn: {
    ...theme.typography.button,
    color: theme.palette.text.hint,
    display: "inline-block",
    fontSize: "1.5rem",
    marginLeft: theme.spacing(2.5),
    padding: theme.spacing(2.5, 1.5),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.selected": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.25rem",
      padding: theme.spacing(2.875, 1.5),
    },
  },
  tableContent: {
    position: "absolute",
    top: "4.1875rem",
    width: "100%",
  },
  tablePaper: {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(0.25),
    boxShadow: `0px 8px 12px 2px ${fade(theme.palette.text.secondary, 0.08)}`,
    overflow: "hidden",
  },
  tableSection: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(4),
    },
  },
  tabSlide: {
    display: "inline-flex",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    transition: "transform 0.8s",
    overflowX: "auto",
    width: "100%",
    "&.cex": {
      transform: "translate(0px, 0px)",
      "&.out": {
        transform: "translate(-150%, 0px)",
      },
    },
    "&.dex": {
      transform: "translate(0px, 0px)",
      "&.out": {
        transform: "translate(150%, 0px)",
      },
    },
    "@media (max-width: 720px)": {
      justifyContent: "initial",
    },
  },
}));

export default withLightTheme()(ExchangeComparison);
