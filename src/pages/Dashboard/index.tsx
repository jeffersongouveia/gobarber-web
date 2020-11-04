import React, { useCallback, useState } from 'react'
import { FiClock, FiPower } from 'react-icons/all'
import DayPicker, { DayModifiers } from 'react-day-picker'

import { useAuth } from '../../hooks/auth'

import {
  Calendar,
  Container,
  Content,
  Header,
  HeaderContent,
  NextAppointment,
  Profile,
  Schedule,
  Section,
  Appointment,
} from './styles'
import 'react-day-picker/lib/style.css'
import logo from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()

  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleChangeDate = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }
  }, [])

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

          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                10:30
              </span>

              <div>
                <img
                  src="https://pbs.twimg.com/profile_images/1044170135810924544/BNPdZhsF_400x400.jpg"
                  alt="Felipe Castanhari"
                />

                <strong>Felipe Castanhari</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Afternoon</strong>

            <Appointment>
              <span>
                <FiClock />
                13:00
              </span>

              <div>
                <img
                  src="https://pbs.twimg.com/profile_images/1322418289360789504/8Kk4LkcX_400x400.jpg"
                  alt="Quinn Nelson"
                />

                <strong>Quinn Nelson</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                14:00
              </span>

              <div>
                <img
                  src="https://pbs.twimg.com/profile_images/892579870802190336/SmAuYdKy_400x400.jpg"
                  alt="Lucas Vinícius"
                />

                <strong>Lucas Vinícius</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            selectedDays={selectedDate}
            onDayClick={handleChangeDate}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
