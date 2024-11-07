import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid, Card, CardContent, Chip } from "@material-ui/core";
import { roadmapData } from "../utils";
import { Fade } from "react-awesome-reveal";
import { IncentiveIcon } from "../assets";
import { SvgIcon } from "@demex-info/components";
import { useRoadmapStyles } from "../styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
  },
  timeline: {
    padding: "0",
    "&.right": {
      justifyContent: "flex-end",
    },
  },
  paper: {
    padding: theme.spacing(2),
    width: "136px",

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
  timelineItem: {
    heigth: "202px",
    "&::before": {
      display: "none",
    },
  },
  card: {
    backgroundColor: "#FFFFFF0A",
    backdropFilter: "blur(64px)",

    border: "1px solid #FFFFFF0A",
    borderRadius: "8px",

    color: theme.palette.text.secondary,
  },
  roadmapLine: {
    position: "absolute",
    left: "50%", // Centers the line horizontally
    top: 0,
    bottom: 0,
    width: "2px", // Sets the line width for vertical orientation
    background: "linear-gradient(to bottom, #4A5568 80%, transparent 100%)",
    transform: "translateX(-50%)", // Centers the line
  },
  activeLine: {
    position: "absolute",
    left: "50%", // Aligns with `roadmapLine`
    top: 0,
    bottom: "52%", // Sets the active portion to cover only half of the container vertically
    width: "4px", // Sets the line width
    transform: "translateX(-50%)", // Centers the line
    background: "linear-gradient(0deg, #007AFF 80%, rgba(0, 122, 255, 0) 100%)", // Adjusts gradient for vertical direction
    boxShadow: "0px 0px 32px 0px #007AFF",
  },
  emptyCard: {
    height: "100px",
    width: "170px",
    display: "flex",
    justifyContent: "flex-start",
  },
  highlightedCard: {
    boxShadow: "16px -16px 50px 0px #482BFF1F inset",
  },
  activeCard: {
    color: theme.palette.text.primary,
  },
}));

export default function Component() {
  const classes = useStyles();
  const styles = useRoadmapStyles();

  return (
    <Box className={classes.root}>
      <Grid container className={classes.timeline}>
        {roadmapData.map((quarter, index) => {
          if (index % 2 !== 0) return (
            <div className={clsx(classes.emptyCard, classes.timelineItem)}>
              <div className={clsx(styles.timelineDot, index <= 2 && styles.highlightDot)} style={{ top: `${(index * 20) + 8}%` }} />
            </div>
          );
          return (
            <Grid item key={quarter.quarter} className={classes.timelineItem}>
              <div className={clsx(styles.timelineDot, index <= 2 && styles.highlightDot)} style={{ top: index === 0 ? "11%" : `${(index * 20) + 7}%` }} />
              <Fade triggerOnce direction="left" delay={index * 150}>
                <Card className={clsx(classes.card, quarter.highlight && classes.highlightedCard, quarter.active && classes.activeCard)}>
                  <CardContent className={classes.paper}>
                    <Chip className={clsx(styles.chip, { "active": quarter.active })} label={quarter.quarter}/>
                    {quarter.items.map((item, itemIndex) => (
                      <span className={styles.quarterItem} key={itemIndex}>
                        {quarter.active && (
                          <SvgIcon component={IncentiveIcon} />
                        )}
                        <Typography key={itemIndex} variant="body2">
                          {item}
                        </Typography>
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
      <Grid container className={clsx(classes.timeline, "right")}>
        {roadmapData.map((quarter, index) => {
          if (index % 2 === 0) return (
            <div className={classes.emptyCard} />
          );
          return (
            <Grid item key={quarter.quarter} className={classes.timelineItem}>
              <Fade triggerOnce direction="right" delay={index * 150}>
                <Card className={clsx(classes.card, quarter.highlight && classes.highlightedCard, quarter.active && classes.activeCard)}>
                  <CardContent className={classes.paper}>
                    <Chip className={clsx(styles.chip, { "active": quarter.active })} label={quarter.quarter}/>
                    {quarter.items.map((item, itemIndex) => (
                      <span className={styles.quarterItem} key={itemIndex}>
                        {quarter.active && (
                          <SvgIcon component={IncentiveIcon} />
                        )}
                        <Typography key={itemIndex} variant="body2">
                          {item}
                        </Typography>
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
  );
}