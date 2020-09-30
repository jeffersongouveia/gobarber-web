import React, {
  InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, defaultValue } = useField(props.name)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}

      <input
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...props}
      />
    </Container>
  )
}

export default Input
