import { PaperBox, withLightTheme } from "@demex-info/components";
import { PaperProps, Theme, makeStyles } from "@material-ui/core";
import { PartialBoxProps, extractBoxProps } from "@demex-info/utils";

import React from "react";
import clsx from "clsx";

interface Props extends PartialBoxProps, PaperProps {

}

const MarketPaper: React.FC<Props> = (props: Props) => {
  const { boxProps, restProps } = extractBoxProps(props);
  const { children, className, ...rest } = restProps;
  const classes = useStyles();
  return (
    <PaperBox className={clsx(classes.paper, className)} {...boxProps} {...rest}>
      {children}
    </PaperBox>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default withLightTheme()(MarketPaper);
