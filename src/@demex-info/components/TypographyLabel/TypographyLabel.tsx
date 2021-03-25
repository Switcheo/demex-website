import { Box, Typography, makeStyles } from "@material-ui/core";
import { PartialBoxProps, extractBoxProps } from "@demex-info/utils/component";

import React from "react";
import { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";

interface Props extends TypographyProps, PartialBoxProps {
  boxClass?: string;
  empty?: boolean;
}

const TypographyLabel: React.FC<Props> = (props: Props) => {
  const { boxProps, restProps } = extractBoxProps(props);
  const { boxClass, className, children, empty, ...rest } = restProps;

  const classes = useStyles(props);

  const content = !empty ? children : (<span>&nbsp;</span>);

  return (
    <Box className={boxClass} {...boxProps}>
      <Typography
        variant="subtitle1"
        color="textPrimary"
        {...rest}
        className={clsx(classes.root, className)}
      >
        {content}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
}));

export default TypographyLabel;