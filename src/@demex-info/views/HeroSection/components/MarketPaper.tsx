import { PaperBox } from "@demex-info/components";
import { extractBoxProps, PartialBoxProps } from "@demex-info/utils";
import { makeStyles, PaperProps, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

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

export default MarketPaper;
