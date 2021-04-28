import { Network } from "tradehub-api-js";

interface BlockEventsParams {
  height: number;
}

interface Props {
  host: string
}

export interface EventAttribute {
  key: string;
  value: string;
}

export interface Event {
  type: string;
  attributes: EventAttribute[];
}

interface BlockProps {
  beginBlockEvents: Event[];
  endBlockEvents: Event[];
}

export const makeBlockEvents = (blockEvents?: any): BlockProps => {
  const {
    begin_block_events: beginBlockEvents = [],
    end_block_events: endBlockEvents = [],
  } = blockEvents;
  return {
    beginBlockEvents,
    endBlockEvents,
  };
};

class UnknownNetworkError extends Error {
  constructor(network: Network) {
    super(`Unknown network error: ${network}`);
  }
}

export default class TendermintClient {
  private readonly host: string;

  constructor({ host }: Props) {
    this.host = host;
  }

  public async getBlockEvents(params: BlockEventsParams): Promise<any> {
    if (!params || !params.height) return;
    const resp: Response = await fetch(
      `${this.host}/block_results?height=${params.height}`,
    );
    const res: any = await resp.json();

    if (!res.result) {
      return makeBlockEvents();
    }

    const parseEvents = (evts: ReadonlyArray<any>) => {
      return evts.map((e: Event) => ({
        type: e.type,
        attributes: e.attributes.map((a: EventAttribute) => ({
          key: window.atob(a.key),
          value: window.atob(a.value),
        })),
      }));
    };

    const events: BlockProps = makeBlockEvents({
      begin_block_events: parseEvents(res.result.begin_block_events ?? []),
      end_block_events: parseEvents(res.result.end_block_events || []),
    });

    return events;
  }
}

export function makeTendermintClient(network: Network) {
  switch (network) {
    case "MainNet" as Network: // catch previous network name saved in storage
    case Network.MainNet:
      return new TendermintClient({
        host: "https://tradescan-tm.switcheo.org",
      });
    case Network.LocalHost:
      return new TendermintClient({ host: "http://localhost:26657" });
    case "DevNet" as Network: // catch previous network name saved in storage
    case Network.DevNet:
      return new TendermintClient({
        host: "https://dev-tradescan-tm.switcheo.org",
      });
    case "TestNet" as Network: // catch previous network name saved in storage
    case Network.TestNet:
      return new TendermintClient({
        host: "https://test-tradescan-tm.switcheo.org",
      });
    default:
      throw new UnknownNetworkError(network);
  }
}
