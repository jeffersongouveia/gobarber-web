import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiCalendar, FiClock } from 'react-icons/all'
import { DayModifiers } from 'react-day-picker'
import { format } from 'date-fns'

import Calendar from '../../components/Calendar'
import api from '../../services/api'

import {
  Availability,
  CreateAppointment,
  Container,
  HairStylist,
  Info,
  ListHairStylists,
  Name,
  Title,
  TimeOptions,
  Submit, TimeOptionsHour,
} from './styles'

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

interface HourAvailabilityProps {
  hour: number
  available: boolean
}

interface HourAvailabilityFormatted {
  available: boolean
  hour: string
}

const Hairstylists: React.FC = () => {
  const [hairStylists, setHairStylists] = useState<HairStylistProps[]>([])
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])
  const [hourAvailability, setHourAvailability] = useState<HourAvailabilityProps[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [selectedHairStylist, setSelectedHairStylist] = useState<HairStylistProps | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined)

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedHour(undefined)
      setSelectedDate(day)

      const url = `/providers/availability-day/${selectedHairStylist?.id}`
      const params = {
        day: day.getDate(),
        month: currentMonth?.getMonth() + 1,
        year: currentMonth?.getFullYear(),
      }

      api.get<HourAvailabilityProps[]>(url, { params })
        .then(({ data }) => setHourAvailability(data))
        .catch(console.error)
    }
  }, [currentMonth, selectedHairStylist])

  const handleTimeChange = useCallback((time: HourAvailabilityFormatted) => {
    if (time.available) {
      setSelectedHour(time.hour)
    }
  }, [])

  const handleMakeAppointment = useCallback(() => {
    if (!selectedDate || !selectedHour) {
      return
    }

    const dateFormatted = format(selectedDate, 'uuuu-MM-dd')
    const params = {
      date: `${dateFormatted} ${selectedHour}`,
      provider_id: selectedHairStylist?.id,
    }

    api.post('/appointments', params)
      .then(({ data }) => {
        console.log(data)

        setSelectedDate(undefined)
        setSelectedHour(undefined)
        setSelectedHairStylist(undefined)
      })
      .catch(console.error)
  }, [selectedDate, selectedHour, selectedHairStylist])

  const formatHour = useCallback((h: string) => {
    const date = new Date()
    const [hour, minute] = h.split(':')
    date.setHours(Number(hour), Number(minute))

    const formatTemplate = Number(minute) > 0 ? 'h:mm bbbb' : 'h bbbb'
    return format(date, formatTemplate)
  }, [])

  const disabledDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const dates = monthAvailability
      .filter((item) => !item.available)
      .map((item) => new Date(year, month, item.day))

    return dates
  }, [currentMonth, monthAvailability])

  const morningHours = useMemo(
    () => hourAvailability
      .filter((item) => item.hour < 12)
      .map((item) => ({
        hour: `${item.hour}:00`.padStart(5, '0'),
        available: item.available,
      })),
    [hourAvailability],
  )

  const afternoonHours = useMemo(
    () => hourAvailability
      .filter((item) => item.hour >= 12)
      .map((item) => ({
        hour: `${item.hour}:00`.padStart(5, '0'),
        available: item.available,
      })),
    [hourAvailability],
  )

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
        document.getElementById('create-appointment')?.scrollIntoView()
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
        <CreateAppointment id="create-appointment">
          <section>
            <Title>Choose Date</Title>

            <Calendar
              selectedDays={selectedDate}
              disabledDays={disabledDays}
              onDayClick={handleDayChange}
              onMonthChange={(month) => setCurrentMonth(month)}
            />
          </section>

          {selectedDate && (
            <>
              <section>
                <Title>Choose Time</Title>

                <TimeOptions>
                  <h6>Morning</h6>

                  <li>
                    {morningHours.map((time) => (
                      <TimeOptionsHour
                        key={time.hour}
                        available={time.available}
                        selected={selectedHour === time.hour}
                        onClick={() => handleTimeChange(time)}
                      >
                        {time.hour}
                      </TimeOptionsHour>
                    ))}
                  </li>
                </TimeOptions>

                <TimeOptions>
                  <h6>Afternoon</h6>

                  <li>
                    {afternoonHours.map((time) => (
                      <TimeOptionsHour
                        key={time.hour}
                        available={time.available}
                        selected={selectedHour === time.hour}
                        onClick={() => handleTimeChange(time)}
                      >
                        {time.hour}
                      </TimeOptionsHour>
                    ))}
                  </li>
                </TimeOptions>
              </section>

              <Submit type="button" onClick={handleMakeAppointment}>
                Make Appointment
              </Submit>
            </>
          )}

        </CreateAppointment>
      )}
    </Container>
  )
}

export default Hairstylists
