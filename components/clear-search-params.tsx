'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

type Props = {
  searchParams: Record<string, string>;
};

function ClearSearchParams(props: Props) {
  const { searchParams } = props;

  useEffect(() => {
    if (searchParams) {
      const newURL = window.location.pathname; // Get the current path without search params
      window.history.pushState({}, '', newURL);
    }
  }, [searchParams]);

  return null;
}

export default dynamic(() => Promise.resolve(ClearSearchParams), { ssr: false });
