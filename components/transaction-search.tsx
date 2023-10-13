"use client";

import React from "react";
import { Input } from "./ui/input";

import dynamic from "next/dynamic";

const TransactionSearchResults = dynamic(
  () => import("./transaction-search-results")
);



const TransactionSearch = () => {
  const [search, setSearch] = React.useState<string>("");

  return (
    <div className='relative' >
      <Input
        className="h-9"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      {search.length >= 3 &&
        <TransactionSearchResults search={search} />}
    </div>
  );
};

export default TransactionSearch;
