import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi'

import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Background, Content, FormHeader } from './styles'
import logo from '../../assets/logo.svg'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const [buttonSelected, setButtonSelected] = useState('client')

  const handleSubmit = useCallback(async (data: object) => {
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
    } catch (error) {
      const errors = getValidationErrors(error)
      formRef.current?.setErrors(errors)
    }
  }, [])

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

        <a href="/">
          <FiArrowLeft />
          Voltar para o login
        </a>
      </Content>
    </Container>
  )
}

export default SignUp
