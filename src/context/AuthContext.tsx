import React, { createContext, useCallback } from 'react'

import api from '../services/api'

interface SignInProps {
  email: string
  password: string
}

interface AuthContextProps {
  name: string
  signIn(props: SignInProps): Promise<void>
}

const initialValue = {} as AuthContextProps
export const AuthContext = createContext<AuthContextProps>(initialValue)

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async (params) => {
    const { data } = await api.post('/sessions', params)
    console.log(data)
  }, [])

  return (
    <AuthContext.Provider value={{ ...initialValue, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
