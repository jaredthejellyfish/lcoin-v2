'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import React from 'react';

import { store } from '@/store/store';

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  const { children } = props;
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
};

export default Providers;
