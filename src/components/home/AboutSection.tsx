import React from "react";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-surface border-y border-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative group">
             <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=1000&auto=format&fit=crop" 
               alt="Anime Studio" 
               className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" 
             />
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Revolutionizing the <br />
            <span className="text-primary">Anime Industry</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Zero-W-Anime isn't just a platform; it's a movement. We are breaking down the barriers between studios and independent creators. 
            Our mission is to provide the tools, network, and funding opportunities needed to turn ambitious storyboards into fully animated reality.
          </p>
          <div className="grid grid-cols-2 gap-6 py-6">
            <div>
              <h4 className="text-3xl font-bold text-white">10k+</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Creators</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white">500+</h4>
              <p className="text-gray-500 text-sm uppercase tracking-wider">Projects Launched</p>
            </div>
          </div>
          <Button variant="outline" size="lg" className="border-gray-500 text-white hover:border-white">
            Read Our Manifesto
          </Button>
        </div>
      </div>
    </section>
  );
}