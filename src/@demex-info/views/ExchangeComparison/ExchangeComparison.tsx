import YellowVectorBottom from "@demex-info/assets/background/YellowVectorBottom.svg";
import { PaperBox } from "@demex-info/components";
import { StyleUtils } from "@demex-info/utils";
import { lazy } from "@loadable/component";
import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";

const ComparisonTable = lazy(() => import("./components/ComparisonTable"));

const ExchangeComparison: React.FC = () => {
  const classes = useStyles();

  const [titleRef, titleView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div id="exchangeCompare" ref={titleRef} className={classes.root}>
      <Box className={classes.innerDiv}>
        <Box className={clsx(classes.textSecSlide, { open: titleView })}>
          <Typography variant="h1" className={classes.header}>
            What makes Demex Different?
          </Typography>
        </Box>
        <Box className={clsx(
          classes.tableSecSlide,
          classes.tableSection,
          { open: titleView },
        )}>
          <PaperBox className={classes.tablePaper}>
            <Box className={classes.tableContent}>
              <Suspense fallback={null}>
                <ComparisonTable />
              </Suspense>
            </Box>
          </PaperBox>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      paddingTop: "12rem",
    },
    [theme.breakpoints.down("sm")]: {
			...theme.typography.h2,
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
      lineHeight: "38px",
			margin: "0 auto",
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
      padding: 0,
      width: `calc(100% - ${theme.spacing(7)}px)`,
    },
    [theme.breakpoints.only("xs")]: {
      padding: 0,
      width: `calc(100% - ${theme.spacing(3)}px)`,
    },
    "@media (max-width: 360px)": {
      padding: 0,
      width: `calc(100% - ${theme.spacing(3)}px)`,
    },
  },
  root: {
    color: theme.palette.text.primary,
    display: "flex",
    overflow: "hidden",
    padding: 0,
    position: "relative",
    [theme.breakpoints.down("md")]: {
      padding: 0,
      marginTop: "-100px",
    },
    [theme.breakpoints.down("sm")]: {
      background: `url(${YellowVectorBottom}) no-repeat top left`,
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
    ...theme.typography.title3,
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
    backgroundColor: theme.palette.background.primary,
    borderRadius: "0.25rem",
    boxShadow: `0px 0px 48px ${StyleUtils.boxShadow(theme)}`,
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

export default ExchangeComparison;
