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
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Controller, useForm } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
dayjs.extend(customParseFormat);

interface TransactionFormProps {
  onCloseForm: () => void,
  isEntryDrawerOpen: boolean,
  currentDay: string,
}
const TransactionForm = ({onCloseForm, isEntryDrawerOpen, currentDay}: TransactionFormProps) => {
  const formWidth = 320;

  // For use react hook
  const { control } = useForm({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: ""
    }
  });

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
            render={(field) => (
              <ButtonGroup fullWidth>
                <Button variant={"contained"} color="error">
                  Gasto
                </Button>
                <Button>Ingreso</Button>
              </ButtonGroup>
            )}
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
                <MenuItem value={"食費"}>
                  <ListItemIcon>
                    <FastfoodIcon />
                  </ListItemIcon>
                  食費
                </MenuItem>
              </TextField>
            )}
          />
          {/* Amount */}
          <Controller 
            name="amount"
            control={control}
            render={({field}) => (
              <TextField {...field} label="amount" type="number" />
            )}
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
          <Button type="submit" variant="contained" color={"primary"} fullWidth>
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
