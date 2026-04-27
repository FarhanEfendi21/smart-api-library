import { Outlet, NavLink } from 'react-router-dom';
import { Book, Users, ClipboardList, LayoutDashboard } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
        isActive
          ? 'bg-accent/10 text-accent font-semibold shadow-sm'
          : 'text-primary/70 hover:bg-white/50 hover:text-primary'
      }`
    }
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </NavLink>
);

const Layout = () => {
  return (
    <div className="min-h-screen bg-background flex text-primary font-sans">
      {/* Sidebar - Glassmorphism */}
      <aside className="w-64 fixed h-full p-4 z-20">
        <div className="glass h-full rounded-2xl flex flex-col p-6 shadow-sm border border-white/40">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-accent/70 flex items-center justify-center text-white font-bold shadow-lg shadow-accent/20">
              S
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary">Smart Library</h1>
          </div>
          
          <nav className="flex flex-col gap-2">
            <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
            <SidebarItem to="/books" icon={Book} label="Books" />
            <SidebarItem to="/members" icon={Users} label="Members" />
            <SidebarItem to="/loans" icon={ClipboardList} label="Loans" />
          </nav>

          <div className="mt-auto px-4 py-4 text-xs text-primary/50 text-center">
            Apple HIG Inspired
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 min-h-screen relativez-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
