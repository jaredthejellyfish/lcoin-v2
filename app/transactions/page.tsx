import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowRightIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

import type { Transaction as TransactionType } from '@/lib/databaseTypes';
import TransactionSearch from '@/components/transaction-search';
import Transaction from '@/components/transaction';
import type { Database } from '@/lib/database';

// Assuming the transaction structure is unknown; otherwise, define a specific type or interface

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDate(date, today)) {
    return 'Today';
  } else if (isSameDate(date, yesterday)) {
    return 'Yesterday';
  } else {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    // @ts-expect-error - TS doesn't know about the proper options for toLocaleDateString
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Convert the day to have a suffix (e.g., 1st, 2nd, 3rd, 4th)
    const dayWithSuffix = formattedDate.replace(
      /(\d{1,2})(st|nd|rd|th)/,
      (_, day, suffix) => {
        const dayNum = parseInt(day, 10);
        if (dayNum >= 11 && dayNum <= 13) {
          suffix = 'th';
        } else {
          switch (dayNum % 10) {
            case 1:
              suffix = 'st';
              break;
            case 2:
              suffix = 'nd';
              break;
            case 3:
              suffix = 'rd';
              break;
            default:
              suffix = 'th';
          }
        }
        return day + suffix;
      },
    );

    return dayWithSuffix;
  }
}

function isSameDate(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

const TransactionsPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: sessionData } = await supabase.auth.getSession();

  const userId = sessionData.session?.user.id; // Assuming this is where you get the user ID from
  if (!userId) {
    console.error('No user ID');
    return;
  }

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .limit(90);

  if (error) {
    console.error('Error fetching transactions:', error);
    return;
  }

  const groupedByDay: { [key: string]: TransactionType[] } =
    transactions.reduce(
      (acc, transaction) => {
        const dateKey: string = transaction.created_at.split('T')[0]; // 'T' is the separator between the date and time in ISO strings

        if (!acc[dateKey]) {
          acc[dateKey] = []; // Initialize if not already present
        }
        acc[dateKey].push(transaction);
        return acc;
      },
      {} as { [key: string]: TransactionType[] },
    ); // Type assertion for the initial value

  // If you need a count of transactions per day:
  const countByDay: { [key: string]: number } = {};
  for (const [key, value] of Object.entries(groupedByDay)) {
    countByDay[key] = value.length;
  }

  return (
    <main className="p-3">
      <Link href="/">
        <ArrowRightIcon className="mb-2 rotate-180" />
        <span className="sr-only">Return</span>
      </Link>
      <h1 className="mb-3 text-3xl font-semibold">Transactions</h1>
      <TransactionSearch />
      {Object.keys(groupedByDay).map((date) => (
        <div key={date}>
          <p className="my-2 text-lg font-semibold">{formatDate(date)}</p>
          <div className="w-full dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent shadow-sm border rounded-xl p-4 flex flex-col gap-y-4">
            {groupedByDay[date].map((transaction) => (
              <Transaction key={1} transaction={transaction} userID={userId} removeDate />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
};

export default TransactionsPage;
