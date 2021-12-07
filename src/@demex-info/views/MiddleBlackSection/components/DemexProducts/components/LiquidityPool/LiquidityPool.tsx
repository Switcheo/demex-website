import { useAsyncTask } from "@demex-info/hooks";
import useCheckSDK from "@demex-info/hooks/useCheckSDK";
import { RootState } from "@demex-info/store/types";
import { BN_HUNDRED, BN_ZERO, calculateAPY, getBreakdownToken, parseNumber, Pool, TotalCommitmentMap, parseLiquidityPools } from "@demex-info/utils";
import { Hidden } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { Insights, Models } from "carbon-js-sdk";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LiquidityPoolSection from "./LiquidityPoolSection";
import LiquidityPoolSlide from "./LiquidityPoolSlide";
import { SlideCategory } from "../slideConfig";

interface Props {
  liquidityRef: () => void;
  slide: SlideCategory | null;
}

let poolsInterval: any;

const LiquidityPool: React.FC<Props> = (props: Props) => {
  const { liquidityRef, slide } = props;
  const [runPools] = useAsyncTask("runPools");
  const [checkSDK] = useCheckSDK();

  const [pools, setPools] = React.useState<Pool[]>([]);
  const [totalCommitMap, setTotalCommitMap] = React.useState<TotalCommitmentMap>({});
  const [weeklyRewards, setWeeklyRewards] = React.useState<BigNumber>(BN_ZERO);

  const { tokens, sdk } = useSelector((state: RootState) => state.app);

  const reloadPools = () => {
    runPools(async () => {
      try {
        const response: Models.QueryAllPoolResponse = await sdk!.query.liquiditypool.PoolAll({});
        const poolsData: Pool[] = parseLiquidityPools(response.extendedPools, sdk!);

        const totalCommitMap: TotalCommitmentMap = {};
        for (const pool of poolsData) {
          if (!pool.denom) continue;
          const richListResponse: Insights.InsightsQueryResponse<Insights.QueryGetBalanceListResponse> = await sdk!.insights.BalanceList({
            denom: pool.denom,
            location: "available",
          });

          const richListArr: Insights.BalanceDetails[] = richListResponse.result.models ?? [];
          let commitBN = BN_ZERO;
          richListArr.forEach((richList: Insights.BalanceDetails) => {
            const totalCommitment = parseNumber(richList.balance, BN_ZERO)!;
            const adjustedCommit = sdk?.token.toHuman(richList.denom, totalCommitment) ?? BN_ZERO;
            commitBN = commitBN.plus(adjustedCommit);
          });

          totalCommitMap[pool.denom] = commitBN;
        }

        const poolsRewards = await sdk!.lp.getWeeklyRewards();

        setPools(poolsData);
        setTotalCommitMap(totalCommitMap);
        setWeeklyRewards(poolsRewards ?? BN_ZERO);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    if (checkSDK) {
      reloadPools();
      poolsInterval = setInterval(() => {
        reloadPools();
      }, 60000);
      return () => {
        clearInterval(poolsInterval);
      };
    }
  }, [checkSDK]);

  const { totalLiquidity, totalCommit } = React.useMemo((): {
    totalLiquidity: BigNumber;
    totalCommit: BigNumber;
  } => {
    let totalUsd = BN_ZERO;
    let totalCommit = BN_ZERO;
    pools.forEach((pool: Pool) => {
      const { denom, denomA, amountA, denomB, amountB } = pool;
      const tokenAUsd = sdk?.token.getUSDValue(denomA) ?? BN_ZERO;
      const tokenBUsd = sdk?.token.getUSDValue(denomB) ?? BN_ZERO;
      totalUsd = totalUsd.plus(tokenAUsd.times(amountA)).plus(tokenBUsd.times(amountB));

      const commitToken = totalCommitMap?.[denom];
      if (!commitToken) {
        totalCommit = totalCommit.plus(BN_ZERO);
      } else {
        const [tokenAAmt, tokenBAmt] = getBreakdownToken(
          commitToken,
          pool,
          BN_HUNDRED,
          commitToken,
          tokens,
        );
        totalCommit = totalCommit.plus(tokenAUsd.times(tokenAAmt)).plus(tokenBUsd.times(tokenBAmt));
      }
    });
    return {
      totalLiquidity: totalUsd,
      totalCommit,
    };
  }, [pools, sdk?.token, tokens, totalCommitMap]);

  const avgApy = React.useMemo((): BigNumber => {
    let weightTotal: BigNumber = BN_ZERO;
    let cumApy: BigNumber = BN_ZERO;

    pools.forEach((p: Pool) => {
      weightTotal = weightTotal.plus(p.rewardsWeight ?? BN_ZERO);
    });
    pools.forEach((pool: Pool) => {
      const indivApy = calculateAPY(sdk, pool, weeklyRewards, weightTotal);
      cumApy = cumApy.plus(indivApy);
    });
    return weightTotal.isZero() ? BN_ZERO : cumApy.dividedBy(pools.length);
  }, [pools, weeklyRewards, sdk]);

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
