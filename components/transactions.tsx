'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import type { Transaction as TransactionType } from '@/lib/databaseTypes';
import { setTransactions } from '@/store/features/transactionSlice';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';
import type { RootState } from '@/store/store';
import Transaction from './transaction';

type Props = {
  initialTransactions: TransactionType[] | null;
  userID: string;
};

export default function Transactions(props: Props) {
  const { initialTransactions } = props;
  const [latestTransactions, setLatestTransactions] = useState<
    TransactionType[] | null
  >(initialTransactions);

  const transactions = useAppSelector(
    (state: RootState) => state.transactions.transactions,
  );

  const dispatch = useAppDispatch();

  const handleInitialTransactions = useCallback(() => {
    if (initialTransactions) {
      dispatch(setTransactions(initialTransactions));
      setLatestTransactions(initialTransactions);
    }
  }, [dispatch, initialTransactions]);

  // Call the function within the useEffect
  useEffect(() => {
    handleInitialTransactions();
  }, [handleInitialTransactions]);

  useEffect(() => {
    if (transactions.length > 0) {
      setLatestTransactions(transactions);
    }
  }, [transactions]);

  return (
    <div id="transactions" className="flex flex-col">
      <span className="text-xs text-neutral-500 mb-3 mt-2">Transactions</span>
      <div id="transaction-list" className="flex flex-col gap-5">
        {latestTransactions && latestTransactions.map(
          (transaction: TransactionType) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              userID={props.userID}
            />
          ),
        )}
        {!latestTransactions && <p>No transactions yet</p>}
      </div>
      <Link
        href="/transactions"
        className="text-base text-lcoin w-full flex justify-center items-center mt-3 mb-0"
      >
        See all
      </Link>
    </div>
  );
}
