"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
    date: "Aug 28",
    time: "9:00 PM EST",
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
      {
        numbers: [1, 15, 29, 38, 62],
        powerball: 18,
        stake: "0.20000",
        winnings: "8.75000",
        status: "won",
      },
      {
        numbers: [9, 22, 31, 47, 68],
        powerball: 12,
        stake: "0.20000",
        winnings: "0.00000",
        status: "lost",
      },
      {
        numbers: [3, 18, 27, 44, 59],
        powerball: 18,
        stake: "0.20000",
        winnings: "4.25000",
        status: "won",
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
      {
        numbers: [1, 15, 29, 38, 62],
        powerball: 18,
        stake: "0.20000",
        winnings: "8.75000",
        division: "6th",
      },
      {
        numbers: [3, 18, 27, 44, 59],
        powerball: 18,
        stake: "0.20000",
        winnings: "4.25000",
        division: "7th",
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
      {
        numbers: [6, 11, 33, 45, 67],
        powerball: 22,
        stake: "0.20000",
        winnings: "38650.22150",
        status: "won",
      },
      {
        numbers: [2, 19, 28, 41, 56],
        powerball: 9,
        stake: "0.20000",
        winnings: "0.00000",
        status: "lost",
      },
      {
        numbers: [4, 13, 24, 37, 52],
        powerball: 22,
        stake: "0.20000",
        winnings: "19850.15720",
        status: "won",
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
      {
        numbers: [6, 11, 33, 45, 67],
        powerball: 22,
        stake: "0.20000",
        winnings: "38650.22150",
        division: "2nd",
      },
      {
        numbers: [4, 13, 24, 37, 52],
        powerball: 22,
        stake: "0.20000",
        winnings: "19850.15720",
        division: "3rd",
      },
    ],
  },
];

const mockLeaderboard = [
  {
    id: 1,
    user: { name: "shuffleboi32", avatar: "/sapphire.svg", isHidden: false },
    betAmount: "500.00",
    payout: "2,500.00",
  },
  {
    id: 2,
    user: { name: "cryptoking", avatar: "/anonymous.svg", isHidden: true },
    betAmount: "1,200.00",
    payout: "15,000.00",
  },
  {
    id: 3,
    user: { name: "luckyplayer", avatar: "/sapphire.svg", isHidden: false },
    betAmount: "250.00",
    payout: "875.00",
  },
  {
    id: 4,
    user: { name: "anonymous", avatar: "/anonymous.svg", isHidden: true },
    betAmount: "800.00",
    payout: "4,200.00",
  },
  {
    id: 5,
    user: { name: "powerball_pro", avatar: "/sapphire.svg", isHidden: false },
    betAmount: "150.00",
    payout: "600.00",
  },
  {
    id: 6,
    user: { name: "hidden_whale", avatar: "/anonymous.svg", isHidden: true },
    betAmount: "2,000.00",
    payout: "25,000.00",
  },
];

