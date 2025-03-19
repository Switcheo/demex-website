import { CloseIcon, MenuIcon } from "@demex-info/assets/icons";
import { DemexLogo } from "@demex-info/assets/logos";
import { getDemexLink, goToDemexLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Button, Hidden, IconButton, makeStyles, Theme } from "@material-ui/core";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { HeaderMenu, HeaderSlider } from "./components";
import { eskimi } from "@demex-info/utils";
import useEventTracker from "@demex-info/hooks/useEventTracker";
import { TypographyLabel } from "@demex-info/components";

const Header: React.FC = () => {
  const classes = useStyles();

  const network = useSelector((state: RootState) => state.app.network);

  const { sendStatsigEvent, sendGaEvent } = useEventTracker();

  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpenMenu(true);
  };

  const handleClose = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleConnect = () => {
    eskimi("track", "Conversion");
    goToDemexLink(getDemexLink(`${Paths.Trade}`, network));
    sendGaEvent("launch_app");
    sendStatsigEvent("launch_app");
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.innerHeader}  >
        <Box display="flex" alignItems="center">
          <Hidden mdUp>
            {
              openMenu && (
                <IconButton className={classes.mobileMenu} color="secondary" onClick={handleClose}>
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              )
            }
            {
              !openMenu && (
                <IconButton className={classes.mobileMenu} color="secondary" onClick={handleOpen}>
                  <MenuIcon className={classes.menuIcon} />
                </IconButton>
              )
            }
          </Hidden>
          <DemexLogo className={classes.topLogo} />
        </Box>
        <Box display="flex" alignItems="center" height="100%">
          <HeaderMenu />
        </Box>
        <Button
          className={classes.loginBtn}
          onClick={handleConnect}
        >
          <TypographyLabel className={classes.loginBtnText}>
            Launch App
          </TypographyLabel>
        </Button>
      </Box>
      <HeaderSlider open={openMenu} onClose={handleClose} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  closeIcon: {
    maxWidth: "1.5rem",
    "& path": {
      fill: theme.palette.text.secondary,
    },
  },
  innerHeader: {
    display: "flex",
    minHeight: "4rem",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
  },
  loginBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1.5, 2.25),
    
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0.75, 1.25),
    },
  },
  loginBtnText: {
    paddingTop: theme.spacing(0.25),
    ...theme.typography.title3,
    textTransform: "none",
  },
  menuIcon: {
    height: "1.5rem",
    "& path": {
      fill: theme.palette.text.primary,
    },
  },
  mobileMenu: {
    // marginLeft: theme.spacing(2.25),
  },
  root: {
    backgroundColor: theme.palette.background.base,
    minHeight: "4rem",
    padding: theme.spacing(0, 6),
    position: "sticky",
    top: 0,
    maxWidth: "100%",
    zIndex: 1100, //zIndex for menu drawer is 1200
    [theme.breakpoints.only("md")]: {
      padding: theme.spacing(0, 6),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2.5),
      width: `calc(100vw - ${theme.spacing(5)}px)`,
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(0, 1.75),
      width: `calc(100vw - ${theme.spacing(3.5)}px)`,
    },
  },
  topLogo: {
    width: "7.625rem",
    height: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "6rem",
      height: "unset",
      marginLeft: theme.spacing(2),
    },
  },
}));

export default Header;
