import {
  Box,
  Button,
  Grid,
  Hidden,
  Link,
  Theme,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { HomeBorder1 as HomeBorder, ScrollingText } from "@demex-info/assets";
import { TypographyLabel, withLightTheme } from "@demex-info/components";

import Lottie from "react-lottie";
import React from "react";
import { StaticLinks } from "@demex-info/constants";
import { fade } from "@material-ui/core/styles/colorManipulator";

// const tickerContent = "Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.";
// const xMax = 500;
// const xMin = -xMax;

const PoweredBySwitcheo: React.FC = () => {
  const classes = useStyles();

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: ScrollingText,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // const theme = useTheme();
  // const widthXs = useMediaQuery(theme.breakpoints.only("xs"));

  // const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // const [x, setX] = React.useState<number>(xMax);

  // // const movePixel = 1;

  // const draw = (context: any, canvas: any, x: number) => {
  //   context.clearRect(0, 0, x, canvas.height/4*3);
  //   context.font = "3.5rem Graphik Semibold";
  //   context.textAlign = "center";
  //   context.strokeStyle = fade(theme.palette.text.primary, 0.15);
  //   context.strokeText(tickerContent, x, canvas.height/4*3);
  // };

  // React.useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas?.getContext('2d');
  //   let animationFrameId: any;

  //   const render = () => {
  //     if (x > xMin) {
  //       setX(x - 1);
  //     } else {
  //       setX(xMax);
  //     }
  //     draw(context, canvas, x);
  //     animationFrameId = window.requestAnimationFrame(render);
  //   }
  //   render()
    
  //   return () => {
  //     window.cancelAnimationFrame(animationFrameId);
  //   }
  // }, [draw])

  return (
    <Box className={classes.root}>
      <Box className={classes.textRoot}>
        <Hidden smUp>
          <HomeBorder className={classes.homeBorder} />
        </Hidden>
        {/* <canvas className={classes.textCanvas} ref={canvasRef} /> */}
        {/* <Box className={classes.textAnimation}>
          Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.Defi.Open Finance.
        </Box> */}
        <Lottie options={lottieOptions} height="6rem" />
      </Box>
      <Box className={classes.tradeHubBox}>
        <Grid container>
          <Grid item xs={12} md={5} lg={4}>
            <Typography variant="h3">
              Powered by Switcheo TradeHub
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Box className={classes.tradeDescription}>
              <TypographyLabel color="textSecondary">
                {/* eslint-disable-next-line no-trailing-spaces */}
                <Link color="secondary" href={StaticLinks.Api.Home} target="_blank">Switcheo TradeHub</Link> is a custom layer 2 sidechain built for trading sophisticated financial instruments at scale. It comprises an <Link color="secondary" href={StaticLinks.Api.MatchingEngine} target="_blank">order matching engine</Link> and liquidity pool protocol that can simulate AMM liquidity on exchange order books.  
              </TypographyLabel>
              <TypographyLabel color="textSecondary" mt={2}>
                The protocol uses <Link color="secondary" href={StaticLinks.Tendermint} target="_blank">Tendermint Core</Link> as the underlying consensus mechanism, and is run by validator nodes under the dPOS model to ensure stringent network security.
              </TypographyLabel>
              <Button
                className={classes.ecosystemBtn}
                color="secondary"
                component={Link}
                href={StaticLinks.SwitcheoNetwork}
                target="_blank"
              >
                See Our Ecosystem
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  ecosystemBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(6),
    padding: theme.spacing(1.75, 3.5),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 0, 8),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  textCanvas: {
    width: "100%",
    maxHeight: "8rem",
    height: "100%",
  },
  tradeDescription: {
    "& a": {
      cursor: "pointer",
    },
  },
  tradeHubBox: {
    margin: theme.spacing(8, "auto"),
    maxWidth: "84rem",
    padding: theme.spacing(0, 6),
    width: `calc(100% - ${theme.spacing(12)}px)`,
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(0, 5),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(0, 5, 7.5),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 2.5, 7.5),
    },
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: theme.spacing(5, "auto", 0),
      maxWidth: "100%",
      width: "unset",
    },
    "& h3": {
      paddingRight: theme.spacing(5),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(2.5),
        paddingRight: 0,
      },
    },
    "& p": {
      "&:first-child": {
        marginBottom: theme.spacing(2),
      },
    },
  },
  homeBorder: {
    marginBottom: theme.spacing(2.75),
    width: "100%",
    [theme.breakpoints.only("xs")]: {
      maxHeight: "3.5rem",
      display: "block",
    },
  },
  textAnimation: {
    ...theme.typography.h1,
    fontSize: "4rem",
    animation: "$scrollLeft 300s infinite linear",
    display: "inline-block",
    whiteSpace: "nowrap",
    "-webkit-text-stroke": `1px ${fade(theme.palette.text.primary, 0.2)}`,
    "-webkit-text-fill-color": "transparent",
    [theme.breakpoints.only("xs")]: {
      ...theme.typography.h3,
      fontSize: "3rem",
    },
  },
  textRoot: {
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(8),
    },
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(6),
    },
  },
  "@keyframes scrollLeft": {
    to: {
      transform: "translateX(-100%)",
    },
  },
}));

export default withLightTheme()(PoweredBySwitcheo);
