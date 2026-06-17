import Dashboard from "../Components/Dashboard";

type LogItem = {
  id?: number;
  date?: string;
  createdAt?: string;
  station?: string;
  amount?: string | number;
  pricePerLiter?: string | number;
  metrics?: {
    distance?: string | number;
    kmPerLiter?: string | number;
    costPerKm?: string | number;
  };
};

type DashboardPageProps = {
  logs: LogItem[];
};

export default function DashboardPage({ logs }: DashboardPageProps) {
  const getMonthKey = (date: string | undefined) => {
    const parsedDate = new Date(date || "");

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return `${parsedDate.getFullYear()}-${String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  const now = new Date();

  const currentMonthKey = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const previousMonthKey = `${previousMonthDate.getFullYear()}-${String(
    previousMonthDate.getMonth() + 1
  ).padStart(2, "0")}`;

  const currentMonthLogs = logs.filter((log) => {
    const date = log.createdAt || log.date;
    return getMonthKey(date) === currentMonthKey;
  });

  const previousMonthLogs = logs.filter((log) => {
    const date = log.createdAt || log.date;
    return getMonthKey(date) === previousMonthKey;
  });

  const monthlySpent = currentMonthLogs.reduce(
    (sum, log) => sum + Number(log.amount || 0),
    0
  );

  const monthlyDistance = currentMonthLogs.reduce(
    (sum, log) => sum + Number(log.metrics?.distance || 0),
    0
  );

  const monthlyCostPerKm =
    monthlyDistance > 0 ? monthlySpent / monthlyDistance : 0;

  const previousMonthSpent = previousMonthLogs.reduce(
    (sum, log) => sum + Number(log.amount || 0),
    0
  );

  const previousMonthDistance = previousMonthLogs.reduce(
    (sum, log) => sum + Number(log.metrics?.distance || 0),
    0
  );

  const previousMonthCostPerKm =
    previousMonthDistance > 0 ? previousMonthSpent / previousMonthDistance : 0;

  const validMetrics = logs.filter(
    (log) => Number(log.metrics?.kmPerLiter || 0) > 0
  );

  const averageKmPerLiter =
    validMetrics.length > 0
      ? (
          validMetrics.reduce(
            (sum, log) => sum + Number(log.metrics?.kmPerLiter || 0),
            0
          ) / validMetrics.length
        ).toFixed(2)
      : 0;

  const performanceValues = validMetrics.map((log) =>
    Number(log.metrics?.kmPerLiter || 0)
  );

  const bestPerformance =
    performanceValues.length > 0 ? Math.max(...performanceValues) : 0;

  const worstPerformance =
    performanceValues.length > 0 ? Math.min(...performanceValues) : 0;

  const priceValues = logs
    .map((log) => Number(log.pricePerLiter || 0))
    .filter((value) => value > 0);

  const lastLog = logs.length > 0 ? logs[logs.length - 1] : null;

  const lastPricePerLiter = lastLog ? Number(lastLog.pricePerLiter || 0) : 0;

  const lowestPricePerLiter =
    priceValues.length > 0 ? Math.min(...priceValues) : 0;

  const highestPricePerLiter =
    priceValues.length > 0 ? Math.max(...priceValues) : 0;

  const lastStation = lastLog?.station || "-";

  const stationRanking = Object.values(
    logs.reduce<
      Record<
        string,
        { station: string; totalKmPerLiter: number; entries: number }
      >
    >((acc, log) => {
      const station = log.station;
      const kmPerLiter = Number(log.metrics?.kmPerLiter || 0);

      if (!station || kmPerLiter <= 0) return acc;

      if (!acc[station]) {
        acc[station] = {
          station,
          totalKmPerLiter: 0,
          entries: 0,
        };
      }

      acc[station].totalKmPerLiter += kmPerLiter;
      acc[station].entries += 1;

      return acc;
    }, {})
  )
    .map((item) => ({
      ...item,
      average:
        item.entries > 0
          ? (item.totalKmPerLiter / item.entries).toFixed(2)
          : "0",
    }))
    .sort((a, b) => Number(b.average) - Number(a.average));

  const bestStation = stationRanking.length > 0 ? stationRanking[0] : null;

  return (
    <Dashboard
      monthlySpent={monthlySpent}
      monthlyDistance={monthlyDistance}
      monthlyLogs={currentMonthLogs.length}
      monthlyCostPerKm={monthlyCostPerKm}
      averageKmPerLiter={averageKmPerLiter}
      bestPerformance={bestPerformance}
      worstPerformance={worstPerformance}
      bestStation={bestStation}
      lastPricePerLiter={lastPricePerLiter}
      lowestPricePerLiter={lowestPricePerLiter}
      highestPricePerLiter={highestPricePerLiter}
      lastStation={lastStation}
      previousMonthSpent={previousMonthSpent}
      previousMonthDistance={previousMonthDistance}
      previousMonthCostPerKm={previousMonthCostPerKm}
    />
  );
}