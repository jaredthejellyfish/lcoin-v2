import { BadgeEuroIcon } from "lucide-react";
import AnimatedTabs from "@/components/tabs";

import TransactionSearch from "@/components/transaction-search";
import Transactions from "@/components/transactions";
import Navigation from "@/components/navigation";

import React from "react";

export default async function Home() {
  return (
    <main>
      <Navigation />
      <div className="px-4">
        <TransactionSearch />
        <AnimatedTabs />
        <div className="w-full mt-3 dark:bg-neutral-500/10 border-neutral-200 dark:border-transparent shadow-sm border rounded-xl p-4">
          <div className="flex flex-row items-end justify-between">
            <span className="flex flex-row">
              <span className="text-3xl flex items-end justify-center font-semibold">
                € 1
              </span>
              <span className="text-xl flex items-end pb-0.5 font-semibold">
                ,77
              </span>
            </span>

            <BadgeEuroIcon className="h-8 w-8 rounded-full p-1.5 bg-blue-500/20 dark:text-blue-300/60 text-blue-700/60" />
          </div>

          {/* <div className="flex flex-row">
            <span className="text-xs text-neutral-300">All accounts</span>
            <span className="text-xs text-neutral-500 pr-0.5 pl-1">·</span>
            <span className="text-xs text-neutral-500">Total balance</span>
          </div> */}
          <Transactions />
         

        </div>
      </div>
    </main>
  );
}
