import { DropdownMenuItem, NavLink, Paths, StaticLinks, getDemexLink, goToDemexLink } from "@demex-info/constants";
import { GLPCompounder, LaunchVaults, MenuPools, MenuStake } from "@demex-info/layout/MainLayout/components/Header/assets";
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

  return useMemo(() => {
    const earnLinks: DropdownMenuItem[] = [{
      key: "perp-pool-manage",
      label: "Perp Pool",
      onClick: () => goToDemexLink(getDemexLink(Paths.Vaults.Manage.replace(":id/:tab", "2/deposit"), net)),
      startIcon: LaunchVaults,
      startIconType: "fill",
    }, {
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
        label: "Rewards",
        href: getDemexLink(Paths.Rewards, net),
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
