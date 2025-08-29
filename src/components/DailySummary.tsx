import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";

interface DailySummaryProps {
  dailyTransactions: Transaction[]
}

const DailySummary = ({ dailyTransactions }: DailySummaryProps) => {
  const {income, expense, balance}  = financeCalculations(dailyTransactions);

  return (
    <Box>
      <Grid container spacing={2}>
        {/* 収入 */}
        <Grid size={6} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                Ingreso
              </Typography>
              <Typography
                // color={(theme) => theme.palette.incomeColor.main}
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all", color: (theme) => theme.palette.incomeColor.main }}
              >
                {formatCurrency(income)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 支出 */}
        <Grid size={6} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                Gasto
              </Typography>
              <Typography
                // color={(theme) => theme.palette.expenseColor.main}
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all", color: (theme) => theme.palette.expenseColor.main }}
              >
                {formatCurrency(expense)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 残高 */}
        <Grid size={12} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                Balance
              </Typography>
              <Typography
                // color={(theme) => theme.palette.balanceColor.main}
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all", color: (theme) => theme.palette.balanceColor.main }}
              >
                {formatCurrency(balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DailySummary;
