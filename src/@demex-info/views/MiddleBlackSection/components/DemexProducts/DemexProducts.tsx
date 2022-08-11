import { debounce, FuncArgs } from "@demex-info/utils";
import { lazy } from "@loadable/component";
import { Box, Button, Hidden, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { SlideCategory, SlideItem } from "./components";

interface Props {
}

const LiquidityPool = lazy(() => import("./components/LiquidityPool/LiquidityPool"));
const Staking = lazy(() => import("./components/Staking/Staking"));

const DemexProducts: React.FC<Props> = () => {
  const classes = useStyles();

  const [slide, setSlide] = React.useState<SlideCategory | null>(null);

  // eslint-disable-next-line no-unused-vars
  const [liquidityRef, liquidityView, liquidityEntry] = useInView({
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5],
  });
  const [stakingRef, stakingView] = useInView({
    threshold: 0.2,
  });

  const changeSlide = (args: FuncArgs) => {
    const intersect = args?.intersectionRatio ?? 0;
    if (intersect <= 0.15 && !stakingView) {
      setSlide(null);
      return;
    }
    if (intersect > 0.35) {
      setSlide("liquidityPools");
    } else if (intersect <= 0.35 && intersect > 0.15 && stakingView) {
      setSlide("staking");
    }
  };

  useEffect(() => {
    const debounceSlide = debounce(changeSlide, 500, {
      intersectionRatio: liquidityEntry?.intersectionRatio,
    });
    debounceSlide();
  }, [liquidityEntry?.intersectionRatio]);

  const goToPools = () => {
    const poolsRef = document.querySelector("#liquidityPools");
    poolsRef?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setSlide("liquidityPools");
  };

  const goToStaking = () => {
    const stakingRef = document.querySelector("#staking");
    stakingRef?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setSlide("staking");
  };

  const SlideTabs: SlideItem[] = [{
    label: "Liquidity Pools",
    value: "liquidityPools",
    onClick: goToPools,
  }, {
    label: "Staking",
    value: "staking",
    onClick: goToStaking,
  }];

  return (
    <div id="demex-products" className={classes.root}>
      <Hidden smDown>
        <div className={classes.buttonDiv}>
          {SlideTabs.map((slidetab: SlideItem) => (
            <Button
              key={slidetab.value}
              className={clsx(classes.tab, { selected: slide === slidetab.value })}
              variant="text"
              onClick={slidetab.onClick}
            >
              {slidetab.label}
            </Button>
          ))}
        </div>
      </Hidden>
      <Box maxWidth="84rem" mx="auto" my="0px">
        <Suspense fallback={null}>
          <LiquidityPool
            liquidityRef={liquidityRef}
            slide={slide}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Staking
            stakingRef={stakingRef}
            stakingView={stakingView}
          />
        </Suspense>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  buttonDiv: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "center",
    zIndex: 40,
    width: "100%",
    padding: theme.spacing("6rem", 0, 1.25),
    position: "sticky",
    top: "2rem",
  },
  root: {
    padding: theme.spacing(0, 2.5),
    "@media (min-width: 960px) and (max-width: 1600px)": {
      padding: theme.spacing(0, 5),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(0, 5, 8),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 4, 8),
      width: `calc(100% - ${theme.spacing(8)}px)`,
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(0, 2.5, 8),
      width: `calc(100% - ${theme.spacing(5)}px)`,
    },
  },
  tab: {
    ...theme.typography.title3,
    fontSize: "1.25rem",
    marginLeft: theme.spacing(2.5),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.selected": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.only("sm")]: {
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
