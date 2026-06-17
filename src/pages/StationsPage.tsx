type StationLog = {
  id?: number;
  station?: string;
  date?: string;
  createdAt?: string;
  latitude?: string | number;
  longitude?: string | number;
  amount?: string | number;
  liters?: string | number;
  pricePerLiter?: string | number;
  metrics?: {
    kmPerLiter?: string | number;
    costPerKm?: string | number;
    distance?: string | number;
  };
};

type StationsPageProps = {
  logs: StationLog[];
};

export default function StationsPage({ logs }: StationsPageProps) {
  const logsWithGPS = logs.filter((log) => log.latitude && log.longitude);

  const stations = Object.values(
    logsWithGPS.reduce<
      Record<
        string,
        {
          key: string;
          station: string;
          latitude: string | number;
          longitude: string | number;
          totalKmPerLiter: number;
          totalAmount: number;
          totalLiters: number;
          entries: number;
          lastVisit: string;
        }
      >
    >((acc, log) => {
      const station = log.station || "Sin nombre";
      const latitude = log.latitude || "";
      const longitude = log.longitude || "";
      const key = `${station}-${Number(latitude).toFixed(5)}-${Number(
        longitude
      ).toFixed(5)}`;

      if (!acc[key]) {
        acc[key] = {
          key,
          station,
          latitude,
          longitude,
          totalKmPerLiter: 0,
          totalAmount: 0,
          totalLiters: 0,
          entries: 0,
          lastVisit: log.date || "-",
        };
      }

      const kmPerLiter = Number(log.metrics?.kmPerLiter || 0);

      if (kmPerLiter > 0) {
        acc[key].totalKmPerLiter += kmPerLiter;
      }

      acc[key].totalAmount += Number(log.amount || 0);
      acc[key].totalLiters += Number(log.liters || 0);
      acc[key].entries += 1;
      acc[key].lastVisit = log.date || acc[key].lastVisit;

      return acc;
    }, {})
  ).sort((a, b) => {
    const avgA = a.entries > 0 ? a.totalKmPerLiter / a.entries : 0;
    const avgB = b.entries > 0 ? b.totalKmPerLiter / b.entries : 0;
    return avgB - avgA;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5">
        <h2 className="text-2xl font-black mb-2">Mapa de estaciones</h2>
        <p className="text-zinc-400 text-sm">
          Estaciones guardadas con GPS. Ordenadas por mejor rendimiento
          promedio.
        </p>
      </div>

      {stations.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
          <p className="text-zinc-400 text-sm">
            Aún no tienes cargas con GPS guardado.
          </p>
        </div>
      )}

      {stations.map((item) => {
        const averageKmPerLiter =
          item.entries > 0 ? item.totalKmPerLiter / item.entries : 0;

        const averagePricePerLiter =
          item.totalLiters > 0 ? item.totalAmount / item.totalLiters : 0;

        return (
          <div
            key={item.key}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5"
          >
            <div className="flex justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-white">
                  {item.station}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Última visita: {item.lastVisit}
                </p>
              </div>

              <div className="text-right">
                <p className="text-green-400 font-black text-xl">
                  {averageKmPerLiter.toFixed(2)}
                </p>
                <p className="text-xs text-zinc-500">km/L prom.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-black/20 rounded-2xl p-3">
                <p className="text-[11px] text-zinc-500">Cargas</p>
                <p className="font-bold">{item.entries}</p>
              </div>

              <div className="bg-black/20 rounded-2xl p-3">
                <p className="text-[11px] text-zinc-500">$/L prom.</p>
                <p className="font-bold">${averagePricePerLiter.toFixed(2)}</p>
              </div>

              <div className="bg-black/20 rounded-2xl p-3">
                <p className="text-[11px] text-zinc-500">Total</p>
                <p className="font-bold">${item.totalAmount.toFixed(0)}</p>
              </div>
            </div>

            <p className="text-xs text-zinc-500 mt-4">
              GPS: {Number(item.latitude).toFixed(5)},{" "}
              {Number(item.longitude).toFixed(5)}
            </p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${Number(
                item.latitude
              )},${Number(item.longitude)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full mt-4 bg-green-500/20 border border-green-400/30 text-green-200 px-4 py-3 rounded-2xl font-bold"
            >
              Abrir en Google Maps
            </a>
          </div>
        );
      })}
    </div>
  );
}