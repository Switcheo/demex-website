import {
    createStyles, makeStyles, Paper,
  } from "@material-ui/core";
  import clsx from "clsx";
  import React from "react";

import { StyleUtils } from "@demex-info/utils";
import { SvgIcon } from "@demex-info/components";
import { CaretDown } from "../assets"  ;


  interface Props extends React.DOMAttributes<any> {
    label: string | React.ReactNode
    dropdownOpen: boolean
    selected?: boolean
    children?: any
    className?: any // dropdownContent className
    iconClassName?: any // dropdown icon className
    labelClassName?: any // dropdown label className
    rightDropDownMenu?: boolean,
    containerClass?: string
    newLblClass?: string
    disabled?: boolean
  }

  const Dropdown: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const {
      label, selected = false, children, className, labelClassName,
      dropdownOpen, rightDropDownMenu = false, containerClass, newLblClass,
      disabled = false, onTouchEnd, ...rest
    } = props;

    return (
      <React.Fragment>
        <div
          role="presentation"
          className={clsx(classes.dropdown, labelClassName, { selected, dropdownOpen })}
          {...rest}
        >
          <div className={clsx(classes.labelContainer, containerClass)} onTouchEnd={onTouchEnd}>
            <div className={clsx(classes.label, newLblClass)}>
              {label}
            </div>
              <div className={clsx(classes.dropDownIconContainer)}>
                <SvgIcon className={clsx(classes.icon, dropdownOpen ? classes.open : classes.close)} component={CaretDown} />
              </div>
            <div className={classes.bottomHighLight} />
          </div>

          <Paper className={disabled ? classes.disabled : clsx(classes.dropdownContent, className, { rightDropDownMenu, dropdownOpen })}>
            {
              dropdownOpen && children
            }
          </Paper>
        </div>
      </React.Fragment>
    );
  };

  const useStyles = makeStyles((theme) => createStyles({
    dropdown: {
      position: "relative",
      "&.selected": {
        "& $bottomHighLight": {
          display: "block",
        },
      },
      "&.dropdownOpen": {
        backgroundColor: "transparent",
        border: "none",
        transition: "background-color 0.2s ease-out",
        "& $dropdownContent": {
          display: "flex",
        },
      },
    },
    bottomHighLight: {
      width: "100%",
      height: "2px",
      backgroundColor: theme.palette.secondary.main,
      position: "absolute",
      bottom: 0,
      display: "none",
    },
    dropdownContent: {
      display: "none",
      border: "none",
      boxShadow: StyleUtils.dropShadow(theme),
      position: "absolute",
      backgroundColor: theme.palette.background.secondary,
      zIndex: 1,
      flexDirection: "column",
      "&.rightDropDownMenu": {
        right: 0,
      },
    },
    labelContainer: {
      height: "100%",
      display: "flex",
      cursor: "pointer",
      position: "relative",
    },
    label: {
      flexGrow: 1,
    },
    dropDownIconContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
    },
    disabled: {
      display: "none",
    },
    icon: {
      transition: "all 0.2s ease-in-out",
      fontSize: "0.375rem",
    },
    open: {
      transform: "rotate(-180deg)",
      "& path": {
        fill: "url(#demexLinearGradient)",
      },
    },
    close: {
      "& path": {
        fill: theme.palette.text.primary,
      },
    },
  }));

  export default Dropdown;
