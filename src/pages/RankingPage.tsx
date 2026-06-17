import Ranking from "../Components/Ranking";

type RankingPageProps = {
  logs: any[];
};

export default function RankingPage({ logs }: RankingPageProps) {
  return <Ranking logs={logs} />;
}