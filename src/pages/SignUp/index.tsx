import React, { useState } from 'react'
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Background, Content, FormHeader } from './styles'

import logo from '../../assets/logo.svg'

const SignUp: React.FC = () => {
  const [buttonSelected, setButtonSelected] = useState('client')

  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="GoBarber" />

        <form>
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
        </form>

        <a href="/">
          <FiArrowLeft />
          Voltar para o login
        </a>
      </Content>
    </Container>
  )
}

export default SignUp
