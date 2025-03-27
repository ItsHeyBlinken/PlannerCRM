import { query } from '../../lib/db'
import type { Client, Event, Task, User, Vendor } from '../../types/database'

// User queries
export const userQueries = {
  async createUser(data: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const { rows } = await query<User>(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [data.email, data.name]
    )
    return rows[0]
  },

  async getUserById(id: number) {
    const { rows } = await query<User>('SELECT * FROM users WHERE id = $1', [id])
    return rows[0]
  },

  async getUserByEmail(email: string) {
    const { rows } = await query<User>('SELECT * FROM users WHERE email = $1', [email])
    return rows[0]
  }
}

// Client queries
export const clientQueries = {
  async createClient(data: Omit<Client, 'id' | 'created_at' | 'updated_at'>) {
    const { rows } = await query<Client>(
      'INSERT INTO clients (name, email, phone, company, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [data.name, data.email, data.phone, data.company, data.notes]
    )
    return rows[0]
  },

  async getClientById(id: number) {
    const { rows } = await query<Client>('SELECT * FROM clients WHERE id = $1', [id])
    return rows[0]
  },

  async updateClient(id: number, data: Partial<Client>) {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ')
    const values = Object.values(data)
    const { rows } = await query<Client>(
      `UPDATE clients SET ${fields}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    )
    return rows[0]
  },

  async deleteClient(id: number) {
    await query('DELETE FROM clients WHERE id = $1', [id])
  }
}

// Event queries
export const eventQueries = {
  async createEvent(data: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { rows } = await query<Event>(
      'INSERT INTO events (title, description, date, location, client_id, status, budget) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [data.title, data.description, data.date, data.location, data.client_id, data.status, data.budget]
    )
    return rows[0]
  },

  async getEventById(id: number) {
    const { rows } = await query<Event>('SELECT * FROM events WHERE id = $1', [id])
    return rows[0]
  },

  async getEventsByClientId(clientId: number) {
    const { rows } = await query<Event>('SELECT * FROM events WHERE client_id = $1', [clientId])
    return rows
  },

  async updateEvent(id: number, data: Partial<Event>) {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ')
    const values = Object.values(data)
    const { rows } = await query<Event>(
      `UPDATE events SET ${fields}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    )
    return rows[0]
  }
}

// Task queries
export const taskQueries = {
  async createTask(data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    const { rows } = await query<Task>(
      'INSERT INTO tasks (title, description, event_id, assigned_to, due_date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [data.title, data.description, data.event_id, data.assigned_to, data.due_date, data.status]
    )
    return rows[0]
  },

  async getTaskById(id: number) {
    const { rows } = await query<Task>('SELECT * FROM tasks WHERE id = $1', [id])
    return rows[0]
  },

  async getTasksByEventId(eventId: number) {
    const { rows } = await query<Task>('SELECT * FROM tasks WHERE event_id = $1', [eventId])
    return rows
  },

  async updateTask(id: number, data: Partial<Task>) {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ')
    const values = Object.values(data)
    const { rows } = await query<Task>(
      `UPDATE tasks SET ${fields}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    )
    return rows[0]
  }
}

// Vendor queries
export const vendorQueries = {
  async createVendor(data: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>) {
    const { rows } = await query<Vendor>(
      'INSERT INTO vendors (name, service_type, contact_name, email, phone, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [data.name, data.service_type, data.contact_name, data.email, data.phone, data.notes]
    )
    return rows[0]
  },

  async getVendorById(id: number) {
    const { rows } = await query<Vendor>('SELECT * FROM vendors WHERE id = $1', [id])
    return rows[0]
  },

  async updateVendor(id: number, data: Partial<Vendor>) {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ')
    const values = Object.values(data)
    const { rows } = await query<Vendor>(
      `UPDATE vendors SET ${fields}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    )
    return rows[0]
  }
} 