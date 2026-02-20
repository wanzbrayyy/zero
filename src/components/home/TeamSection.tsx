import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

const teamMembers = [
  {
    name: "Ayan Azhar",
    role: "Lead Developer & Founder",
    image: "https://ui-avatars.com/api/?name=Ayan+Azhar&background=E50914&color=fff", 
    socials: [
      { icon: faGithub, href: "#" },
      { icon: faLinkedin, href: "#" },
      { icon: faInstagram, href: "#" },
    ],
  },
  {
    name: "Awan Berlian",
    role: "UI/UX & Community Support",
    image: "https://ui-avatars.com/api/?name=Awan+Berlian&background=E50914&color=fff",
    socials: [
      { icon: faGithub, href: "#" },
      { icon: faLinkedin, href: "#" },
      { icon: faInstagram, href: "#" },
    ],
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 px-6 bg-background border-t border-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Collaborators</h2>
        <p className="text-gray-400 text-lg mb-16">
          The developers and support team behind ZERO-W-ANIME.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-surface p-8 rounded-xl border border-gray-800 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-700 group-hover:border-primary transition-colors duration-300 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-primary font-semibold mb-6">{member.role}</p>
              <div className="flex justify-center items-center gap-5">
                {member.socials.map((social, socialIndex) => (
                  <a
                    key={socialIndex}
                    href={social.href}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={social.icon} className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
