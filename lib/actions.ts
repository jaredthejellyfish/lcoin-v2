'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { PostgrestError } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { UserProfile } from '@/lib/databaseTypes';
import { UserSchema } from '@/lib/schemas';
import { Database } from '@/lib/database';

function isEqual<T extends { [key: string]: unknown }>(
  obj1: T,
  obj2: T,
): boolean {
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      JSON.stringify(obj1[key as keyof T]) !==
        JSON.stringify(obj2[key as keyof T])
    ) {
      return false;
    }
  }

  return true;
}

export async function updateUser(formData: FormData) {
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

  if (error) redirect('/profile/edit?error=Unauthorized');

  const fullNameForm = formData.get('fullName');
  const fullName =
    typeof fullNameForm === 'string' ? fullNameForm : userProfile?.full_name;

  const usernameForm = formData.get('username');
  const username =
    typeof usernameForm === 'string' ? usernameForm : userProfile?.username;

  const websiteForm = formData.get('website');
  const website =
    typeof websiteForm === 'string' ? websiteForm : userProfile?.website;

  const newUserProfile = UserSchema.safeParse({
    avatar_url: userProfile?.avatar_url,
    balance: userProfile?.balance,
    full_name: fullName,
    id: session?.user!.id as string,
    updated_at: new Date().toISOString(),
    username,
    website,
  });

  if (!newUserProfile.success)
    redirect('/profile/edit?error=' + newUserProfile.error.issues[0].message);

  if (newUserProfile?.data.id !== session?.user?.id)
    redirect('/profile/edit?error=Unauthorized');

  // ensure old and new profile are not the same without updated_at
  const userProfileWithoutUpdatedAt = { ...userProfile };
  delete userProfileWithoutUpdatedAt.updated_at;

  const newUserProfileWithoutUpdatedAt = { ...newUserProfile.data };
  delete newUserProfileWithoutUpdatedAt.updated_at;

  if (isEqual(userProfileWithoutUpdatedAt, newUserProfileWithoutUpdatedAt))
    redirect('/profile/edit?error=No changes made');

  const { error: updateError } = await supabase.from('profiles').upsert({
    ...newUserProfile.data,
  });

  if (updateError) redirect('/profile/edit?error=Update failed');

  revalidatePath('/profile');
  revalidatePath('/profile/edit');
  revalidatePath('/');

  redirect('/profile?update=true');
}

export async function createTransaction(formData: FormData) {
  const receiver = (formData.get('iban') as string) || null;
  const concept = (formData.get('concept') as string) || null;
  const amount = (formData.get('amount') as string) || null;

  // Input validation
  if (
    !receiver ||
    typeof receiver !== 'string' ||
    !concept ||
    typeof concept !== 'string' ||
    !amount
  ) {
    redirect('/transactions/send?error=Invalid input');
  }

  const validatedAmount = Math.abs(parseFloat(amount));

  if (validatedAmount <= 0) {
    redirect('/transactions/send?error=Invalid amount');
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  // get the sender user profile
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Authentication check
  if (!session) redirect('/transactions/send?error=No session');

  const { data: senderUserProfile, error: senderUserProfileError } =
    (await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()) as { data: UserProfile; error: PostgrestError | null };

  if (senderUserProfileError || !senderUserProfile) {
    console.error(senderUserProfileError);
    redirect('/transactions/send?error=Error fetching sender profile');
  }

  if (senderUserProfile.balance < validatedAmount) {
    console.error('Not enough balance');
    redirect('/transactions/send?error=Not enough balance');
  }

  // get the receiver user profile
  const { data: receiverUserProfile, error: receiverUserProfileError } =
    (await supabase
      .from('profiles')
      .select('*')
      .eq('iban', receiver)
      .single()) as { data: UserProfile; error: PostgrestError | null };

  if (receiverUserProfileError || !receiverUserProfile) {
    console.error(receiverUserProfileError);
    redirect('/transactions/send?error=Error fetching receiver profile');
  }

  if (senderUserProfile.id === receiverUserProfile.id) {
    console.error('Sender and receiver cannot be the same');
    redirect('/transactions/send?error=Sender and receiver cannot be the same');
  }

  // create the transaction
  const { error: transactionError } = await supabase
    .from('transactions')
    .insert([
      {
        sender_id: senderUserProfile.id,
        receiver_id: receiverUserProfile.id,
        concept,
        amount: validatedAmount,
      },
    ]);

  console.error(transactionError);

  if (transactionError) {
    console.error(transactionError);
    redirect('/transactions/send?error=Error creating transaction');
  }

  revalidatePath('/');

  redirect('/');
}
