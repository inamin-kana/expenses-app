import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { ExpenseCategory, IncomeCategory, Transaction, TransactionType } from '../types';
import { Box, CircularProgress, InputLabel, Select, SelectChangeEvent, Typography, useTheme } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const CategoryChart = ({
  monthlyTransactions, 
  isLoading,
}: CategoryChartProps) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");

  const handleChange = (e: SelectChangeEvent<TransactionType>) => {
    setSelectedType(e.target.value as TransactionType);
  }

  const categorySums = monthlyTransactions.filter(
    (Transaction) => Transaction.type === selectedType
    ).reduce<Record<IncomeCategory | ExpenseCategory, number>>(
      (acc, transaction) => {
        if(!acc[transaction.category]) {
          acc[transaction.category] = 0;
        }
        acc[transaction.category] += transaction.amount;
        return acc;
    },
    {} as Record<IncomeCategory | ExpenseCategory, number>
  );

  const categoryLabels = Object.keys(categorySums) as (IncomeCategory | ExpenseCategory)[];
  const categoryValues = Object.values(categorySums);
  // console.log(categoryLabels);
  // console.log(categoryValues);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const incomeCategoryColor: Record<IncomeCategory, string> = {
    "sueldo": theme.palette.incomeCategoryColor.sueldo,
    "ingresos extra": theme.palette.incomeCategoryColor['ingresos extra'],
    "paga": theme.palette.incomeCategoryColor.paga,
  }

  const expenseCategoryColor: Record<ExpenseCategory, string> = {
    "comida": theme.palette.expenseCategoryColor.comida,
    "productos básicos": theme.palette.expenseCategoryColor['productos básicos'],
    "vivienda": theme.palette.expenseCategoryColor.vivienda,
    "ocio": theme.palette.expenseCategoryColor.ocio,
    "transporte": theme.palette.expenseCategoryColor.transporte,
  }

  const getCategoryColor = (category: IncomeCategory | ExpenseCategory):string => {
    if(selectedType === "income") {
      return incomeCategoryColor[category as IncomeCategory];
    } else {
      return expenseCategoryColor[category as ExpenseCategory];
    }
  }

  const data: ChartData<"pie"> = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: categoryLabels.map((category) => {
          return getCategoryColor(category);
        }),
        borderColor: categoryLabels.map((category) => {
          return getCategoryColor(category);
        }),
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">ingresos o gastos</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType} 
          label="ingresos o gastos"
          onChange={handleChange}
        >
          <MenuItem value={"income"}>Ingreso</MenuItem>
          <MenuItem value={"expense"}>Gasto</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          flexGrow: 1, 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
        <CircularProgress />
        ) : monthlyTransactions.length > 0 ?(
          <Pie data={data} options={options} />
        ) : (
          <Typography>No hay datos...</Typography>
        )}
      </Box>
    </>
  )
}

export default CategoryChart
