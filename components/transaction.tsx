import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import type { Transaction as TransactionType } from '@/lib/databaseTypes';
import { formatDistanceToNow, parseJSON } from 'date-fns';

type Props = {
  transaction: TransactionType;
  userID: string;
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
        <Image
          src={receiver_avatar_url || 'https://github.com/shadcn.png'}
          alt="Transaction logo"
          width={38}
          height={38}
          className="rounded-full"
        />
      ) : (
        <Image
          src={sender_avatar_url || 'https://github.com/shadcn.png'}
          alt="Transaction logo"
          width={38}
          height={38}
          className="rounded-full"
        />
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
          {concept} -{' '}
          {formatDistanceToNow(parseJSON(created_at), {
            includeSeconds: true,
            addSuffix: true,
          })}
        </span>
      </span>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Transaction));
