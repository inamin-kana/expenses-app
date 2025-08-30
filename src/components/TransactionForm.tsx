import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useForkRef,
} from "@mui/material";
// icons
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddHomeIcon from '@mui/icons-material/AddHome';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import TrainIcon from '@mui/icons-material/Train';
import WorkIcon from '@mui/icons-material/Work';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SavingsIcon from '@mui/icons-material/Savings';

import React, { useEffect, JSX, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IncomeCategory, ExpenseCategory } from "../types";
dayjs.extend(customParseFormat);

interface TransactionFormProps {
  onCloseForm: () => void,
  isEntryDrawerOpen: boolean,
  currentDay: string,
}

type IncomeExpense = "income" | "expense";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory,
  icon: JSX.Element
}

const TransactionForm = ({onCloseForm, isEntryDrawerOpen, currentDay}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories : CategoryItem[] = [
    { label: "groceries", icon:  <FastfoodIcon fontSize='small'/> },
    { label: "daily necessities", icon:  <ShoppingBagIcon fontSize='small'/> },
    { label: "housing expense", icon:  <AddHomeIcon fontSize='small'/> },
    { label: "entertainment", icon:  <SportsTennisIcon fontSize='small'/> },
    { label: "transportation expenses", icon:  <TrainIcon fontSize='small'/> },
  ]

  const incomeCategories: CategoryItem[] = [
    { label: "salary", icon:  <WorkIcon fontSize='small'/> },
    { label: "extra income", icon:  <AddBusinessIcon fontSize='small'/> },
    { label: "pocket money", icon:  <SavingsIcon fontSize='small'/> },
  ]

  const [categories, setCategories] = useState(expenseCategories);

  // For use react hook
  const { control, setValue, watch } = useForm({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: ""
    }
  });

  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
  }

  // Watch type of income/expense
  const currentType = watch("type");

  // When click the calendar change the date in form
  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay])

  useEffect(() => {
    const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
    // console.log(newCategories);
    setCategories(newCategories);
  }, [currentType])

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen? formWidth : "-2%", // Form position
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // padding 
        boxSizing: "border-box", // Include borders and padding in the width
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >

      {/* Header: Input area */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* Button: close */}
        <IconButton
        onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Form */}
      <Box component={"form"}>
        <Stack spacing={2}>
          {/* Income/Expense switch button */}
          <Controller
            name="type"
            control={control} 
            render={(props) => { 
              const { field } = props;  
              console.log(field);
              return (
              <ButtonGroup fullWidth>
                <Button 
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error" 
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  Gasto
                </Button>
                <Button
                  variant={field.value === "income" ? "contained" : "outlined"}
                  onClick={() => incomeExpenseToggle("income")}
                >
                  Ingreso
                </Button>
              </ButtonGroup>
              )
            }}
          />
          {/* Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Controller
              name="date"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  label="date"
                  format="DD-MM-YYYY"
                  value={value ? dayjs(value, 'DD-MM-YYYY') : null}
                  onChange={(newValue: Dayjs | null) => {
                    onChange(newValue ? newValue.format('DD-MM-YYYY') : '');
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </LocalizationProvider>
          {/* Category */}
          <Controller
            name="category"
            control={control} 
            render={({field}) => (
              <TextField {...field} id="category" label="category" select>
                {categories.map((category) => (
                  <MenuItem key={category.label} value={category.label}>
                    <ListItemIcon>
                      {category.icon}
                    </ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* Amount */}
          <Controller 
            name="amount"
            control={control}
            render={({field}) => {
              console.log(field);
              return (
              <TextField 
                {...field} 
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="amount" 
                type="number"
              />
              );
            }}
          />
          {/* Content */}
          <Controller
            name="content"
            control={control}
            render={({field}) => (
              <TextField {...field} label="detail" type="text" />
            )}
          />
          {/* Save button */}
          <Button 
            type="submit" 
            variant="contained" 
            color={currentType === "income"? "primary" : "error"} 
            fullWidth>
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
