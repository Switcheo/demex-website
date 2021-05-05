import { Box, Button, Hidden, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loadable from "react-loadable";
import { SlideCategory, SlideItem } from "./components";

interface Props {
  thoughtsView: boolean;
}

const LiquidityPool = Loadable({
  loader: () => import("./components/LiquidityPool/LiquidityPool"),
  loading() {
    return null;
  },
  delay: 1000,
});
const Staking = Loadable({
  loader: () => import("./components/Staking/Staking"),
  loading() {
    return null;
  },
  delay: 1100,
});

const DemexProducts: React.FC<Props> = (props: Props) => {
  const { thoughtsView } = props;
  const classes = useStyles();

  const [slide, setSlide] = React.useState<SlideCategory | null>(null);

  const [liquidityRef, liquidityView] = useInView({
    threshold: 0.3,
  });
  const [stakingRef, stakingView] = useInView({
    threshold: 0.55,
  });

  useEffect(() => {
    if (liquidityView) {
      setSlide("liquidityPools");
      return;
    }
    if (stakingView) {
      setSlide("staking");
      return;
    }
    if (thoughtsView) {
      setSlide("upcoming");
      return;
    }
  }, [liquidityView, stakingView, thoughtsView]);

  useEffect(() => {
    switch (slide) {
      case "liquidityPools":
        setSlide("liquidityPools");
        break;
      case "staking":
        setSlide("staking");
        break;
      case "upcoming":
        setSlide("upcoming");
        break;
      default:
        setSlide(null);
        break;
    }
  }, [slide]);

  const goToPools = () => {
    const poolsRef = document.querySelector("#liquidityPools");
    poolsRef?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const goToStaking = () => {
    const stakingRef = document.querySelector("#staking");
    stakingRef?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const goToThoughts = () => {
    const yourThoughtsEl = document.querySelector("#yourThoughts");
    yourThoughtsEl?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const SlideTabs: SlideItem[] = [{
    label: "Liquidity Pools",
    value: "liquidityPools",
    onClick: goToPools,
  }, {
    label: "Staking",
    value: "staking",
    onClick: goToStaking,
  }, {
    label: "Upcoming",
    value: "upcoming",
    onClick: goToThoughts,
  }];

  return (
    <div className={classes.root}>
      <Box>
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
        <Suspense fallback={null}>
          <LiquidityPool
            liquidityRef={liquidityRef}
            liquidityView={liquidityView}
            stakingView={stakingView}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Staking stakingRef={stakingRef} stakingView={stakingView} />
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
    padding: theme.spacing("8vh", 0, 1.25),
    position: "sticky",
    top: "2vh",
  },
  root: {
    maxWidth: "84rem",
    padding: theme.spacing(5, 2.5, 1.25),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(0, "auto"),
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
    ...theme.typography.button,
    color: theme.palette.text.hint,
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
