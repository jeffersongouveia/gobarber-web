import React from 'react'
import { FiPower } from 'react-icons/all'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'

import Appointments from '../Appointments'

import { Container, Content, Header, HeaderContent, Profile } from './styles'
import 'react-day-picker/lib/style.css'

import logo from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <Link to="/profile">
              <img src={user.avatar_url} alt={user.name} />
            </Link>

            <div>
              <span>Welcome</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Appointments />
      </Content>
    </Container>
  )
}

export default Dashboard
