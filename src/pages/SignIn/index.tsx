import React, { useCallback, useRef } from 'react'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'
import logo from '../../assets/logo.svg'

interface FormProps {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Use um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        await schema.validate(data, { abortEarly: false })
        await signIn({
          email: data.email,
          password: data.password,
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, confira os valores informados',
        })
      }
    },
    [signIn, addToast],
  )

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça o seu login</h1>

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="/">Esqueci minha senha</a>
        </Form>

        <a href="/">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
