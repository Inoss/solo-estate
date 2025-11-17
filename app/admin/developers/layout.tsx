import { ReactNode } from "react"
import Sidebar from "@/components/admin/Sidebar"
import SessionProvider from "@/components/admin/SessionProvider"

export default function DevelopersLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
