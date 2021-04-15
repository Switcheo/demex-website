import { extractBoxProps, PartialBoxProps } from "@demex-info/utils";
import { Box, makeStyles, Paper, PaperProps } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

interface Props extends PartialBoxProps, PaperProps {
  boxClass?: string
}

const PaperBox: React.FC<Props> = (props: Props) => {
  const { boxProps, restProps } = extractBoxProps(props);
  const { boxClass, className, children, elevation, ...rest } = restProps;
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.paper, className)} elevation={elevation} {...rest}>
      <Box className={clsx(classes.box, boxClass)} {...boxProps}>
        {children}
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  box: {},
  paper: {},
}));

export default PaperBox;
