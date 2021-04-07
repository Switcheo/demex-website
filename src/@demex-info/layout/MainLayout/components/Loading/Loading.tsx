import { Box, Theme, makeStyles } from "@material-ui/core";

import Lottie from "lottie-react";
import React from "react";
import { SwitcheoLoading } from "@demex-info/assets";
import clsx from "clsx";
import { lottieDefaultOptions } from "@demex-info/constants";
import { withLightTheme } from "@demex-info/components";

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
    width: "100vw",
    zIndex: 3000,
    "&.endLoad": {
      height: 0,
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
