import { DropdownMenuItem, NavLink, Paths, StaticLinks, getDemexLink, goToDemexLink } from "@demex-info/constants";
import { GLPCompounder, MenuPools, MenuStake, ReferralIcon, TrophyIcon } from "@demex-info/layout/MainLayout/components/Header/assets";
import { RootState } from "@demex-info/store/types";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default () => {
  const net = useSelector((state: RootState) => state.app.network);

  const navLinksArr: NavLink[] = useMemo(() => {
    const earnLinks: DropdownMenuItem[] = [{
      key: "pools",
      label: "Pools",
      onClick: () => goToDemexLink(getDemexLink(Paths.Pools.List, net)),
      startIcon: MenuPools,
      startIconType: "fill",
    }, {
      key: "glp-compounder",
      label: "GLP Compounder",
      onClick: () => goToDemexLink(getDemexLink(Paths.Strategy.GLPWrapper, net)),
      startIcon: GLPCompounder,
      startIconType: "fill",
    }, {
      key: "staking",
      onClick: () => goToDemexLink(getDemexLink(Paths.Stake.List, net)),
      label: "Stake",
      startIcon: MenuStake,
      startIconType: "stroke",
    }];
    const promotionLinks: DropdownMenuItem[] = [{
      key: "demex-mega-marathon",
      label: "Demex Mega Marathon",
      onClick: () => goToDemexLink(getDemexLink(Paths.Competition.Leaderboard, net)),
      startIcon: TrophyIcon,
      startIconType: "stroke",
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
      },
      {
        label: "Promotions",
        href: undefined,
        dropdownItems: promotionLinks,
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
    return navLinksArr;
  }, [net]);
  
  return navLinksArr;
}
