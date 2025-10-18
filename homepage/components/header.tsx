"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-gradient-to-r from-primary via-primary to-blue-700 rounded-t-2xl text-white py-3 px-6 shadow-lg">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-base">SAC</span>
              <span className="font-medium">(12) 34567890</span>
            </div>
            <div className="hidden md:block">
              <p className="font-normal text-white/95">
                Aproveite o dia para trabalhar com a internet rápida e estável que sua produtividade merece.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary via-primary to-blue-700 px-6 py-4 rounded-b-2xl shadow-[0px_4px_20px_-5px_rgba(5,5,5,0.3)] transition-all duration-300">
          <div className="flex justify-between items-center">
            <Link href="/painel" className="flex items-center transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-white tracking-tight">Innovanet</div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="#home"
                className="text-white/90 hover:text-white transition-colors font-medium text-base relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#planos"
                className="text-white/90 hover:text-white transition-colors font-medium text-base relative group"
              >
                Planos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#contato"
                className="text-white/90 hover:text-white transition-colors font-medium text-base relative group"
              >
                Fale Conosco
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/painel"
                className="bg-accent text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                CENTRAL DO CLIENTE
              </Link>
            </nav>

            <button
              className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl animate-fade-in-up">
              <Link
                href="#home"
                className="text-white hover:bg-white/10 transition-all font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#planos"
                className="text-white hover:bg-white/10 transition-all font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
              <Link
                href="#contato"
                className="text-white hover:bg-white/10 transition-all font-medium py-3 px-4 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Fale Conosco
              </Link>
              <Link
                href="/painel"
                className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                CENTRAL DO CLIENTE
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
