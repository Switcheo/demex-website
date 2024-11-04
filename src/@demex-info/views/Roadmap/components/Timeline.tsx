import React from "react";
import clsx from "clsx";
import { Box, Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fade } from "react-awesome-reveal";
import { roadmapData } from "../utils";
import { SvgIcon } from "@demex-info/components";
import { IncentiveIcon } from "../assets";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "auto",
    padding: theme.spacing(2),
    color: "#fff",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  roadmapLine: {
    position: "absolute",
    top: "47.5%",
    left: 0,
    right: 0,
    height: "2px",
    backgroundColor: "#4A5568",
    transform: "translateY(-50%)",
  },
  activeLine: {
    position: "absolute",
    top: "47.5%",
    left: 0,
    right: "50%",
    height: "4px",
    transform: "translateY(-50%)",
    background: "linear-gradient(270deg, #007AFF 80%, rgba(0, 122, 255, 0) 100%)",
    boxShadow: "0px 0px 32px 0px #007AFF",
  },
  roadmapItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  timelineDot: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    marginBottom: theme.spacing(1),
    backgroundColor: "#4A5568",
  },
  activeDot: {
    background: "linear-gradient(270deg, #482BFF 0%, #007AFF 100%)",
    boxShadow: "0px 0px 12px 0px #00000080 inset",
  },
  card: {
    width: "240px",
    backgroundColor: "#FFFFFF0A",
    backdropFilter: "blur(64px)",

    border: "1px solid #FFFFFF0A",
    borderRadius: "8px",

    marginTop: theme.spacing(4),
    color: theme.palette.text.secondary,
    "&.top": {
      marginTop: 0,
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down("md")]: {
      width: "200px",
    },
    "@media (max-width: 940px)": {
      width: "150px",
    },
  },
  emptyCard: {
    width: "240px",
    [theme.breakpoints.down("md")]: {
      width: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "110px",
    },
    ["@media (max-width: 725px)"]: {
      width: "50px",
    },
  },
  highlightedCard: {
    backgroundColor: "#FFFFFF0A",
    boxShadow: "-16px 16px 50px 0px #482BFF1F inset",
  },
  activeCard: {
    color: theme.palette.text.primary,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  quarterItem: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    "& > svg": {
      width: "16px",
      height: "16px",
    },
    "@media (max-width: 940px)": {
      "& > p": {
        ...theme.typography.body3,
      },
    },
  },
}));

const Timeline: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box position="relative">
        <Grid container justify="space-between" style={{ position: "relative", zIndex: 1 }}>
          {roadmapData.map((quarter, index) => {
            if (index % 2 === 0) return (
              <div className={classes.emptyCard} />
            );

            return (
              <Grid key={quarter.quarter} item className={classes.roadmapItem}>
                <Fade triggerOnce direction="down" delay={index * 150}>
                  <Card className={clsx(classes.card, quarter.highlight && classes.highlightedCard, quarter.active && classes.activeCard, "top")}>
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h6">{quarter.quarter}</Typography>
                      {quarter.items.map((item, i) => (
                        <span className={classes.quarterItem} key={i}>
                          {quarter.active && (
                            <SvgIcon component={IncentiveIcon} />
                          )}
                          <Typography variant="body2">{item}</Typography>
                        </span>
                      ))}
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.roadmapLine} />
        <div className={classes.activeLine} />
        <Grid container justify="space-between" style={{ position: "relative", zIndex: 1 }}>
          {roadmapData.map((quarter, index) => {
            if (index % 2 !== 0) return (
              <div className={clsx(classes.emptyCard, classes.roadmapItem)}>
                <div className={clsx(classes.timelineDot, index <= 2 && classes.activeDot)} />
              </div>
            );

            return (
              <Grid key={quarter.quarter} item className={classes.roadmapItem}>
                <div className={clsx(classes.timelineDot, index <= 2 && classes.activeDot)} />
                <Fade triggerOnce direction="up" delay={index * 150}>
                  <Card className={clsx(classes.card, quarter.highlight && classes.highlightedCard, quarter.active && classes.activeCard)}>
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h6">{quarter.quarter}</Typography>
                      {quarter.items.map((item, i) => (
                        <span className={classes.quarterItem} key={i}>
                          {quarter.active && (
                            <SvgIcon component={IncentiveIcon} />
                          )}
                          <Typography variant="body2">{item}</Typography>
                        </span>
                      ))}
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Timeline;
