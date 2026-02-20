import React from "react";
import { faPlay, faPlus, faThumbsUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/icons/Icon";

const featuredItems = [1, 2, 3, 4, 5, 6, 7, 8];

export function FeaturedAnime() {
  return (
    <section id="featured" className="py-16 pl-6 md:pl-12 bg-background overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-white hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-2">
        Trending Projects <Icon icon={faChevronDown} className="text-sm opacity-0 group-hover:opacity-100" />
      </h2>
      
      <div className="relative group/slider">
        <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x">
          {featuredItems.map((i) => (
            <div 
              key={i} 
              className="min-w-[220px] md:min-w-[280px] snap-center relative aspect-[16/9] bg-surface rounded-md overflow-hidden hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer group/card border border-gray-800 hover:border-gray-600 shadow-lg"
            >
               <img 
                 src={`https://source.unsplash.com/random/400x225?anime,cyberpunk&sig=${i}`}
                 alt={`Project ${i}`}
                 className="w-full h-full object-cover"
               />
               
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                 <div className="flex items-center gap-3 mb-3">
                   <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary hover:text-white transition">
                      <Icon icon={faPlay} className="ml-1 text-xs" />
                   </button>
                   <button className="w-8 h-8 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition">
                      <Icon icon={faPlus} className="text-xs" />
                   </button>
                   <button className="w-8 h-8 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition ml-auto">
                      <Icon icon={faThumbsUp} className="text-xs" />
                   </button>
                 </div>
                 
                 <h4 className="font-bold text-sm text-white drop-shadow-md mb-1">Project Zero {i}</h4>
                 <div className="flex items-center gap-2 text-[10px] font-semibold text-gray-300">
                    <span className="text-green-400">98% Match</span>
                    <span className="border border-gray-500 px-1 rounded">16+</span>
                    <span>12 Episodes</span>
                    <span className="border border-gray-500 px-1 rounded text-[9px]">HD</span>
                 </div>
                 <div className="mt-2 flex gap-2 text-[10px] text-gray-400">
                    <span>Action</span>
                    <span className="text-gray-600">•</span>
                    <span>Sci-Fi</span>
                    <span className="text-gray-600">•</span>
                    <span>Collab</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}