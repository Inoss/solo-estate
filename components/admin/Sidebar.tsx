"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  LogOut,
  Home,
  ChevronRight
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Building2 },
  { name: "Developers", href: "/admin/developers", icon: Users },
  { name: "Articles", href: "/admin/articles", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" })
  }

  return (
    <div className="flex h-screen w-72 flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white shadow-2xl">
      {/* Logo Section */}
      <div className="flex h-20 items-center justify-center px-6 border-b border-slate-700/50 bg-slate-800/50">
        <Link href="/admin/dashboard" className="group relative">
          <Image
            src="/logo.png"
            alt="SOLO Estate"
            width={180}
            height={52}
            className="h-12 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(202,138,4,0.4)]"
          />
          <div className="absolute inset-0 bg-amber-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="px-4 py-6 border-b border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800/50 backdrop-blur-sm">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white shadow-lg">
              {session?.user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm truncate">
              {session?.user?.name || "Admin"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {session?.user?.email || "admin@soloestate.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Main Menu
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white hover:scale-102"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} transition-colors`} />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="h-4 w-4 text-white" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-700/50 p-4 space-y-2 bg-slate-800/30">
        <Link
          href="/en"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-200 group"
        >
          <Home className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
          <span>View Website</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-400 transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}
