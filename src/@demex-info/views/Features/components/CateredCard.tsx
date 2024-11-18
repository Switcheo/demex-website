import { SvgIcon } from "@demex-info/components";
import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

type Props = {
  title: string;
  description: string;
  className?: string;
  containerClassName?: string;
  svgIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  svgClassName?: string;
  endIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  endIconClassName?: string;
}

const CateredCard: React.FC<Props> = (props) => {
  const { title, description, className, containerClassName, svgIcon, svgClassName, endIcon, endIconClassName } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.cateredCardContainer, containerClassName)}>
      <div className={clsx(classes.cateredCard, className)}>
        {svgIcon && <SvgIcon className={clsx(classes.svgIcon, svgClassName)} component={svgIcon} />}
        <div className={classes.cateredInfo}>
          <Typography className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.description}>
            {description}
          </Typography>
        </div>
        {endIcon && <SvgIcon className={endIconClassName} component={endIcon} />}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cateredCardContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    border: "1px solid #FFFFFF0A",
    borderRadius: theme.spacing(1),
  },
  cateredCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3, 4),

    background: "#FFFFFF0A",
    boxShadow: "0px 1px 0px 0px #FFFFFF14 inset",
    backdropFilter: "blur(24px)",

    borderRadius: theme.spacing(1),
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
      alignItems: "flex-start",
    },
  },
  svgIcon: {
    paddingBottom: theme.spacing(3),
  },
  cateredInfo: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  title: {
    ...theme.typography.h3,
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.h4,
    },
  },
  description: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title3,
    },
  },
}));

export default CateredCard;