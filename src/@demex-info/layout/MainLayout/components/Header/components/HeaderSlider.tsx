import { CloseIcon, ExternalLink } from "@demex-info/assets/icons";
import { DemexLogo, PoweredByCarbonFlat } from "@demex-info/assets/logos";
import { SvgIcon } from "@demex-info/components";
import { NavLink } from "@demex-info/constants";
import useHeaderLinks from "@demex-info/hooks/useHeaderLinks";
import { Box, Divider, Drawer, IconButton, makeStyles, MenuItem, MenuList, Theme } from "@material-ui/core";
import React from "react";
import { ArrowRightGradient } from "../assets";
import SubMenuSlider from "./SubMenuSlider";

interface Props {
  open: boolean;
  onClose: () => void;
}

const HeaderSlider: React.FC<Props> = (props: Props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const { fullNavLinks, dropdownNavLinks } = useHeaderLinks();

  const goToLink = (item: NavLink) => {
    if (item?.href) {
      if (typeof item.onClick !== "undefined") item.onClick();
      window.open(item.href, item.showIcon ? "_blank" : "_self");
    }
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div
          className={classes.list}
          role="presentation"
        >
          <Box className={classes.headerDiv}>
            <DemexLogo className={classes.topLogo} />
            <IconButton onClick={onClose}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </Box>
          <Divider className={classes.divider} />
          <Box className={classes.innerDiv}>
            <MenuList>
              {fullNavLinks.map((navLink: NavLink) => {
                return (!!navLink.dropdownItems?.length && typeof navLink.open !== "undefined") ? ( // eslint-disable-line
                  <MenuItem className={classes.menuItem} key={navLink.label} onClick={navLink.onHandleOpen}>
                    <Box display="flex" alignItems="center">
                      {navLink.label}
                    </Box>
                    <SvgIcon className={classes.icon} component={ArrowRightGradient} />
                  </MenuItem>
                ) : (
                  <MenuItem className={classes.menuItem} key={navLink.label} onClick={() => goToLink(navLink)}>
                    <Box display="flex" alignItems="center">
                      {navLink.label}
                      {navLink.showIcon && (
                        <ExternalLink className={classes.externalSvg} />
                      )}
                    </Box>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Box>
        </div>
        <Box className={classes.box}>
          <Box className={classes.footerLogo}>
            <PoweredByCarbonFlat className={classes.swthLogo} />
          </Box>
        </Box>
      </Drawer>
      {dropdownNavLinks.map((navLink: NavLink) => (
        <SubMenuSlider key={navLink.label} open={navLink.open ?? false} onClose={navLink.onHandleClose} items={navLink.dropdownItems} />
      ))}
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    backgroundColor: theme.palette.background.secondary,
    bottom: 0,
    height: "3.375rem",
    position: "absolute",
    width: "100%",
  },
  drawer: {
    overflowY: "hidden",
  },
  externalSvg: {
    "& path": {
      fill: theme.palette.text.secondary,
    },
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: theme.spacing(0, 2.625),
    "@media (max-width: 360px)": {
      padding: theme.spacing(0, 2),
    },
  },
  headerDiv: {
    display: "flex",
    padding: "1.75rem 1.25rem 1.25rem",
    justifyContent: "space-between",
  },
  closeIcon: {
    maxWidth: "1.5rem",
    "& path": {
      fill: theme.palette.text.secondary,
    },
  },
  innerDiv: {
    height: "calc(100% - 3.375rem)",
    width: "100%",
    overflowY: "auto",
  },
  list: {
    height: "100%",
    width: "16rem",
    position: "relative",
  },
  logoDiv: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: theme.spacing(0, 1.625),
  },
  menuItem: {
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    minHeight: "2.8375rem",
    padding: theme.spacing(1, 2.875),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.action.hover,
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(1, 2.25),
    },
  },
  swthLogo: {
    height: "1rem",
    width: "unset",
  },
  topLogo: {
    width: "6.625rem",
  },
  divider: {
    margin: "0 1.25rem",
    color: theme.palette.divider,
  },
  icon: {
    maxWidth: 12,
    height: 12,
    "& path": {
      fill: theme.palette.text.secondary,
    },
    marginRight: "0.5rem",
  },
}));

export default HeaderSlider;
