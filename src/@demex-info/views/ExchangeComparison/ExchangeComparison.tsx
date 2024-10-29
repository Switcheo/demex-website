import { PaperBox } from "@demex-info/components";
import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useInView } from "react-intersection-observer";
import { ComparisonTable } from "./components";

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
          <Typography variant="h2" className={classes.header}>
            How Does Demex Compare?
          </Typography>
          <Typography variant="h4" className={classes.description}>
            See how Demex stacks up against the competition
          </Typography>
        </Box>
        <Box className={clsx(
          classes.tableSecSlide,
          classes.tableSection,
          { open: titleView },
        )}>
          <PaperBox className={classes.tablePaper}>
            <Box className={classes.tableContent}>
              <ComparisonTable />
            </Box>
          </PaperBox>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    ...theme.typography.h2,
    fontSize: "36px",
    lineHeight: "56px",
    color: theme.palette.text.primary,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(24),
    },
    [theme.breakpoints.down("sm")]: {
			...theme.typography.h3,
      paddingTop: theme.spacing(16),
		},
		[theme.breakpoints.only("xs")]: {
			margin: "0 auto",
		},
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
    marginBottom: theme.spacing(10),
    [theme.breakpoints.down("md")]: {
      padding: 0,
      marginTop: "-100px",
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
  tableContent: {
    width: "100%",
  },
  tablePaper: {
    backgroundColor: "#FFFFFF0A",
    borderRadius: theme.spacing(2),
    border: "1px solid #FFFFFF14",
    overflow: "hidden",
    boxShadow: "0px 1px 0px 0px #FFFFFF14 inset",
    backdropFilter: "blur(64px)",
  },
  tableSection: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  description: {
    ...theme.typography.title1,
    fontWeight: 600,
    textAlign: "center",
    margin: "0.5rem auto",
    color: theme.palette.text.secondary,
    "& > b": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.body3,
      maxWidth: "288px",
      margin: "0.75rem auto",
    },
  },
}));

export default ExchangeComparison;
