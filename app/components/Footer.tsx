"use client";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center gap-6 py-16">
      <div className="flex text-sm gap-1 font-medium hover:text-slate-200 ease-in-out transition-all duration-300 cursor-pointer">
        <Link className="" href="https://trishank.me">
          Developer Portfolio
        </Link>
        <span>
          <ArrowUpRight fontSize={20} />
        </span>
      </div>
      <Link
        href="/about"
        className="flex items-center text-sm font-medium hover:text-slate-200 ease-in-out"
      >
        <Github />
        <span className="pl-1 font-medium ">Github</span>
      </Link>
    </div>
  );
};

export default Footer;
