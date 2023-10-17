'use client';

import '@wypratama/react-qr/dist/style.css';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';

type Props = {
  searchParams: { error?: string; update?: string; login?: string };
};

const Notifier = (props: Props) => {
  const { toast } = useToast();
  const { error, update, login } = props.searchParams;

  useEffect(() => {
    if (error) {
      const newURL = window.location.pathname; // Get the current path without search params
      window.history.pushState({}, '', newURL);

      toast({
        variant: 'destructive',
        title: 'Error!',
        description:
          error.replace('+', ' ') ||
          'Something went wrong. Please try again later.',
      });
    }

    if (update) {
      const newURL = window.location.pathname; // Get the current path without search params
      window.history.pushState({}, '', newURL);

      toast({
        title: 'Success!',
        description: 'Your profile has been updated.',
      });
    }

    if (login) {
      const newURL = window.location.pathname; // Get the current path without search params
      window.history.pushState({}, '', newURL);

      toast({
        description: 'Welcome to LCoin!',
      });
    }
  }, [error, toast, update, login]);

  return null;
};

export default dynamic(() => Promise.resolve(Notifier), { ssr: false });
