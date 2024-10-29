import { DropdownMenuItem } from "@demex-info/constants";
import MenuListItems from "@demex-info/layout/MainLayout/common/MenuItem";
import { StyleUtils } from "@demex-info/utils";
import { Box, Button, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import Dropdown from "./Dropdown";

interface Props {
  items: DropdownMenuItem[];
  title: string;
}

const OptionsDropdown: React.FC<Props> = (props: Props) => {
  const { items, title } = props;
  const classes = useStyles();

  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);

  const openMoreDropdown = () => {
    setOpenDropdown(true);
  };

  const closeMoreDropdown = () => {
    setOpenDropdown(false);
  };

  const textLinks = items.map((item: DropdownMenuItem) => ({
    ...item,
  }));

  return (
    <Dropdown
      label={(
        <Box className={classes.tabWrapper}>
          <Button
            variant="text"
            className={clsx(classes.tab)}
            onClick={() => { }}
            disableRipple
          >
            {title}
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
  dropdown: {
    padding: theme.spacing(1),
    borderRadius: 4,
    minWidth: "10.75rem",
  },
  labelClass: {
    margin: "0px 4px 0px 16px",
  },
  tab: {
    ...theme.typography.body2,
    padding: "20px 0",
    paddingLeft: "10px",
    height: "100%",
    borderRadius: 0,
    width: "100%",
    minWidth: "unset",
    opacity: 1,
    color: theme.palette.text.primary,
    "&:hover": {
      textShadow: `.5px 0 0 ${theme.palette.text.secondary}`,
      backgroundColor: "transparent",
    },
    "&.isHighlighted": {
      textShadow: `.5px 0 0 ${theme.palette.text.primary}`,
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
