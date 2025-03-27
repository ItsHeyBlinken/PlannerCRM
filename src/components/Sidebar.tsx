import { Link, useLocation } from 'react-router-dom';
import { PartyPopper, LayoutDashboard, Calendar, Users, DollarSign, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: DollarSign, label: 'Payments', path: '/payments' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={cn(
      "bg-indigo-900 text-white transition-all duration-300 ease-in-out",
      isOpen ? "w-64" : "w-20"
    )}>
      <div className="flex h-16 items-center justify-center">
        <PartyPopper className="h-8 w-8" />
        {isOpen && (
          <span className="ml-2 text-xl font-bold">EventPro CRM</span>
        )}
      </div>

      <nav className="mt-8">
        <div className="px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "mb-2 flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all hover:bg-indigo-800",
                location.pathname === item.path && "bg-indigo-800"
              )}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}