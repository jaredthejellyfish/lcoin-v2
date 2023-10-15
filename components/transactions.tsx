import React from "react";

import Link from "next/link";
import Transaction from "./transaction";
import dynamic from "next/dynamic";



const Transactions = () => {
  return (
    <div id="transactions" className="flex flex-col">
      <span className="text-xs text-neutral-500 mb-3 mt-2">Transactions</span>
      <div id="transaction-list" className="flex flex-col gap-5">
        <Transaction
          name={"Spotify"}
          amount={9.99}
          date={"Today"}
          description={"Spotify Premium"}
        />
        <Transaction
          name={"Linode"}
          amount={129.99}
          date={"Today"}
          description={"Linode VPS"}
        />
        <Transaction
          name={"Amazon"}
          amount={0.29}
          date={"Today"}
          description={"Amazon Web Services"}
        />
      </div>

      <Link
        href="/transactions"
        className="text-base text-lcoin w-full flex justify-center items-center mt-3 mb-0"
      >
        See all
      </Link>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Transactions));
