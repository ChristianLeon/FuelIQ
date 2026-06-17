type MorePageProps = {
  logs: any[];
  exportCSV: () => void;
  exportJSON: () => void;
  importJSON: (logs: any[]) => void;
};

export default function MorePage({
  logs,
  exportCSV,
  exportJSON,
  importJSON,
}: MorePageProps) {
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const result = e.target?.result;

        if (typeof result !== "string") {
          alert("No se pudo leer el archivo.");
          return;
        }

        const data = JSON.parse(result);

        if (!Array.isArray(data)) {
          alert("El archivo no es un respaldo válido de FuelIQ.");
          return;
        }

        const confirmImport = window.confirm(
          "Esto reemplazará tus registros actuales. ¿Deseas continuar?"
        );

        if (!confirmImport) return;

        importJSON(data);
        alert("Respaldo restaurado correctamente.");
      } catch (error) {
        alert("No se pudo leer el archivo JSON.");
      } finally {
        event.target.value = "";
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5">
        <h2 className="text-2xl font-black mb-2">Más</h2>
        <p className="text-zinc-400 text-sm">
          Configuración, respaldos y datos generales de FuelIQ.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5">
        <h3 className="text-lg font-bold mb-3">Respaldo de datos</h3>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={exportCSV}
            className="bg-gradient-to-r from-emerald-400 to-green-500 text-black px-4 py-3 rounded-2xl font-bold shadow-lg shadow-green-500/20"
          >
            Exportar CSV
          </button>

          <button
            onClick={exportJSON}
            className="bg-white/5 border border-white/10 text-zinc-200 px-4 py-3 rounded-2xl hover:bg-white/10"
          >
            Exportar JSON
          </button>

          <label className="bg-blue-500/20 border border-blue-400/30 text-blue-200 px-4 py-3 rounded-2xl text-center font-bold cursor-pointer">
            Restaurar JSON
            <input
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        <p className="text-xs text-zinc-500 mt-3">
          El respaldo JSON te permite recuperar tus registros si cambias de
          celular, navegador o reinstalas la app.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5">
        <h3 className="text-lg font-bold mb-3">Vehículo</h3>

        <div className="space-y-2 text-sm text-zinc-300">
          <p>
            <strong>Auto:</strong> Mazda 6
          </p>
          <p>
            <strong>Registros guardados:</strong> {logs.length}
          </p>
          <p>
            <strong>Almacenamiento:</strong> LocalStorage del navegador
          </p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5">
        <h3 className="text-lg font-bold mb-3">FuelIQ</h3>

        <p className="text-sm text-zinc-400">
          Versión móvil personal para control de gasolina, rendimiento, gasto
          mensual, ranking de gasolineras y análisis del Mazda 6.
        </p>
      </div>
    </div>
  );
}