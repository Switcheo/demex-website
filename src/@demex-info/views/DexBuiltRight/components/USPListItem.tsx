import { SvgIcon, TypographyLabel } from "@demex-info/components";
import { Box, BoxProps, makeStyles } from "@material-ui/core";
import React from "react";

interface Props extends BoxProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  header: String,
}
const USPListItem: React.FC<Props> = (props: Props) => {
  const { icon, header, children } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.iconWrapper}>
        <SvgIcon className={classes.svgIcon} component={icon} />
      </Box>
      <Box className={classes.textWrapper}>
        <TypographyLabel className={classes.header}>
          {header}
        </TypographyLabel>
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
    marginTop: "1.5rem",
    "&: first-child":{
      marginTop: "3.5rem",
    },
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "321px",
  },
  svgIcon: {
    maxWidth: "321px",
  },
  header: {
    ...theme.typography.h2,
    color:theme.palette.text.primary,
    marginBottom: "1.5rem",
    whiteSpace: "nowrap",
  },
  textWrapper: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    position: "absolute",
    left: "350px",
    width: "550px",
    "& > div:last-child": {
      width: "450px",
    },
  },
}));

export default USPListItem;
