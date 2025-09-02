"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Design1Home() {
  const [currency, setCurrency] = useState("SOL");
  const [ticketCount] = useState(1); // For amount display, default 1

  function getAmount() {
    switch (currency) {
      case "SOL":
        return `${((2 * ticketCount) / 4.3).toFixed(2)}`;
      case "ETH":
        return `${((2 * ticketCount) / 0.23).toFixed(2)}`;
      default:
        return `${(2 * ticketCount).toFixed(2)}`;
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Navbar currency={currency} setCurrency={setCurrency} />
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full pt-24 pb-12 px-4">
        <div className="w-full max-w-[1200px] flex flex-col items-center">
          {/* Hero Section */}
          <h1 className="text-5xl font-extrabold text-[#020202] text-center mb-6">
            Powerball
          </h1>
          <div className="text-6xl font-extrabold text-[#020202] text-center mb-4">
            $815,000,000
          </div>
          <div className="text-2xl font-semibold text-[#020202] text-center mb-2">
            Closes in 02:13:45
          </div>
          <div className="text-base text-[#020202] text-center mb-8">
            Draws Aug 28, 9:00 PM EST
          </div>
          <Link href="/design-1/ticket-purchase">
            <button className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-10 py-4 text-2xl font-bold mt-2">
              Play Now
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
