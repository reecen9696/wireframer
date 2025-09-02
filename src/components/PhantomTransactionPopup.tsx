"use client";
import { useEffect } from "react";
import Image from "next/image";

interface PhantomTransactionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  amount: string;
  transactionId?: string;
}

export default function PhantomTransactionPopup({
  isOpen,
  onClose,
  onAccept,
  amount,
  transactionId = "3K2b9F8mN7qR1pV4xC6tL9sM8nB5vD2wA7eR3fG4hJ1k",
}: PhantomTransactionPopupProps) {
  // Close popup on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent background scrolling when popup is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        onClick={onClose}
      />

      {/* Popup positioned in top-right */}
      <div className="relative bg-white rounded-lg shadow-2xl border border-gray-200 w-80 mt-4 mr-4 overflow-hidden">
        {/* Header with Phantom branding */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </div>
            <span className="text-white font-semibold text-sm">
              Phantom Wallet
            </span>
          </div>
        </div>

        {/* Transaction Icon Circle - Top Center */}
        <div className="flex justify-center -mt-4 mb-4">
          <div className="w-12 h-12 bg-white rounded-full border-4 border-purple-600 flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-purple-600 text-xl">
              swap_horiz
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Transaction Details */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Transaction
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Review and confirm your lottery ticket purchase
            </p>
          </div>

          {/* Transaction Info */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Amount</span>
              <div className="flex items-center gap-2">
                <Image src="/solana.svg" alt="SOL" width={16} height={16} />
                <span className="font-semibold text-gray-900">
                  {amount} SOL
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="text-xs font-mono text-gray-500 max-w-32 truncate">
                {transactionId}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Network Fee</span>
              <span className="text-sm text-gray-900">≈ 0.00025 SOL</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
