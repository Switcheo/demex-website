import BigNumber from "bignumber.js";
import moment from "moment";

export enum Network {
  LocalHost = "LOCALHOST", // eslint-disable-line no-unused-vars
  TestNet = "TESTNET", // eslint-disable-line no-unused-vars
  MainNet = "MAINNET", // eslint-disable-line no-unused-vars
  DevNet = "DEVNET", // eslint-disable-line no-unused-vars
}

const REST_HOSTS: { [key: string]: string } = {
  MAINNET: "https://tradescan.switcheo.org",
  TESTNET: "https://test-tradescan.switcheo.org",
  DEVNET: "https://dev-tradescan.switcheo.org",
  LOCALHOST: "http://127.0.0.1:5001",
};

const LOCALHOST_COSMOS_HOST = "`http://127.0.0.1:1317`";

const PATHS: { [key: string]: string } = {
  MARKETS: "/get_markets",
  MARKETS_STATS: "/get_market_stats",
  TOKENS: "/get_tokens",
  POOLS: "/get_liquidity_pools",
  RICHLIST: "/get_rich_list",
  INFLATION_START_TIME: "/get_inflation_start_time",
  REWARD_CURVE: "/get_reward_curve",
  STAKINGPOOL: "/staking/pool",
  BLOCKTIME: "/get_block_time",
  VALIDATORS: "/get_all_validators",
  BLOCKSLIST: "/get_blocks",
};

export interface Props {
  cosmosHost: string;
  host: string;
}

export interface MarketOnlyGetterParams {
  market: string
}
export interface RichListParams {
  token: string
  limit: number
}
export interface PageOnlyGetterParams {
  page: number
}

export type CandlestickResolution = 1 | 5 | 30 | 60 | 360 | 1440

export interface CandlesticksParams {
  market: string
  resolution: CandlestickResolution
  from: number
  to: number
}

export interface GetInflationStartTimeResponse {
  height: string
  block_time: string
}

export interface LiquidityPoolResponse {
  pool_id: string
  name: string
  denom: string
  denom_a: string
  amount_a: string
  weight_a: string
  denom_b: string
  amount_b: string
  weight_b: string
  swap_fee: string
  creator_address: string
  pool_address: string
  block_height: number
  shares_amount: string
  total_commitment: string
  market: string
  rewards_weight: string
  volume: string
}

export type GetLiquidityPoolsResponse = LiquidityPoolResponse[]

class UnknownNetworkError extends Error {
  constructor(network: Network) {
    super(`Unknown network error: ${network}`);
  }
}

export default class RestClient {
  private readonly host: string;
  private readonly cosmosHost: string;

  constructor({ cosmosHost, host }: Props) {
    this.cosmosHost = cosmosHost;
    this.host = host;
  }

