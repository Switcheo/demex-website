import { CloseIcon } from "@demex-info/assets/icons";
import { DemexLogo } from "@demex-info/assets/logos";
import { CustomAccordion } from "@demex-info/components";
import { NavLink } from "@demex-info/constants";
import useHeaderLinks from "@demex-info/hooks/useHeaderLinks";
import MenuListItems from "@demex-info/layout/MainLayout/common/MenuItem";
import { Box, Drawer, IconButton, makeStyles, Theme } from "@material-ui/core";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const HeaderSlider: React.FC<Props> = (props: Props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const { fullNavLinks } = useHeaderLinks();

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
            <IconButton onClick={onClose}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
            <DemexLogo className={classes.topLogo} />
          </Box>
          <Box className={classes.innerDiv}>
            {fullNavLinks.map((navLink: NavLink) => (
              <CustomAccordion
                key={navLink.label}
                accordionSummary={navLink.label}
                accordionDetails={(
                  <MenuListItems
                    menuListClasses={{ root: classes.menuList }}
                    items={navLink.dropdownItems}
                    size="large"
                  />
                )}
                accordionClasses={{
                  root: classes.accordion,
                  accordionDetails: classes.accordionDetails,
                }}
              />
            ))}
          </Box>
        </div>
      </Drawer>
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
    alignItems: "center",
    padding: theme.spacing(2, 1.5, 1),
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
    paddingTop: theme.spacing(1),

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  list: {
    height: "100%",
    width: "20rem",
    position: "relative",
  },
  swthLogo: {
    height: "1rem",
    width: "unset",
  },
  topLogo: {
    width: "6.625rem",
  },
  menuList: {
    padding: 0,
  },
  accordion: {
    padding: theme.spacing(0, 2, 0, 1),
  },
  accordionDetails: {
    padding: theme.spacing(1, 1, 0, 2),
  },
}));

export default React.memo(HeaderSlider);
