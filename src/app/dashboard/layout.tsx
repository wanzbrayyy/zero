import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, 
  faProjectDiagram, 
  faEnvelope, 
  faCog, 
  faSignOutAlt, 
  faUserCircle 
} from "@fortawesome/free-solid-svg-icons";

const sidebarItems = [
  { icon: faHome, label: "Overview", href: "/dashboard" },
  { icon: faProjectDiagram, label: "My Projects", href: "/dashboard/projects" },
  { icon: faEnvelope, label: "Messages", href: "/dashboard/messages" },
  { icon: faCog, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-gray-800 bg-surface hidden md:flex flex-col">
        <div className="flex h-16 items-center px-6 border-b border-gray-800">
          <Link href="/" className="text-xl font-bold text-primary tracking-wider uppercase">
            Zero-W
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition"
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-red-400 hover:bg-red-900/20 hover:text-red-300 transition">
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-800 bg-background/80 px-6 backdrop-blur">
          <h2 className="font-semibold text-white">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                <FontAwesomeIcon icon={faUserCircle} />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
            {children}
        </main>
      </div>
    </div>
  );
}