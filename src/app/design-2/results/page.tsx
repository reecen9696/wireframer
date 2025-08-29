"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Div } from "@/components/Div";

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
        prize: "500,691.51750000",
        combinations: [5, 5, 5, 5, 5],
        powerballMatch: true,
        winners: 0,
      },
      {
        division: "2nd",
        prize: "41,792.66912500",
        combinations: [5, 5, 5, 5, 5],
        powerballMatch: false,
        winners: 1,
      },
      {
        division: "3rd",
        prize: "21,241.07862500",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: true,
        winners: 11,
      },
      {
        division: "4th",
        prize: "21,378.97625000",
        combinations: [4, 4, 4, 4, 4],
        powerballMatch: false,
        winners: 220,
      },
      {
        division: "5th",
        prize: "16,378.97625000",
        combinations: [3, 3, 3, 3, 3],
        powerballMatch: true,
        winners: 582,
      },
      {
        division: "6th",
        prize: "16,378.97625000",
        combinations: [3, 3, 3, 3, 3],
        powerballMatch: false,
        winners: 10230,
      },
      {
        division: "7th",
        prize: "17,068.46437500",
        combinations: [2, 2, 2, 2, 2],
        powerballMatch: true,
        winners: 9850,
      },
      {
        division: "8th",
        prize: "16,792.66912500",
        combinations: [1, 1, 1, 1, 1],
        powerballMatch: true,
        winners: 57239,
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
      {
        division: "5th",
        prize: "15,220.65840000",
        combinations: [3, 3, 3, 3, 3],
        powerballMatch: true,
        winners: 520,
      },
      {
        division: "6th",
        prize: "15,450.28950000",
        combinations: [3, 3, 3, 3, 3],
        powerballMatch: false,
        winners: 9850,
      },
      {
        division: "7th",
        prize: "16,280.45720000",
        combinations: [2, 2, 2, 2, 2],
        powerballMatch: true,
        winners: 8920,
      },
      {
        division: "8th",
        prize: "15,950.42150000",
        combinations: [1, 1, 1, 1, 1],
        powerballMatch: true,
        winners: 52840,
      },
    ],
  },
];

export default function Design2Results() {
  const [currency, setCurrency] = useState<string>("ETH");
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

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

  return (
    <>
      <Navbar currency={currency} setCurrency={setCurrency} />
      <div className="min-h-screen bg-white flex flex-col items-center">
        <main className="w-full max-w-[1200px] pt-24 pb-12 px-4">
          {/* Central Box */}
          <Div className="w-full max-w-4xl p-8 mb-8">
            {/* Round Info */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#020202] mb-2">
                Round #{currentRound.number}
              </h2>
              <p className="text-lg text-[#020202]">
                {currentRound.date}, {currentRound.time}
              </p>
            </div>

            {/* Navigation and Numbers */}
            <div className="flex items-center justify-center gap-8 mb-8">
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

            {/* Results Table */}
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
                              currency === "ETH" ? "/eth.svg" : "/solana.svg"
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
          </Div>
        </main>
      </div>
    </>
  );
}
