import { SwitcheoLoading } from "@demex-info/assets";
import { withLightTheme } from "@demex-info/components";
import { lottieDefaultOptions } from "@demex-info/constants";
import { Box, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import Lottie from "lottie-react";
import React from "react";

interface Props {
  loading: boolean;
}

const Loading: React.FC<Props> = (props: Props) => {
  const { loading } = props;
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, { endLoad: !loading })}>
      <Box className={clsx(classes.lottie, { endLoad: !loading })}>
        {
          loading && (
            <Lottie
              {...lottieDefaultOptions}
              animationData={SwitcheoLoading}
            />
          )
        }
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    transition: "height ease-in 0.5s",
    position: "fixed",
    top: 0,
    width: "100vw",
    zIndex: 3000,
    "&.endLoad": {
      height: 0,
      position: "initial",
    },
  },
  lottie: {
    height: "10rem",
    width: "10rem",
    transition: "height ease-in 0.5s",
    "&.endLoad": {
      height: 0,
    },
  },
}));

export default withLightTheme()(Loading);
