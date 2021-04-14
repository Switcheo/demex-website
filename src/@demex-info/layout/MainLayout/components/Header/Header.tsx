import { CloseIcon, MenuIcon } from "@demex-info/assets/icons";
import { DemexLogo } from "@demex-info/assets/logos";
import { getDemexLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Button, Hidden, IconButton, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { HeaderMenu, HeaderSlider } from "./components";

const Header: React.FC = () => {
  const classes = useStyles();
  const widthXs = useMediaQuery("@media (max-width: 599px)");

  const network = useSelector((state: RootState) => state.app.network);

  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  const goToLink = (link: string) => {
    window.open(link, "_blank");
  };

  const handleOpen = () => {
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.innerHeader}>
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
        <Box display="flex" alignItems="center">
          <HeaderMenu />
          <Button
            className={classes.loginBtn}
            color="secondary"
            onClick={() => goToLink(getDemexLink(Paths.Login.Main, network))}
          >
            {widthXs ? "Connect" : "Connect Wallet"}
          </Button>
        </Box>
      </Box>
      <HeaderSlider open={openMenu} onClose={handleClose} />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  closeIcon: {
    height: "1rem",
    "& path": {
      fill: theme.palette.secondary.main,
    },
  },
  innerHeader: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
  },
  loginBtn: {
    ...theme.typography.button,
    fontSize: "0.75rem",
    padding: theme.spacing(1.25, 2.5),
    textTransform: "none",
  },
  menuIcon: {
    height: "1.25rem",
  },
  mobileMenu: {
    // marginLeft: theme.spacing(2.25),
  },
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "1.75rem",
    padding: theme.spacing(1.5, 5),
    position: "fixed",
    top: 0,
    width: `calc(100% - ${theme.spacing(10)}px)`,
    zIndex: 1400,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.25, 2.5),
      width: `calc(100% - ${theme.spacing(5)}px)`,
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(1.25, 1.75),
      width: `calc(100% - ${theme.spacing(3.5)}px)`,
    },
  },
  topLogo: {
    width: "6.625rem",
    height: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "6rem",
      height: "unset",
      marginLeft: theme.spacing(2),
    },
  },
}));

export default Header;
