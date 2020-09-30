import React from 'react'

import { Container } from './styles'

interface TooltipProps {
  title: string
  className?: string
}

const Tooltip: React.FC<TooltipProps> = (props) => (
  <Container className={props.className}>
    {props.children}
    <span>{props.title}</span>
  </Container>
)

export default Tooltip
