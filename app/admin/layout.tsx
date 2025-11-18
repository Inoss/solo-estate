import { ReactNode } from "react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import SessionProvider from "@/components/admin/SessionProvider"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/admin/login")
  }

  return (
    <html lang="en">
      <body className="bg-slate-50">
        <SessionProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
              {/* Header */}
              <AdminHeader userName={session?.user?.name || undefined} />

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
