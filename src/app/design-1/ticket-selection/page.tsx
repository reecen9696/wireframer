"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function TicketSelection() {
  const [ticketCount, setTicketCount] = useState(1);
  const [currency, setCurrency] = useState("ETH");

  return (
    <>
      <Navbar currency={currency} setCurrency={setCurrency} />
      <section className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-[#020202] text-center">
          Select Tickets
        </h2>
        {/* Step 1: Entry Type */}
        <div className="bg-[#F5F5F5] rounded-xl p-6 mb-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-[#020202] text-center">
            Entry Type
          </h3>
          <div className="flex gap-8 justify-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="entryType"
                defaultChecked
                className="accent-[#020202]"
              />
              <span className="text-[#020202]">Standard Entry</span>
            </label>
            <label className="flex items-center gap-2 relative">
              <input
                type="radio"
                name="entryType"
                className="accent-[#020202]"
              />
              <span className="text-[#020202]">PowerPlay Entry</span>
              <span
                className="material-symbols-outlined text-base ml-1 cursor-pointer"
                title="PowerPlay multiplies non-jackpot winnings."
              >
                info
              </span>
            </label>
          </div>
        </div>

        {/* Step 2: Number of Tickets */}
        <div className="bg-[#F5F5F5] rounded-xl p-6 mb-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-[#020202] text-center">
            Number of Tickets
          </h3>
          <div className="flex gap-4 items-center justify-center">
            <button
              className="rounded-full border-2 border-[#020202] px-4 py-1 text-[#020202] font-semibold"
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
            >
              -
            </button>
            <span className="text-lg font-bold text-[#020202]">
              {ticketCount}
            </span>
            <button
              className="rounded-full border-2 border-[#020202] px-4 py-1 text-[#020202] font-semibold"
              onClick={() => setTicketCount(ticketCount + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Step 3: Ticket Selection (Row Style) */}
        <div className="bg-[#F5F5F5] rounded-xl p-6 mb-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2 text-[#020202] text-center">
            Your Tickets
          </h3>
          <div className="flex flex-col gap-4 w-full items-center">
            {[...Array(ticketCount)].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white rounded-lg p-4 w-full max-w-lg justify-center"
              >
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      className="w-10 h-10 rounded-full bg-[#F5F5F5] border-2 border-[#020202] text-center text-lg font-bold text-[#020202]"
                      placeholder="--"
                    />
                  ))}
                  <input
                    className="w-10 h-10 rounded-full bg-red-500 border-2 border-[#020202] text-center text-lg font-bold text-white"
                    placeholder="PB"
                  />
                </div>
                <div className="flex flex-col gap-2 ml-auto">
                  <button className="rounded-full border-2 border-[#020202] px-3 py-1 text-[#020202] font-semibold">
                    Quick Pick
                  </button>
                  <button className="rounded-full border-2 border-[#020202] px-3 py-1 text-[#020202] font-semibold">
                    Clear
                  </button>
                </div>
              </div>
            ))}
            {/* Bulk controls */}
            <div className="flex gap-4 mt-2 justify-center">
              <button className="rounded-full border-2 border-[#020202] px-4 py-1 text-[#020202] font-semibold">
                Auto-fill All
              </button>
              <button className="rounded-full border-2 border-[#020202] px-4 py-1 text-[#020202] font-semibold">
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Step 4: Cost & Total (Sticky Footer) */}
        <div className="sticky bottom-0 left-0 w-full bg-[#F5F5F5] rounded-t-xl p-6 flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <span className="text-lg text-[#020202] font-bold">
              Tickets: {ticketCount}
            </span>
            <span className="text-lg text-[#020202] font-bold">
              Total: ${(2 * ticketCount).toFixed(2)}
            </span>
            <select
              className="rounded-lg border-2 border-[#020202] px-2 py-1 text-[#020202] font-semibold"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
            </select>
          </div>
          <button className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-8 py-3 text-lg font-bold hover:bg-[#F5F5F5]">
            Buy Tickets
          </button>
        </div>
      </section>
    </>
  );
}
