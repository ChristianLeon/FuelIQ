import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ChartLog = {
  date?: string;
  createdAt?: string;
  amount?: string | number;
  metrics?: {
    kmPerLiter?: string | number;
    distance?: string | number;
    costPerKm?: string | number;
  };
};

type ChartsProps = {
  logs: ChartLog[];
  mode: "performance" | "spending";
};

export default function Charts({ logs, mode }: ChartsProps) {
  const chartData = logs.map((log, index) => ({
    name: `#${index + 1}`,
    kmPerLiter: Number(log.metrics?.kmPerLiter || 0),
    amount: Number(log.amount || 0),
  }));

  const monthlyData = Object.values(
    logs.reduce<Record<string, { month: string; total: number; distance: number; entries: number }>>(
      (acc, log) => {
        const date = new Date(log.createdAt || log.date || "");
        const month = Number.isNaN(date.getTime())
          ? "Sin fecha"
          : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
              2,
              "0"
            )}`;

        if (!acc[month]) {
          acc[month] = {
            month,
            total: 0,
            distance: 0,
            entries: 0,
          };
        }

        acc[month].total += Number(log.amount || 0);
        acc[month].distance += Number(log.metrics?.distance || 0);
        acc[month].entries += 1;

        return acc;
      },
      {}
    )
  );

  if (logs.length === 0) {
    return (
      <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-5">
        <h2 className="text-xl font-bold mb-4">Gráficas</h2>
        <p className="text-zinc-400">No hay registros para generar gráficas.</p>
      </div>
    );
  }

  if (mode === "performance") {
    return (
      <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5">
        <h2 className="text-xl font-bold mb-4">Análisis de Rendimiento</h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "16px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="kmPerLiter"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5">
        <h2 className="text-xl font-bold mb-4">Gasto por Carga</h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "16px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="amount" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 p-5">
        <h2 className="text-xl font-bold mb-4">Consumo Mensual Total</h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="month" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "16px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="total" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}