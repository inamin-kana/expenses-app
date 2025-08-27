import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const MonthlySummary = () => {
  return (
    <Grid container spacing={{xs: 1, sm: 2}} mb={2}>
      {/* Income */}
      <Grid size={4} display={'flex'} flexDirection={"column"}>
        <Card 
          sx={{ 
            bgcolor: (theme) => theme.palette.incomeColor.main, 
            color: "white", 
            borderRadius: "10px",
            flexGrow: 1
          }}>
          <CardContent sx={{padding: {xs: 1, sm: 2}}}>
            <Stack direction={"row"}>
              <SouthIcon sx={{ fontSize: "2rem" }}/>
              <Typography>Income</Typography>
            </Stack>
            <Typography 
            variant="h5" 
            textAlign={"right"} 
            fontWeight={"fontWeightBold"}
            sx={{wordBreak: "break-word", fontSize: {xs: ".8rem", sm: "1rem", md: "1.2rem" }} }
            >30€</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Expenses */}
      <Grid size={4} display={'flex'} flexDirection={"column"}>
        <Card 
          sx={{ 
            bgcolor: (theme) => theme.palette.expenseColor.main,
            color: "white", 
            borderRadius: "10px",
            flexGrow: 1
          }}>
          <CardContent sx={{padding: {xs: 1, sm: 2}}}>
            <Stack direction={"row"}>
              <NorthIcon sx={{ fontSize: "2rem" }}/>
              <Typography>Expenses</Typography>
            </Stack>
            <Typography 
            variant="h5" 
            textAlign={"right"} 
            fontWeight={"fontWeightBold"}
            sx={{wordBreak: "break-word", fontSize: {xs: ".8rem", sm: "1rem", md: "1.2rem" }} }
            >30€</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* Balance */}
      <Grid size={4} display={'flex'} flexDirection={"column"}>
        <Card 
          sx={{ 
            bgcolor: (theme) => theme.palette.balanceColor.main,
            color: "white", 
            borderRadius: "10px",
            flexGrow: 1
          }}>
          <CardContent sx={{padding: {xs: 1, sm: 2}}}>
            <Stack direction={"row"}>
              <AccountBalanceIcon sx={{ fontSize: "2rem" }}/>
              <Typography>Balance</Typography>
            </Stack>
            <Typography 
            variant="h5" 
            textAlign={"right"} 
            fontWeight={"fontWeightBold"}
            sx={{wordBreak: "break-word", fontSize: {xs: ".8rem", sm: "1rem", md: "1.2rem" }} }
            >30€</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MonthlySummary
