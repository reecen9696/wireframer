"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useWallet } from "@/contexts/WalletContext";

export default function WalletDropdown() {
  const { user, disconnectWallet } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDisconnect = () => {
    disconnectWallet();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-6 py-2 font-bold"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
      >
        Wallet
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-xl border-2 border-[#020202] shadow-lg z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-600">
                  person
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#020202]">{user.name}</p>
                <p className="text-xs text-gray-500">Connected</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link
              href="/account"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-[#020202]"
              onClick={() => setIsOpen(false)}
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Edit Account</span>
            </Link>

            <button
              onClick={handleDisconnect}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-red-600 border-t border-gray-200"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
