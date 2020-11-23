import React, { useCallback, useEffect, useState } from 'react'
import { FiCalendar, FiClock } from 'react-icons/all'
import { format } from 'date-fns'

import api from '../../services/api'

import { Availability, Container, Hairstylist, Info, Name } from './styles'

interface HairstylistProps {
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

const Hairstylists: React.FC = () => {
  const [hairstylists, setHairstylists] = useState<HairstylistProps[]>([])

  const formatHour = useCallback((h: string) => {
    const date = new Date()
    const [hour, minute] = h.split(':')
    date.setHours(Number(hour), Number(minute))

    const formatTemplate = Number(minute) > 0 ? 'h:mm bbbb' : 'h bbbb'
    return format(date, formatTemplate)
  }, [])

  useEffect(() => {
    api.get<HairstylistProps[]>('/providers')
      .then(({ data }) => {
        const hairstylistsFormatted = data.map((hairstylist) => {
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

        setHairstylists(hairstylistsFormatted)
      })
      .catch(console.error)
  }, [])

  return (
    <Container>
      <h1>Hairstylists</h1>

      {hairstylists.map((stylist) => (
        <Hairstylist key={stylist.id}>
          <img src={stylist.avatar_url} alt={stylist.name} />

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
        </Hairstylist>
      ))}
    </Container>
  )
}

export default Hairstylists
