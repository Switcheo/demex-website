
import MenuListItems, { DropdownMenuItem } from "@demex-info/layout/MainLayout/common/MenuItem";
import { StyleUtils } from "@demex-info/utils";
import { Box, Button, Divider, Drawer, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import Dropdown from "./Dropdown";




interface Props {
  openDrawer?: boolean
  closeDrawer?: () => void
  items: DropdownMenuItem[]
}

const OptionsDropdown: React.FC<Props> = (props: Props) => {
  const { openDrawer, closeDrawer, items } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);



  const openMoreDropdown = () => {
    setOpenDropdown(true);
  };

  const closeMoreDropdown = () => {
    setOpenDropdown(false);
  };

  const customClasses = {
    endIcon: classes.endIcon,
    startIcon: classes.startIcon,
  };

  const textLinks = items.map((item: DropdownMenuItem) => ({
    ...item,
    customClasses,
  }));

  return isMobile ? (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={closeDrawer}
      classes={{
        paper: classes.drawer,
      }}
      ModalProps={{
        BackdropProps: {
          invisible: true,
        },
      }}
    >
      <div
        className={classes.list}
        role="presentation"
      >
        <div className={classes.innerDiv}>
          <Divider />
          <MenuListItems
            menuListClasses={{ root: classes.menuList }}
            items={textLinks}
            size="large"
          />
        </div>
      </div>
    </Drawer>
  ) : (
    <Dropdown
      label={(
        <Box className={classes.tabWrapper}>
          <Button
            variant="text"
            className={clsx(classes.tab)}
            onClick={() => { }}
            disableRipple
          >
            Earn
          </Button>
          <Box className={clsx(classes.activeIndicator)} />
        </Box>
      )}
      className={classes.dropdown}
      dropdownOpen={openDropdown}
      onMouseOver={openMoreDropdown}
      onFocus={openMoreDropdown}
      onMouseLeave={closeMoreDropdown}
      labelClassName={classes.labelClass}
    >
      <MenuListItems
        menuListClasses={{ root: classes.menuList }}
        items={textLinks}
        size="large"
      />
    </Dropdown>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  tabWrapper: {
    position: "relative",
    flex: 1,
    height: "100%",
  },
  activeIndicator: {
    position: "absolute",
    height: "2px",
    background: "transparent",
    borderRadius: "4px",
    width: "100%",
    marginTop: -2,
    "&.isHighlighted": {
      background: StyleUtils.primaryTextGradient,
    },
  },
  drawer: {
    overflowY: "hidden",
    padding: theme.spacing(2.5),
    background: theme.palette.background.paper,
  },
  dropdown: {
    padding: theme.spacing(1),
    borderRadius: 4,
    minWidth: "10.75rem",
  },
  labelClass: {
    margin: "0px 4px 0px 16px",
  },
  innerDiv: {
    position: "absolute",
    width: "100%",
    overflowY: "auto",
  },
  list: {
    height: "100%",
    width: "14rem",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
  },
  startIcon: {
    "&.large": {
      maxWidth: "1.375rem",
      maxHeight: "1.375rem",
      minWidth: "1.375rem",
      minHeight: "1.375rem",
    },
  },
  endIcon: {
    maxWidth: "0.75rem",
    maxHeight: "0.75rem",
    minWidth: "0.75rem",
    minHeight: "0.75rem",
  },
  tab: {
    ...theme.typography.body2,
    padding: "20px 20px",
    paddingLeft: "10px",
    height: "100%",
    borderRadius: 0,
    width: "100%",
    minWidth: "unset",
    opacity: 1,
    color: theme.palette.text.secondary,
    "&:hover": {
      textShadow: `.5px 0 0 ${theme.palette.text.secondary}`,
      backgroundColor: "transparent",
    },
    "&.isHighlighted": {
      color: theme.palette.text.primary,
      textShadow: `.5px 0 0 ${theme.palette.text.primary}`,
    },
    "@media (min-width: 960px) and (max-width: 1056px)": {
      padding: theme.spacing(0, 3),
      "&:first-child": {
        paddingLeft: theme.spacing(2.5),
      },
    },
  },
  menuList: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    "& li": {
      padding: theme.spacing(1.5, 1.25, 1.5, 1),
    },
  },
}));

export default OptionsDropdown;
