import { formatDistanceToNow, parseJSON } from 'date-fns';
import dynamic from 'next/dynamic';
import React from 'react';

import type { Transaction as TransactionType } from '@/lib/databaseTypes';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { generateGravatarUrl, getInitials } from '@/lib/utils';

type Props = {
  transaction: TransactionType;
  userID: string;
  removeDate?: boolean;
};

const Transaction = (props: Props) => {
  const {
    amount,
    concept,
    created_at,
    sender_id,
    sender_username,
    receiver_username,
    receiver_avatar_url,
    sender_avatar_url,
  } = props.transaction;
  return (
    <div id="transaction" className="flex flex-row items-center gap-3">
      {props.userID === sender_id ? (
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={receiver_avatar_url || generateGravatarUrl(receiver_username)}
          />
          <AvatarFallback>
            {!receiver_avatar_url && sender_username
              ? getInitials(sender_username)
              : 'N/A'}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={sender_avatar_url || generateGravatarUrl(sender_username)}
          />
          <AvatarFallback>
            {!sender_avatar_url && receiver_username
              ? getInitials(receiver_username)
              : 'N/A'}
          </AvatarFallback>
        </Avatar>
      )}
      <span className="flex flex-col w-full">
        <span className="flex flex-row text-sm justify-between w-full">
          {props.userID === sender_id ? (
            <span>{receiver_username}</span>
          ) : (
            <span>{sender_username}</span>
          )}

          {props.userID === sender_id ? (
            <span>- ₺{amount}</span>
          ) : (
            <span>+ ₺{amount}</span>
          )}
        </span>
        <span className="text-xs text-neutral-500">
          {concept}{' '}
          {!props.removeDate &&
            `- ${formatDistanceToNow(parseJSON(created_at), {
              includeSeconds: true,
              addSuffix: true,
            })}
          `}
        </span>
      </span>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Transaction));
