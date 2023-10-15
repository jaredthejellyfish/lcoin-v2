'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { Database } from '@/lib/database';
import { UserSchema } from '@/lib/schemas';

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

  if (error) redirect("/profile/edit?error=Unauthorized");

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
