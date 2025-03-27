import { create } from 'zustand';

interface Payment {
  id: number;
  client: string;
  event: string;
  amount: number;
  date: string;
  status: string;
  method: string;
}

interface PaymentStore {
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  deletePayment: (id: number) => void;
  updatePayment: (id: number, payment: Partial<Payment>) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  payments: [
    {
      id: 1,
      client: "Sarah Johnson",
      event: "Johnson Wedding",
      amount: 5000,
      date: "2024-02-15",
      status: "Paid",
      method: "Credit Card"
    },
    {
      id: 2,
      client: "InnovaCorp",
      event: "Tech Conference",
      amount: 15000,
      date: "2024-02-10",
      status: "Pending",
      method: "Bank Transfer"
    },
    {
      id: 3,
      client: "Hope Foundation",
      event: "Charity Gala",
      amount: 8000,
      date: "2024-02-01",
      status: "Paid",
      method: "Credit Card"
    }
  ],
  addPayment: (newPayment) =>
    set((state) => ({
      payments: [...state.payments, { ...newPayment, id: state.payments.length + 1 }],
    })),
  deletePayment: (id) =>
    set((state) => ({
      payments: state.payments.filter((payment) => payment.id !== id),
    })),
  updatePayment: (id, updatedPayment) =>
    set((state) => ({
      payments: state.payments.map((payment) =>
        payment.id === id ? { ...payment, ...updatedPayment } : payment
      ),
    })),
}));