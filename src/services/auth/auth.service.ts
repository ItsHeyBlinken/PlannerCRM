import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { query } from '../../lib/db'
import type { User } from '../../types/database'

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set')
}

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>

export class AuthService {
  static async register(input: RegisterInput): Promise<{ user: Omit<User, 'password_hash'>, token: string }> {
    // Validate input
    const validatedInput = registerSchema.parse(input)

    // Check if user exists
    const existingUser = await query<User>(
      'SELECT * FROM users WHERE email = $1',
      [validatedInput.email]
    )

    if (existingUser.rowCount > 0) {
      throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(validatedInput.password, salt)

    // Create user
    const { rows: [user] } = await query<User>(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at, updated_at',
      [validatedInput.email, passwordHash, validatedInput.name]
    )

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return { user, token }
  }

  static async login(input: LoginInput): Promise<{ user: Omit<User, 'password_hash'>, token: string }> {
    // Validate input
    const validatedInput = loginSchema.parse(input)

    // Find user
    const { rows: [user] } = await query<User & { password_hash: string }>(
      'SELECT * FROM users WHERE email = $1',
      [validatedInput.email]
    )

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(validatedInput.password, user.password_hash)
    if (!isValidPassword) {
      throw new Error('Invalid credentials')
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Remove password hash from user object
    const { password_hash, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }

  static async verifyToken(token: string): Promise<{ userId: number }> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }
      return decoded
    } catch (error) {
      throw new Error('Invalid token')
    }
  }

  static async getUserById(id: number): Promise<Omit<User, 'password_hash'> | null> {
    const { rows: [user] } = await query<User>(
      'SELECT id, email, name, created_at, updated_at FROM users WHERE id = $1',
      [id]
    )
    return user || null
  }
} 