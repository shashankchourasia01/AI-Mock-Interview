"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-gray-100 shadow-sm">
      <Image src={"/logo.svg"} width={130} height={80} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li
          className={`text-black hover:text-[#1575C2] hover:font-bold tracking-wide cursor-pointer ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`text-black hover:text-[#1575C2] hover:font-bold tracking-wide cursor-pointer ${
            path == "/dashboard/questions" && "text-primary font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`text-black hover:text-[#1575C2] hover:font-bold tracking-wide cursor-pointer ${
            path == "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`text-black hover:text-[#1575C2] hover:font-bold tracking-wide cursor-pointer ${
            path == "/dashboard/how_it_works" && "text-primary font-bold"
          }`}
        >
          How its Works
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
