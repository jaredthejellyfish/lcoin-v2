import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React from 'react';

import type { Transaction as TransactionType } from '@/lib/databaseTypes';
import type { Database } from '@/lib/database';
import Transaction from './transaction';

type Props = {
  search: string;
};

const fetchSearchResults = async (search: string) => {
  const supabase = createClientComponentClient<Database>({});

  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.error(sessionError);
    throw sessionError;
  }

  if (!session || !session.session?.user?.id) {
    throw new Error('No session');
  }

  const { data: matches, error } = await supabase.rpc(
    'fuzzy_transaction_search',
    {
      match_string: search,
      search_uid: session.session?.user?.id,
    },
  );

  if (error) {
    console.error(error);
    throw error;
  }
  return { uid: session.session.user.id, matches };
};

const TransactionSearchResults = (props: Props) => {
  const { search } = props;

  const { isError, data, error } = useQuery({
    queryKey: ['searchResults', search],
    queryFn: () => fetchSearchResults(search),
    enabled: search.length > 1,
  });

  if (isError) {
    console.error(error);
    return null;
  }

  return (
    <motion.div className="w-full bg-neutral-800 px-4 py-3 rounded mt-1.5 mr-3 absolute z-50">
      <div id="transactions" className="flex flex-col">
        <div id="transaction-list" className="flex flex-col gap-5">
          {data &&
            data.matches.map((transaction: TransactionType) => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                userID={data.uid}
              />
            ))}
          {!data || (data.matches && data.matches.length < 1) && <p>No matching transactions...</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionSearchResults;
