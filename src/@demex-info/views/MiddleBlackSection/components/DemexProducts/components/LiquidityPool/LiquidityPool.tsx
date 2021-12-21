import { useAsyncTask, useWebsocket } from "@demex-info/hooks";
import { RootState } from "@demex-info/store/types";
import { BN_HUNDRED, BN_ZERO, calculateAPY, getBreakdownToken, Pool, parseLiquidityPools } from "@demex-info/utils";
import { Hidden } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { WSConnectorTypes, WSModels, WSResult } from "carbon-js-sdk";
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

  const tokens = useSelector((state: RootState) => state.app.tokens);
  const sdk = useSelector((store: RootState) => store.app.sdk);
  const tokenClient = sdk?.token;

  const reloadPools = () => {
    if (!sdk?.query || !ws) return;

    runPools(async () => {
      try {
        const response = await ws.request<{ result: WSModels.Pool[] }>(WSConnectorTypes.WSRequest.Pools, {}) as WSResult<{ result: WSModels.Pool[] }>;
        const poolsData: Pool[] = parseLiquidityPools(response.data.result, sdk!.token);

        const poolsRewards = await sdk!.lp.getWeeklyRewards();

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

      const commitToken = pool.totalCommitment;
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
  }, [pools, tokenClient, tokens]);

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
