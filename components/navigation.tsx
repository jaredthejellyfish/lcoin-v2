
import React from 'react'
import ModeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BellIcon } from 'lucide-react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div
      id="header"
      className="flex flex-row justify-center items-center px-3 py-3"
    >
      <Link href={"/profile"} className="flex flex-row items-center space-x-2">
        <Avatar className="h-8 w-8 m-1">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">Jared</h3>
      </Link>
      <div className="flex flex-row items-center ml-auto">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <BellIcon className="h-9 w-9 p-2" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}

export default Navigation