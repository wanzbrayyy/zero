"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser, faCog, faSignOutAlt, faEnvelope, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export const NavbarDashboard = () => {
  const router = useRouter();
  const { user, totalUnread } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => router.push("/");

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-[#141414] shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-primary font-black text-xl tracking-wider">ZERO-W</Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-gray-300 hover:text-white transition"><FontAwesomeIcon icon={faSearch} /></button>
            <Link href="/messages" className="text-gray-300 hover:text-white transition relative">
              <FontAwesomeIcon icon={faEnvelope} />
              {totalUnread > 0 && <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[8px] font-bold px-1 rounded-full">{totalUnread}</span>}
            </Link>
            <button className="text-gray-300 hover:text-white transition relative"><FontAwesomeIcon icon={faBell} /></button>

            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} className="flex items-center gap-2 focus:outline-none">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-black/95 border border-gray-800 rounded-md shadow-xl py-2 animate-slide-up">
                  <Link href={`/u/${user.username}`} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                    <FontAwesomeIcon icon={faUser} className="w-4" /> Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                    <FontAwesomeIcon icon={faCog} className="w-4" /> Settings
                  </Link>
                  <div className="h-px bg-gray-800 my-2"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white text-left">
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#141414] border-t border-gray-800 px-4 pt-2 pb-6 space-y-1">
          <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">Home</Link>
          <Link href={`/u/${user.username}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">Profile</Link>
          <Link href="/messages" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">
            Messages {totalUnread > 0 && <span className="ml-2 bg-primary px-2 py-0.5 rounded text-[10px] text-white">{totalUnread}</span>}
          </Link>
          <Link href="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">Settings</Link>
          <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">Sign Out</button>
        </div>
      )}
    </nav>
  );
};
