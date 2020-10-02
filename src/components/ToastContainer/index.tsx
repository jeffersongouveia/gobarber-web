import React from 'react'

import { ToastMessage } from '../../hooks/toast'
import Toast from './Toast'

import { Container } from './styles'

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  return (
    <Container>
      {props.messages.map((message) => (
        <Toast key={message.id} toast={message} />
      ))}
    </Container>
  )
}

export default ToastContainer
