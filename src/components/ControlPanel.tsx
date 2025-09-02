"use client";
import React, { useState, useRef, useEffect } from "react";

interface ControlPanelProps {
  showResults?: boolean;
  onToggleResults?: (show: boolean) => void;
  showJackpot?: boolean;
  onToggleJackpot?: (show: boolean) => void;
  showLeaderboard?: boolean;
  onToggleLeaderboard?: (show: boolean) => void;
  wonState?: boolean;
  onToggleWonState?: (show: boolean) => void;
  onTriggerWinEvent?: () => void;
}

export default function ControlPanel({
  showResults,
  onToggleResults,
  showJackpot,
  onToggleJackpot,
  showLeaderboard,
  onToggleLeaderboard,
  wonState,
  onToggleWonState,
  onTriggerWinEvent,
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleWinEventToggle = () => {
    if (onTriggerWinEvent) {
      onTriggerWinEvent();
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40" ref={panelRef}>
      {/* Settings button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#020202] text-white flex items-center justify-center shadow-lg hover:bg-gray-800"
      >
        <span className="material-symbols-outlined">settings</span>
      </button>

      {/* Control panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-xl border-2 border-[#020202] shadow-lg p-4 w-64">
          <h3 className="text-lg font-bold text-[#020202] mb-4">
            Control Panel
          </h3>

          <div className="space-y-3">
            {onToggleResults && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#020202]">Show Results</span>
                <button
                  onClick={() => onToggleResults(!showResults)}
                  className={`w-12 h-6 rounded-full border-2 border-[#020202] relative transition-colors ${
                    showResults ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                      showResults ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            )}

            {onToggleJackpot && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#020202]">Show Jackpot</span>
                <button
                  onClick={() => onToggleJackpot(!showJackpot)}
                  className={`w-12 h-6 rounded-full border-2 border-[#020202] relative transition-colors ${
                    showJackpot ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                      showJackpot ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            )}

            {onToggleLeaderboard && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#020202]">Show Leaderboard</span>
                <button
                  onClick={() => onToggleLeaderboard(!showLeaderboard)}
                  className={`w-12 h-6 rounded-full border-2 border-[#020202] relative transition-colors ${
                    showLeaderboard ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                      showLeaderboard ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            )}

            {onToggleWonState && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#020202]">Won State</span>
                <button
                  onClick={() => onToggleWonState(!wonState)}
                  className={`w-12 h-6 rounded-full border-2 border-[#020202] relative transition-colors ${
                    wonState ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                      wonState ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            )}

            {onTriggerWinEvent && (
              <div className="border-t border-gray-200 pt-3">
                <button
                  onClick={handleWinEventToggle}
                  className="w-full rounded-full border-2 border-green-600 bg-green-600 text-white px-4 py-2 font-bold hover:bg-green-700"
                >
                  Win Event Toggle
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
