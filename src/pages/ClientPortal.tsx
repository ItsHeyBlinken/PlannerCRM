import { useState } from 'react';
import { Calendar, CreditCard, FileText } from 'lucide-react';

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState('events');

  const events = [
    {
      id: 1,
      name: 'Annual Corporate Retreat',
      date: '2024-04-15',
      status: 'Upcoming',
      balance: 2500,
    },
    // Add more events as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Client Portal
            </h1>
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              Make Payment
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="flex space-x-4">
            {[
              { id: 'events', label: 'My Events', icon: Calendar },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'documents', label: 'Documents', icon: FileText },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          {activeTab === 'events' && (
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.name}
                    </h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      Balance: ${event.balance}
                    </p>
                    <p
                      className={`text-sm ${
                        event.status === 'Upcoming'
                          ? 'text-green-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {event.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="rounded-md bg-gray-50 p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Payment History
                </h3>
                {/* Add payment history table/list here */}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="rounded-md bg-gray-50 p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Event Documents
                </h3>
                {/* Add document list here */}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}