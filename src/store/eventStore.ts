import { create } from 'zustand';

interface Event {
  id: number;
  name: string;
  date: string;
  client: string;
  status: string;
  location?: string;
  guests?: number;
}

interface EventStore {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  deleteEvent: (id: number) => void;
  updateEvent: (id: number, event: Partial<Event>) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [
    {
      id: 1,
      name: "Johnson Wedding",
      date: "2024-03-15",
      client: "Sarah Johnson",
      status: "Confirmed",
      location: "Grand Plaza Hotel",
      guests: 150
    },
    {
      id: 2,
      name: "Tech Conference",
      date: "2024-03-20",
      client: "InnovaCorp",
      status: "Planning",
      location: "Convention Center",
      guests: 500
    },
    {
      id: 3,
      name: "Charity Gala",
      date: "2024-03-25",
      client: "Hope Foundation",
      status: "Pending",
      location: "City Museum",
      guests: 200
    },
  ],
  addEvent: (newEvent) =>
    set((state) => ({
      events: [...state.events, { ...newEvent, id: state.events.length + 1 }],
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
  updateEvent: (id, updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    })),
}));