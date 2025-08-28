"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

type ControlPanelProps = {
  showResults?: boolean;
  onToggleResults?: (show: boolean) => void;
  showJackpot?: boolean;
  onToggleJackpot?: (show: boolean) => void;
};

export default function ControlPanel({
  showResults = true,
  onToggleResults,
  showJackpot = false,
  onToggleJackpot,
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getPageToggles = () => {
    if (pathname === "/design-2") {
      return (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showResults}
              onChange={(e) => onToggleResults?.(e.target.checked)}
              className="accent-[#020202]"
            />
            <span className="text-[#020202] text-sm">Show Results History</span>
          </label>
        </div>
      );
    }

    if (pathname === "/design-2/ticket-selection") {
      return (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showJackpot}
              onChange={(e) => onToggleJackpot?.(e.target.checked)}
              className="accent-[#020202]"
            />
            <span className="text-[#020202] text-sm">Show Jackpot Info</span>
          </label>
        </div>
      );
    }

    return (
      <div className="text-[#020202] text-sm">No toggles for this page</div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Panel */}
      {isOpen && (
        <div className="bg-white border-2 border-[#020202] rounded-xl p-4 mb-2 shadow-lg min-w-[200px]">
          <h3 className="text-[#020202] font-bold mb-3 text-sm">UI Controls</h3>
          {getPageToggles()}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-[#020202] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
      >
        <span className="material-symbols-outlined">
          {isOpen ? "close" : "settings"}
        </span>
      </button>
    </div>
  );
}
