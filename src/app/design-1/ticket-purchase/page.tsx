"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function TicketPurchase() {
  const [currency, setCurrency] = useState("ETH");

  return (
    <>
      <Navbar currency={currency} setCurrency={setCurrency} />
      <section className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-[#020202] text-center">
          Purchase Confirmation
        </h2>
        <div className="bg-[#F5F5F5] rounded-xl p-6 mb-6 flex flex-col items-center">
          <p className="text-lg text-[#020202] text-center">
            Purchase functionality will be implemented here.
          </p>
        </div>
      </section>
    </>
  );
}
