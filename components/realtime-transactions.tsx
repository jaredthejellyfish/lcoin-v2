'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import { BellIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

import { addTransaction } from '@/store/features/transactionSlice';
import type { Transaction } from '@/lib/databaseTypes';
import { useAppDispatch } from '@/lib/reduxHooks';
import type { Database } from '@/lib/database';
import { Button } from './ui/button';

function RealtimeTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const supabase = createClientComponentClient<Database>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'transactions' },
        (payload) => {
          setTransactions((transactions: Transaction[]) => [
            ...transactions,
            payload.new as Transaction,
          ]);

          dispatch(addTransaction(payload.new as Transaction));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setTransactions, transactions, dispatch]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTransactions([])}
      className="relative"
    >
      <BellIcon className="h-9 w-9 p-2" />
      <span className="sr-only">Toggle theme</span>
      {transactions && transactions.length > 0 && (
        <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 border-2 border-white rounded-full top-0 -right-0.5 dark:border-gray-900"></div>
      )}
    </Button>
  );
}

export default dynamic(() => Promise.resolve(RealtimeTransactions));
