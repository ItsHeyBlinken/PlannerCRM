import { create } from 'zustand';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  events: number;
  totalSpent: number;
  status: string;
}

interface ClientStore {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  deleteClient: (id: number) => void;
  updateClient: (id: number, client: Partial<Client>) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 123-4567",
      events: 2,
      totalSpent: 15000,
      status: "Active"
    },
    {
      id: 2,
      name: "InnovaCorp",
      email: "events@innovacorp.com",
      phone: "(555) 987-6543",
      events: 1,
      totalSpent: 25000,
      status: "Active"
    },
    {
      id: 3,
      name: "Hope Foundation",
      email: "contact@hopefoundation.org",
      phone: "(555) 456-7890",
      events: 3,
      totalSpent: 45000,
      status: "Active"
    }
  ],
  addClient: (newClient) =>
    set((state) => ({
      clients: [...state.clients, { ...newClient, id: state.clients.length + 1 }],
    })),
  deleteClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    })),
  updateClient: (id, updatedClient) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updatedClient } : client
      ),
    })),
}));