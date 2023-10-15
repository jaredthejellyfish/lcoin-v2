'use client';

import { ClipboardCopy } from 'lucide-react';
import React from 'react';

import { useToast } from '@/components/ui/use-toast';

type Props = { text?: string | null; noClipboardIcon?: boolean };

const TextWithCopy = (props: Props) => {
  const { toast } = useToast();

  if (!props.text) return null;

  const onCopy = () => {
    navigator.clipboard.writeText(props.text || '');
    console.log('Copied: ' + props.text);
    toast({
      description: 'Copied to clipboard!',
    });
  };

  return (
    <button
      className="py-2.5 w-2/3 flex flex-row justify-end items-center pr-4 text-lcoin hover:scale-[101%] transition-transform duration-200 ease-in-out"
      onClick={() => onCopy()}
    >
      {!props.noClipboardIcon && <ClipboardCopy className="h-4 w-4 mr-2" />}
      <p>{props.text}</p>
    </button>
  );
};

export default TextWithCopy;
