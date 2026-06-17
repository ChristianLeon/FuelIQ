import Charts from "../Components/Charts";

type AnalyticsPageProps = {
  logs: any[];
};

export default function AnalyticsPage({ logs }: AnalyticsPageProps) {
  return (
    <div className="space-y-6">
      <Charts logs={logs} mode="performance" />
      <Charts logs={logs} mode="spending" />
    </div>
  );
}