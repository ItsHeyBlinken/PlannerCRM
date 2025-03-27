import React from 'react'
import { AuthService } from '../services/auth/auth.service'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { User } from '../types/database'

export function useAuthGuard() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const verifyToken = async () => {
      try {
        await AuthService.verifyToken(token)
      } catch (error) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    verifyToken()
  }, [navigate])
}

export function useUser() {
  const [user, setUser] = useState<Omit<User, 'password_hash'> | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(null)
        return
      }

      try {
        const { userId } = await AuthService.verifyToken(token)
        const userData = await AuthService.getUserById(userId)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('token')
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  return user
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  const WithAuthComponent: React.FC<P> = (props: P) => {
    useAuthGuard()
    return <Component {...props} />
  }

  WithAuthComponent.displayName = `WithAuth(${Component.displayName || Component.name})`
  return WithAuthComponent
} 