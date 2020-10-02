import React, { createContext, useCallback, useContext, useState } from 'react'
import { uuid } from 'uuidv4'

import ToastContainer from '../components/ToastContainer'

interface ToastContextProps {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

export interface ToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

export const Toast = createContext<ToastContextProps>({} as ToastContextProps)

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const toast = {
      id: uuid(),
      ...message,
    }

    setMessages((state) => [...state, toast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((i) => i.id !== id))
  }, [])

  return (
    <Toast.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </Toast.Provider>
  )
}

export function useToast(): ToastContextProps {
  const context = useContext(Toast)

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider')
  }

  return context
}

export default ToastProvider
