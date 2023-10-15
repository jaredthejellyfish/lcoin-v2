'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import React from 'react';

import { Button } from '@/components/ui/button';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? 'Updating...' : 'Update'}
    </Button>
  );
}
