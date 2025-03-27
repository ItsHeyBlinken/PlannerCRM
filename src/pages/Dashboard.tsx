import { CalendarDays, Users, DollarSign, Clock } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Upcoming Events', value: '12', icon: CalendarDays, color: 'bg-blue-500' },
    { label: 'Active Clients', value: '48', icon: Users, color: 'bg-green-500' },
    { label: 'Revenue MTD', value: '$24,500', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Pending Tasks', value: '8', icon: Clock, color: 'bg-yellow-500' },
  ];

  const upcomingEvents = [
    { id: 1, name: "Johnson Wedding", date: "2024-03-15", client: "Sarah Johnson", status: "Confirmed" },
    { id: 2, name: "Tech Conference", date: "2024-03-20", client: "InnovaCorp", status: "Planning" },
    { id: 3, name: "Charity Gala", date: "2024-03-25", client: "Hope Foundation", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`rounded-md ${stat.color} p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          <div className="mt-4">
            <div className="divide-y divide-gray-200">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">{event.name}</p>
                    <p className="text-sm text-gray-500">{event.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{event.date}</p>
                    <p className="text-sm text-gray-500">{event.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {/* Activity feed items */}
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-900">New client registration: Tech Startup Inc.</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            {/* Add more activity items as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}