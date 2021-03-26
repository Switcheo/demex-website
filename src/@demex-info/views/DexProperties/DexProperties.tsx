import { Box, Button, Grid, Hidden, Theme, Typography, makeStyles } from "@material-ui/core";
import { DexProp, dexPropsArr } from "./dexPropsConfig";
import { Paths, getDemexLink } from "@demex-info/constants";
import { TypographyLabel, withLightTheme } from "@demex-info/components";

import { HomeBorder1 as HomeBorder } from "@demex-info/assets/icons";
import { PropertyBox } from "./components";
import React from "react";
import { RootState } from "@demex-info/store/types";
import clsx from "clsx";
import { useSelector } from "react-redux";

const DexProperties: React.FC = () => {
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  return (
    <Box className={classes.root}>
      <Box display="flex">
        <Box className={classes.innerDiv}>
          <Box className={classes.titleBox}>
            <Typography variant="h3">
              A Derivatives
              DEX Built Right
            </Typography>
            <TypographyLabel color="textSecondary">
              Demex is powered by a layer 2 blockchain solution for an unrivalled trading experience.
            </TypographyLabel>
            <Button
              className={classes.tradeBtn}
              onClick={() => goToLink(getDemexLink(Paths.Trade, network))}
              color="secondary"
            >
              Start Trading
            </Button>
            <Hidden smDown>
              <HomeBorder className={classes.decoration} />
            </Hidden>
          </Box>
          <Box className={classes.infoBox}>
            <Grid container>
              {
                dexPropsArr.map((dexProp: DexProp, index: number) => (
                  <Grid
                    key={dexProp.title}
                    item
                    className={clsx(classes.mobileGridItem, {
                      [classes.gridItem]: !(index === dexPropsArr.length - 1 || index === dexPropsArr.length - 2),
                      [classes.oddItem]: index % 2 === 1,
                      [classes.evenItem]: index % 2 === 0,
                    })}
                    xs={12}
                    sm={6}
                  >
                    <PropertyBox {...dexProp} />
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  decoration: {
    position: "absolute",
    bottom: "2.25rem",
    left: 0,
    width: "100%",
  },
  evenItem: {
    paddingRight: theme.spacing(1.75),
    [theme.breakpoints.only("xs")]: {
      paddingRight: 0,
    },
  },
  gridItem: {
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
    },
  },
  infoBox: {
    backgroundColor: theme.palette.background.default,
    maxWidth: "calc(100% / 12 * 7)",
    minHeight: "100%",
    padding: theme.spacing(8, 0, 8, 6),
    width: "100%",
    [theme.breakpoints.only("lg")]: {
      padding: theme.spacing(8, 6),
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "calc((100% / 12) * 8)",
      padding: theme.spacing(5),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(6, 5, 7),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(6, 2.5),
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "unset",
    },
  },
  innerDiv: {
    display: "flex",
    height: "100%",
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      maxWidth: "100%",
    },
  },
  mobileGridItem: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(8),
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
  oddItem: {
    paddingLeft: theme.spacing(1.75),
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0,
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(8, 0),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  titleBox: {
    minHeight: "100%",
    maxWidth: "calc((100% / 12) * 5)",
    padding: theme.spacing(8, 6, 8, 0),
    position: "relative",
    width: "100%",
    "& h3": {
      marginBottom: theme.spacing(1.5),
    },
    "& p": {
      ...theme.typography.subtitle1,
    },
    [theme.breakpoints.only("lg")]: {
      padding: theme.spacing(8, 6),
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "calc((100% / 12) * 4)",
      padding: theme.spacing(5),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(8, 6),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(6, 2.5),
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "unset",
    },
  },
  tradeBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(6),
    padding: theme.spacing(1.75, 3.5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
}));

export default withLightTheme()(DexProperties);
