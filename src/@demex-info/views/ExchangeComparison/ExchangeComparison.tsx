import { DemexCircleLogo, HomeBorderCircle1 } from "@demex-info/assets";
import { PaperBox, TypographyLabel, withLightTheme } from "@demex-info/components";
import { getDemexLink, Paths } from "@demex-info/constants";
import {
  Box, Button, Divider, fade, makeStyles, Switch, Theme, useMediaQuery,
} from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loadable from "react-loadable";
import { Carousel } from "react-responsive-carousel";
import {
  CexFeesVal, CexSecurityVal, CexServiceVal, CexTableTabs, CexTradingVal,
  DexDecentralisationVal, DexFeesVals, DexTableTabs, DexTechnologyVal,
  DexTradingVal, PropertyTab, TableTab,
} from "./compareConfig";

const ComparisonTable = Loadable({
  loader: () => import("./components/ComparisonTable"),
  loading() {
    return null;
  },
  delay: 1300,
});

const cexDefault = "cex-trading";
const dexDefault = "dex-technology";

const ExchangeComparison: React.FC = () => {
  const classes = useStyles();
  const widthSm = useMediaQuery("@media (max-width: 720px)");

  const settings = {
    autoPlay: false,
    dots: false,
    draggable: false,
    infiniteLoop: false,
    showArrows: false,
    showIndicators: false,
    showStatus: false,
    showThumbs: false,
    swipeable: false,
  };

  const [dexNum, setDexNum] = React.useState<number>(0);
  const [propertyTab, setPropertyTab] = React.useState<PropertyTab>(cexDefault);

  const [titleRef, titleView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (dexNum === 0) {
      setPropertyTab(cexDefault);
    } else {
      setPropertyTab(dexDefault);
    }
  }, [dexNum]);

  const handleDexToggle = () => {
    if (dexNum === 0) {
      setDexNum(dexNum + 1);
    } else {
      setDexNum(dexNum - 1);
    }
  };

  const tableSelect = React.useMemo(() => {
    if (dexNum === 1) {
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
  }, [dexNum, propertyTab]);

  return (
    <div id="exchangeCompare" ref={titleRef} className={classes.root}>
      <HomeBorderCircle1 className={classes.sideBorder} />
      <Box className={classes.innerDiv}>
        <Box className={clsx(classes.textSecSlide, { open: titleView })}>
          <TypographyLabel
            align="center"
            variant="h3"
          >
            Comparison with&nbsp;
            { widthSm && (<br />) }
            Other Exchanges
          </TypographyLabel>
        </Box>
        <Box className={clsx(
          classes.tableSecSlide,
          classes.tableSection,
          { open: titleView },
        )}>
          <Box className={classes.switchDiv}>
            <TypographyLabel
              className={clsx(classes.switchSub, { toggle: dexNum === 0 })}
              variant="subtitle1"
              onClick={() => handleDexToggle()}
            >
              Centralised Exchanges
            </TypographyLabel>
            <Switch
              checked={dexNum === 1}
              classes={{
                root: classes.switchRoot,
                switchBase: clsx(classes.switchBase, { checked: dexNum === 0 }),
                thumb: classes.switchThumb,
                track: classes.switchTrack,
              }}
              onChange={() => handleDexToggle()}
              color="default"
              size="medium"
              checkedIcon={(<DemexCircleLogo className={classes.demexLogo} />)}
            />
            <TypographyLabel
              className={clsx(classes.switchSub, { toggle: dexNum === 1 })}
              variant="subtitle1"
              onClick={() => handleDexToggle()}
            >
              Decentralised Exchanges
            </TypographyLabel>
          </Box>

          <PaperBox className={classes.tablePaper}>
            <Box>
              <Carousel selectedItem={dexNum} {...settings}>
                <Box>
                  <Box className={clsx(classes.tabSlide, "cex")}>
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
                </Box>
                <Box>
                  <Box className={clsx(classes.tabSlide, "dex")}>
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
                </Box>
              </Carousel>
              <Box className={classes.tableContent}>
                <Divider className={classes.divider} />
                <Suspense fallback={null}>
                  <ComparisonTable dexNum={dexNum} propertyTab={propertyTab} tableSelect={tableSelect} />
                </Suspense>
              </Box>
            </Box>
          </PaperBox>
          <Box className={classes.btnDiv}>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              target="_blank"
              href={getDemexLink(Paths.Trade)}
            >
              Start Trading
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    display: "block",
    margin: theme.spacing(0, "auto"),
		padding: theme.spacing(1.75, 3.5),
  },
  btnDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(5),
    },
  },
  demexLogo: {
    height: "1.375rem",
    width: "1.375rem",
  },
  divider: {
    backgroundColor: theme.palette.divider,
  },
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
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
    padding: theme.spacing(13, 0, 10.5),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(8, 0, 7.5),
    },
  },
  sideBorder: {
    height: "22rem",
    right: "-12.5rem",
    position: "absolute",
    top: "-12.5rem",
    width: "22rem",
    zIndex: 0,
    transform: "rotate(180deg)",
    [theme.breakpoints.only("md")]: {
      top: "-10.25rem",
      height: "18rem",
      right: "-10.25rem",
      width: "18rem",
    },
    [theme.breakpoints.only("sm")]: {
      top: "-10rem",
      height: "18rem",
      right: "-10rem",
      width: "18rem",
    },
    [theme.breakpoints.only("xs")]: {
      top: "-7rem",
      height: "13rem",
      right: "-7rem",
      width: "13rem",
    },
    "@media (max-width: 400px)": {
      display: "none",
    },
  },
  tableSecSlide: {
    opacity: 0,
    transform: "translate(0px, 60px)",
    transition: "opacity ease-in 0.5s, transform ease-in 0.6s",
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
  },
  textSecSlide: {
    opacity: 0,
    transform: "translate(0px, 30px)",
    transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
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
  switchBase: {
    padding: theme.spacing(1.25, 0.75, 1.125, 1),
    "&.Mui-checked + $switchTrack": {
      opacity: 1,
    },
  },
  switchDiv: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(0, "auto", 4),
  },
  switchRoot: {
    height: "2.625rem",
    padding: theme.spacing(0.75, 0.5),
  },
  switchSub: {
    color: theme.palette.text.secondary,
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
      color: theme.palette.text.primary,
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
    height: "1.375rem",
    width: "1.375rem",
  },
  switchTrack: {
    backgroundColor: "#E0F0FF",
    borderRadius: theme.spacing(7),
    opacity: 1,
  },
  tabBtn: {
    ...theme.typography.button,
    color: theme.palette.text.hint,
    display: "inline-block",
    fontSize: "1.25rem",
    marginLeft: theme.spacing(2.5),
    padding: theme.spacing(3, 1.5),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.selected": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 1.5, 2),
    },
  },
  tableContent: {
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
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  tabSlide: {
    display: "flex",
    justifyContent: "center",
    overflowX: "auto",
    width: "100%",
    "&.cex": {
      "@media (max-width: 540px)": {
        justifyContent: "initial",
      },
    },
    "&.dex": {
      "@media (max-width: 640px)": {
        justifyContent: "initial",
      },
    },
  },
}));

export default withLightTheme()(ExchangeComparison);
