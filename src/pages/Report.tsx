import { Grid, Paper } from '@mui/material'
import React from 'react'
import MonthSelector from '../components/MonthSelector'
import CategoryChart from '../components/CategoryChart'
import BarChart from '../components/BarChart'
import TransactionTable from '../components/TransactionTable'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Transaction } from '../types'
// import { Transaction } from 'firebase/firestore'

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  monthlyTransactions: Transaction[];
  isLoading: boolean;
  onDeleteTransaction: (transactionId: string | readonly string[]) => Promise<void>;
}

const Report = ({
  currentMonth, 
  setCurrentMonth, 
  monthlyTransactions,
  isLoading,
  onDeleteTransaction,
}: ReportProps) => {
  const commonPaperStyle = {
    height:  "400px",
    display: "flex",
    flexDirection: "column",
    p: 2
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        <Grid size={{xs: 12}}>
          <MonthSelector 
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </Grid>
        <Grid size={{xs: 12, md: 4}}>
          <Paper sx={commonPaperStyle}>
            <CategoryChart 
              monthlyTransactions={monthlyTransactions}
              isLoading={isLoading}
            />
          </Paper>
        </Grid>
        <Grid size={{xs: 12, md: 8}}>
          <Paper sx={commonPaperStyle}>
            <BarChart 
              monthlyTransactions={monthlyTransactions}
              isLoading={isLoading}
            />
          </Paper>
        </Grid>
        <Grid size={{xs: 12}}>
          <TransactionTable 
            monthlyTransactions={monthlyTransactions}
            onDeleteTransaction={onDeleteTransaction}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
    )
}

export default Report
