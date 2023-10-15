import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { PostgrestError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import { UserProfile } from './../../../../lib/databaseTypes';

export async function POST(req: NextRequest) {
  const { receiver, concept, amount } = await req.json();

  // Input validation
  if (!receiver || !concept || !amount) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const validatedAmount = Math.abs(parseFloat(amount));

  // get the sender user profile
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Authentication check
  if (!session)
    return NextResponse.json({ error: 'No session' }, { status: 401 });

  const { data: senderUserProfile, error: senderUserProfileError } =
    (await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()) as { data: UserProfile; error: PostgrestError | null };

  if (senderUserProfileError)
    return NextResponse.json(
      { error: 'Error fetching sender profile' },
      { status: 500 },
    );

  if (senderUserProfile.balance < validatedAmount) {
    return NextResponse.json({ error: 'Not enough balance' }, { status: 400 });
  }

  // get the receiver user profile
  const { data: receiverUserProfile, error: receiverUserProfileError } =
    (await supabase
      .from('profiles')
      .select('*')
      .eq('id', receiver)
      .single()) as { data: UserProfile; error: PostgrestError | null };

  if (receiverUserProfileError)
    return NextResponse.json(
      { error: 'Error fetching receiver profile' },
      { status: 500 },
    );

  // create the transaction
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .insert([
      {
        sender_id: senderUserProfile.id,
        receiver_id: receiverUserProfile.id,
        concept,
        amount: validatedAmount,
      },
    ])
    .select();

  if (transactionError)
    return NextResponse.json(
      { error: 'Error creating transaction' },
      { status: 500 },
    );

  // update the sender balance

  const { error: senderError } = await supabase
    .from('profiles')
    .update({ balance: senderUserProfile.balance - validatedAmount })
    .eq('id', senderUserProfile.id)
    .select();

  if (senderError)
    return NextResponse.json(
      { error: 'Error updating sender balance' },
      { status: 500 },
    );

  // update the receiver balance
  const { error: receiverError } = await supabase
    .from('profiles')
    .update({ balance: receiverUserProfile.balance + validatedAmount })
    .eq('id', receiverUserProfile.id)
    .select();


  if (receiverError)
    return NextResponse.json(
      { error: 'Error updating receiver balance' },
      { status: 500 },
    );

  return NextResponse.json({ transaction });
}

export const dynamic = 'force-dynamic';
