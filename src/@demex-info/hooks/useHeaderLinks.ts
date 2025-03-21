import { DropdownMenuItem, NavLink, Paths, StaticLinks, getDemexLink, goToDemexLink } from "@demex-info/constants";
import { Lend, LaunchVaults, MenuStake, Swap, Trade, Guide, Blog } from "@demex-info/layout/MainLayout/components/Header/assets";
import { ExternalLink } from "../assets";
import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
import { EventAction } from "@demex-info/utils";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useEventTracker from "./useEventTracker";

interface LinksReturn {
  fullNavLinks: NavLink[];
}

export default (): LinksReturn => {
  const dispatch = useDispatch();
  const net = useSelector((state: RootState) => state.app.network);
  const earnOpen = useSelector((state: RootState) => state.app.earnOpen);
  
  const { sendGaEvent } = useEventTracker();

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
    const earnLinks: DropdownMenuItem[] = [
      {
        key: "lending",
        label: "Lend, Borrow, Mint",
        description: "Lend and borrow with additional incentives and flexible terms",
        onClick: () => handleClickDemexLink(getDemexLink(Paths.Nitron.Main, net), "click_nitron"),
        startIcon: Lend,
        startIconType: "fill",
      },
      {
        key: "perp-pool-manage",
        label: "Add Liquidity",
        description: "Earn across multiple liquidity pools",
        onClick: () => handleClickDemexLink(getDemexLink(Paths.Pools.PerpList, net), "click_perp_pools"),
        startIcon: LaunchVaults,
        startIconType: "fill",
      },
      {
        key: "staking",
        onClick: () => handleClickDemexLink(getDemexLink(Paths.Stake.List, net), "click_stake"),
        label: "Stake SWTH",
        description: "No lock-up periods while earning",
        startIcon: MenuStake,
        startIconType: "stroke",
      },
    ];

    const tradeLinks: DropdownMenuItem[] = [
      {
        key: "trading",
        label: "Trade",
        description: "Leverage up to 100x with ultra-low trading fees and spread",
        onClick: () => handleClickDemexLink(getDemexLink(Paths.Trade.EthPerp, net), "click_trade"),
        startIcon: Trade,
        startIconType: "fill",
      },
      {
        key: "swap",
        onClick: () => handleClickDemexLink(getDemexLink(Paths.Swap, net), "click_swap"),
        label: "Swap",
        description: "Swap tokens across any network",
        startIcon: Swap,
        startIconType: "stroke",
      },
    ];

    const learnLinks: DropdownMenuItem[] = [
      {
        key: "blog",
        label: "Blog",
        onClick: () => window.open(StaticLinks.DemexBlog, "_blank"),
        startIcon: Blog,
        startIconType: "stroke",
        endIcon: ExternalLink,
        endIconType: "fill",
      },
      {
        key: "docs",
        onClick: () => window.open(StaticLinks.DemexDocs.Home, "_blank"),
        label: "Docs",
        startIcon: Guide,
        startIconType: "stroke",
        endIcon: ExternalLink,
        endIconType: "fill",
      },
    ];

    const navLinksArr: NavLink[] = [
      {
        label: "Trade",
        href: undefined,
        dropdownItems: tradeLinks,
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
        label: "Learn",
        href: undefined,
        dropdownItems: learnLinks,
        open: earnOpen,
        onHandleOpen: handleEarnOpen,
        onHandleClose: handleEarnClose,
      },
      {
        label: "Airdrop",
        href: undefined,
        onClick: () => handleClickDemexLink(getDemexLink(Paths.Rewards.Airdrop, net), "click_airdrop"),
      },
    ];
    return {
      fullNavLinks: navLinksArr,
    };
  }, [net, earnOpen]);
};
