import { Box, Theme, makeStyles } from "@material-ui/core";

import { CaretRight } from "@demex-info/assets";
import React from "react";
import clsx from "clsx";

interface Props {
  href: string;
  title: string;
  titleClass?: string;
  endComponent?: React.ReactNode | null;
}

const InfoLinkBox: React.FC<Props> = (props: Props) => {
  const { endComponent = null, href, title, titleClass } = props;
  const classes = useStyles();

  const handleClick = (href: string) => {
    window.open(href, "_blank");
  };

  return (
    <Box onClick={() => handleClick(href)} className={clsx(classes.titleBox, titleClass)}>
      <Box pr={2}>
        {title}
      </Box>
      {
        endComponent ?? (
          <Box className={classes.sideArrowBtn}>
            <CaretRight className={classes.sideArrow} />
          </Box>
        )
      }
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  sideArrow: {
    width: "0.75rem",
    height: "0.75rem",
    transition: "transform linear 0.2s",
  },
  sideArrowBtn: {
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "1.5rem",
    height: "1.5rem",
  },
  titleBox: {
    ...theme.typography.subtitle1,
    cursor: "pointer",
    fontWeight: 600,
    alignItems: "center",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    minHeight: "3.375rem",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    [theme.breakpoints.only("xs")]: {
      minHeight: "4rem",
      padding: theme.spacing(1, 0),
    },
  },
}));

export default InfoLinkBox;
