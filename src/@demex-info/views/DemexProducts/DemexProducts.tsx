import { Box, Button, Hidden, Theme, makeStyles, useMediaQuery } from "@material-ui/core";
import { ProductCarousel, ProductScroll, SlideCategory, SlideItem } from "./components";

import React from "react";
import clsx from "clsx";

const DemexProducts: React.FC = () => {
  const classes = useStyles();
  const widthSm = useMediaQuery("@media (max-width: 959px)");

  const [slideItem, setSlideItem] = React.useState<SlideCategory>("liquidityPools");

  const SlideTabs: SlideItem[] = [{
    label: "Liquidity Pools",
    value: "liquidityPools",
  }, {
    label: "Staking",
    value: "staking",
  }, {
    label: "Insurance Fund",
    value: "insuranceFund",
  }];

  const changeTab = (tab: SlideCategory) => {
    if (widthSm) {
      const newEl = document.querySelector(`#${tab}`);
      newEl?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setSlideItem(tab);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.innerDiv}>
        <Box display="flex" justifyContent="center" id="liquidityPools">
          {SlideTabs.map((slidetab: SlideItem) => (
            <Button
              key={slidetab.value}
              className={clsx(classes.tab, { selected: slideItem === slidetab.value })}
              // href={`#${slidetab.value}`}
              variant="text"
              onClick={() => changeTab(slidetab.value)}
            >
              {slidetab.label}
            </Button>
          ))}
        </Box>
        <Hidden smDown>
          <ProductCarousel slideItem={slideItem} />
        </Hidden>
        <Hidden mdUp>
          <ProductScroll />
        </Hidden>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  innerDiv: {
    margin: theme.spacing(0, "auto"),
    maxWidth: "76rem",
    padding: theme.spacing(0, 2.5),
  },
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(11, 0),
    overflowX: "hidden",
    height: "28rem",
    [theme.breakpoints.down("sm")]: {
      height: "unset",
      padding: theme.spacing(4, 0, 6),
    },
  },
  tab: {
    ...theme.typography.button,
    color: theme.palette.text.secondary,
    fontSize: "1.375rem",
    marginLeft: theme.spacing(2.5),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.selected": {
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "1rem",
      lineHeight: 1.3,
      width: "calc(100% / 3)",
    },
  },
}));

export default DemexProducts;
