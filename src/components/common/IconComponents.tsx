import React, { JSX } from 'react'
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { ExpenseCategory, IncomeCategory } from '../../types';
import AddHomeIcon from '@mui/icons-material/AddHome';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import TrainIcon from '@mui/icons-material/Train';
import WorkIcon from '@mui/icons-material/Work';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SavingsIcon from '@mui/icons-material/Savings';

const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
  'groceries': <FastfoodIcon fontSize='small'/>,
  'daily necessities':  <ShoppingBagIcon fontSize='small'/>,
  'housing expense': <AddHomeIcon fontSize='small'/>,
  'entertainment':  <SportsTennisIcon fontSize='small'/>,
  'transportation expenses':  <TrainIcon fontSize='small'/>,
  'salary': <WorkIcon fontSize='small'/>,
  'extra income': <AddBusinessIcon fontSize='small'/>,
  'pocket money': <SavingsIcon fontSize='small'/>,
}

export default IconComponents
