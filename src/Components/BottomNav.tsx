type BottomNavProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export default function BottomNav({
  activePage,
  setActivePage,
}: BottomNavProps) {
  const items = [
    { id: "dashboard", label: "Inicio", icon: "🏠" },
    { id: "history", label: "Historial", icon: "📜" },
    { id: "ranking", label: "Ranking", icon: "🏆" },
    { id: "analytics", label: "Análisis", icon: "📈" },
    { id: "stations", label: "Mapa", icon: "📍" },
    { id: "more", label: "Más", icon: "⚙️" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-6 px-1 py-2">
        {items.map((item) => {
          const active = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center py-2 rounded-2xl transition-all ${
                active
                  ? "bg-green-400 text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] font-bold mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}