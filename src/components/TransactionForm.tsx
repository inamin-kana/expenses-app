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
import CloseIcon from "@mui/icons-material/Close";

import React, { useEffect, JSX, useState } from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { esES } from "@mui/x-date-pickers/locales";
import { IncomeCategory, ExpenseCategory, Transaction } from "../types";
dayjs.extend(customParseFormat);

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>;
}

type IncomeExpense = "income" | "expense";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory,
  icon: JSX.Element
}

const TransactionForm = ({
  onCloseForm, 
  isEntryDrawerOpen, 
  currentDay, 
  onSaveTransaction,
  selectedTransaction,
  onDeleteTransaction,
  setSelectedTransaction,
  onUpdateTransaction,
}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories : CategoryItem[] = [
    { label: "comida", icon:  <FastfoodIcon fontSize='small'/> },
    { label: "productos básicos", icon:  <ShoppingBagIcon fontSize='small'/> },
    { label: "vivienda", icon:  <AddHomeIcon fontSize='small'/> },
    { label: "ocio", icon:  <SportsTennisIcon fontSize='small'/> },
    { label: "transporte", icon:  <TrainIcon fontSize='small'/> },
  ]

  const incomeCategories: CategoryItem[] = [
    { label: "sueldo", icon:  <WorkIcon fontSize='small'/> },
    { label: "ingresos extra", icon:  <AddBusinessIcon fontSize='small'/> },
    { label: "paga", icon:  <SavingsIcon fontSize='small'/> },
  ]

  const [categories, setCategories] = useState(expenseCategories);

  // For use react hook
  const { 
    control, 
    setValue, 
    watch, 
    formState:{errors}, 
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: ""
    },
    resolver: zodResolver(transactionSchema),
  });
  console.log(errors);

  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
    setValue("category", "");
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

  const onSubmit:SubmitHandler<Schema> = (data) => {
    console.log(data);
    if(selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id)
      .then(() => {
        console.log("Updated.");
        setSelectedTransaction(null);
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      onSaveTransaction(data)
      .then(() => {
        console.log("Saved.");
      })
      .catch((error) => {
        console.error(error);
      })
    }

    reset({
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    })
  }

  useEffect(() => {
    if(selectedTransaction) {
      const categoryExists = categories.some(
        (category) => category.label === selectedTransaction?.category
      );
      setValue("category", categoryExists ? selectedTransaction.category : "");
    }
  }, [selectedTransaction, categories])

  useEffect(() => {
    if(selectedTransaction) {
      setValue("type", selectedTransaction.type);
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      // setValue("category", selectedTransaction.category);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
        type: "expense",
        date: currentDay,
        amount: 0,
        category: "",
        content: "",
      });
    }
  }, [selectedTransaction]);

  const handleDelete = () => {
    if(selectedTransaction) {
      onDeleteTransaction(selectedTransaction.id);
      setSelectedTransaction(null);
    }
  }

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
        <Typography variant="h6">Formulario de entrada</Typography>
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
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
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
          {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Controller
              name="date"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => (
                <DatePicker 
                label="date"
                format="DD-MM-YYYY"
                value={value ? dayjs(value, 'DD-MM-YYYY') : null}
                onChange={(newValue, _ctx) => {
                  onChange(newValue ? newValue.format('DD-MM-YYYY') : '');
                }}
                slotProps={{ 
                  textField: { 
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  }
                }}
                
                />
              )}
            />
          </LocalizationProvider> */}
          <LocalizationProvider 
            dateAdapter={AdapterDayjs} 
            adapterLocale="es" 
            localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
          >
            <Controller
              name="date"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => {
                const pickerValue: Dayjs | null = value ? dayjs(value, "DD-MM-YYYY") : null;

                return (
                  <DatePicker
                    label="date"
                    format="DD-MM-YYYY"
                    value={pickerValue}
                    onChange={(newValue) => {
                      onChange(newValue ? dayjs(newValue).format("DD-MM-YYYY") : "");
                    }}          
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                );
              }}
            />
          </LocalizationProvider>
          {/* Category */}
          <Controller
            name="category"
            control={control} 
            render={({field}) => (
              <TextField 
                error={!!errors.category}
                helperText={errors.category?.message}
                {...field} 
                id="category" 
                label="category" 
                select
              >
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
                error={!!errors.amount}
                helperText={errors.amount?.message}
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
              <TextField 
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field} 
                label="detail" 
                type="text" 
              />
            )}
          />
          {/* Save button */}
          <Button 
            type="submit" 
            variant="contained" 
            color={currentType === "income"? "primary" : "error"} 
            fullWidth>
              {selectedTransaction ? "ACTUALIZAR" : "GUARDAR"}
          </Button>
          {/* Delete button */}
          {selectedTransaction && (
            <Button 
            onClick={handleDelete}
              variant="outlined" 
              color={"secondary"} 
              fullWidth>
              BORAR
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
