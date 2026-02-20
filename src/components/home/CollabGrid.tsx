import React from "react";
import { 
  faPalette, 
  faPenNib, 
  faMusic, 
  faGamepad, 
  faMicrophoneAlt, 
  faVideo,
  faCode,
  faBullhorn
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/components/icons/Icon";

const categories = [
  { title: "Artists & Animators", icon: faPalette, desc: "Character design, backgrounds, and keyframes." },
  { title: "Writers & Storytellers", icon: faPenNib, desc: "Scriptwriting, lore building, and dialogue." },
  { title: "Musicians & Composers", icon: faMusic, desc: "OSTs, opening themes, and sound effects." },
  { title: "Game Developers", icon: faGamepad, desc: "Unity, Unreal, and visual novel engines." },
  { title: "Voice Actors", icon: faMicrophoneAlt, desc: "Dubbing and character voicing." },
  { title: "Editors & VFX", icon: faVideo, desc: "Post-production and special effects." },
  { title: "Web Developers", icon: faCode, desc: "Project sites and fan portals." },
  { title: "Marketers", icon: faBullhorn, desc: "Promotion and community management." },
];

export function CollabGrid() {
  return (
    <section id="collaboration" className="py-24 px-6 relative bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Collaborate & Create</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find your perfect team across specialized disciplines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-surface p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon icon={item.icon} className="w-24 h-24 text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Icon icon={item.icon} className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}