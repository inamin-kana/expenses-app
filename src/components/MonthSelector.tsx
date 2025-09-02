import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from "date-fns/locale"; 
import { esES } from "@mui/x-date-pickers/locales";
import { addMonths } from 'date-fns';

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({currentMonth, setCurrentMonth}: MonthSelectorProps) => {
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    // console.log(previousMonth);
    setCurrentMonth(previousMonth);
  }

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  }

  const handleDateChange = (newDate: Date | null, _context?: unknown) => {
    // console.log(newDate);
    if(newDate) {
      setCurrentMonth(newDate);
    }
  }


  return (
    <LocalizationProvider 
      dateAdapter={AdapterDateFns} 
      adapterLocale={es}
      localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button onClick={handlePreviousMonth} color={"error"} variant={"contained"}>
          Mes pasado
        </Button>
        <DatePicker
          onChange={(v) => handleDateChange(v as Date | null)}
          value={currentMonth}
          label="Selecciona ect mes y año"
          sx={{mx: 2, background: "white"}} 
          views={["year", "month"]} 
          format="MM/yyyy"
          // slotProps={{
          //   toolbar: {
          //     toolbarFormat: "MM/yyyy",
          //   },
          // }}
        /> 
        <Button onClick={handleNextMonth} color={"primary"} variant={"contained"}>
          Mes próximo
        </Button>
      </Box>
    </LocalizationProvider>
  )
}

export default MonthSelector
