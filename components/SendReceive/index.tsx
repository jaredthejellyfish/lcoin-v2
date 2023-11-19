import { PlusIcon, SendIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function SendReceive() {
  return (
    <div className="flex flex-row items-center gap-2.5 mt-2">
      <Link href="/transactions/send">
        <button className="bg-lcoin/20 text-lcoin px-2 py-1.5 rounded-lg flex flex-row items-center justify-center">
          <SendIcon className="mr-2 w-3 h-3" />
          <p>Send</p>
        </button>
      </Link>
      <Link href="/transactions/receive">
        <button className="bg-lcoin/20 text-lcoin px-2 py-1.5 rounded-lg flex flex-row items-center justify-center">
          <PlusIcon className="mr-2 w-4 h-4" />
          <p>Receive</p>
        </button>
      </Link>
    </div>
  );
}

export default SendReceive;
