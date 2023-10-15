import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowRightIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

import { SubmitButton } from '@/components/submit-button';
import { updateUser } from '@/lib/actions';
import { Database } from '@/lib/database';
import Notifier from '@/components/notifier';

type Props = { searchParams: { error?: string; update?: string } };

export default async function AccountEdit(props: Props) {
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
    <div className="px-3 py-4">
      <Link href="/profile">
        <ArrowRightIcon className="mb-2 rotate-180" />
        <span className="sr-only">Return</span>
      </Link>
      <h1 className="text-3xl font-bold max-w-[80%]">Edit profile</h1>
      <h3 className="mt-4 font-medium">Personal information</h3>

      <form
        action={updateUser}
        className="flex flex-col gap-0 mt-1 mb-4 text-sm"
      >
        <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 mb-3 flex pb-3 flex-col px-3 py-2.5 rounded-xl">
          <label className="text-[0.8em] font-regular text-neutral-500 mb-0.5">
            Name
          </label>
          <input
            className="bg-transparent outline-none"
            type="text"
            name="fullName"
            pattern="[A-Za-z\s\-]{1,}"
            title="Only letters, spaces, and hyphens are allowed."
            minLength={1}
            maxLength={100}
            defaultValue={userProfile.full_name || undefined}
          />
        </div>
        <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 mb-3 flex pb-3 flex-col px-3 py-2.5 rounded-xl">
          <label className="text-[0.8em] font-regular text-neutral-500 mb-0.5">
            Username
          </label>
          <input
            className="bg-transparent outline-none"
            type="text"
            name="username"
            maxLength={19}
            pattern="[A-Za-z0-9\-]{1,}"
            title="Only letters and numbers allowed."
            defaultValue={userProfile.username || undefined}
          />
        </div>
        <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 mb-5 flex pb-3 flex-col px-3 py-2.5 rounded-xl">
          <label className="text-[0.8em] font-regular text-neutral-500 mb-0.5">
            Website
          </label>
          <input
            className="bg-transparent outline-none"
            type="text"
            name="website"
            defaultValue={userProfile.website || undefined}
          />
        </div>
        <SubmitButton />
      </form>
      <Notifier searchParams={props.searchParams} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
