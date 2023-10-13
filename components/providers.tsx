"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SessionProvider } from 'next-auth/react';
const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
