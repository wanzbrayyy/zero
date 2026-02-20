"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faProjectDiagram,
  faEnvelope,
  faUserFriends,
  faCog,
  faSignOutAlt,
  faCompass
} from "@fortawesome/free-solid-svg-icons";
import { clsx } from "clsx";

interface SidebarItem {
  label: string;
  href: string;
  icon: any;
}

const mainNavItems: SidebarItem[] = [
  { label: "Overview", href: "/dashboard", icon: faHome },
  { label: "My Projects", href: "/dashboard/projects", icon: faProjectDiagram },
  { label: "Discover", href: "/dashboard/discover", icon: faCompass },
  { label: "Collaborators", href: "/dashboard/collaborators", icon: faUserFriends },
  { label: "Messages", href: "/dashboard/messages", icon: faEnvelope },
];

const secondaryNavItems: SidebarItem[] = [
  { label: "Settings", href: "/dashboard/settings", icon: faCog },
];

export function Sidebar() {
  const pathname = usePathname();

  const NavItem = ({ item }: { item: SidebarItem }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={clsx(
          "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
          isActive
            ? "bg-primary text-white shadow-md"
            : "text-gray-400 hover:bg-white/10 hover:text-white"
        )}
      >
        <FontAwesomeIcon 
          icon={item.icon} 
          className={clsx("w-5 h-5 transition-colors", isActive ? "text-white" : "text-gray-500 group-hover:text-white")} 
        />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-surface border-r border-gray-800 hidden md:flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
         <Link href="/" className="text-xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-sm"></div>
            Zero-W
         </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Main Menu
          </h3>
          <nav className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </div>

        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Preferences
          </h3>
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors">
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}