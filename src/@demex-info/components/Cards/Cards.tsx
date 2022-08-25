import {
  Box, BoxProps, makeStyles, Theme,
} from "@material-ui/core";

import React from "react";

interface Props extends BoxProps {
}

const Cards: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {children}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.primary,
    minWidth: "312px",
    minHeight: "106px",
    boxShadow: "0px 0px 48px rgba(0, 0, 0, 0.64)",
    borderRadius: "4px",
    padding: "1.25rem 1.5rem",
  },
}));

export default Cards;
