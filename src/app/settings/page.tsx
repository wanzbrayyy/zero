"use client";

import React, { useState } from "react";
import { NavbarDashboard } from "@/components/layout/NavbarDashboard";
import { useAppContext } from "@/context/AppContext";

export default function SettingsPage() {
  const { user, updateUser } = useAppContext();
  const [activeTab, setActiveTab] = useState("profile");

  const [form, setForm] = useState({
    username: user.username,
    bio: user.bio,
    email: user.email
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ username: form.username, bio: form.bio });
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <NavbarDashboard />
      
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-1">
            <button onClick={() => setActiveTab("profile")} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === "profile" ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>Profile Customization</button>
            <button onClick={() => setActiveTab("account")} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === "account" ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>Account Details</button>
          </div>

          <div className="flex-1 bg-[#121212] p-6 md:p-8 rounded-xl border border-gray-800">
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile} className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-4">Profile Settings</h2>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Username</label>
                  <input type="text" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="w-full bg-black border border-gray-800 rounded px-4 py-2.5 text-white focus:outline-none focus:border-primary transition" />
                  <p className="text-[10px] text-gray-500 mt-1">Your profile URL will be zero-w.com/u/{form.username || "username"}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Bio</label>
                  <textarea rows={4} value={form.bio} onChange={(e) => setForm({...form, bio: e.target.value})} className="w-full bg-black border border-gray-800 rounded px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"></textarea>
                </div>
                <button type="submit" className="px-6 py-2.5 bg-primary text-white font-bold text-sm rounded transition hover:bg-red-700">Update Profile</button>
              </form>
            )}

            {activeTab === "account" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-4">Account Details</h2>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email Address</label>
                  <input type="email" value={form.email} disabled className="w-full bg-black border border-gray-800 rounded px-4 py-2.5 text-gray-500 cursor-not-allowed" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
