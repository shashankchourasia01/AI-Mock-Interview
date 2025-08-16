"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link"; // added

function Header() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className={`flex flex-col p-4 bg-gray-100 shadow-sm relative`}>
      <div className="flex items-center justify-between">
        <Image src={"/logo.svg"} width={130} height={80} alt="logo" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link
              href="/dashboard"
              className={`text-black hover:text-[#1575C2] hover:font-bold tracking-wide cursor-pointer ${
                path == "/dashboard" && "text-blue-700 font-bold"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/questions"
              className={`text-black hover:text-[#1575C2] hover:font-bold tracking-wide cursor-pointer ${
                path == "/dashboard/questions" && "text-primary font-bold"
              }`}
            >
              Questions
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/upgrade"
              className={`text-black hover:text-[#1575C2] hover:font-bold tracking-wide cursor-pointer ${
                path == "/dashboard/upgrade" && "text-primary font-bold"
              }`}
            >
              Upgrade
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/how_it_works"
              className={`text-black hover:text-[#1575C2] hover:font-bold tracking-wide cursor-pointer ${
                path == "/dashboard/how_it_works" && "text-blue-700 font-bold"
              }`}
            >
              How it Works
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center text-black">
          {menuOpen ? (
            <X
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        <UserButton />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="w-full bg-white shadow-md flex flex-col gap-4 p-4 md:hidden z-50 mt-4">
          <li>
            <Link
              href="/dashboard"
              className={`text-black hover:text-[#1575C2] hover:font-bold cursor-pointer ${
                path == "/dashboard" && "text-blue-700 font-bold"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/questions"
              className={`text-black hover:text-[#1575C2] hover:font-bold cursor-pointer ${
                path == "/dashboard/questions" && "text-primary font-bold"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Questions
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/upgrade"
              className={`text-black hover:text-[#1575C2] hover:font-bold cursor-pointer ${
                path == "/dashboard/upgrade" && "text-primary font-bold"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Upgrade
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/how_it_works"
              className={`text-black hover:text-[#1575C2] hover:font-bold cursor-pointer ${
                path == "/dashboard/how_it_works" && "text-blue-700 font-bold"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              How it Works
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Header;
