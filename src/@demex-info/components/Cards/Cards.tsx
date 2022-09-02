import { StyleUtils } from "@demex-info/utils/styles";
import {
  Box, BoxProps, makeStyles, Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";

interface Props extends BoxProps {
}

const Cards: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Box {...rest} className={clsx(className, classes.root)}>
      {children}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    minWidth: "312px",
    minHeight: "106px",
    boxShadow: StyleUtils.boxShadow(theme),
    borderRadius: "4px",
    padding: "1rem 1.5rem",
  },
}));

export default Cards;
