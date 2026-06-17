import { useEffect, useState } from "react";
import { loadLogs, saveLogs } from "./utils/storage";
import calculateMetrics from "./utils/metrics";

import FuelForm from "./Components/FuelForm";
import BottomNav from "./Components/BottomNav";

import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import RankingPage from "./pages/RankingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import StationsPage from "./pages/StationsPage";
import MorePage from "./pages/MorePage";

export default function App() {
  const [logs, setLogs] = useState<any[]>(loadLogs());
  const [editingLog, setEditingLog] = useState<any | null>(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  const handleSave = (data: any) => {
    const previousLog = logs.length > 0 ? logs[logs.length - 1] : null;
    const metrics = calculateMetrics(data, previousLog);

    const newLog = {
      id: editingLog?.id || Date.now(),
      date: editingLog?.date || new Date().toLocaleString(),
      vehicle: "Mazda 6",
      createdAt: editingLog?.createdAt || new Date().toISOString(),
      ...data,
      metrics,
    };

    if (editingLog) {
      setLogs(logs.map((log) => (log.id === editingLog.id ? newLog : log)));
      setEditingLog(null);
    } else {
      setLogs((prev) => [...prev, newLog]);
    }

    setShowForm(false);
  };

  const deleteLog = (id: number) => {
    if (!window.confirm("¿Eliminar este registro?")) return;
    setLogs(logs.filter((log) => log.id !== id));
  };

  const editLog = (log: any) => {
    setEditingLog(log);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openGPS = (log: any) => {
    if (!log.latitude || !log.longitude) {
      alert("Este registro no tiene GPS guardado");
      return;
    }

    window.open(
      `https://www.google.com/maps?q=${log.latitude},${log.longitude}`,
      "_blank"
    );
  };

  const closeForm = () => {
    setEditingLog(null);
    setShowForm(false);
  };

  const exportCSV = () => {
    const headers = [
      "Fecha",
      "Vehiculo",
      "Gasolinera",
      "Gasolina",
      "Monto",
      "Litros",
      "PrecioLitro",
      "Odometro",
      "KmRestantesAntes",
      "KmRestantesDespues",
      "Distancia",
      "KmPorLitro",
      "CostoKm",
      "Latitud",
      "Longitud",
    ];

    const rows = logs.map((log) => [
      log.date,
      log.vehicle || "Mazda 6",
      log.station,
      log.fuelType || "Regular",
      log.amount,
      log.liters,
      log.pricePerLiter || "",
      log.odometer,
      log.rangeBefore || "",
      log.rangeAfter || "",
      log.metrics?.distance || 0,
      log.metrics?.kmPerLiter || 0,
      log.metrics?.costPerKm || 0,
      log.latitude || "",
      log.longitude || "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fueliq-historial.csv";
    link.click();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], {
      type: "application/json;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fueliq-respaldo.json";
    link.click();
  };

  const shouldShowFloatingButton =
    activePage === "dashboard" || activePage === "history";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-950 text-white">
      <div className="px-4 pt-5 pb-28 max-w-6xl mx-auto">
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          FuelIQ
        </h1>

        <p className="text-zinc-400 mt-1 text-sm">
          Control personal de gasolina y rendimiento Mazda 6
        </p>

        <p className="text-zinc-500 mb-5 text-sm">Vehículo: Mazda 6</p>

        {activePage === "dashboard" && <DashboardPage logs={logs} />}

        {activePage === "history" && (
          <HistoryPage
            logs={logs}
            editLog={editLog}
            deleteLog={deleteLog}
            openGPS={openGPS}
          />
        )}

        {activePage === "ranking" && <RankingPage logs={logs} />}

        {activePage === "analytics" && <AnalyticsPage logs={logs} />}

        {activePage === "stations" && <StationsPage logs={logs} />}

        {activePage === "more" && (
          <MorePage
            logs={logs}
            exportCSV={exportCSV}
            exportJSON={exportJSON}
            importJSON={setLogs}
          />
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm px-4 py-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black">
                {editingLog ? "Editar carga" : "Nueva carga"}
              </h2>

              <button
                onClick={closeForm}
                className="bg-white/10 border border-white/10 text-white px-4 py-2 rounded-2xl"
              >
                Cerrar
              </button>
            </div>

            <FuelForm onSave={handleSave} initialData={editingLog} />
          </div>
        </div>
      )}

      {shouldShowFloatingButton && (
        <button
          onClick={() => {
            setEditingLog(null);
            setShowForm(true);
          }}
          className="fixed right-5 bottom-24 z-30 w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black text-4xl font-black shadow-2xl shadow-green-500/30 flex items-center justify-center active:scale-95"
        >
          +
        </button>
      )}

      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}