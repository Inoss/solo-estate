"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import { Lock, Mail, ArrowRight } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setIsLoading(false)
      } else {
        // Force a hard redirect to dashboard
        window.location.href = "/admin/dashboard"
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <Image
                  src="/logo.png"
                  alt="SOLO Estate"
                  width={220}
                  height={64}
                  className="h-16 w-auto drop-shadow-[0_0_20px_rgba(202,138,4,0.5)] transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-amber-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-300">Sign in to your admin dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition backdrop-blur-sm"
                  placeholder="admin@soloestate.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition backdrop-blur-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Default credentials hint (for development) */}
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            <p className="text-xs text-slate-300 font-medium mb-1">
              Default Credentials:
            </p>
            <p className="text-xs text-slate-400">
              Email: admin@soloestate.com
              <br />
              Password: admin123
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-slate-400 text-sm mt-6">
          &copy; {new Date().getFullYear()} SOLO Estate. All rights reserved.
        </p>
      </div>
    </div>
  )
}
