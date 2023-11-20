import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateGravatarUrl, getInitials } from '@/lib/utils';
import RealtimeTransactions from './realtime-transactions';
import ModeToggle from '@/components/theme-toggle';
import type { Database } from '@/lib/database';

const Navigation = async () => {
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

  return (
    <div
      id="header"
      className="flex flex-row justify-center items-center px-3 py-3"
    >
      <Link href={'/profile'} className="flex flex-row items-center space-x-2">
        <Avatar className="h-8 w-8 m-1">
          <AvatarImage
            src={
              userProfile?.avatar_url ||
              generateGravatarUrl(userProfile?.username)
            }
          />
          <AvatarFallback>
            {session && !error && userProfile && userProfile.full_name
              ? getInitials(userProfile?.full_name)
              : 'N/A'}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">
          {userProfile?.full_name?.split(' ')[0]}
        </h3>
      </Link>
      <div className="flex flex-row items-center ml-auto">
        <ModeToggle />
        <RealtimeTransactions />
      </div>
    </div>
  );
};

export default Navigation;
