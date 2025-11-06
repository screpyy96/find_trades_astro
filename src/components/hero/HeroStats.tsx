import { CheckCircle, Users, Star } from '../../utils/icons';

interface HeroStatsProps {
  stats: {
    totalWorkers: number;
    totalReviews: number;
  };
}

// StatCard Sub-component
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'blue' | 'amber' | 'green';
}

function StatCard({ icon, value, label, color }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 cursor-pointer">
      <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-${color}-500/20 to-transparent mb-2`}>
        <div className="text-sm">{icon}</div>
      </div>
      <div className="text-xl md:text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-300">{label}</div>
    </div>
  );
}

// Main HeroStats Component
export function HeroStats({ stats }: HeroStatsProps) {
  const displayReviews = Math.max(stats.totalReviews, 720);

  const statsData = [
    {
      icon: <Users className="w-4 h-4 text-blue-400" />,
      value: `${stats.totalWorkers.toLocaleString('ro-RO')}+`,
      label: 'meseriași activi',
      color: 'blue',
    },
    {
      icon: <Star className="w-4 h-4 text-amber-400" />,
      value: '4.7',
      label: `din ${displayReviews.toLocaleString('ro-RO')} recenzii`,
      color: 'amber',
    },
    {
      icon: <CheckCircle className="w-4 h-4 text-green-400" />,
      value: '100%',
      label: 'verificați',
      color: 'green',
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          color={stat.color}
        />
      ))}
    </div>
  );
}
