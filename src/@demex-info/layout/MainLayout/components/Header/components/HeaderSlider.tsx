import { ExternalLink } from "@demex-info/assets/icons";
import { SwitcheoWordMark } from "@demex-info/assets/logos";
import { getDemexLink, getExplorerLink, NavLink, Paths, StaticLinks } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Divider, Drawer, makeStyles, MenuItem, MenuList, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  open: boolean;
  onClose: () => void;
}

const HeaderSlider: React.FC<Props> = (props: Props) => {
  const { open, onClose } = props;
  const classes = useStyles();

  const net = useSelector((state: RootState) => state.app.network);

  const navLinksArr: NavLink[] = [
    {
      label: "Trade",
      href: getDemexLink(Paths.Trade, net),
    },
    {
      label: "Pools",
      href: getDemexLink(Paths.Pools.List, net),
    },
    {
      label: "Staking",
      href: getDemexLink(Paths.Stake.List, net),
    },
    // {
    //   label: "Leaderboard",
    //   href: Paths.Leaderboard,
    // },
    {
      label: "Tradescan",
      href: getExplorerLink(net),
    },
    {
      showIcon: true,
      label: "Ecosystem",
      href: StaticLinks.SwitcheoNetwork,
    },
  ];

  const goToLink = (item: NavLink) => {
    if (item?.href) {
      window.open(item.href, "_blank");
    }
  };

  return (
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
        <Box className={classes.innerDiv}>
          <MenuList>
            {navLinksArr.map((navLink: NavLink) => (
              <MenuItem className={classes.menuItem} key={navLink.label} onClick={() => goToLink(navLink)}>
                <Box display="flex" alignItems="center">
                  {navLink.label}
                  {navLink.showIcon && (
                    <ExternalLink className={classes.externalSvg} />
                  )}
                </Box>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </div>
      <Box className={classes.box}>
        <Divider />
        <Box className={classes.footerLogo}>
          <SwitcheoWordMark className={classes.swthLogo} />
        </Box>
      </Box>
    </Drawer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    backgroundColor: theme.palette.background.default,
    bottom: 0,
    height: "3.375rem",
    position: "absolute",
    width: "100%",
  },
  drawer: {
    overflowY: "hidden",
  },
  externalSvg: {
    marginBottom: theme.spacing(0.25),
    marginLeft: theme.spacing(0.75),
    width: "0.75rem",
    height: "0.75rem",
    "& path": {
      fill: theme.palette.secondary.main,
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
  innerDiv: {
    height: "calc(100% - 3.375rem)",
    position: "absolute",
    top: "3.25rem",
    width: "100%",
    overflowY: "auto",
  },
  list: {
    backgroundColor: theme.palette.background.default,
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
    fontFamily: "Roboto, sans-serif",
    fontSize: "0.8375rem",
    fontWeight: 500,
    minHeight: "2.8375rem",
    padding: theme.spacing(1, 2.875),
    "&:hover, &:focus": {
      backgroundColor: theme.palette.action.hover,
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(1, 2.25),
    },
  },
  swthLogo: {
    height: "0.8rem",
  },
}));

export default HeaderSlider;
