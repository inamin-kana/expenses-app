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
  'comida': <FastfoodIcon fontSize='small'/>,
  'productos básicos':  <ShoppingBagIcon fontSize='small'/>,
  'vivienda': <AddHomeIcon fontSize='small'/>,
  'ocio':  <SportsTennisIcon fontSize='small'/>,
  'transporte':  <TrainIcon fontSize='small'/>,
  'sueldo': <WorkIcon fontSize='small'/>,
  'ingresos extra': <AddBusinessIcon fontSize='small'/>,
  'paga': <SavingsIcon fontSize='small'/>,
}

export default IconComponents
