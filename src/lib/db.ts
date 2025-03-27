import { Pool } from 'pg'
import { z } from 'zod'

// Environment variables schema
const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string().transform(Number),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
})

// Parse and validate environment variables
const env = envSchema.parse({
  DB_HOST: import.meta.env.VITE_DB_HOST,
  DB_PORT: import.meta.env.VITE_DB_PORT,
  DB_USER: import.meta.env.VITE_DB_USER,
  DB_PASSWORD: import.meta.env.VITE_DB_PASSWORD,
  DB_NAME: import.meta.env.VITE_DB_NAME,
})

// Create a new pool instance
export const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production',
})

// Test the connection
pool.connect().then(client => {
  client.query('SELECT NOW()')
    .then(() => {
      console.log('Connected to PostgreSQL database')
      client.release()
    })
    .catch(err => {
      console.error('Error executing query', err.stack)
      client.release()
    })
}).catch(err => {
  console.error('Error acquiring client', err.stack)
})

// Helper function to execute queries with type safety
export async function query<T>(
  text: string,
  params?: any[]
): Promise<{ rows: T[]; rowCount: number }> {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('Executed query', { text, duration, rows: res.rowCount ?? 0 })
  return { 
    rows: res.rows as T[], 
    rowCount: res.rowCount ?? 0 
  }
}

// Export types
export type DbClient = typeof pool
export type QueryResult<T> = Awaited<ReturnType<typeof query<T>>>

// Close pool on process termination
process.on('SIGTERM', () => {
  pool.end().then(() => {
    console.log('Database pool has ended')
  })
}) 