import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi'

import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Background, Content, FormHeader } from './styles'
import logo from '../../assets/logo.svg'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const [buttonSelected, setButtonSelected] = useState('client')

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Use um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres'),
      })

      await schema.validate(data, { abortEarly: false })

      await api.post('/users', data)
      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer seu login',
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
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
      })
    }
  }, [addToast, history])

  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormHeader>
            <button
              type="button"
              className={buttonSelected === 'client' ? 'selected' : ''}
              onClick={() => setButtonSelected('client')}
            >
              Sou cliente
            </button>

            <button
              type="button"
              className={buttonSelected === 'barber' ? 'selected' : ''}
              onClick={() => setButtonSelected('barber')}
            >
              Sou cabeleireiro
            </button>
          </FormHeader>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/sign-in">
          <FiArrowLeft />
          Voltar para o login
        </Link>
      </Content>
    </Container>
  )
}

export default SignUp
