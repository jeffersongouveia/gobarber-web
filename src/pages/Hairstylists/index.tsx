import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiCalendar, FiClock } from 'react-icons/all'
import { format } from 'date-fns'

import { DayModifiers } from 'react-day-picker'
import Calendar from '../../components/Calendar'
import api from '../../services/api'

import { Availability, CreateAppointment, Container, HairStylist, Info, ListHairStylists, Name, Title, TimeOptions } from './styles'

interface HairStylistProps {
  id: string
  name: string
  email: string
  avatar_url: string

  hairstylist_profile: {
    hour_start: string
    hour_stop: string
    days_available: string[]
  }

  hairstylist_formatted?: {
    hour_start?: string
    hour_stop?: string
    days_available?: string
  }
}

interface MonthAvailabilityItem {
  day: number
  available: boolean
}

const Hairstylists: React.FC = () => {
  const [hairStylists, setHairStylists] = useState<HairStylistProps[]>([])
  const [selectedHairStylist, setSelectedHairStylist] = useState<HairStylistProps | undefined>(undefined)
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const formatHour = useCallback((h: string) => {
    const date = new Date()
    const [hour, minute] = h.split(':')
    date.setHours(Number(hour), Number(minute))

    const formatTemplate = Number(minute) > 0 ? 'h:mm bbbb' : 'h bbbb'
    return format(date, formatTemplate)
  }, [])

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day)
    }
  }, [])

  const disabledDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const dates = monthAvailability
      .filter((item) => !item.available)
      .map((item) => new Date(year, month, item.day))

    return dates
  }, [currentMonth, monthAvailability])

  useEffect(() => {
    api.get<HairStylistProps[]>('/providers')
      .then(({ data }) => {
        const hairStylistsFormatted = data.map((hairstylist) => {
          const daysAvailable = hairstylist.hairstylist_profile.days_available
            .map((day) => day.charAt(0).toUpperCase() + day.slice(1, 3))
            .join(', ')

          return {
            ...hairstylist,
            hairstylist_formatted: {
              hour_start: formatHour(hairstylist.hairstylist_profile.hour_start),
              hour_stop: formatHour(hairstylist.hairstylist_profile.hour_stop),
              days_available: daysAvailable,
            },
          }
        })

        setHairStylists(hairStylistsFormatted)
      })
      .catch(console.error)
  }, [formatHour])

  useEffect(() => {
    if (!selectedHairStylist) {
      return
    }

    api.get<MonthAvailabilityItem[]>(`/providers/availability-month/${selectedHairStylist.id}`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      },
    })
      .then(({ data }) => {
        setMonthAvailability(data)
      })
      .catch(console.error)
  }, [selectedHairStylist, currentMonth])

  return (
    <Container>
      <ListHairStylists>
        <h1>Hair Stylists</h1>

        {hairStylists.map((stylist) => (
          <HairStylist
            key={stylist.id}
            selected={selectedHairStylist?.id === stylist.id}
            onClick={() => setSelectedHairStylist(stylist)}
          >
            <img src="https://pbs.twimg.com/profile_images/1249772579289735174/2nQ9T3Rw_400x400.jpg" alt={stylist.name} />

            <Info>
              <Name>{stylist.name}</Name>

              <Availability>
                <div>
                  <FiCalendar size={20} />
                  {stylist.hairstylist_formatted?.days_available}
                </div>

                <div>
                  <FiClock size={20} />
                  {stylist.hairstylist_formatted?.hour_start}
                  <strong>-</strong>
                  {stylist.hairstylist_formatted?.hour_stop}
                </div>
              </Availability>
            </Info>
          </HairStylist>
        ))}
      </ListHairStylists>

      {selectedHairStylist && (
        <CreateAppointment>
          <section>
            <Title>Choose Date</Title>

            <Calendar
              selectedDays={selectedDate}
              disabledDays={disabledDays}
              onDayClick={handleDayChange}
              onMonthChange={(month) => setCurrentMonth(month)}
            />
          </section>

          <section>
            <Title>Choose Time</Title>

            <TimeOptions>
              <h6>Morning</h6>

              <li>
                <ul>07:00</ul>
                <ul>08:00</ul>
                <ul>09:00</ul>
                <ul>10:00</ul>
                <ul>11:00</ul>
              </li>
            </TimeOptions>

            <TimeOptions>
              <h6>Afternoon</h6>

              <li>
                <ul>12:00</ul>
                <ul>13:00</ul>
                <ul>14:00</ul>
                <ul>15:00</ul>
                <ul>16:00</ul>
                <ul>17:00</ul>
              </li>
            </TimeOptions>

            <TimeOptions>
              <h6>Night</h6>

              <li>
                <ul>18:00</ul>
                <ul>19:00</ul>
                <ul>20:00</ul>
                <ul>21:00</ul>
                <ul>22:00</ul>
                <ul>23:00</ul>
              </li>
            </TimeOptions>
          </section>
        </CreateAppointment>
      )}
    </Container>
  )
}

export default Hairstylists
