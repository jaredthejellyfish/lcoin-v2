import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = { backPath: string; title: string };

function BackButton(props: Props) {
  return (
    <>
      <Link href={props.backPath}>
        <ArrowRightIcon className="mb-2 rotate-180" />
        <span className="sr-only">Return</span>
      </Link>
      <h1 className="text-3xl font-bold max-w-[80%] mt-3">{props.title}</h1>
    </>
  );
}

export default BackButton;
