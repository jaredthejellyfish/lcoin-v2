import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import ClearSearchParams from '@/components/clear-search-params';
import { SubmitButton } from '@/components/submit-button';
import { createTransaction } from '@/lib/actions';

type Props = {
  searchParams: {
    iban?: string;
    username?: string;
    amount?: string;
  };
};

const SendPage = (props: Props) => {
  return (
    <main className="p-3">
      <Link href="/">
        <ArrowRightIcon className="mb-2 rotate-180" />
        <span className="sr-only">Return</span>
      </Link>
      <h1 className="mb-3 text-3xl font-semibold">Account Details</h1>
      <form
        className="flex flex-col gap-0 mt-1 mb-4 text-sm"
        action={createTransaction}
      >
        <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 mb-3 flex pb-3 flex-col px-3 py-2.5 rounded-xl">
          <label className="text-[0.8em] font-regular text-neutral-500 mb-0.5">
            IBAN
          </label>
          <input
            className="bg-transparent outline-none"
            type="text"
            name="iban"
            defaultValue={props.searchParams.iban || undefined}
          />
        </div>
        <div className="flex flex-row items-center dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 mb-3 pb-2 px-3 py-2.5 rounded-xl">
          <label>@</label>
          <input
            className="bg-transparent outline-none ml-[2px] custom-placeholder"
            type="text"
            name="username"
            maxLength={19}
            defaultValue={props.searchParams.username || undefined}
            pattern="[A-Za-z0-9\-]{1,}"
            title="Only letters and numbers allowed."
            placeholder="username"
          />
        </div>
        <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 flex pb-2 flex-col px-3 py-2.5 rounded-xl mb-3 placeholder:text-red-400">
          <input
            className="bg-transparent outline-none custom-placeholder"
            type="text"
            name="concept"
            placeholder="Concept"
          />
        </div>
        <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 flex pb-3 flex-col px-3 py-2.5 rounded-xl mb-5">
          <label className="text-[0.8em] font-regular text-neutral-500 mb-0.5">
            Amount
          </label>
          <input
            className="bg-transparent outline-none"
            type="number"
            name="amount"
            defaultValue={props.searchParams.amount || undefined}
          />
        </div>
        <SubmitButton />
      </form>
      <ClearSearchParams searchParams={props.searchParams}/>
    </main>
  );
};

export default SendPage;
