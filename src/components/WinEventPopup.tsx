"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Confetti from "react-confetti";

interface WinEventProps {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  winAmount: string;
  drawNumber: number;
  winningNumbers: number[];
  powerball: number;
}

export default function WinEventPopup({
  isOpen,
  onClose,
  currency,
  winAmount,
  drawNumber,
  winningNumbers,
  powerball,
}: WinEventProps) {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWindowDimensions = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      updateWindowDimensions();
      window.addEventListener("resize", updateWindowDimensions);

      return () => window.removeEventListener("resize", updateWindowDimensions);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Stop confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [isOpen]);

  const handleClaimNow = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={200}
          recycle={false}
          colors={[
            "#FFD700",
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
          ]}
          gravity={0.3}
          initialVelocityX={5}
          initialVelocityY={20}
        />
      )}

      {/* Background overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(64, 64, 64, 0.8)" }}
        onClick={onClose}
      />
      {/* Popup content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 ease-out">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-green-600 mb-2">
              🎉 You Won! 🎉
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Image
                src={currency === "ETH" ? "/eth.svg" : "/solana.svg"}
                alt={currency}
                width={24}
                height={24}
              />
              <span className="text-3xl font-bold text-[#020202]">
                {winAmount}
              </span>
            </div>
          </div>

          {/* Draw info */}
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-[#020202] mb-4">
              Draw #{drawNumber}
            </p>

            {/* Winning numbers */}
            <div className="flex justify-center gap-2 mb-4">
              {winningNumbers.map((number, i) => (
                <span
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#020202] bg-[#eaeaea] text-[#020202] flex items-center justify-center text-sm font-bold"
                >
                  {number}
                </span>
              ))}
              <span className="w-10 h-10 rounded-full border-2 border-red-500 bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                {powerball}
              </span>
            </div>

            {/* View ticket link */}
            <p className="text-lg font-semibold text-[#020202] underline cursor-pointer hover:text-blue-600 transition-colors mb-4">
              View Ticket
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleClaimNow}
              className="w-full rounded-full border-2 border-green-600 bg-green-600 text-white px-6 py-3 font-bold hover:bg-green-700 transition-colors"
            >
              Claim Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
