import { useAsyncTask, useWebsocket } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_HUNDRED, BN_ZERO, commitLpWalletAddr, constantLP, estimateApyUSD, getBreakdownToken, Pool, parseLiquidityPools, parseNumber } from "@demex-info/utils";
import { Hidden } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { Models, TypeUtils, WSConnectorTypes, WSModels, WSResult } from "carbon-js-sdk";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LiquidityPoolSection from "./LiquidityPoolSection";
import LiquidityPoolSlide from "./LiquidityPoolSlide";
import { SlideCategory } from "../slideConfig";

interface Props {
  liquidityRef: () => void;
  slide: SlideCategory | null;
}

const LiquidityPool: React.FC<Props> = (props: Props) => {
  const { liquidityRef, slide } = props;
  const [runPools] = useAsyncTask("runPools");
  const [ws] = useWebsocket();

  const [pools, setPools] = React.useState<Pool[]>([]);
  const [weeklyRewards, setWeeklyRewards] = React.useState<BigNumber>(BN_ZERO);
  const [commitCurve, setCommitCurve] = React.useState<Models.CommitmentCurve | undefined>(undefined);
  const [commitBalances, setCommitBalances] = React.useState<TypeUtils.SimpleMap<Models.TokenBalance>>({});

  const network = useSelector((store: RootState) => store.app.network);
  const sdk = useSelector((store: RootState) => store.app.sdk);
  const tokenClient = sdk?.token;

  const reloadPools = () => {
    if (!sdk?.query || !ws) return;

    runPools(async () => {
      try {
        const response = await ws.request<{ result: WSModels.Pool[] }>(WSConnectorTypes.WSRequest.Pools, {}) as WSResult<{ result: WSModels.Pool[] }>;
        const poolsData: Pool[] = parseLiquidityPools(response.data.result, sdk!.token);

        const poolsRewards = await sdk!.lp.getWeeklyRewards();

        const curveResponse = await sdk.query.liquiditypool.CommitmentCurve({});
        setCommitCurve(curveResponse.commitmentCurve);

        const commitAddr = commitLpWalletAddr[network] ?? "";
        const balanceRes = await ws.request<{ result: Models.TokenBalance[] }>(WSConnectorTypes.WSRequest.Balances, { address: commitAddr }) as WSResult<{ result: Models.TokenBalance[] }>;
        const balancesObj = balanceRes.data.result.reduce((prev: TypeUtils.SimpleMap<Models.TokenBalance>, balance: Models.TokenBalance) => {
          const newPrev = prev;
          newPrev[balance.denom] = balance;
          return newPrev;
        }, {});
        setCommitBalances(balancesObj);

        setPools(poolsData);
        setWeeklyRewards(poolsRewards ?? BN_ZERO);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    if (sdk && ws) {
      reloadPools();
    }
    return () => { };
  }, [sdk, ws]);

  const { totalLiquidity, totalCommit } = React.useMemo((): {
    totalLiquidity: BigNumber;
    totalCommit: BigNumber;
  } => {
    let totalUsd = BN_ZERO;
    let totalCommit = BN_ZERO;
    pools.forEach((pool: Pool) => {
      const { denomA, amountA, denomB, amountB } = pool;
      const tokenAUsd = tokenClient?.getUSDValue(denomA) ?? BN_ZERO;
      const tokenBUsd = tokenClient?.getUSDValue(denomB) ?? BN_ZERO;
      totalUsd = totalUsd.plus(tokenAUsd.times(amountA)).plus(tokenBUsd.times(amountB));

      const rawBalance = parseNumber(commitBalances[pool.denom]?.available ?? "0", BN_ZERO)!;
      const commitToken = tokenClient?.toHuman(pool.denom, rawBalance) ?? BN_ZERO;
      const [tokenAAmt, tokenBAmt] = getBreakdownToken(
        commitToken,
        pool,
        BN_HUNDRED,
        commitToken,
        tokenClient,
      );
      totalCommit = totalCommit.plus(tokenAUsd.times(tokenAAmt)).plus(tokenBUsd.times(tokenBAmt));
    });

    return {
      totalLiquidity: totalUsd,
      totalCommit,
    };
  }, [pools, tokenClient, commitBalances]);

  const avgApy = React.useMemo((): BigNumber => {
    let weightTotal: BigNumber = BN_ZERO;
    let weightedPools: number = 0;
    let cumApy: BigNumber = BN_ZERO;
    const maxBoostBN = parseNumber(commitCurve?.maxRewardMultiplier, BN_ZERO)!.dividedBy(100);

    pools.forEach((p: Pool) => {
      if (p.rewardsWeight.gt(0)) {
        weightedPools = weightedPools + 1;
      }
      weightTotal = weightTotal.plus(p.rewardsWeight ?? BN_ZERO);
    });
    pools.forEach((pool: Pool) => {
      if (pool.rewardsWeight.gt(0)) {
        const indivApy = estimateApyUSD({
          sdk,
          pool,
          poolsRewards: weeklyRewards,
          totalWeight: weightTotal,
          boostFactor: maxBoostBN,
          notionalLp: constantLP,
        });
        cumApy = cumApy.plus(indivApy);
      }
    });
    return weightTotal.isZero() ? BN_ZERO : cumApy.dividedBy(weightedPools);
  }, [pools, weeklyRewards, sdk, commitCurve]);

  return (
    <React.Fragment>
      <Hidden smDown>
        <LiquidityPoolSlide
          liquidityRef={liquidityRef}
          slide={slide}
          data={{ avgApy, totalCommit, totalLiquidity }}
        />
      </Hidden>
      <Hidden mdUp>
        <LiquidityPoolSection
          avgApy={avgApy}
          totalCommit={totalCommit}
          totalLiquidity={totalLiquidity}
        />
      </Hidden>
    </React.Fragment>
  );
};

export default LiquidityPool;
