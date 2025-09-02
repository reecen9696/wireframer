"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Div } from "@/components/Div";
import ControlPanel from "@/components/ControlPanel";
import WinEventPopup from "@/components/WinEventPopup";
import { useWallet } from "@/contexts/WalletContext";

type Round = {
  number: number;
  date: string;
  time: string;
  numbers: number[];
  powerball: number;
  results: {
    division: string;
    prize: string;
    combinations: number[];
    powerballMatch: boolean;
    winners: number;
  }[];
  tickets: {
    numbers: number[];
    powerball: number;
    stake: string;
    winnings: string;
    status: "lost" | "won" | "pending";
  }[];
  winningTickets: {
    numbers: number[];
    powerball: number;
    stake: string;
    winnings: string;
    division: string;
  }[];
};

const mockRounds: Round[] = [
  {
    number: 53,
    date: "05 May 2025",
    time: "23:30",
    numbers: [12, 24, 35, 42, 67],
    powerball: 18,
    results: [
      {
        division: "Jackpot",
        prize: "320,000.00",
        combinations: [5, 5, 5, 5, 5],
        powerballMatch: true,
        winners: 0,
      },
      {
        division: "2nd",
        prize: "120,000.00",
        combinations: [5, 5, 5, 5, 5],
        powerballMatch: false,
        winners: 1,
      },
      {
        division: "3rd",
        prize: "80,000.00",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: true,
        winners: 11,
      },
      {
        division: "4th",
        prize: "43,000.00",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: false,
        winners: 220,
      },
      {
        division: "5th",
        prize: "80,000.00",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: true,
        winners: 11,
      },
      {
        division: "6th",
        prize: "43,000.00",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: false,
        winners: 220,
      },
      {
        division: "7th",
        prize: "43,000.00",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: false,
        winners: 220,
      },
    ],
    tickets: [
      {
        numbers: [5, 12, 23, 45, 67],
        powerball: 8,
        stake: "0.20000",
        winnings: "0.00000",
        status: "lost",
      },
      {
        numbers: [12, 24, 35, 42, 55],
        powerball: 18,
        stake: "0.20000",
        winnings: "43.50000",
        status: "won",
      },
      {
        numbers: [7, 19, 28, 33, 49],
        powerball: 15,
        stake: "0.20000",
        winnings: "0.00000",
        status: "lost",
      },
    ],
    winningTickets: [
      {
        numbers: [12, 24, 35, 42, 55],
        powerball: 18,
        stake: "0.20000",
        winnings: "43.50000",
        division: "4th",
      },
    ],
  },
  {
    number: 52,
    date: "02 May 2025",
    time: "23:30",
    numbers: [8, 15, 29, 44, 58],
    powerball: 22,
    results: [
      {
        division: "Jackpot",
        prize: "485,420.31250000",
        combinations: [5, 5, 5, 5, 5],
        powerballMatch: true,
        winners: 1,
      },
      {
        division: "2nd",
        prize: "38,650.22150000",
        combinations: [5, 5, 5, 5, 5],
        powerballMatch: false,
        winners: 2,
      },
      {
        division: "3rd",
        prize: "19,850.15720000",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: true,
        winners: 8,
      },
      {
        division: "4th",
        prize: "20,120.85430000",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: false,
        winners: 195,
      },
    ],
    tickets: [
      {
        numbers: [8, 15, 29, 44, 58],
        powerball: 22,
        stake: "0.20000",
        winnings: "485420.31250",
        status: "won",
      },
      {
        numbers: [3, 17, 25, 39, 61],
        powerball: 14,
        stake: "0.20000",
        winnings: "0.00000",
        status: "lost",
      },
    ],
    winningTickets: [
      {
        numbers: [8, 15, 29, 44, 58],
        powerball: 22,
        stake: "0.20000",
        winnings: "485420.31250",
        division: "Jackpot",
      },
    ],
  },
];

