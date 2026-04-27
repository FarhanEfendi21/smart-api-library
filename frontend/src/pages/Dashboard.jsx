import { BookCopy, UsersRound, BookUp2 } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="glass p-6 rounded-2xl flex items-center justify-between shadow-sm border border-white/50 hover:-translate-y-1 transition-transform duration-300">
    <div>
      <p className="text-sm font-medium text-primary/60 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-primary">{value}</h3>
    </div>
    <div className={`p-4 rounded-xl ${colorClass} bg-opacity-10 backdrop-blur-sm`}>
      <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-').replace('-100', '-600')}`} />
    </div>
  </div>
);

const Dashboard = () => {
  const { data: books } = useSWR('http://localhost:3000/api/books', fetcher);
  const { data: members } = useSWR('http://localhost:3000/api/members', fetcher);
  
  const stats = {
    books: books ? books.length : '--',
    members: members ? members.length : '--'
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <header className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h2>
        <p className="text-primary/60 mt-1">Overview of library activity.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Books" value={stats.books} icon={BookCopy} colorClass="bg-accent/20 text-accent" />
        <StatCard title="Total Members" value={stats.members} icon={UsersRound} colorClass="bg-blue-500/20 text-blue-500" />
        <StatCard title="Active Loans" value="--" icon={BookUp2} colorClass="bg-orange-500/20 text-orange-500" />
      </div>

      <div className="glass p-8 rounded-2xl border border-white/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-500 opacity-50"></div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-primary/60 text-sm">Dashboard widgets and recent activity lists will go here...</p>
      </div>
    </div>
  );
};

export default Dashboard;
