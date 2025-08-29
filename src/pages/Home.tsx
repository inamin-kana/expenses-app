import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({monthlyTransactions, setCurrentMonth}: HomeProps) => {
  const today = format(new Date(), "dd-MM-yyyy");
  const [currentDay, setCurrentDay] = useState(today);
  // console.log(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });
  // console.log(dailyTransactions);

  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  }
  
  // Form Open/Close function
  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Left contents */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar 
          monthlyTransactions={monthlyTransactions} 
          setCurrentMonth={setCurrentMonth}
          currentDay={currentDay} 
          setCurrentDay={setCurrentDay}
          today={today}
        />
      </Box>

      {/* Right contents */}
      <Box>
        <TransactionMenu 
          dailyTransactions={dailyTransactions}
          currentDay={currentDay} 
          onAddTransactionForm={handleAddTransactionForm}
        />
        <TransactionForm 
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay} 
        />
      </Box>
    </Box>
  )
}

export default Home
