"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@/contexts/WalletContext";
import WalletDropdown from "./WalletDropdown";

type NavbarProps = {
  currency: string;
  setCurrency: (c: string) => void;
};

export default function Navbar({ currency, setCurrency }: NavbarProps) {
  const { isWalletConnected, connectWallet } = useWallet();

  return (
    <nav className="w-full flex items-center justify-between py-6 px-4 mb-8">
      {/* Left: Logo/Brand */}
      <Link href="/design-2" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-3xl text-[#020202]">
          casino
        </span>
        <span className="text-2xl font-bold text-[#020202]">Shuffle</span>
      </Link>
      {/* Center: Currency Dropdown */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-white rounded-xl border-2 border-[#020202] px-6 py-2 gap-3 shadow-sm">
          <span className="w-7 h-7 flex items-center justify-center rounded-full border border-[#020202] bg-white">
            {currency === "ETH" ? (
              <Image src="/eth.svg" alt="ETH" width={20} height={20} />
            ) : currency === "SOL" ? (
              <Image src="/solana.svg" alt="SOL" width={20} height={20} />
            ) : null}
          </span>
          <span className="font-bold text-[#020202] text-xl">
            {currency === "ETH" ? "0.21" : currency === "SOL" ? "0.23" : "2.00"}
          </span>
          <select
            className="bg-transparent font-bold text-[#020202] focus:outline-none"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="SOL">SOL</option>
            <option value="ETH">ETH</option>
          </select>
        </div>
      </div>
      {/* Right: Wallet */}
      <div>
        {isWalletConnected ? (
          <WalletDropdown />
        ) : (
          <button
            className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-6 py-2 font-bold"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </div>
    </nav>
  );
}
