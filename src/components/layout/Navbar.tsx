"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collaboration", href: "#collaboration" },
    { name: "About Us", href: "#about" },
    { name: "Team", href: "#team" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-lg" : "bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-wider text-white uppercase">
              ZERO-W-ANIME
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition">
               <FontAwesomeIcon icon={faGlobe} className="w-5 h-5" />
            </button>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">
                Join Now
              </Button>
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-b border-gray-800 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-700 mt-4 pt-4 flex flex-col gap-2 px-3">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                 <Button variant="secondary" className="w-full justify-center">Login</Button>
              </Link>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                 <Button variant="primary" className="w-full justify-center">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
