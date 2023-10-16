'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';

import { UserProfile } from '@/lib/databaseTypes';

type Props = { userProfile: UserProfile; host: string };

const QRGenerator = (props: Props) => {
  const { userProfile } = props;
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('');

  const { username, iban } = userProfile;

  const url =
    props.host === 'localhost:3000'
      ? 'http://localhost:3000'
      : 'https://' + props.host;

  return (
    <>
      <div className="flex items-center justify-center mt-5 mb-9 ">
        <QRCode
          className="dark:border-transparent border border-neutral-300 shadow-sm rounded invert-colors p-2 bg-white"
          value={`${url}/transactions/send?iban=${iban}&username=${username}${
            amount !== '' ? `&amount=${amount}` : ''
          }${concept !== '' ? `&concept=${concept}` : ''}`}
        />
      </div>
      <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 flex pb-2 flex-col px-3 py-2.5 rounded-xl mb-3 placeholder:text-red-400">
        <input
          type="number"
          placeholder="Amount (optional)"
          className="bg-transparent outline-none custom-placeholder"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <div className="dark:bg-neutral-600/20 dark:border-transparent border border-neutral-300 flex pb-2 flex-col px-3 py-2.5 rounded-xl mb-3 placeholder:text-red-400">
        <input
          type="text"
          placeholder="Concept (optional)"
          className="bg-transparent outline-none custom-placeholder"
          value={concept}
          onChange={(e) => {
            setConcept(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default QRGenerator;
