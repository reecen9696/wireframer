import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shuffle Casino Wireframes",
  description: "Wireframe app for casino layouts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans bg-[#FFFFFF] text-[#020202]">
        {children}
      </body>
    </html>
  );
}
