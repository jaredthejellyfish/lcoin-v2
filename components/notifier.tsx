'use client';

import '@wypratama/react-qr/dist/style.css';
import { useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';

type Props = { searchParams: { error?: string; update?: string } };

const Notifier = (props: Props) => {
  const { toast } = useToast();
  const { error, update } = props.searchParams;

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
  }, [error, toast, update]);

  return null;
};

export default Notifier;
