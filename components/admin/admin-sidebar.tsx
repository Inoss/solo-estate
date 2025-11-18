'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Inbox,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, badge: null },
  { name: 'Projects', href: '/admin/projects', icon: Building2, badge: null },
  { name: 'Developers', href: '/admin/developers', icon: Users, badge: null },
  { name: 'Articles', href: '/admin/articles', icon: FileText, badge: null },
  { name: 'Leads', href: '/admin/leads', icon: Inbox, badge: 'new' },
  { name: 'Settings', href: '/admin/settings', icon: Settings, badge: null },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-slate-200"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-slate-700" />
        ) : (
          <Menu className="h-6 w-6 text-slate-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-700/50">
            <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SOLO Estate</h1>
                <p className="text-xs text-slate-400">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    group flex items-center justify-between px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${
                      active
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon
                      className={`h-5 w-5 ${
                        active ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {active && <ChevronRight className="h-5 w-5" />}
                </Link>
              )
            })}
          </nav>

          {/* Quick Links */}
          <div className="px-4 py-4 border-t border-slate-700/50">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Quick Links
            </p>
            <div className="space-y-1">
              <Link
                href="/en"
                target="_blank"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors text-sm"
              >
                <Home className="h-4 w-4" />
                <span>View Website</span>
              </Link>
              <Link
                href="/en/projects"
                target="_blank"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800/50 hover:text-white transition-colors text-sm"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Public Projects</span>
              </Link>
            </div>
          </div>

          {/* Sign Out */}
          <div className="px-4 py-4 border-t border-slate-700/50">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