export default function Design1Home() {
  const [currency, setCurrency] = useState("SOL");
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [showResults, setShowResults] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [tableView, setTableView] = useState<
    "leaderboard" | "results" | "tickets" | "winning"
  >("results");
  const [showWinEvent, setShowWinEvent] = useState(false);
  const [wonState, setWonState] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 13,
    seconds: 45,
  });

  const resultsRef = useRef<HTMLDivElement>(null);
  const { isWalletConnected, connectWallet } = useWallet();

  // Check if current round is the most recent (hasn't been drawn yet)
  const isCurrentRoundNotDrawn = currentRoundIndex === 0;

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: typeof timeLeft) => {
    return `${time.hours.toString().padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
      setTableView("winning");
      // Switch out of won state after claiming tickets
      setWonState(false);
    }
  };

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

  const handleClaimNow = () => {
    scrollToResults();
  };

  // Effect to handle tableView when leaderboard toggle changes
  useEffect(() => {
    if (!showLeaderboard && tableView === "leaderboard") {
      setTableView("results");
    }
  }, [showLeaderboard, tableView]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Navbar currency={currency} setCurrency={setCurrency} />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full pt-24 pb-12 px-4">
        <div className="w-full max-w-[1200px] flex flex-col items-center">
          {/* Hero Section */}
          {wonState ? (
            // Won State Hero
            <>
              <h1 className="text-5xl font-extrabold text-[#020202] text-center mb-6">
                🎉 You&apos;ve Won! 🎉
              </h1>
              <div className="text-2xl font-semibold text-[#020202] text-center mb-8">
                Click to claim tickets
              </div>
              <button
                onClick={scrollToResults}
                className="rounded-full border-2 border-[#020202] bg-[#020202] text-white px-10 py-2 text-1xl font-bold mt-2 hover:bg-gray-800"
              >
                Claim Tickets
              </button>
            </>
          ) : (
            // Normal State Hero
            <>
              <h1 className="text-5xl font-extrabold text-[#020202] text-center mb-6">
                Powerball
              </h1>
              <div className="text-6xl font-extrabold text-[#020202] text-center mb-4">
                $815,000,000
              </div>
              <div className="text-2xl font-semibold text-[#020202] text-center mb-2">
                Closes in {formatTime(timeLeft)}
              </div>
              <div className="text-base text-[#020202] text-center mb-8">
                Draws Aug 28, 9:00 PM EST
              </div>
              <Link href="/design-2/ticket-selection">
                <button className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-10 py-2 text-1xl font-bold mt-2">
                  Play Now
                </button>
              </Link>
            </>
          )}
        </div>

        {showResults && (
          <div ref={resultsRef} className="w-full max-w-[1200px]">
            {/* Round Info */}
            <div className="flex justify-center mt-24">
              <Div className="rounded-full px-6 py-4 inline-block">
                <div className="text-center mb-4">
                  <h2 className="text-md font-bold text-[#020202] mb-2">
                    Round #{currentRound.number}
                  </h2>
                </div>
                {/* Navigation and Numbers */}
                <div className="flex items-center justify-center gap-6 mb-4">
                  {/* Left Arrow */}
                  <button
                    onClick={goToPreviousRound}
                    disabled={currentRoundIndex >= mockRounds.length - 1}
                    className={`w-12 h-12 rounded-full border-2 border-[#020202] flex items-center justify-center flex-shrink-0 ${
                      currentRoundIndex >= mockRounds.length - 1
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[#020202]">
                      chevron_left
                    </span>
                  </button>

                  {/* Drawn Numbers - Compact container */}
                  <div className="flex gap-2">
                    {currentRound.numbers.map((number, i) => (
                      <span
                        key={i}
                        className="w-12 h-12 rounded-full border-2 border-[#020202] bg-[#eaeaea] text-[#020202] flex items-center justify-center text-base font-bold flex-shrink-0"
                      >
                        {number}
                      </span>
                    ))}
                    <span className="w-12 h-12 rounded-full border-2 border-red-500 bg-red-500 text-white flex items-center justify-center text-base font-bold flex-shrink-0">
                      {currentRound.powerball}
                    </span>
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={goToNextRound}
                    disabled={currentRoundIndex <= 0}
                    className={`w-12 h-12 rounded-full border-2 border-[#020202] flex items-center justify-center flex-shrink-0 ${
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
                <div className="text-center mb-4">
                  <p className="text-base text-[#020202]">
                    {currentRound.date}, {currentRound.time}
                  </p>
                </div>
              </Div>
            </div>

            {/* Results Section - Fixed width */}
            <div className="w-full mt-16 mb-32">
              <Div className="w-full p-8 min-h-[500px]">
                {/* Table View Toggles - Fixed width */}
                <div className="flex gap-2 mb-6 w-full">
                  {showLeaderboard && (
                    <button
                      onClick={() => setTableView("leaderboard")}
                      className={`px-4 py-2 rounded-full border-2 border-[#020202] font-semibold min-w-[120px] ${
                        tableView === "leaderboard"
                          ? "bg-[#020202] text-white"
                          : "bg-white text-[#020202]"
                      }`}
                    >
                      Leaderboard
                    </button>
                  )}
                  <button
                    onClick={() => setTableView("results")}
                    className={`px-4 py-2 rounded-full border-2 border-[#020202] font-semibold min-w-[100px] ${
                      tableView === "results"
                        ? "bg-[#020202] text-white"
                        : "bg-white text-[#020202]"
                    }`}
                  >
                    Prize Pool
                  </button>
                  <div className="relative">
                    <button
                      onClick={() =>
                        !isCurrentRoundNotDrawn &&
                        isWalletConnected &&
                        setTableView("tickets")
                      }
                      disabled={!isWalletConnected || isCurrentRoundNotDrawn}
                      className={`px-4 py-2 rounded-full border-2 border-[#020202] font-semibold min-w-[100px] ${
                        !isWalletConnected || isCurrentRoundNotDrawn
                          ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                          : tableView === "tickets"
                          ? "bg-[#020202] text-white"
                          : "bg-white text-[#020202]"
                      }`}
                      title={
                        !isWalletConnected
                          ? "Connect wallet to view"
                          : isCurrentRoundNotDrawn
                          ? "Lottery has not been drawn"
                          : ""
                      }
                    >
                      Tickets
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        !isCurrentRoundNotDrawn &&
                        isWalletConnected &&
                        setTableView("winning")
                      }
                      disabled={!isWalletConnected || isCurrentRoundNotDrawn}
                      className={`px-4 py-2 rounded-full border-2 border-[#020202] font-semibold min-w-[140px] ${
                        !isWalletConnected || isCurrentRoundNotDrawn
                          ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                          : tableView === "winning"
                          ? "bg-[#020202] text-white"
                          : "bg-white text-[#020202]"
                      }`}
                      title={
                        !isWalletConnected
                          ? "Connect wallet to view"
                          : isCurrentRoundNotDrawn
                          ? "Lottery has not been drawn"
                          : ""
                      }
                    >
                      Winning Tickets
                    </button>
                  </div>
                </div>

                {/* Table Content Container - Fixed height to prevent jumping */}
                <div className="w-full">
                  {/* Leaderboard Table */}
                  {tableView === "leaderboard" && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-[#020202]">
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              User
                            </th>
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Bet Amount
                            </th>
                            <th className="text-left p-4 text-lg font-bold text-[#020202]">
                              Payout
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockLeaderboard.map((entry) => (
                            <tr
                              key={entry.id}
                              className="border-b border-[#E5E5E5]"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                                    <Image
                                      src={entry.user.avatar}
                                      alt={
                                        entry.user.isHidden
                                          ? "Anonymous"
                                          : entry.user.name
                                      }
                                      width={40}
                                      height={40}
                                      className="rounded-full"
                                    />
                                  </div>
                                  <span className="text-[#020202] font-semibold">
                                    {entry.user.isHidden
                                      ? "Anonymous"
                                      : entry.user.name}
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
                                    {entry.betAmount}
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
                                    {entry.payout}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Prize Pool Table (formerly Results) */}
                  {tableView === "results" && (
                    <div className="overflow-x-auto">
                      {isCurrentRoundNotDrawn ? (
                        <div className="text-center py-12">
                          <p className="text-lg text-gray-400">
                            Lottery has not been drawn yet
                          </p>
                        </div>
                      ) : (
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
                              <tr
                                key={index}
                                className="border-b border-[#E5E5E5]"
                              >
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
                                      {isCurrentRoundNotDrawn
                                        ? "-"
                                        : result.winners.toLocaleString()}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
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
                            Connect
                          </button>
                        </div>
                      ) : isCurrentRoundNotDrawn ? (
                        <div className="text-center py-12">
                          <p className="text-lg text-gray-400">
                            Lottery has not been drawn yet
                          </p>
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
                            Connect
                          </button>
                        </div>
                      ) : isCurrentRoundNotDrawn ? (
                        <div className="text-center py-12">
                          <p className="text-lg text-gray-400">
                            Lottery has not been drawn yet
                          </p>
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
                              currentRound.winningTickets.map(
                                (ticket, index) => (
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
                                )
                              )
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
                </div>
              </Div>
            </div>
          </div>
        )}
      </main>

      <ControlPanel
        showResults={showResults}
        onToggleResults={setShowResults}
        showLeaderboard={showLeaderboard}
        onToggleLeaderboard={setShowLeaderboard}
        wonState={wonState}
        onToggleWonState={setWonState}
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
        onClaimNow={handleClaimNow}
      />
    </div>
  );
}
