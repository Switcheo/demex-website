import { extractBoxProps, PartialBoxProps } from "@demex-info/utils";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";

interface Props extends TypographyProps, PartialBoxProps {
  boxClass?: string;
  empty?: boolean;
}

const TypographyLabel: React.FC<Props> = (props: Props) => {
  const { boxProps, restProps } = extractBoxProps(props);
  const {
    boxClass, color = "textPrimary", className, children,
    empty, variant = "body2", ...rest
  } = restProps;

  const classes = useStyles(props);

  const content = !empty ? children : (<span>&nbsp;</span>);

  return (
    <Box className={clsx(classes.container, boxClass)} {...boxProps}>
      <Typography
        variant={variant}
        color={color}
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
  container: {
    fontSize: "inherit",
  },
}));

export default TypographyLabel;
