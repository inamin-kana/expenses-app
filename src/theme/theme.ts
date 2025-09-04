import { ExpenseCategory } from './../types/index';
import { PaletteColor, SimplePaletteColorOptions, createTheme } from "@mui/material";
import { amber, blue, cyan, deepOrange, green, lightBlue, lightGreen, pink, red } from "@mui/material/colors";
import { IncomeCategory } from "../types";

declare module "@mui/material/styles" {
    interface Palette {
        incomeColor: PaletteColor;
        expenseColor: PaletteColor;
        balanceColor: PaletteColor;
        incomeCategoryColor: Record<IncomeCategory, string>;
        expenseCategoryColor: Record<ExpenseCategory, string>;
    }

    interface PaletteOptions {
        incomeColor?: SimplePaletteColorOptions;
        expenseColor?: SimplePaletteColorOptions;
        balanceColor?: SimplePaletteColorOptions;
        incomeCategoryColor?: Partial<Record<IncomeCategory, string>>;
        expenseCategoryColor?: Partial<Record<ExpenseCategory, string>>;
    }
}

export const theme = createTheme ({
    typography: {
        fontFamily: "Lato, sans-serif",
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },

    palette: {
        incomeColor: {
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        expenseColor: {
            main: red[500],
            light: red[100],
            dark: red[700],
        },
        balanceColor: {
            main: green[500],
            light: green[100],
            dark: green[700],
        },

        incomeCategoryColor: {
            sueldo: lightBlue[600],
            'ingresos extra': cyan[200],
            paga: lightGreen["A700"],
        },
        expenseCategoryColor: {
            comida: deepOrange[500],
            'productos básicos': lightGreen[500],
            vivienda: amber[500],
            ocio: pink[300],
            transporte: cyan[200],
        },
    },
});
