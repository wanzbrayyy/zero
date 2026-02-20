import React from "react";
import Link from "next/link";
import { faChevronRight, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-16 animate-in fade-in zoom-in-95 duration-700">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-2xl">
          Unleash Your <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-500">Anime Universe</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-3xl mx-auto drop-shadow-md">
          Join the largest collaborative platform for anime creation. Discover talents, build teams, and create the next masterpiece.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 py-4">
              Start Creating 
              <Icon icon={faChevronRight} className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#featured" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
              <Icon icon={faPlay} className="w-4 h-4" />
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}