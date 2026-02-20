"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { NavbarDashboard } from "@/components/layout/NavbarDashboard";
import { useAppContext } from "@/context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faShareAlt, faClock } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAppContext();
  
  const usernameParam = params.username as string;
  const isMyProfile = user.username === usernameParam;

  return (
    <div className="min-h-screen bg-background text-text">
      <NavbarDashboard />
      
      <div className="relative w-full h-[30vh] bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-background bg-primary flex items-center justify-center text-5xl font-bold text-white shadow-xl">
            {usernameParam.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-white">@{usernameParam}</h1>
            <p className="text-gray-400 mt-1">Anime Enthusiast • Member since 2024</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded font-medium transition flex items-center gap-2">
              <FontAwesomeIcon icon={faShareAlt} /> Share
            </button>
            {isMyProfile && (
              <button onClick={() => router.push('/settings')} className="px-6 py-2 bg-primary hover:bg-red-700 text-white rounded font-medium transition flex items-center gap-2">
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
          <div className="col-span-1 bg-[#121212] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">About Me</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {isMyProfile ? user.bio : "This user hasn't written a bio yet."}
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Following</span>
                <span className="text-white font-bold">124</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Followers</span>
                <span className="text-white font-bold">89</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-[#121212] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-primary" /> Watch History
            </h3>
            <div className="text-center py-12 text-gray-500 text-sm">
              Watch history is currently private or empty.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
