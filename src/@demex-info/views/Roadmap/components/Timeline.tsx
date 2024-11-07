import React from "react";
import clsx from "clsx";
import { Box, Card, CardContent, Typography, Grid, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fade } from "react-awesome-reveal";
import { roadmapData } from "../utils";
import { SvgIcon } from "@demex-info/components";
import { IncentiveIcon } from "../assets";
import { useRoadmapStyles } from "../styles";

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
    top: "45%",
    left: "50%",
    right: 0,
    height: "4px",
    background: "linear-gradient(to right, #4A5568 50%, transparent 100%)",
    transform: "translateY(-50%)",
  },
  activeLine: {
    position: "absolute",
    top: "45%",
    left: 0,
    right: "50%",
    height: "4px",
    transform: "translateY(-50%)",
    background: "linear-gradient(270deg, #007AFF 80%, rgba(0, 122, 255, 0) 100%)",
    filter: "drop-shadow(0 0 15px #007AFF)",
  },
  roadmapItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&.top": {
      justifyContent: "flex-end",
    },
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
    padding: theme.spacing(3),
  },
}));

const Timeline: React.FC = () => {
  const classes = useStyles();
  const styles = useRoadmapStyles();

  return (
    <Box className={classes.container}>
      <Box position="relative">
        <Grid container justify="space-between" style={{ position: "relative", zIndex: 1 }}>
          {roadmapData.map((quarter, index) => {
            if (index % 2 === 0) return (
              <div key={index} className={classes.emptyCard} />
            );

            return (
              <Grid key={quarter.quarter} item className={clsx(classes.roadmapItem, "top")}>
                <Fade triggerOnce direction="down" delay={index * 150}>
                  <Card className={clsx(classes.card, quarter.highlight && classes.highlightedCard, quarter.active && classes.activeCard, "top")}>
                    <CardContent className={classes.cardContent}>
                      <Chip className={clsx(styles.chip, { "active": quarter.active })} label={quarter.quarter}/>
                      {quarter.items.map((item, i) => (
                        <span className={styles.quarterItem} key={i}>
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
              <div key={index} className={clsx(classes.emptyCard, classes.roadmapItem)}>
                <div className={clsx(styles.timelineDot, index <= 2 && clsx(styles.highlightDot, { active: quarter.active }))} />
              </div>
            );

            return (
              <Grid key={quarter.quarter} item className={classes.roadmapItem}>
                <div className={clsx(styles.timelineDot, index <= 2 && clsx(styles.highlightDot, { active: quarter.active }))} />
                <Fade triggerOnce direction="up" delay={index * 150}>
                  <Card className={clsx(classes.card, quarter.highlight && classes.highlightedCard, quarter.active && classes.activeCard)}>
                    <CardContent className={classes.cardContent}>
                      <Chip className={clsx(styles.chip, { "active": quarter.active })} label={quarter.quarter}/>
                      {quarter.items.map((item, i) => (
                        <span className={styles.quarterItem} key={i}>
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