  protected async fetchJson(relativeUrl: string): Promise<any> {
    const url: string = `${this.host}${relativeUrl}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  protected async fetchCosmosJson(relativeUrl: string): Promise<any> {
    const url: string = `${this.cosmosHost}${relativeUrl}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  public async getTokens() {
    return this.fetchJson(PATHS.TOKENS);
  }

  public async getMarkets() {
    return this.fetchJson(PATHS.MARKETS);
  }

  public async getMarketStats(params?: MarketOnlyGetterParams) {
    let url = PATHS.MARKETS_STATS;
    if (params) {
      url = `${url}?market=${params.market}`;
    }
    return this.fetchJson(url);
  }

  public async getCandlesticks(params?: CandlesticksParams) {
    if (!params) {
      throw new Error("/candlesticks: please provide the following params (market, resolution, from, to)");
    }

    const resolutionLevels: number[] = [1, 5, 30, 60, 360, 1440];
    const {
      market,
      resolution,
      from,
      to = 0,
    } = params;
    if (!market) {
      throw new Error("/candlesticks: missing market param");
    }
    if (!resolution) {
      throw new Error("/candlesticks: missing resolution param");
    }
    if (!resolutionLevels.includes(resolution)) {
      throw new Error("/candlesticks: please select one of the following values to insert as resolution (1, 5, 30, 60, 360, 1440)");
    }
    if (!from) {
      throw new Error("/candlesticks: missing from param");
    }
    if (!to) {
      throw new Error("/candlesticks: missing to param");
    }
    return this.fetchJson(`/candlesticks?market=${market}&resolution=${resolution}&from=${from}&to=${to}`);
  }

  public async getLiquidityPools(): Promise<null | GetLiquidityPoolsResponse> {
    return this.fetchJson(PATHS.POOLS);
  }

  public async getRichList(params: RichListParams) {
    const { token, limit } = params;
    return this.fetchJson(`${PATHS.RICHLIST}?token=${token}&limit=${limit}`);
  }

  public async getRewardCurve(): Promise<any> {
    return this.fetchJson(PATHS.REWARD_CURVE);
  }

  public async getWeeklyRewards(): Promise<number | null> {
    const startTime: GetInflationStartTimeResponse = await this.fetchJson(PATHS.INFLATION_START_TIME);
    const WEEKLY_DECAY = new BigNumber(0.9835);
    const MIN_RATE = new BigNumber(0.0003);
    const INITIAL_SUPPLY = new BigNumber(1000000000);
    const SECONDS_IN_A_WEEK = new BigNumber(604800);

    const difference = new BigNumber(moment().diff(moment(startTime.block_time), "second"));
    const currentWeek = difference.div(SECONDS_IN_A_WEEK).dp(0, BigNumber.ROUND_DOWN);

    let inflationRate = WEEKLY_DECAY.pow(currentWeek);
    if (inflationRate.lt(MIN_RATE)) {
      inflationRate = MIN_RATE;
    }
    return INITIAL_SUPPLY.div(52).times(inflationRate).toNumber();
  }

  public async getWeeklyLPRewardAlloc(): Promise<number> {
    const rewardCurve = await this.getRewardCurve();
    const reductions = new BigNumber(rewardCurve.result.reduction).times(new BigNumber(rewardCurve.result.reductions_made));
    const currentBP = new BigNumber(rewardCurve.result.initial_reward).minus(reductions);
    const poolAllocation = BigNumber.max(new BigNumber(rewardCurve.result.final_reward), currentBP).shiftedBy(-4);
    return poolAllocation.toNumber();
  }

  public async getWeeklyPoolRewards(): Promise<number> {
    const total = await this.getWeeklyRewards() ?? 0;
    const poolAllocation = await this.getWeeklyLPRewardAlloc();
    return new BigNumber(total).times(poolAllocation).dp(8).toNumber();
  }

  public async getStakingPool(): Promise<any> {
    return this.fetchCosmosJson(PATHS.STAKINGPOOL);
  }

  public async getAverageBlocktime() {
    return this.fetchJson(PATHS.BLOCKTIME);
  }

  public async getAllValidators() {
    return this.fetchJson(PATHS.VALIDATORS);
  }

  public async getBlocks(params?: PageOnlyGetterParams) {
    let url = PATHS.BLOCKSLIST;
    if (params) {
      url = `${url}?page=${params.page}`;
    }
    return this.fetchJson(url);
  }
}

export function makeRestClient(network: Network) {
  switch (network) {
    case "MainNet" as Network: // catch previous network name saved in storage
    case Network.MainNet:
      return new RestClient({
        cosmosHost: REST_HOSTS.MAINNET,
        host: REST_HOSTS.MAINNET,
      });
    case Network.LocalHost:
      return new RestClient({
        cosmosHost: LOCALHOST_COSMOS_HOST,
        host: REST_HOSTS.LOCALHOST,
      });
    case "DevNet" as Network: // catch previous network name saved in storage
    case Network.DevNet:
      return new RestClient({
        cosmosHost: REST_HOSTS.DEVNET,
        host: REST_HOSTS.DEVNET,
      });
    case "TestNet" as Network: // catch previous network name saved in storage
    case Network.TestNet:
      return new RestClient({
        cosmosHost: REST_HOSTS.TESTNET,
        host: REST_HOSTS.TESTNET,
      });
    default:
      throw new UnknownNetworkError(network);
  }
}
