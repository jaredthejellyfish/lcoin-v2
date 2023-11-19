import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowRightIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SubmitButton } from '@/components/submit-button';
import BackButton from '@/components/back-button';
import Notifier from '@/components/notifier';
import { updateUser } from '@/lib/actions';
import type { Database } from '@/lib/database';
import { getInitials } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LCoin - Edit profile',
  description: 'Created by Jared Hernandez.',
};

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
      <BackButton backPath="/profile" title="Edit profile" />
      <Avatar className="absolute w-12 h-12 m-1 right-5 top-10">
        <AvatarImage src={userProfile?.avatar_url || undefined} />
        <AvatarFallback>
          {session && userProfile && userProfile.full_name
            ? getInitials(userProfile?.full_name)
            : 'N/A'}
        </AvatarFallback>
      </Avatar>
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
        <SubmitButton />
      </form>
      <Notifier searchParams={props.searchParams} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
