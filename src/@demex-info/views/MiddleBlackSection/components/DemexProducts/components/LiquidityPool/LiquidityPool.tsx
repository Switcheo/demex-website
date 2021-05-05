import { getUsd } from "@demex-info/constants";
import { useAsyncTask } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_HUNDRED, BN_ZERO, calculateAPY, getBreakdownToken, parseNumber, Pool, TotalCommitmentMap, parseLiquidityPools } from "@demex-info/utils";
import { Hidden } from "@material-ui/core";
import BigNumber from "bignumber.js";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LiquidityPoolSection from "./LiquidityPoolSection";
import LiquidityPoolSlide from "./LiquidityPoolSlide";

interface Props {
  liquidityRef: () => void;
  liquidityView: boolean;
  stakingView: boolean;
}

let poolsInterval: any;

const LiquidityPool: React.FC<Props> = (props: Props) => {
  const { liquidityRef, liquidityView, stakingView } = props;
  const [runPools] = useAsyncTask("runPools");

  const [pools, setPools] = React.useState<Pool[]>([]);
  const [totalCommitMap, setTotalCommitMap] = React.useState<TotalCommitmentMap>({});
  const [weeklyRewards, setWeeklyRewards] = React.useState<number>(0);

  const { tokens, restClient, usdPrices } = useSelector((state: RootState) => state.app);

  const reloadPools = () => {
    runPools(async () => {
      try {
        const response: any = await restClient.getLiquidityPools();
        const poolsData: Pool[] = parseLiquidityPools(response);

        const totalCommitMap: TotalCommitmentMap = {};
        for (const pool of poolsData) {
          if (!pool.denom) continue;
          const richListResponse: any = await restClient.getRichList({ token: pool.denom, limit: 1 });
          const totalCommitment = parseNumber(richListResponse?.[0]?.amount, BN_ZERO)!;
          totalCommitMap[pool.denom] = totalCommitment;
        }

        const poolsRewards: any = await restClient.getWeeklyPoolRewards();

        setPools(poolsData);
        setTotalCommitMap(totalCommitMap);
        setWeeklyRewards(poolsRewards);
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    reloadPools();
    poolsInterval = setInterval(() => {
      reloadPools();
    }, 60000);
    return () => clearInterval(poolsInterval);
  }, []);

  const { totalLiquidity, totalCommit } = React.useMemo((): {
    totalLiquidity: BigNumber;
    totalCommit: BigNumber;
  } => {
    let totalUsd = BN_ZERO;
    let totalCommit = BN_ZERO;
    pools.forEach((pool: Pool) => {
      const { denom, denomA, amountA, denomB, amountB } = pool;
      const tokenAUsd = getUsd(usdPrices, denomA);
      const tokenBUsd = getUsd(usdPrices, denomB);
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
  }, [pools, usdPrices, tokens, totalCommitMap]);

  const avgApy = React.useMemo((): BigNumber => {
    let weightTotal: BigNumber = BN_ZERO;
    let cumApy: BigNumber = BN_ZERO;

    pools.forEach((p: Pool) => {
      weightTotal = weightTotal.plus(p?.rewardsWeight ?? BN_ZERO);
    });
    pools.forEach((pool: Pool) => {
      const indivApy = calculateAPY(usdPrices, pool, weeklyRewards, weightTotal);
      cumApy = cumApy.plus(indivApy);
    });
    return weightTotal.isZero() ? BN_ZERO : cumApy.dividedBy(pools.length);
  }, [pools, weeklyRewards, usdPrices]);

  return (
    <React.Fragment>
      <Hidden smDown>
        <LiquidityPoolSlide
          liquidityRef={liquidityRef}
          liquidityView={liquidityView}
          stakingView={stakingView}
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
