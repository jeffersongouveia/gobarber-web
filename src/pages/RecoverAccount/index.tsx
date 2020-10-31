import React, { useCallback, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'
import logo from '../../assets/logo.svg'

interface FormProps {
  password: string
  password_confirmation: string
}

const RecoverAccount: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { search } = useLocation()
  const query = new URLSearchParams(search)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          password: Yup.string().required('Password is required'),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), undefined], "Password's not match"),
        })

        await schema.validate(data, { abortEarly: false })
        await api.post('/password/reset', {
          ...data,
          token: query.get('token'),
        })

        history.push('/sign-in')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: 'An error occurred during the password reset, try again',
        })
      }
    },
    [addToast, history, query],
  )

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recover account</h1>

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="New password"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="New password confirmation"
          />

          <Button type="submit">
            Reset my password
          </Button>
        </Form>
      </Content>

      <Background />
    </Container>
  )
}

export default RecoverAccount
