"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { LogIn, User, Lock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cpf, setCpf] = useState("")
  const [cpfError, setCpfError] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/painel"
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    }
    return value
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setCpf(formatted)
  }

  const isValidCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, "")
    return numbers.length === 11
  }

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidCPF(cpf)) {
      setCpfError("CPF deve conter 11 números")
      return
    }

    setCpfError("")
    setShowSuccessMessage(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setShowSuccessMessage(false)
      setCpf("")
      setCpfError("")
    }, 300)
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
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Esqueceu sua senha?
              </button>
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
              <Link href="/" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Acesse a página inicial e seja agora.
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[#6E6E73] hover:text-primary transition-colors">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#1D1D1F]">
              {showSuccessMessage ? "Solicitação enviada" : "Recuperar senha"}
            </DialogTitle>
            <DialogDescription className="text-[#6E6E73]">
              {showSuccessMessage ? "" : "Informe o CPF utilizado no cadastro para redefinir sua senha."}
            </DialogDescription>
          </DialogHeader>

          {!showSuccessMessage ? (
            <form onSubmit={handlePasswordReset} className="space-y-4 mt-4">
              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  value={cpf}
                  onChange={handleCpfChange}
                  className="block w-full px-3 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                />
                {cpfError && <p className="text-red-500 text-sm mt-1">{cpfError}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1 rounded-xl border-[#D2D2D7] hover:bg-[#F5F5F7] bg-transparent"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 bg-primary text-white rounded-xl hover:opacity-90">
                  Prosseguir
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 mt-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-800 leading-relaxed">
                  Se o CPF informado estiver correto, você receberá sua senha atual no e-mail cadastrado.
                </p>
              </div>
              <Button onClick={handleCloseModal} className="w-full bg-primary text-white rounded-xl hover:opacity-90">
                Fechar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
