'use client'

import { Bell, Search, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function AdminHeader({ userName }: { userName?: string }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 backdrop-blur-lg bg-white/95">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects, developers, articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Side - Notifications & User */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white font-semibold">
              {userName?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900">{userName || 'Admin'}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  )
}
