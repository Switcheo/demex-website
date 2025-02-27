import dayjs from "dayjs";

type RoadmapItem = {
  id: number;
  quarter: string;
  items: string[];
  startDate: string;
  activeLinePortion: string;
};

export const roadmapData: RoadmapItem[] = [
  {
    id: 1,
    quarter: "Q3 2024",
    items: [
      "Chain Abstraction",
      "Web3 Wallets",
    ],
    startDate: "2024-07-01",
    activeLinePortion: "90%",
  },
  {
    id: 2,
    quarter: "Q4 2024",
    items: [
      "Axelar Bridge Integration",
      "Skip Protocol",
      "CEX On-Ramp",
      "New Demex Points",
    ],
    startDate: "2024-10-01",
    activeLinePortion: "70%",
  },
  {
    id: 3,
    quarter: "Q1 2025",
    items: [
      "Cross Margin",
      "Decentralized Perp Listing",
      "User Managed Vaults",
      "Telegram Interface",
    ],
    startDate: "2025-01-01",
    activeLinePortion: "50%",
  },
  {
    id: 4,
    quarter: "Q2 2025",
    items: [
      "$DMX Launch",
      "Multi-Collateral",
      "Centralised Bridge Deposit",
      "New Demex Points",
    ],
    startDate: "2025-04-01",
    activeLinePortion: "30%",
  },
  {
    id: 5,
    quarter: "Q3 2025",
    items: [
      "Algo Trading Vaults",
      "Advanced Order Types",
    ],
    startDate: "2025-07-01",
    activeLinePortion: "10%",
  },
];

export const getCurrentRoadmapQuarter = () => {
  const currentDate = dayjs();

  const getQuarter = (item: RoadmapItem, index: number, array: RoadmapItem[]) => {
    const startDate = dayjs(item.startDate);
    const nextQuarter = array[index + 1];
    const nextStartDate = nextQuarter ? dayjs(nextQuarter.startDate) : null;
    return startDate <= currentDate && (!nextStartDate || currentDate < nextStartDate);
  };

  return roadmapData.find(getQuarter) as RoadmapItem;
};

export const getRoadmapQuarterStatus = (item: RoadmapItem) => {
  const currentQuarter = getCurrentRoadmapQuarter();

  const isActive = item.id === currentQuarter.id;
  const isHighlighted = item.id <= currentQuarter.id;
  return { isActive, isHighlighted };
};
