"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Div } from "@/components/Div";
import { useWallet } from "@/contexts/WalletContext";

export default function AccountPage() {
  const { user, updateUser } = useWallet();
  const [currency, setCurrency] = useState("SOL");
  const [name, setName] = useState(user.name);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = () => {
    updateUser({ name, profilePicture });
    alert("Account updated successfully!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePicture(e.target?.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  return (
    <>
      <Navbar currency={currency} setCurrency={setCurrency} />
      <div className="min-h-screen bg-white flex flex-col items-center">
        <main className="w-full max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-[#020202] text-center">
            Account Settings
          </h1>

          <Div className="mb-6">
            <h2 className="text-2xl font-bold mb-6 text-[#020202]">
              Profile Information
            </h2>

            {/* Profile Picture */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-[#020202] mb-2">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  {profilePicture && profilePicture !== "/default-avatar.png" ? (
                    <Image 
                      src={profilePicture} 
                      alt="Profile" 
                      width={80} 
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-gray-600">
                      person
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-4 py-2 font-bold cursor-pointer hover:bg-[#F5F5F5]"
                  >
                    {isUploading ? "Uploading..." : "Change Picture"}
                  </label>
                  {profilePicture !== "/default-avatar.png" && (
                    <button
                      onClick={() => setProfilePicture("/default-avatar.png")}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove Picture
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-[#020202] mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-2 border-[#020202] px-4 py-2 text-[#020202] font-semibold"
                placeholder="Enter your display name"
              />
            </div>

            {/* Wallet Address (Read-only) */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-[#020202] mb-2">
                Wallet Address
              </label>
              <div className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 bg-gray-100 text-gray-600">
                0x1234...5678
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Your wallet address cannot be changed
              </p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => window.history.back()}
                className="rounded-full border-2 border-[#020202] bg-white text-[#020202] px-6 py-2 font-bold hover:bg-[#F5F5F5]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-full border-2 border-[#020202] bg-[#020202] text-white px-6 py-2 font-bold hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          </Div>
        </main>
      </div>
    </>
  );
}
