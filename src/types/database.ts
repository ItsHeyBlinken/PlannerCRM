// User Types
export interface User {
  id: number;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

// Client Types
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

// Event Types
export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  client_id: number;
  status: EventStatus;
  budget?: number;
  created_at: Date;
  updated_at: Date;
}

export enum EventStatus {
  DRAFT = 'draft',
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Task Types
export interface Task {
  id: number;
  title: string;
  description: string;
  event_id: number;
  assigned_to?: number;
  due_date: Date;
  status: TaskStatus;
  created_at: Date;
  updated_at: Date;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked'
}

// Vendor Types
export interface Vendor {
  id: number;
  name: string;
  service_type: string;
  contact_name: string;
  email: string;
  phone: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
} 