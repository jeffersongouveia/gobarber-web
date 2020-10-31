import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiMail, FiLogIn } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'
import logo from '../../assets/logo.svg'

interface FormProps {
  email: string
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Use a valid e-mail'),
        })

        await schema.validate(data, { abortEarly: false })
        // Reset password

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: 'There was an error in the process, please try again',
        })
      }
    },
    [addToast, history],
  )

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recover my account</h1>

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

          <Button type="submit">Recover</Button>
        </Form>

        <Link to="/sign-up">
          <FiLogIn />
          Back to log in
        </Link>
      </Content>

      <Background />
    </Container>
  )
}

export default ForgotPassword
