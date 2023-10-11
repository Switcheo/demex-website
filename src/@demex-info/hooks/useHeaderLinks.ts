import { DropdownMenuItem, NavLink, Paths, StaticLinks, getDemexLink, goToDemexLink } from "@demex-info/constants";
import { GLPCompounder, MenuPools, MenuStake, ReferralIcon, TrophyIcon } from "@demex-info/layout/MainLayout/components/Header/assets";
import actions from "@demex-info/store/actions";
import { RootState } from "@demex-info/store/types";
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

  const handlePromotionsOpen = () => dispatch(actions.App.setPromotionsDrawerOpen(true));
  const handlePromotionsClose = () => dispatch(actions.App.setPromotionsDrawerOpen(false));

  return useMemo(() => {
    const earnLinks: DropdownMenuItem[] = [{
      key: "pools",
      label: "Pools",
      onClick: () => goToDemexLink(getDemexLink(Paths.Pools.List, net)),
      startIcon: MenuPools,
      startIconType: "fill",
    }, {
      key: "staking",
      onClick: () => goToDemexLink(getDemexLink(Paths.Stake.List, net)),
      label: "Stake SWTH",
      startIcon: MenuStake,
      startIconType: "stroke",
    }, {
      key: "glp-compounder",
      label: "GLP Compounder",
      onClick: () => goToDemexLink(getDemexLink(Paths.Strategy.GLPWrapper, net)),
      startIcon: GLPCompounder,
      startIconType: "fill",
    }];
    const promotionLinks: DropdownMenuItem[] = [{
      key: "demex-mega-marathon",
      label: "Demex Mega Marathon",
      onClick: () => goToDemexLink(getDemexLink(Paths.Competition.Leaderboard, net)),
      startIcon: TrophyIcon,
      startIconType: "fill",
    }, {
      key: "referrals",
      label: "Referrals",
      onClick: () => goToDemexLink(getDemexLink(Paths.Account.Referrals, net)),
      startIcon: ReferralIcon,
      startIconType: "fill",
    }];
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
        dropdownItems: earnLinks,
        open: earnOpen,
        onHandleOpen: handleEarnOpen,
        onHandleClose: handleEarnClose,
      },
      {
        label: "Promotions",
        href: undefined,
        dropdownItems: promotionLinks,
        open: promotionsOpen,
        onHandleOpen: handlePromotionsOpen,
        onHandleClose: handlePromotionsClose,
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
    const dropdownNavLinks = navLinksArr.filter((link: NavLink) => !!link.dropdownItems?.length && typeof link.open !== undefined && link.onHandleClose && link.onHandleOpen);
    return {
      fullNavLinks: navLinksArr,
      dropdownNavLinks: dropdownNavLinks,
    };
  }, [net, earnOpen, promotionsOpen]);
};
