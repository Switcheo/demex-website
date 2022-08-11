import { EmptyStateDark, EmptyStateLight } from "@demex-info/assets";
import { Box, makeStyles, PaletteType } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { RenderGuard } from "../RenderGuard";

export interface EmptyStateProps {
  helperText: any;
  emptyClass?: string;
  className?: string;
  theme?: PaletteType;
  helperClass?: string;
  componentImg?: React.ElementType<React.SVGProps<SVGSVGElement>>;
}

const EmptyState: React.FC<any> = (props: EmptyStateProps) => {
  const classes = useStyles();
  const {
    helperText, emptyClass, className, theme = "light",
    componentImg, helperClass,
  } = props;

  return (
    <Box className={clsx(classes.container, className)}>
      {componentImg}
      <RenderGuard renderIf={!componentImg}>
        <RenderGuard renderIf={theme === "light"}>
          <EmptyStateLight
            className={clsx(classes.emptyIcon, emptyClass)}
          />
        </RenderGuard>
        <RenderGuard renderIf={theme === "dark"}>
          <EmptyStateDark
            className={clsx(classes.emptyIcon, emptyClass)}
          />
        </RenderGuard>
      </RenderGuard>
      <div className={clsx(classes.helperText, helperClass)}>
        {helperText}
      </div>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  helperText: {
    ...theme.typography.body2,
    marginTop: "1.2rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  emptyIcon: {
    width: "3rem",
    maxHeight: "3rem",
  },
}));

export default EmptyState;
