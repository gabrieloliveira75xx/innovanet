"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { LogIn, User, Lock } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/painel"
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/painel" className="inline-block">
            <div className="text-5xl font-bold text-primary mb-2">Innovanet</div>
          </Link>
          <p className="text-[#6E6E73] text-base">Central do Assinante</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#D2D2D7]">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <LogIn className="text-primary" size={32} />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-6 text-[#1D1D1F] tracking-tight">Acesse sua conta</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-[#6E6E73]" size={20} />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-[#6E6E73]" size={20} />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/recuperar-senha"
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg"
            >
              Entrar
            </button>
          </form>

          {/* Not a subscriber */}
          <div className="mt-6 pt-6 border-t border-[#D2D2D7]">
            <p className="text-center text-sm text-[#6E6E73]">
              Ainda não é assinante?{" "}
              <Link href="/painel" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Acesse a página inicial e seja agora.
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/painel" className="text-sm text-[#6E6E73] hover:text-primary transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  )
}
