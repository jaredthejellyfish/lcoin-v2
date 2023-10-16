import { ArrowRightIcon, HelpCircle, LogOut, QrCode, User } from 'lucide-react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Notifier from '@/components/notifier';
import TextWithCopy from '@/components/text-with-copy';
import { Database } from '@/lib/database';
import { getInitials } from '@/lib/utils';

type Props = { searchParams: { error?: string; update?: string } };

export default async function Account(props: Props) {
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
      <Link href="/">
        <ArrowRightIcon className="mb-2 rotate-180" />
        <span className="sr-only">Return</span>
      </Link>
      <h1 className="text-3xl font-bold max-w-[80%]">
        {userProfile.full_name}
      </h1>
      <Avatar className="absolute w-12 h-12 m-1 right-5 top-10">
        <AvatarImage src={userProfile?.avatar_url || undefined} />
        <AvatarFallback>
          {session && userProfile && userProfile.full_name
            ? getInitials(userProfile?.full_name)
            : 'N/A'}
        </AvatarFallback>
      </Avatar>
      <h3 className="text-lcoin">@{userProfile.username || 'not available'}</h3>
      <div className="flex flex-row items-center gap-0 mt-5 mb-4 text-sm border shadow-sm dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent rounded-xl ">
        <HelpCircle className="w-5 h-5 m-3 text-lcoin" />
        Help
      </div>
      <h3 className="mt-4 font-medium">Account Details</h3>
      <div className="flex flex-col gap-0 mt-2 mb-4 text-sm border shadow-sm dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent rounded-xl">
        <div className="flex flex-row">
          <span className="py-2.5 px-3 dark:text-neutral-400 text-neutral-700 w-1/3">
            Name
          </span>
          <TextWithCopy text={userProfile.full_name} />
        </div>
        <div className="flex flex-row">
          <span className="py-2.5 px-3 dark:text-neutral-400 text-neutral-700 w-1/3">
            IBAN
          </span>
          <TextWithCopy text={userProfile.iban} />
        </div>
        <div className="flex flex-row">
          <span className="py-2.5 px-3 dark:text-neutral-400 text-neutral-700 w-1/3">
            Email
          </span>
          <TextWithCopy text={session.user.email} />
        </div>
      </div>
      <div className="flex flex-col gap-0 mt-2 mb-4 border shadow-sm dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent rounded-xl">
        <Link
          href="/profile/edit"
          className="flex flex-row items-center px-2 py-2 text-sm"
        >
          <User className="w-6 h-6 mr-3 text-lcoin" />
          <span className="dark:text-neutral-100 text-neutral-700">
            Edit Profile
          </span>
        </Link>
        <Link
          href="/profile/code"
          className="flex flex-row items-center px-2 py-2 text-sm"
        >
          <QrCode className="ml-0.5 w-5 h-5 mr-3.5 text-lcoin" />
          <span className="dark:text-neutral-100 text-neutral-700">
             Payment Code
          </span>
        </Link>
      </div>
      <div className="flex flex-col gap-0 mt-2 mb-4 border shadow-sm dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent rounded-xl">
        <form
          action="/api/auth/signout"
          method="post"
          className="flex flex-row items-center px-3 py-2 text-sm"
        >
          <LogOut className="w-5 h-6 mr-3 text-lcoin" />

          <button
            className="dark:text-neutral-100 text-neutral-700"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
      <Notifier searchParams={props.searchParams} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
