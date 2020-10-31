import React from 'react'
import { FiPower } from 'react-icons/all'

import { useAuth } from '../../hooks/auth'

import { Container, Header, HeaderContent, Profile } from './styles'
import logo from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img src="https://avatars2.githubusercontent.com/u/12664845?s=460&u=281dbbda2311796bc08b3529a069a39ed076f222&v=4" alt={user.name} />

            <div>
              <span>Welcome</span>
              <strong>Jeff Gouveia</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  )
}

export default Dashboard
