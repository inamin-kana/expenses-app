import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import '../calendar.css'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { changeDayFormat, formatCurrency } from '../utils/formatting'

interface CalenderProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Calendar = ({monthlyTransactions, setCurrentMonth}: CalenderProps) => {
  // copy from node_modules -> fullcalendar -> react -> readme
  // const events = [
  //   { title: 'Meeting', start: new Date() },
  //   { title: 'testPlan', start: "2025-08-20", income: 300, expense: 200, balance: 100},
  // ]

  // -- SAMPLE
  // const monthlyTransactions = [
  //   {
  //     id: "a",
  //     type: "income",
  //     category: "pocket money",
  //     mount: 70,
  //     content: "From mom",
  //     date: "20-08-2025"
  //     // date: "2025-08-20"
  //   },
  //   {
  //     id: "b",
  //     type: "expense",
  //     category: "groceries",
  //     mount: 20,
  //     content: "Supermarket",
  //     date: "20-08-2025"
  //   },
  //   {
  //     id: "c",
  //     type: "expense",
  //     category: "daily necessities",
  //     mount: 10,
  //     content: "shop",
  //     date: "23-08-2025"
  //   },
  // ]

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  // console.log(dailyBalances);

  // -- SAMPLE
  // const dailyBalances = {
  //   "2025-08-20" : {income: 70, expense: 20, balance: 50},
  //   "2025-08-23" : {income: 0, expense: 0, balance: 0}
  // }

  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
        start: changeDayFormat(date),
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance)
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances)
  console.log(calendarEvents);

  // -- SAMPLE
  // const calendarEvents =
  // [
  //   {
  //     start: "2025-08-20",
  //     income: 70,
  //     expense: 20,
  //     balance: 50
  //   }
  // ]

  const renderEventContent = (eventInfo: EventContentArg) => {
    // console.log(eventInfo);
    return(
      <div>
        <div className='mony' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='mony' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='mony' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  const handleDateSet = (datesetInfo: DatesSetArg) => {
    console.log(datesetInfo);
    setCurrentMonth(datesetInfo.view.currentStart)
  }

  return (
    <FullCalendar 
      locale={esLocale}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  )
}

export default Calendar
