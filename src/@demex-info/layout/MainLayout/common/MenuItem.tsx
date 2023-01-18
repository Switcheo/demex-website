import { SvgIcon } from "@demex-info/components";
import { StyleUtils } from "@demex-info/utils";
import { Box, MenuItem, MenuList, MenuListProps, Theme, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

type MenuListClasses = { root: string }

export interface DropdownMenuItem extends React.DOMAttributes<any> {
    key: string
    className?: string
    label: string | React.ReactNode
    startIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    startIconType?: "stroke" | "fill"
    endIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    endIconType?: "stroke" | "fill"
    showIcon?: boolean
}

interface Props extends MenuListProps {
    menuListClasses?: Partial<MenuListClasses>
    items?: DropdownMenuItem[]
    size?: "small" | "regular" | "large"
  }

const MenuListItems: React.FC<Props> = (props: Props) => {
    const { items = [], menuListClasses = {}, size = "regular", ...rest } = props;
    const classes = useStyles();
  
    const genIconTypeClasses = (iconType: "stroke" | "fill") => ({
      [classes.iconFill]: iconType === "fill",
      [classes.iconStroke]: iconType === "stroke",
    });
  
    return (
      <MenuList
        classes={{
          ...menuListClasses,
          root: clsx(classes.root, menuListClasses.root),
        }}
        {...rest}
      >
        {items.map((item: DropdownMenuItem) => {
          const { className, endIcon, label, key, startIcon, startIconType, endIconType, ...restItem } = item;
          return (
            <MenuItem
              className={clsx(classes.label, className, { small: size === "small", large: size === "large" })}
              {...restItem}
              key={key}
            >
              {startIcon && startIconType && (
                <SvgIcon className={clsx(classes.icon, { large: size === "large" }, "startIcon", genIconTypeClasses(startIconType))} component={startIcon} />
              )}
              <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                {label}
                {endIcon && endIconType && (
                  <SvgIcon className={clsx(classes.icon, "endIcon", genIconTypeClasses(endIconType))} component={endIcon} />
                )}
              </Box>
            </MenuItem>
          );
        })}
      </MenuList>
    );
  };
  
  const useStyles = makeStyles((theme: Theme) => ({
    icon: {
      marginRight: theme.spacing(0.75),
      width: "max-content",
      "&.endIcon": {
        marginRight: 0,
      },
      "& path": {
        fill: theme.palette.text.secondary,
      },
      "&.large": {
        maxWidth: "1.5rem",
        maxHeight: "1.5rem",
        marginRight: theme.spacing(1.25),
      },
    },
    iconFill: {
      "& path": {
        fill: theme.palette.text.secondary,
      },
    },
    iconStroke: {
      "& path": {
        stroke: theme.palette.text.secondary,
      },
    },
    root: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1.5),
      outline: "none",
    },
    label: {
      ...theme.typography.body3,
      borderRadius: 4,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1.5),
      "&$active": {
        color: theme.palette.text.primary,
      },
      "& $iconFill": {
        "& path": {
          fill: theme.palette.text.secondary,
          stroke: "unset",
        },
      },
      "& $iconStroke": {
        "& path": {
          stroke: theme.palette.text.secondary,
          fill: "unset",
        },
      },
      "&.small": {
        padding: theme.spacing(1.125, 1),
        [theme.breakpoints.only("xs")]: {
          minHeight: "2.5rem",
          padding: theme.spacing(0.75, 0.75),
        },
      },
      "&.large": {
        ...theme.typography.body2,
      },
    },
    active: {
      "& $iconFill": {
        "& path": {
          fill: theme.palette.text.primary,
          stroke: "unset",
        },
      },
      "& $iconStroke": {
        "& path": {
          stroke: theme.palette.text.primary,
          fill: "unset",
        },
      },
    },
    notificationIndicator: {
      ...theme.typography.body4,
      background: StyleUtils.buttonGradient(theme),
      color: "#FFFFFF",
      maxWidth: "16px",
      position: "absolute",
      height: "14px",
      top: "8px",
      left: "20px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px 4px 2px",
      borderRadius: 4,
    },
  }));
  
  export default MenuListItems;
  