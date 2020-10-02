import React from 'react'
import {
  Route as ReactRouter,
  RouteProps as ReactRouterProps,
  Redirect,
} from 'react-router-dom'

import { useAuth } from '../hooks/auth'

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...props }) => {
  const { user } = useAuth()

  return (
    <ReactRouter
      {...props}
      render={
        () => (
          isPrivate === !!user
            ? <Component />
            : <Redirect to={{ pathname: isPrivate ? '/sign-in' : '/' }} />
        )
      }
    />
  )
}

export default Route
