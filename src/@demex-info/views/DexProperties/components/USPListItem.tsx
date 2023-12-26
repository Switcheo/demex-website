import { SvgIcon } from "@demex-info/components";
import { Box, BoxProps, Hidden, Typography, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

interface Props extends BoxProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  header: string,
  iconClass?: string,
}
const USPListItem: React.FC<Props> = (props: Props) => {
  const { icon, header, iconClass, children } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.iconWrapper}>
        <SvgIcon className={clsx(iconClass, classes.svgIcon)} component={icon} />
        <Hidden lgUp>
          <Typography variant="h2" className={classes.header}>
            {header}
          </Typography>
        </Hidden>
      </Box>
      <Box className={classes.textWrapper}>
        <Hidden mdDown>
          <Typography variant="h2" className={classes.header}>
            {header}
          </Typography>
        </Hidden>
        {children}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",
    alignItems: "center",
    width: "40%",
    height: "unset",
    justifyContent: "flex-start",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "273px",
    [theme.breakpoints.down("md")]: {
      height: "10rem",
      width: "unset",
    },
  },
  svgIcon: {
    maxWidth: "321px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "200px",
    },
  },
  header: {
    ...theme.typography.h2,
    color:theme.palette.text.primary,
    marginBottom: "1.5rem",
    whiteSpace: "nowrap",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1rem",
      ...theme.typography.h3,
    },
    [theme.breakpoints.down("sm")]: {
      ...theme.typography.title1,
    },
  },
  textWrapper: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    left: "unset",
    position: "unset",
    [theme.breakpoints.down("md")]: {
      ...theme.typography.body2,
    },
  },
}));

export default USPListItem;
