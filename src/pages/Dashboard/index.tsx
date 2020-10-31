import React from 'react'
import { FiClock, FiPower } from 'react-icons/all'

import { useAuth } from '../../hooks/auth'

import { Calendar, Container, Content, Header, HeaderContent, NextAppointment, Profile, Schedule } from './styles'
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

      <Content>
        <Schedule>
          <h1>Appointments</h1>

          <p>
            <span>Today</span>
            <span>Day 3</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next appointment</strong>

            <div>
              <img src="https://pbs.twimg.com/profile_images/1319309850887806976/hAaOYHJB_400x400.jpg" alt="Mell Pereira" />

              <strong>Mell Pereira</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  )
}

export default Dashboard
