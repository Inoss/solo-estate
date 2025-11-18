import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { LoginForm } from "./LoginForm"

export default async function AdminLoginPage() {
  const session = await auth()

  // If already authenticated, redirect to dashboard
  if (session) {
    redirect("/admin/dashboard")
  }

  return <LoginForm />
}
