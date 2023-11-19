import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowRightIcon, BadgeEuroIcon, Link } from 'lucide-react';
import { cookies } from 'next/headers';
import React from 'react';

import TransactionSearch from '@/components/transaction-search';
import type { ExtendedTransaction } from '@/lib/databaseTypes';
import Transactions from '@/components/transactions';
import Navigation from '@/components/navigation';
import type { Database } from '@/lib/database';
import SendReceive from '@/components/SendReceive';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: userProfile, error } = session
    ? await supabase
        .from('profiles')
        .select('*')
        .eq('id', session!.user?.id)
        .single()
    : { data: null, error: true };

  const { data: userTransactions } = userProfile
    ? await supabase
        .from('transactions')
        .select('*')
        .or(`sender_id.eq.${userProfile.id},receiver_id.eq.${userProfile.id}`)
        .order('created_at', { ascending: false })
        .limit(3)
    : { data: null };

  if (!session || !userProfile || error) {
    return (
      <>
        <Link href="/">
          <ArrowRightIcon className="mb-2 rotate-180" />
          <span className="sr-only">Return</span>
        </Link>
        <p>Access denied</p>
      </>
    );
  }

  return (
    <main>
      <Navigation />
      <div className="px-4 ">
        <TransactionSearch />
        <div className="w-full mt-3 dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent shadow-sm border rounded-xl p-4">
          <div className="flex flex-row items-end justify-between">
            <span className="flex flex-row">
              <span className="text-3xl flex items-end justify-center font-semibold mr-0.5">
                ₺
              </span>
              <span className="text-3xl flex items-end justify-center font-semibold">
                {userProfile.balance.toString().split('.')[0]}
              </span>
              <span className="text-xl flex items-end pb-0.5 font-semibold">
                ,{userProfile.balance.toString().split('.')[1] || '00'}
              </span>
            </span>

            <BadgeEuroIcon className="h-8 w-8 rounded-full p-1.5 bg-lcoin/20 dark:text-lcoin/60 text-lcoin/60" />
          </div>

          <div className="flex flex-row">
            <span className="text-xs text-neutral-300">All accounts</span>
            <span className="text-xs text-neutral-500 pr-0.5 pl-1">·</span>
            <span className="text-xs text-neutral-500">Total balance</span>
          </div>
          <SendReceive />
          {userTransactions && userTransactions.length > 0 && (
            <Transactions
              userID={userProfile.id}
              initialTransactions={userTransactions as ExtendedTransaction[]}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';
