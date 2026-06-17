type RankingLog = {
  station?: string;
  metrics?: {
    kmPerLiter?: string | number;
  };
};

type RankingProps = {
  logs: RankingLog[];
};

export default function Ranking({ logs }: RankingProps) {
  const stations = logs.reduce<
    Record<
      string,
      {
        station: string;
        totalKmPerLiter: number;
        entries: number;
      }
    >
  >((acc, log) => {
    const station = log.station;

    if (!station) return acc;

    if (!acc[station]) {
      acc[station] = {
        station,
        totalKmPerLiter: 0,
        entries: 0,
      };
    }

    const kmPerLiter = Number(log.metrics?.kmPerLiter || 0);

    if (kmPerLiter > 0) {
      acc[station].totalKmPerLiter += kmPerLiter;
      acc[station].entries += 1;
    }

    return acc;
  }, {});

  const ranking = Object.values(stations)
    .map((item) => ({
      ...item,
      average:
        item.entries > 0 ? (item.totalKmPerLiter / item.entries).toFixed(2) : "0",
    }))
    .sort((a, b) => Number(b.average) - Number(a.average));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Ranking de Gasolineras</h2>

      {ranking.length === 0 && (
        <p className="text-zinc-400">Aún no hay datos suficientes.</p>
      )}

      <div className="space-y-3">
        {ranking.map((item, index) => (
          <div
            key={item.station}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-black text-lg">
                  #{index + 1} {item.station}
                </p>
                <p className="text-sm text-zinc-400">
                  {item.entries} cargas registradas
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black text-green-400">
                  {item.average}
                </p>
                <p className="text-xs text-zinc-500">km/L promedio</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}