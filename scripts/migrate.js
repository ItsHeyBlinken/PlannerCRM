import pg from 'pg'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

// Load environment variables
config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create a new pool instance
const pool = new pg.Pool({
  host: process.env.VITE_DB_HOST,
  port: parseInt(process.env.VITE_DB_PORT || '5432'),
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASSWORD,
  database: process.env.VITE_DB_NAME,
  ssl: process.env.NODE_ENV === 'production',
})

async function migrate(direction = 'up') {
  try {
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Get all migration files
    const migrationsDir = path.join(__dirname, '../src/migrations')
    const files = await fs.readdir(migrationsDir)
    const migrationFiles = files
      .filter(f => f.endsWith('.sql'))
      .sort((a, b) => {
        const numA = parseInt(a.split('_')[0])
        const numB = parseInt(b.split('_')[0])
        return direction === 'up' ? numA - numB : numB - numA
      })

    // Get executed migrations
    const { rows: executedMigrations } = await pool.query(
      'SELECT name FROM migrations'
    )
    const executedMigrationNames = executedMigrations.map(m => m.name)

    for (const file of migrationFiles) {
      const isExecuted = executedMigrationNames.includes(file)

      if (direction === 'up' && isExecuted) {
        console.log(`Migration ${file} already executed, skipping...`)
        continue
      }

      if (direction === 'down' && !isExecuted) {
        console.log(`Migration ${file} not executed, skipping...`)
        continue
      }

      const filePath = path.join(migrationsDir, file)
      const content = await fs.readFile(filePath, 'utf-8')
      
      // Split content into up and down migrations
      const [upMigration, downMigration] = content.split('-- Down Migration')
      const sql = direction === 'up' ? upMigration : downMigration

      // Begin transaction
      const client = await pool.connect()
      try {
        await client.query('BEGIN')

        // Execute migration
        await client.query(sql)

        // Record migration
        if (direction === 'up') {
          await client.query(
            'INSERT INTO migrations (name) VALUES ($1)',
            [file]
          )
        } else {
          await client.query(
            'DELETE FROM migrations WHERE name = $1',
            [file]
          )
        }

        await client.query('COMMIT')
        console.log(`Successfully ${direction === 'up' ? 'applied' : 'reverted'} migration: ${file}`)
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      } finally {
        client.release()
      }
    }
  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Get direction from command line arguments
const direction = process.argv[2] || 'up'
if (!['up', 'down'].includes(direction)) {
  console.error('Invalid direction. Use "up" or "down"')
  process.exit(1)
}

migrate(direction) 