"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Div } from "@/components/Div";
import ControlPanel from "@/components/ControlPanel";

const NUMBERS = 69;
const POWERBALLS = 26;
const TICKET_PRICE = 2;

type Ticket = {
  numbers: number[];
  powerball: number | null;
  powerPlay: boolean;
  favorite: boolean;
};

function getEmptyTicket(): Ticket {
  return {
    numbers: [],
    powerball: null,
    powerPlay: false,
    favorite: false,
  };
}

export default function Design2TicketSelection() {
  const [currency, setCurrency] = useState<string>("USDT");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket>(getEmptyTicket());
  const [showJackpot, setShowJackpot] = useState(false);

  // Add ticket to list
  function addTicket() {
    if (
      activeTicket.numbers.length === 5 &&
      (activeTicket.powerball || activeTicket.powerPlay)
    ) {
      setTickets([...tickets, activeTicket]);
      setActiveTicket(getEmptyTicket());
    }
  }

  // Quick pick for active ticket
  function quickPick() {
    const nums: number[] = [];
    while (nums.length < 5) {
      const n = Math.floor(Math.random() * NUMBERS) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    setActiveTicket({
      ...activeTicket,
      numbers: nums,
      powerball: Math.floor(Math.random() * POWERBALLS) + 1,
    });
  }

  // Clear active ticket
  function clearActive() {
    setActiveTicket(getEmptyTicket());
  }

  // Add quick pick ticket
  function addQuickPick() {
    const nums: number[] = [];
    while (nums.length < 5) {
      const n = Math.floor(Math.random() * NUMBERS) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    setTickets([
      ...tickets,
      {
        numbers: nums,
        powerball: Math.floor(Math.random() * POWERBALLS) + 1,
        powerPlay: false,
        favorite: false,
      },
    ]);
  }

  // Delete all tickets
  function deleteAll() {
    setTickets([]);
  }

  // Toggle powerplay for active ticket
  function togglePowerPlay() {
    setActiveTicket({ ...activeTicket, powerPlay: !activeTicket.powerPlay });
  }

  // Select number for active ticket
  function selectNumber(n: number) {
    if (activeTicket.numbers.includes(n)) {
      setActiveTicket({
        ...activeTicket,
        numbers: activeTicket.numbers.filter((x) => x !== n),
      });
    } else if (activeTicket.numbers.length < 5) {
      setActiveTicket({
        ...activeTicket,
        numbers: [...activeTicket.numbers, n],
      });
    }
  }

  // Select powerball for active ticket
  function selectPowerball(n: number) {
    if (activeTicket.powerball === n) {
      setActiveTicket({ ...activeTicket, powerball: null });
    } else {
      setActiveTicket({ ...activeTicket, powerball: n });
    }
  }

  // Remove ticket from list
  function removeTicket(idx: number) {
    setTickets(tickets.filter((_, i) => i !== idx));
  }

  // Toggle favorite for ticket
  function toggleFavorite(idx: number) {
    setTickets(
      tickets.map((t, i) => (i === idx ? { ...t, favorite: !t.favorite } : t))
    );
  }

  // Toggle powerplay for ticket
  function togglePowerPlayTicket(idx: number) {
    setTickets(
      tickets.map((t, i) => (i === idx ? { ...t, powerPlay: !t.powerPlay } : t))
    );
  }

  // Quick pick for ticket
  function quickPickTicket(idx: number) {
    const nums: number[] = [];
    while (nums.length < 5) {
      const n = Math.floor(Math.random() * NUMBERS) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    setTickets(
      tickets.map((t, i) =>
        i === idx
          ? {
              ...t,
              numbers: nums,
              powerball: Math.floor(Math.random() * POWERBALLS) + 1,
            }
          : t
      )
    );
  }

  // Calculate total
  function getTotal() {
    let total = tickets.length * TICKET_PRICE;
    // Add powerplay cost if needed (example: +$1 per powerplay)
    total += tickets.filter((t) => t.powerPlay).length * 1;

    const baseAmount = tickets.length * 0.2;
    const powerPlayAmount = tickets.filter((t) => t.powerPlay).length * 0.1;
    const totalAmount = baseAmount + powerPlayAmount;

    switch (currency) {
      case "ETH":
        return { amount: totalAmount.toFixed(5), icon: "/eth.svg", alt: "ETH" };
      case "SOL":
        return {
          amount: totalAmount.toFixed(5),
          icon: "/solana.svg",
          alt: "SOL",
        };
      default:
        return {
          amount: totalAmount.toFixed(5),
          icon: "/eth.svg",
          alt: "USDT",
        };
    }
  }

  return (
    <>
      <Navbar currency={currency} setCurrency={setCurrency} />
      <div className="min-h-screen bg-white flex flex-col items-center">
        {/* Jackpot Hero Section */}
        {showJackpot && (
          <div className="w-full max-w-[1200px] flex flex-col items-center pt-12 pb-8 px-4">
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
          </div>
        )}

        <main
          className={`w-full max-w-[1200px] flex flex-row gap-8 ${
            showJackpot ? "pt-8" : "pt-24"
          } pb-12`}
        >
          {/* Left: Number Selector */}
          <Div className="w-[70%] flex flex-col items-center py-12 ">
            <div className="w-full flex items-center mb-6 relative">
              <h2 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-[#020202] text-center">
                Powerball
              </h2>
            </div>
            {/* Selected numbers */}
            <div className="flex gap-2 mb-4 justify-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-bold ${
                    activeTicket.numbers[i]
                      ? "bg-[#eaeaea] text-[#020202] border-[#020202]"
                      : "bg-[#F5F5F5] border-[#E5E5E5] text-[#b0b0b0]"
                  }`}
                >
                  {activeTicket.numbers[i] || ""}
                </span>
              ))}
              <span
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-bold ${
                  activeTicket.powerPlay
                    ? "bg-yellow-300 text-[#020202] border-yellow-300"
                    : activeTicket.powerball
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-[#F5F5F5] border-[#E5E5E5] text-[#b0b0b0]"
                }`}
              >
                {activeTicket.powerball || "PB"}
              </span>
            </div>
            {/* Controls */}
            <div className="flex gap-4 mt-2 justify-center">
              <button
                className="rounded-full border-2 border-[#020202] px-4 py-1 text-[#020202] font-semibold"
                onClick={clearActive}
              >
                Clear All
              </button>
              <button
                className="rounded-full border-2 border-[#020202] px-4 py-1 text-[#020202] font-semibold"
                onClick={quickPick}
              >
                Auto Fill
              </button>
              <button
                className="rounded-full border-2 border-[#020202] px-4 py-1 text-white font-semibold bg-[#020202]"
                onClick={addTicket}
                disabled={
                  activeTicket.numbers.length !== 5 ||
                  (!activeTicket.powerball && !activeTicket.powerPlay)
                }
              >
                Add Ticket
              </button>
            </div>
            {/* Number grid */}
            <div className="mb-6">
              <div className="mb-2 font-semibold text-[#020202] mt-6">
                Pick 5 numbers
              </div>
              <div className="grid grid-cols-10 gap-2">
                {[...Array(NUMBERS)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-base font-bold transition-colors ${
                      activeTicket.numbers.includes(i + 1)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-[#eaeaea] text-[#020202] border-[#E5E5E5] hover:bg-blue-100"
                    }`}
                    disabled={
                      activeTicket.numbers.length >= 5 &&
                      !activeTicket.numbers.includes(i + 1)
                    }
                    onClick={() => selectNumber(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            {/* Powerball selector: always visible */}
            <div className="mb-6 justify-center items-center flex flex-col">
              <div className="mb-2 font-semibold text-[#020202] flex items-center justify-center gap-4">
                <span>Pick 1 Powerball</span>
                <button
                  className={`px-3 py-1 rounded-full border-2 border-[#020202] font-semibold ${
                    activeTicket.powerPlay ? "bg-yellow-300" : "bg-white"
                  }`}
                  onClick={togglePowerPlay}
                >
                  PowerPlay
                </button>
              </div>
              <div className="grid grid-cols-10 gap-2">
                {[...Array(POWERBALLS)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-base font-bold transition-colors ${
                      activeTicket.powerball === i + 1
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-[#eaeaea] text-[#020202] border-[#E5E5E5] hover:bg-red-100"
                    }`}
                    onClick={() => selectPowerball(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </Div>
          {/* Right: Ticket List / Summary */}
          <Div className="flex flex-col items-center px-2 py-12 relative w-[30%]">
            <aside className="p-4 flex flex-col items-start w-full h-full">
              <div className="w-full flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#020202]">
                  {tickets.length} Plays
                </h3>
                <button
                  className="text-[#020202] underline font-semibold"
                  onClick={deleteAll}
                >
                  Delete All
                </button>
              </div>
              {/* Ticket rows */}
              <div
                className="flex flex-col gap-4 w-full mb-8 overflow-y-auto"
                style={{ maxHeight: "620px" }}
              >
                {tickets.map((t, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg p-3 w-full"
                  >
                    {/* Numbers */}
                    <div className="flex gap-2">
                      {t.numbers.map((n, i) => (
                        <span
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-[#020202] flex items-center justify-center text-base font-bold text-[#020202]"
                        >
                          {n}
                        </span>
                      ))}
                      <span
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-base font-bold ${
                          t.powerPlay
                            ? "bg-yellow-300 text-[#020202] border-yellow-300"
                            : t.powerball
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-[#F5F5F5] border-[#E5E5E5] text-[#b0b0b0]"
                        }`}
                      >
                        {t.powerPlay ? "PB" : t.powerball || "PB"}
                      </span>
                    </div>
                    {/* Icons */}
                    <div className="flex gap-2 ml-auto">
                      <button
                        title="PowerPlay"
                        className={
                          t.powerPlay ? "text-yellow-500" : "text-[#020202]"
                        }
                        onClick={() => togglePowerPlayTicket(idx)}
                      >
                        <span className="material-symbols-outlined text-xl">
                          bolt
                        </span>
                      </button>
                      <button
                        title="Delete"
                        className="text-[#020202]"
                        onClick={() => removeTicket(idx)}
                      >
                        <span className="material-symbols-outlined text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Footer Section (fixed to bottom of Div) */}
              <div className="w-full absolute bottom-0 left-0  py-4 border-t flex flex-col gap-4">
                <div className="flex flex-row gap-2 w-full px-4">
                  <button
                    className="rounded-full border-2 border-[#020202] px-6 py-2 text-[#020202] font-semibold w-full"
                    onClick={addQuickPick}
                  >
                    Quick Pick
                  </button>
                  <button
                    className="rounded-full border-2 border-[#020202] px-6 text-[#020202] font-semibold w-full"
                    onClick={() => {
                      const nums: number[] = [];
                      while (nums.length < 5) {
                        const n = Math.floor(Math.random() * NUMBERS) + 1;
                        if (!nums.includes(n)) nums.push(n);
                      }
                      setTickets([
                        ...tickets,
                        {
                          numbers: nums,
                          powerball: null,
                          powerPlay: true,
                          favorite: false,
                        },
                      ]);
                    }}
                  >
                    Quick PowerPlay
                  </button>
                </div>
                <div className="flex items-center justify-end w-full mt-2 px-4 gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={getTotal().icon}
                      alt={getTotal().alt}
                      className="w-5 h-5"
                    />
                    <span className="text-base font-bold text-[#020202]">
                      {getTotal().amount}
                    </span>
                  </div>
                  <button className="rounded-full bg-[#020202] text-white px-6 py-3 text-base font-bold w-2/3">
                    Buy Now
                  </button>
                </div>
              </div>
            </aside>
          </Div>
        </main>
      </div>
      <ControlPanel showJackpot={showJackpot} onToggleJackpot={setShowJackpot} />
    </>
  );
}
