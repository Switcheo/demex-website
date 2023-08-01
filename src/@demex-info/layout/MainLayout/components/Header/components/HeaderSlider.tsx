import { CloseIcon, ExternalLink } from "@demex-info/assets/icons";
import { DemexLogo, PoweredByCarbonFlat } from "@demex-info/assets/logos";
import { SvgIcon } from "@demex-info/components";
import { getDemexLink, NavLink, Paths, StaticLinks } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Divider, Drawer, IconButton, makeStyles, MenuItem, MenuList, Theme } from "@material-ui/core";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { ArrowRightGradient } from "../assets";
import EarnSlider from "./EarnSlider";

interface Props {
  open: boolean;
  onClose: () => void;
}

const HeaderSlider: React.FC<Props> = (props: Props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const [earnOpen, setEarnOpen] = useState<boolean>(false);

  const net = useSelector((state: RootState) => state.app.network);

  const navLinksArr: NavLink[] = [
    {
      label: "Trade",
      href: getDemexLink(Paths.Trade, net),
    },
    {
      label: "Nitron",
      href: getDemexLink(Paths.Nitron.Main, net),
    },
    {
      label: "Earn",
      href: undefined,
    },
    {
      label: "Competition",
      href: getDemexLink(Paths.Competition.Leaderboard, net),
    }, {
      showIcon: true,
      label: "Blog",
      href: StaticLinks.DemexBlog,
    },
    {
      showIcon: true,
      label: "Ecosystem",
      href: StaticLinks.CarbonNetwork,
    },
  ];

  const goToLink = (item: NavLink) => {
    if (item?.href) {
      window.open(item.href, item.showIcon ? "_blank" : "_self");
    }
  };

  const handleEarnOpen = () => {
    setEarnOpen(true);
  };

  const handleEarnClose = () => {
    setEarnOpen(false);
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
              {navLinksArr.map((navLink: NavLink) => {
                return navLink.href ?
                ( <MenuItem className={classes.menuItem} key={navLink.label} onClick={() => goToLink(navLink)}>
                  <Box display="flex" alignItems="center">
                    {navLink.label}
                    {navLink.showIcon && (
                      <ExternalLink className={classes.externalSvg} />
                    )}
                  </Box>
                </MenuItem>
                ) : (
                <MenuItem className={classes.menuItem} key={navLink.label} onClick={handleEarnOpen}>
                  <Box display="flex" alignItems="center">
                    {navLink.label}
                  </Box>
                    <SvgIcon className={classes.icon} component={ArrowRightGradient} />
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
      <Suspense fallback={null}>
        <EarnSlider earnOpen={earnOpen} onClose={handleEarnClose} />
      </Suspense>
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
