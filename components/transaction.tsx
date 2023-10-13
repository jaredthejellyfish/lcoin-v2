import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

type Props = {
  name: string;
  amount: number;
  date: string;
  description?: string;
  image?: string;
};

const Transaction = (props: Props) => {
  const { name, amount, date, description, image } = props;
  return (
    <div id="transaction" className="flex flex-row items-center gap-3">
      <Image
        src={image || "https://github.com/shadcn.png"}
        alt="Transaction logo"
        width={38}
        height={38}
        className="rounded-full"
      />
      <span className="flex flex-col w-full">
        <span className="flex flex-row text-sm justify-between w-full">
          <span>{name}</span>
          <span>- €{amount}</span>
        </span>
        <span className="text-xs text-neutral-500">{description} - {date}</span>
      </span>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Transaction));
