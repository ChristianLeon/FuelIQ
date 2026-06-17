type DashboardProps = {
  monthlySpent: number;
  monthlyDistance: number;
  monthlyLogs: number;
  monthlyCostPerKm: number;
  averageKmPerLiter: string | number;
  bestPerformance: number;
  worstPerformance: number;
  bestStation: any;
  lastPricePerLiter: number;
  lowestPricePerLiter: number;
  highestPricePerLiter: number;
  lastStation: string;
  previousMonthSpent: number;
  previousMonthDistance: number;
  previousMonthCostPerKm: number;
};

export default function Dashboard({
  monthlySpent,
  monthlyDistance,
  monthlyLogs,
  monthlyCostPerKm,
  averageKmPerLiter,
  bestPerformance,
  worstPerformance,
  bestStation,
  lastPricePerLiter,
  lowestPricePerLiter,
  highestPricePerLiter,
  lastStation,
  previousMonthSpent,
  previousMonthDistance,
  previousMonthCostPerKm,
}: DashboardProps) {
  const mainCards = [
    { label: "Gasto Mes", value: `$${Number(monthlySpent || 0).toFixed(0)}` },
    { label: "Km Mes", value: `${Number(monthlyDistance || 0).toFixed(0)}` },
    { label: "Cargas", value: monthlyLogs || 0 },
    { label: "Costo/Km", value: `$${Number(monthlyCostPerKm || 0).toFixed(2)}` },
  ];

  const insightCards = [
    { label: "Promedio", value: `${averageKmPerLiter || 0} km/L` },
    { label: "Mejor", value: `${Number(bestPerformance || 0).toFixed(2)} km/L` },
    { label: "Peor", value: `${Number(worstPerformance || 0).toFixed(2)} km/L` },
    { label: "Mejor Gas.", value: bestStation?.station || "-" },
    { label: "Último $/L", value: `$${Number(lastPricePerLiter || 0).toFixed(2)}` },
    { label: "$/L Bajo", value: `$${Number(lowestPricePerLiter || 0).toFixed(2)}` },
    { label: "$/L Alto", value: `$${Number(highestPricePerLiter || 0).toFixed(2)}` },
    { label: "Última", value: lastStation || "-" },
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-2 gap-3">
        {mainCards.map((card) => (
          <div
            key={card.label}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/20 p-4"
          >
            <p className="text-xs text-zinc-400">{card.label}</p>
            <h2 className="text-2xl font-black mt-1 text-white">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl shadow-black/20 p-4">
        <h3 className="text-sm font-bold text-white mb-3">
          Comparativo mensual
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-black/20 rounded-2xl p-3">
            <p className="text-[11px] text-zinc-500">Gasto ant.</p>
            <p className="text-sm font-bold">
              ${Number(previousMonthSpent || 0).toFixed(0)}
            </p>
          </div>

          <div className="bg-black/20 rounded-2xl p-3">
            <p className="text-[11px] text-zinc-500">Km ant.</p>
            <p className="text-sm font-bold">
              {Number(previousMonthDistance || 0).toFixed(0)}
            </p>
          </div>

          <div className="bg-black/20 rounded-2xl p-3">
            <p className="text-[11px] text-zinc-500">Costo/km ant.</p>
            <p className="text-sm font-bold">
              ${Number(previousMonthCostPerKm || 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {insightCards.map((card) => (
          <div
            key={card.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-3"
          >
            <p className="text-xs text-zinc-500">{card.label}</p>
            <p className="text-lg font-bold text-white truncate">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}