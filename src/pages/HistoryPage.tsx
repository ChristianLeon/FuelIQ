import HistoryList from "../Components/HistoryList";

type HistoryPageProps = {
  logs: any[];
  editLog: (log: any) => void;
  deleteLog: (id: number) => void;
  openGPS: (log: any) => void;
};

export default function HistoryPage({
  logs,
  editLog,
  deleteLog,
  openGPS,
}: HistoryPageProps) {
  return (
    <HistoryList
      logs={logs}
      editLog={editLog}
      deleteLog={deleteLog}
      openGPS={openGPS}
    />
  );
}