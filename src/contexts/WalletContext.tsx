"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  profilePicture: string;
}

interface WalletContextType {
  isWalletConnected: boolean;
  user: User;
  connectWallet: () => void;
  disconnectWallet: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [user, setUser] = useState<User>({
    name: "shuffleboi32",
    profilePicture: "/default-avatar.png",
  });

  const connectWallet = () => {
    setIsWalletConnected(true);
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        user,
        connectWallet,
        disconnectWallet,
        updateUser,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
