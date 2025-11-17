import { ReactNode } from "react"
import Sidebar from "@/components/admin/Sidebar"

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
