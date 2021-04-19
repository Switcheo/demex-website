import { Bullet as BulletIcon } from "@demex-info/assets/icons";
import { TypographyLabel } from "@demex-info/components";
import { lottieDefaultOptions } from "@demex-info/constants";
import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";
import Lottie from "lottie-react";
import React, { useEffect } from "react";
import { DexProp, PropItem } from "../dexPropsConfig";

interface Props extends DexProp {
  className?: string;
  index: number;
  sectionView: boolean;
}

const PropertyBox: React.FC<Props> = (props: Props) => {
  const { animation, className, index, points, sectionView, title } = props;
  const classes = useStyles();

  const lottieRef = React.useRef<any>();

  const [showAnimate, setShowAnimate] = React.useState<boolean>(false);

  const hoverLottie = () => {
    lottieRef?.current?.stop();
    lottieRef?.current?.goToAndPlay(0);
  };

  useEffect(() => {
    if (sectionView) {
      setTimeout(() => {
        setShowAnimate(true);
      }, index * 1000);
    }
  }, [sectionView]);

  return (
    <Box className={clsx(classes.root, className)}>
      <Box onMouseEnter={hoverLottie} className={classes.lottieSvg}>
        {
          showAnimate && (
            <Lottie
              {...lottieDefaultOptions}
              animationData={animation}
              lottieRef={lottieRef}
              loop={false}
            />
          )
        }
      </Box>
      <TypographyLabel className={classes.title} color="textPrimary">
        {title}
      </TypographyLabel>
      <Box>
        {
          points.map((point: PropItem) => (
            <Box className={classes.pointBox} key={point.label}>
              <BulletIcon className={classes.bulletIcon} />
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {point.statement}
              </Typography>
            </Box>
          ))
        }
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  bulletIcon: {
    height: "0.5rem",
    marginRight: theme.spacing(1.25),
    maxWidth: "0.5rem",
    width: "100%",
  },
  lottieSvg: {
    marginBottom: theme.spacing(2.5),
    width: "3rem",
    height: "3rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
      width: "2.5rem",
      height: "2.5rem",
    },
  },
  pointBox: {
    alignItems: "center",
    display: "flex",
    marginBottom: theme.spacing(1.5),
    "&:last-child": {
      marginBottom: 0,
    },
  },
  root: {
    width: "100%",
  },
  title: {
    ...theme.typography.h5,
    height: "4.75rem",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: "unset",
      marginBottom: theme.spacing(2),
    },
  },
}));

export default PropertyBox;
