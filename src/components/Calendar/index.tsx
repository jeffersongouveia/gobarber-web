import React from 'react'
import DayPicker, { DayModifiers } from 'react-day-picker'

import { Container } from './styles'

interface CalendarProps {
  selectedDays: Date
  disabledDays: Date[]
  onDayClick(day: Date, modifiers: DayModifiers): void
  onMonthChange(month: Date): void
}

const Calendar: React.FC<CalendarProps> = ({
  disabledDays,
  selectedDays,
  onDayClick,
  onMonthChange,
}) => (
  <Container>
    <DayPicker
      fromMonth={new Date()}
      disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
      modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
      selectedDays={selectedDays}
      onDayClick={onDayClick}
      onMonthChange={onMonthChange}
    />
  </Container>
)

export default Calendar
