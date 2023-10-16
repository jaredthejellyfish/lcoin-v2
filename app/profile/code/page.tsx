import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowRightIcon } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { headers } from 'next/headers';

import TextWithCopy from '@/components/text-with-copy';
import { Database } from '@/lib/database';
import QRGenerator from './qr-generator';

const PaymentCode = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const headersList = headers()
  const host = headersList.get('x-forwarded-host') || headersList.get('host')

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
      <h1 className="text-3xl font-bold max-w-[80%]">Payment Code</h1>
      <p className="mt-3 text-sm text-neutral-600 font-medium dark:text-neutral-400">
        This QR code represents your personal payment code (IBAN), allowing you
        to receive payments from other users.
      </p>
      <QRGenerator userProfile={userProfile} host={host || ""} />

      <div className="flex flex-col gap-0 mb-4 text-sm border shadow-sm dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent rounded-xl">
        <div className="flex flex-row">
          <span className="py-2.5 px-3 dark:text-neutral-400 text-neutral-700 w-1/3">
            Name
          </span>
          <TextWithCopy text={userProfile.full_name} />
        </div>
        <div className="flex flex-row">
          <span className="py-2.5 px-3 dark:text-neutral-400 text-neutral-700 w-1/3">
            User
          </span>
          <TextWithCopy text={`@${userProfile.username}`} />
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
    </div>
  );
};

export default PaymentCode;

export const dynamic = 'force-dynamic';
