import { SvgIcon, TypographyLabel } from "@demex-info/components";
import { Box, BoxProps, Hidden, makeStyles } from "@material-ui/core";
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
          <TypographyLabel className={classes.header}>
            {header}
          </TypographyLabel>
        </Hidden>
      </Box>
      <Box className={classes.textWrapper}>
        <Hidden mdDown>
          <TypographyLabel className={classes.header}>
            {header}
          </TypographyLabel>
        </Hidden>
        {children}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "51rem",
    height: "15.5rem",
    [theme.breakpoints.down("md")]: {
      marginTop: "1rem",
      flexDirection: "column",
      width: "50%",
      height: "unset",
      justifyContent: "flex-start",
      alignItems: "center",
      "&:last-child": {
        width: "100vw",
      },
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: "1rem",
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
    [theme.breakpoints.down("md")]: {
      height: "10rem",
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
    position: "absolute",
    left: "350px",
    width: "550px",
    "& > div:last-child": {
      width: "450px",
      [theme.breakpoints.down("md")]: {
        width: "50%",
        margin: "0 auto",
      },
      [theme.breakpoints.only("xs")]: {
        width: "unset",
        maxWidth: "20rem",
      },
    },
    [theme.breakpoints.down("md")]: {
      ...theme.typography.body2,
      width: "100%",
      textAlign: "center",
      margin: "0 auto",
      left: "unset",
      position: "unset",
    },
  },
}));

export default USPListItem;
