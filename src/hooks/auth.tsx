import React, { createContext, useCallback, useContext, useState } from 'react'

import api from '../services/api'

interface SignInProps {
  email: string
  password: string
}

interface SessionUser {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface SessionResponse {
  user: SessionUser
  token: string
}

interface AuthContextProps {
  user: SessionUser
  signIn(props: SignInProps): Promise<void>
  signOut(): void
  updateUser(user: SessionUser): void
}

const initialValue = {} as AuthContextProps
export const Auth = createContext<AuthContextProps>(initialValue)

export const AuthProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<SessionResponse>(() => {
    const token = sessionStorage.getItem('@GoBarber:token')
    const user = sessionStorage.getItem('@GoBarber:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user) }
    }

    return {} as SessionResponse
  })

  const signIn = useCallback(async (params) => {
    const { data } = await api.post<SessionResponse>('/sessions', params)

    setSession(data)
    sessionStorage.setItem('@GoBarber:token', data.token)
    sessionStorage.setItem('@GoBarber:user', JSON.stringify(data.user))

    api.defaults.headers.authorization = `Bearer ${data.token}`
  }, [])

  const signOut = useCallback(() => {
    setSession({} as SessionResponse)

    sessionStorage.removeItem('@GoBarber:token')
    sessionStorage.removeItem('@GoBarber:user')
  }, [])

  const updateUser = useCallback((user: SessionUser) => {
    sessionStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setSession({
      user,
      token: session.token,
    })
  }, [session.token])

  return (
    <Auth.Provider
      value={{
        user: session.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </Auth.Provider>
  )
}

export function useAuth(): AuthContextProps {
  const context = useContext(Auth)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
