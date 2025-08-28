import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] font-sans">
      {/* Top Navbar */}
      <nav className="w-full py-6 flex justify-center items-center border-b-0 bg-[#FFFFFF]">
        <h1 className="text-2xl font-bold text-[#020202] text-center">
          Shuffle Casino Wireframes
        </h1>
      </nav>

      {/* Wireframe List (scrollable) */}
      <main className="flex-1 overflow-y-auto px-4 py-10">
        <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
          <Link
            href="/design-1"
            className="bg-[#F5F5F5] rounded-xl flex items-center h-20 px-6 text-xl font-semibold text-[#020202] shadow-sm hover:scale-[1.02] transition-transform"
          >
            Design 1
          </Link>
          <Link
            href="/design-2"
            className="bg-[#F5F5F5] rounded-xl flex items-center h-20 px-6 text-xl font-semibold text-[#020202] shadow-sm hover:scale-[1.02] transition-transform"
          >
            Design 2
          </Link>
        </div>
      </main>

      {/* Bottom Navbar with copyright logo */}
      <footer className="w-full py-4 flex justify-end items-center bg-[#FFFFFF] border-t-0">
        <span className="text-sm text-[#020202] pr-6 flex items-center gap-1">
          <span
            className="material-symbols-outlined text-base align-middle"
            style={{ fontSize: "1em" }}
          >
            copyright
          </span>
          Reece
        </span>
      </footer>
    </div>
  );
}
