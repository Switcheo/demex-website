import { CloseIcon } from "@demex-info/assets/icons";
import { DemexLogo, PoweredByCarbonFlat } from "@demex-info/assets/logos";
import { SvgIcon } from "@demex-info/components";
import { getDemexLink, goToExternalLink, Paths } from "@demex-info/constants";
import { DropdownMenuItem } from "@demex-info/layout/MainLayout/common/MenuItem";
import { RootState } from "@demex-info/store/types";
import { Box, Divider, Drawer, IconButton, makeStyles, MenuItem, MenuList, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ExternalLink, MenuPools, MenuStake, Nitron, NitronLiquidations } from "../assets";

import { ArrowLeftGradient } from "../assets";


interface Props {
  earnOpen: boolean;
  onClose: () => void;
}

const EarnSlider: React.FC<Props> = (props: Props) => {
  const { earnOpen, onClose } = props;
  const classes = useStyles();

  const net = useSelector((state: RootState) => state.app.network);


  const earnLinks = React.useMemo((): DropdownMenuItem[] => {
    const initTextLinks: DropdownMenuItem[] = [{
      key: "pools",
      label: "Pools",
      onClick: () => goToExternalLink(getDemexLink(Paths.Pools.List, net)),
      startIcon: MenuPools,
      startIconType: "fill",
    }, {
      key: "nitron",
      label: "Nitron",
      onClick: () => goToExternalLink(getDemexLink(Paths.Nitron.Main, net)),
      startIcon: Nitron,
      startIconType: "fill",
    }, {
      key: "liquidations",
      label: "Nitron Liquidations",
      onClick: () => goToExternalLink(getDemexLink(Paths.Nitron.Liquidations, net)),
      startIcon: NitronLiquidations,
      startIconType: "stroke",
    }, {
      key: "staking",
      onClick: () => goToExternalLink("https://hub.carbon.network/stake"),
      label: "Stake",
      startIcon: MenuStake,
      startIconType: "stroke",
      endIcon: ExternalLink,
      endIconType: "fill",
    }];
    return initTextLinks;
  }, [net]) // eslint-disable-line

  return (
    <Drawer
      anchor="left"
      open={earnOpen}
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
        <Box className={classes.backButton} onClick={onClose}>
          <SvgIcon component={ArrowLeftGradient} className={classes.returnIcon}/>
          Back
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.innerDiv}>
          <MenuList>
            {earnLinks.map((item: DropdownMenuItem) => (
              <MenuItem className={classes.menuItem} key={item.key} onClick={item.onClick}>
                <Box display="flex" alignItems="center">
                  {item.label}
                </Box>
                  {item.endIcon && (
                    <ExternalLink className={classes.externalSvg} />
                  )}
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </div>
      <Box className={classes.box}>
        <Box className={classes.footerLogo}>
          <PoweredByCarbonFlat className={classes.swthLogo} />
        </Box>
      </Box>
    </Drawer>
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
    marginRight: "0.5rem",
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
  backButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    ...theme.typography.body3,
    color: theme.palette.text.secondary,
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    gap: "0.25rem",
  },
  returnIcon: {
    "& path": {
      fill: theme.palette.text.secondary,
    },
  },
}));

export default EarnSlider;
