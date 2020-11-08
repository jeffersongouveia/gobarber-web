import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiClock, FiPower } from 'react-icons/all'
import DayPicker, { DayModifiers } from 'react-day-picker'
import { isToday, format, parseISO, isAfter } from 'date-fns'
import { Link } from 'react-router-dom'

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
import api from '../../services/api'

interface MonthAvailabilityItem {
  day: number
  available: boolean
}

interface AppointmentItem {
  id: string
  provider_id: string
  user_id: string
  date: string
  hour_formatted: string
  created_at: string
  updated_at: string

  user: {
    id: string
    name: string
    email: string
    avatar: string
    avatar_url: string
    created_at: string
    updated_at: string
  }
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()

  // TODO: is getting the weekend as initial date
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])
  const [appointments, setAppointments] = useState<AppointmentItem[]>([])

  const handleChangeDate = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  const disabledDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const dates = monthAvailability
      .filter((item) => !item.available)
      .map((item) => new Date(year, month, item.day))

    return dates
  }, [currentMonth, monthAvailability])

  const selectedDateAsText = useMemo(
    () => format(selectedDate, 'd MMM'),
    [selectedDate],
  )

  const selectedWeekDay = useMemo(
    () => format(selectedDate, 'EEEE'),
    [selectedDate],
  )

  const nextAppointment = useMemo(
    () => appointments.find((item) => isAfter(parseISO(item.date), new Date())),
    [appointments],
  )

  const morningAppointments = useMemo(
    () => appointments.filter((item) => parseISO(item.date).getHours() < 12),
    [appointments],
  )

  const afternoonAppointments = useMemo(
    () => appointments.filter((item) => parseISO(item.date).getHours() >= 12),
    [appointments],
  )

  useEffect(() => {
    api.get<MonthAvailabilityItem[]>(`/providers/availability-month/${user.id}`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      },
    })
      .then(({ data }) => {
        setMonthAvailability(data)
      })
      .catch(console.error)
  }, [currentMonth, user.id])

  useEffect(() => {
    api.get<AppointmentItem[]>('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      },
    })
      .then(({ data }) => {
        const appointmentsFormatted = data.map((item) => ({
          ...item,
          hour_formatted: format(parseISO(item.date), 'kk:mm'),
        }))

        setAppointments(appointmentsFormatted)
      })
      .catch(console.error)
  }, [selectedDate])

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
        <Schedule>
          <h1>Appointments</h1>

          <p>
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Next appointment</strong>

              <div>
                <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name} />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hour_formatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Morning</strong>

            {morningAppointments.length === 0 && (
              <p>No appointments here yet</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hour_formatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Afternoon</strong>

            {afternoonAppointments.length === 0 && (
              <p>No appointments here yet</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hour_formatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}

          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            selectedDays={selectedDate}
            onDayClick={handleChangeDate}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