export default function Design1Home() {
  const [currency, setCurrency] = useState("SOL");
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [showResults, setShowResults] = useState(true);
  const [tableView, setTableView] = useState<"results" | "tickets" | "winning">(
    "results"
  );
  const [showWinEvent, setShowWinEvent] = useState(false);

  const { isWalletConnected, connectWallet } = useWallet();

  const currentRound = mockRounds[currentRoundIndex];

  const goToPreviousRound = () => {
    if (currentRoundIndex < mockRounds.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
    }
  };

  const goToNextRound = () => {
    if (currentRoundIndex > 0) {
      setCurrentRoundIndex(currentRoundIndex - 1);
    }
  };

  const handleTriggerWinEvent = () => {
    setShowWinEvent(true);
  };

  const handleCloseWinEvent = () => {
    setShowWinEvent(false);
  };

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
          <Link href="/design-2/ticket-selection">
            <button className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-10 py-2 text-1xl font-bold mt-2">
              Play Now
            </button>
          </Link>
        </div>

        {showResults && (
          <>
            <Div className="rounded-full px-4 mt-24">
              {/* Round Info */}
              <div className="text-center mb-6">
                <h2 className="text-md font-bold text-[#020202] mb-2">
                  Round #{currentRound.number}
                </h2>
              </div>
              {/* Navigation and Numbers */}
              <div className="flex items-center justify-center gap-8 mb-4">
                {/* Left Arrow */}
                <button
                  onClick={goToPreviousRound}
                  disabled={currentRoundIndex >= mockRounds.length - 1}
                  className={`w-12 h-12 rounded-full border-2 border-[#020202] flex items-center justify-center ${
                    currentRoundIndex >= mockRounds.length - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#F5F5F5]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[#020202]">
                    chevron_left
                  </span>
                </button>

                {/* Drawn Numbers */}
                <div className="flex gap-3">
                  {currentRound.numbers.map((number, i) => (
                    <span
                      key={i}
                      className="w-14 h-14 rounded-full border-2 border-[#020202] bg-[#eaeaea] text-[#020202] flex items-center justify-center text-lg font-bold"
                    >
                      {number}
                    </span>
                  ))}
                  <span className="w-14 h-14 rounded-full border-2 border-red-500 bg-red-500 text-white flex items-center justify-center text-lg font-bold">
                    {currentRound.powerball}
                  </span>
                </div>

                {/* Right Arrow */}
                <button
                  onClick={goToNextRound}
                  disabled={currentRoundIndex <= 0}
                  className={`w-12 h-12 rounded-full border-2 border-[#020202] flex items-center justify-center ${
                    currentRoundIndex <= 0
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#F5F5F5]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[#020202]">
                    chevron_right
                  </span>
                </button>
              </div>

              {/* Date and Time */}
              <div className="text-center mb-8">
                <p className="text-lg text-[#020202]">
                  {currentRound.date}, {currentRound.time}
                </p>
              </div>
            </Div>
            {/* Results Section */}
            <div className="w-full max-w-[1200px] mt-16">
              <Div className="w-full p-8">
                {/* Table View Toggles */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setTableView("results")}
                    className={`px-4 py-2 rounded-full border-2 border-[#020202] font-semibold ${
                      tableView === "results"
                        ? "bg-[#020202] text-white"
                        : "bg-white text-[#020202]"
                    }`}
                  >
                    Results
                  </button>
                  <button
                    onClick={() => setTableView("tickets")}
                    disabled={!isWalletConnected}
                    className={`px-4 py-2 rounded-full border-2 border-[#020202] font-semibold ${
                      !isWalletConnected
                        ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                        : tableView === "tickets"
                        ? "bg-[#020202] text-white"
                        : "bg-white text-[#020202]"
                    }`}
                  >
                    Tickets
                  </button>
                  <button
                    onClick={() => setTableView("winning")}
                    disabled={!isWalletConnected}
                    className={`px-4 py-2 rounded-full border-2 border-[#020202] font-semibold ${
                      !isWalletConnected
                        ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                        : tableView === "winning"
                        ? "bg-[#020202] text-white"
                        : "bg-white text-[#020202]"
                    }`}
                  >
                    Winning Tickets
                  </button>
                </div>

                {/* Results Table */}
                {tableView === "results" && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-[#020202]">
                          <th className="text-left p-4 text-lg font-bold text-[#020202]">
                            Prize Divisions
                          </th>
                          <th className="text-left p-4 text-lg font-bold text-[#020202]">
                            Prizes
                          </th>
                          <th className="text-left p-4 text-lg font-bold text-[#020202]">
                            Combinations
                          </th>
                          <th className="text-left p-4 text-lg font-bold text-[#020202]">
                            Winners
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRound.results.map((result, index) => (
                          <tr key={index} className="border-b border-[#E5E5E5]">
                            <td className="p-4 text-[#020202] font-semibold">
                              {result.division}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Image
                                  src={
                                    currency === "ETH"
                                      ? "/eth.svg"
                                      : "/solana.svg"
                                  }
                                  alt={currency}
                                  width={20}
                                  height={20}
                                />
                                <span className="text-[#020202] font-bold">
                                  {result.prize}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-1 items-center">
                                {result.combinations.map((_, i) => (
                                  <span
                                    key={i}
                                    className="w-6 h-6 rounded-full bg-yellow-300 border border-[#020202] flex items-center justify-center"
                                  >
                                    <span className="w-2 h-2 rounded-full bg-[#020202]"></span>
                                  </span>
                                ))}
                                {result.powerballMatch && (
                                  <span className="w-6 h-6 rounded-full bg-red-500 border border-[#020202] flex items-center justify-center ml-1">
                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#020202]">
                                  emoji_events
                                </span>
                                <span className="text-[#020202] font-bold">
                                  {result.winners.toLocaleString()}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Tickets Table */}
                {tableView === "tickets" && (
                  <div className="overflow-x-auto">
                    {!isWalletConnected ? (
                      <div className="text-center py-12">
                        <p className="text-lg text-gray-400 mb-4">
                          Connect your wallet to view your tickets
                        </p>
                        <button
                          onClick={connectWallet}
                          className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-6 py-2 font-bold"
                        >
                          Connect Wallet
                        </button>
                      </div>
                    ) : (
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-[#020202]">
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Your Lottery Numbers
                            </th>
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Stake
                            </th>
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Winnings
                            </th>
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRound.tickets.map((ticket, index) => (
                            <tr
                              key={index}
                              className="border-b border-[#E5E5E5]"
                            >
                              <td className="p-4">
                                <div className="flex gap-2 items-center">
                                  {ticket.numbers.map((num, i) => (
                                    <span
                                      key={i}
                                      className="w-8 h-8 rounded-full border-2 border-[#020202] bg-[#eaeaea] text-[#020202] flex items-center justify-center text-sm font-bold"
                                    >
                                      {num}
                                    </span>
                                  ))}
                                  <span className="w-8 h-8 rounded-full border-2 border-red-500 bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                                    {ticket.powerball}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={
                                      currency === "ETH"
                                        ? "/eth.svg"
                                        : "/solana.svg"
                                    }
                                    alt={currency}
                                    width={20}
                                    height={20}
                                  />
                                  <span className="text-[#020202] font-bold">
                                    {ticket.stake}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={
                                      currency === "ETH"
                                        ? "/eth.svg"
                                        : "/solana.svg"
                                    }
                                    alt={currency}
                                    width={20}
                                    height={20}
                                  />
                                  <span className="text-[#020202] font-bold">
                                    {ticket.winnings}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    ticket.status === "won"
                                      ? "bg-green-100 text-green-800"
                                      : ticket.status === "lost"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {ticket.status === "won"
                                    ? "Won"
                                    : ticket.status === "lost"
                                    ? "Lost"
                                    : "Pending"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Winning Tickets Table */}
                {tableView === "winning" && (
                  <div className="overflow-x-auto">
                    {!isWalletConnected ? (
                      <div className="text-center py-12">
                        <p className="text-lg text-gray-400 mb-4">
                          Connect your wallet to view your winning tickets
                        </p>
                        <button
                          onClick={connectWallet}
                          className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-6 py-2 font-bold"
                        >
                          Connect Wallet
                        </button>
                      </div>
                    ) : (
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-[#020202]">
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Your Lottery Numbers
                            </th>
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Stake
                            </th>
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Winnings
                            </th>
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Division
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRound.winningTickets.length > 0 ? (
                            currentRound.winningTickets.map((ticket, index) => (
                              <tr
                                key={index}
                                className="border-b border-[#E5E5E5]"
                              >
                                <td className="p-4">
                                  <div className="flex gap-2 items-center">
                                    {ticket.numbers.map((num, i) => (
                                      <span
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-[#020202] bg-[#eaeaea] text-[#020202] flex items-center justify-center text-sm font-bold"
                                      >
                                        {num}
                                      </span>
                                    ))}
                                    <span className="w-8 h-8 rounded-full border-2 border-red-500 bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                                      {ticket.powerball}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <Image
                                      src={
                                        currency === "ETH"
                                          ? "/eth.svg"
                                          : "/solana.svg"
                                      }
                                      alt={currency}
                                      width={20}
                                      height={20}
                                    />
                                    <span className="text-[#020202] font-bold">
                                      {ticket.stake}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <Image
                                      src={
                                        currency === "ETH"
                                          ? "/eth.svg"
                                          : "/solana.svg"
                                      }
                                      alt={currency}
                                      width={20}
                                      height={20}
                                    />
                                    <span className="text-[#020202] font-bold">
                                      {ticket.winnings}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-bold">
                                    {ticket.division}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="p-8 text-center">
                                <p className="text-lg text-[#020202]">
                                  No winning tickets for this round
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </Div>
            </div>
          </>
        )}
      </main>

      <ControlPanel
        showResults={showResults}
        onToggleResults={setShowResults}
        onTriggerWinEvent={handleTriggerWinEvent}
      />

      <WinEventPopup
        isOpen={showWinEvent}
        onClose={handleCloseWinEvent}
        currency={currency}
        winAmount="485,420.31250"
        drawNumber={52}
        winningNumbers={[8, 15, 29, 44, 58]}
        powerball={22}
      />
    </div>
  );
}
