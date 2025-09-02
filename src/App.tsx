import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';
import { doc, deleteDoc } from "firebase/firestore";

function App() {
  // type for judge whether FireStore error or not.
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // console.log(currentMonth);
  // const a = format(currentMonth, "MM-yyyy");
  // console.log(a);

  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        // console.log(transactionsData);
        setTransactions(transactionsData);
      } catch(err) {
        // error
        if(isFireStoreError(err)) {
          console.error("Firebase error: ", err)
        } else {
          console.error("General error: ", err)
        }
      }
    }
    fetchTransactions();
  }, [])

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.endsWith(formatMonth(currentMonth))
  })
  // console.log(monthlyTransactions);

  // Save transaction data
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log(transaction);
    try {
      // Save data to firestore
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      // console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      // console.log(newTransaction);
      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ])
    } catch(err) {
      // error
      if(isFireStoreError(err)) {
        console.error("Firebase error: ", err)
      } else {
        console.error("General error: ", err)
      }
    }
  };

  const handleDeleteTransaction = async(transactionId: string) => {
    try {
      // delete data from Firestore
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filteredTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      // console.log(filteredTransaction);
      setTransactions(filteredTransactions);
    } catch(err) {
      // error
      if(isFireStoreError(err)) {
        console.error("Firebase error: ", err)
      } else {
        console.error("General error: ", err)
      }
    }
  };

  const handleUpdateTransaction = async(transaction: Schema, transactionId: string) => {
    try {
      // update data in Firestore
      const docRef = doc(db, "Transactions", transactionId);

      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, transaction);

      const updatedTransactions = transactions.map((t) => 
        t.id === transactionId ? {...t, ...transaction} : t
      ) as Transaction[];
      console.log(updatedTransactions);
      setTransactions(updatedTransactions);
    } catch(err) {
      // error
      if(isFireStoreError(err)) {
        console.error("Firebase error: ", err)
      } else {
        console.error("General error: ", err)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline /> {/* reset css in React */}
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={
            <Home 
              monthlyTransactions={monthlyTransactions} 
              setCurrentMonth={setCurrentMonth}
              onSaveTransaction={handleSaveTransaction}
              onDeleteTransaction={handleDeleteTransaction}
              onUpdateTransaction={handleUpdateTransaction}
              />
            }
            />
          <Route 
            path="report" 
            element={<Report
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
            />} 
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
