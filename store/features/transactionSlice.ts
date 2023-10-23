import type { Transaction } from '@/lib/databaseTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

// Define a type for the slice state
interface TransactionsState {
  transactions: Transaction[];
}

// Define the initial state using that type
const initialState: TransactionsState = {
  transactions: [],
};

export const transactionSlice = createSlice({
  name: 'tranasctions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      // Add the new transaction to the beginning of the array
      state.transactions.unshift(action.payload);

      // Optionally, you can remove the last transaction
      if (state.transactions.length > 2) {
        state.transactions.pop();
      }
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    }
  },
});

export const { addTransaction, setTransactions } = transactionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTransactions = (state: RootState) => state.transactions.transactions;

export default transactionSlice.reducer;
