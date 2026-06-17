import { useState } from "react";

type HistoryLog = {
  id: number;
  date?: string;
  station?: string;
  fuelType?: string;
  amount?: string | number;
  liters?: string | number;
  pricePerLiter?: string | number;
  odometer?: string | number;
  rangeBefore?: string | number;
  rangeAfter?: string | number;
  latitude?: string | number;
  longitude?: string | number;
  metrics?: {
    distance?: string | number;
    kmPerLiter?: string | number;
    costPerKm?: string | number;
  };
};

type HistoryListProps = {
  logs: HistoryLog[];
  editLog: (log: HistoryLog) => void;
  deleteLog: (id: number) => void;
  openGPS: (log: HistoryLog) => void;
};

export default function HistoryList({
  logs,
  editLog,
  deleteLog,
  openGPS,
}: HistoryListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleDetails = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (logs.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Historial</h2>
        <p className="text-zinc-400">No hay registros todavía.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Historial</h2>

      <div className="space-y-3">
        {logs
          .slice()
          .reverse()
          .map((log) => {
            const isExpanded = expandedId === log.id;

            return (
              <div
                key={log.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-black text-white">
                      {log.station || "-"}
                    </p>
                    <p className="text-xs text-zinc-500">{log.date || "-"}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-green-400">
                      ${log.amount || 0}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {log.liters || 0} L · ${log.pricePerLiter || 0}/L
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="bg-black/20 rounded-2xl p-2">
                    <p className="text-xs text-zinc-500">km/L</p>
                    <p className="font-bold">
                      {log.metrics?.kmPerLiter || 0}
                    </p>
                  </div>

                  <div className="bg-black/20 rounded-2xl p-2">
                    <p className="text-xs text-zinc-500">Odómetro</p>
                    <p className="font-bold">{log.odometer || 0}</p>
                  </div>

                  <div className="bg-black/20 rounded-2xl p-2">
                    <p className="text-xs text-zinc-500">Costo/km</p>
                    <p className="font-bold">${log.metrics?.costPerKm || 0}</p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 border-t border-white/10 pt-4 space-y-2 text-sm text-zinc-300">
                    <p>
                      <strong>Gasolina:</strong> {log.fuelType || "Regular"}
                    </p>
                    <p>
                      <strong>Km restantes antes:</strong>{" "}
                      {log.rangeBefore || "-"} km
                    </p>
                    <p>
                      <strong>Km restantes después:</strong>{" "}
                      {log.rangeAfter || "-"} km
                    </p>
                    <p>
                      <strong>Distancia:</strong>{" "}
                      {log.metrics?.distance || 0} km
                    </p>
                    <p>
                      <strong>GPS:</strong>{" "}
                      {log.latitude && log.longitude
                        ? `${Number(log.latitude).toFixed(5)}, ${Number(
                            log.longitude
                          ).toFixed(5)}`
                        : "Sin GPS"}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2 mt-4">
                  <button
                    onClick={() => toggleDetails(log.id)}
                    className="bg-white/5 border border-white/10 text-zinc-200 px-2 py-2 rounded-xl text-sm"
                  >
                    {isExpanded ? "Ocultar" : "Detalle"}
                  </button>

                  <button
                    onClick={() => editLog(log)}
                    className="bg-blue-500/20 border border-blue-400/30 text-blue-200 px-2 py-2 rounded-xl text-sm"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => openGPS(log)}
                    className="bg-green-500/20 border border-green-400/30 text-green-200 px-2 py-2 rounded-xl text-sm"
                  >
                    GPS
                  </button>

                  <button
                    onClick={() => deleteLog(log.id)}
                    className="bg-red-500/20 border border-red-400/30 text-red-200 px-2 py-2 rounded-xl text-sm"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}