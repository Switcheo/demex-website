import { DropdownMenuItem, NavLink, Paths, StaticLinks, getDemexLink, goToDemexLink } from "@demex-info/constants";
import { GLPCompounder, LaunchVaults, MenuPools, MenuStake } from "@demex-info/layout/MainLayout/components/Header/assets";
import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { EventAction, sendGaEvent } from "@demex-info/utils";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

interface LinksReturn {
  fullNavLinks: NavLink[];
  dropdownNavLinks: NavLink[];
}

export default (): LinksReturn => {
  const dispatch = useDispatch();
  const net = useSelector((state: RootState) => state.app.network);
  const earnOpen = useSelector((state: RootState) => state.app.earnOpen);
  const promotionsOpen = useSelector((state: RootState) => state.app.promotionsOpen);

  const handleEarnOpen = () => dispatch(actions.App.setEarnDrawerOpen(true));
  const handleEarnClose = () => dispatch(actions.App.setEarnDrawerOpen(false));

  const handleClickDemexLink = (demexLink: string, gaEvent?: EventAction) => {
    goToDemexLink(demexLink);
    fireGaEvent(gaEvent);
  };

  const fireGaEvent = (gaEvent?: EventAction) => {
    if (gaEvent) sendGaEvent(gaEvent);
  };

  return useMemo(() => {
    const earnLinks: DropdownMenuItem[] = [{
      key: "perp-pool-manage",
      label: "Perp Pool",
      onClick: () => handleClickDemexLink(getDemexLink(Paths.Pools.PerpList, net), "click_perp_pools"),
      startIcon: LaunchVaults,
      startIconType: "fill",
    }, {
      key: "pools",
      label: "Pools",
      onClick: () => handleClickDemexLink(getDemexLink(Paths.Pools.List, net), "click_pools"),
      startIcon: MenuPools,
      startIconType: "fill",
    }, {
      key: "staking",
      onClick: () => handleClickDemexLink(getDemexLink(Paths.Stake.List, net), "click_stake"),
      label: "Stake SWTH",
      startIcon: MenuStake,
      startIconType: "stroke",
    }, {
      key: "glp-compounder",
      label: "GLP Compounder",
      onClick: () => handleClickDemexLink(getDemexLink(Paths.Strategy.GLPWrapper, net)),
      startIcon: GLPCompounder,
      startIconType: "fill",
    }];
    const navLinksArr: NavLink[] = [
      {
        label: "Trade",
        href: getDemexLink(Paths.Trade, net),
        onClick: () => fireGaEvent("click_trade"),
      },
      {
        label: "Nitron",
        href: getDemexLink(Paths.Nitron.Main, net),
        onClick: () => fireGaEvent("click_nitron"),
      },
      {
        label: "Earn",
        href: undefined,
        dropdownItems: earnLinks,
        open: earnOpen,
        onHandleOpen: handleEarnOpen,
        onHandleClose: handleEarnClose,
      },
      {
        label: "Rewards",
        href: getDemexLink(Paths.Rewards, net),
        onClick: () => fireGaEvent("click_promotion_hub"),
      },
      {
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
    const dropdownNavLinks = navLinksArr.filter((link: NavLink) => !!link.dropdownItems?.length && typeof link.open !== "undefined" && link.onHandleClose && link.onHandleOpen);
    return {
      fullNavLinks: navLinksArr,
      dropdownNavLinks: dropdownNavLinks,
    };
  }, [net, earnOpen, promotionsOpen]);
};
