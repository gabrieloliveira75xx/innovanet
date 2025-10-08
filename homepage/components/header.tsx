"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-primary rounded-t-2xl text-white py-2 px-6 shadow-lg">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">SAC</span>
              <span>(12) 34567890</span>
            </div>
            <div className="hidden md:block">
              <p className="font-light">Aproveite o dia para trabalhar com a internet rápida e estável que sua produtividade merece.</p>
            </div>
          </div>
        </div>

        <div className="bg-primary px-6 py-3 rounded-b-2xl shadow-[0px_3px_15px_-5px_rgba(5,5,5,0.5)] transition-all duration-300">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center transition-all duration-300">
              <div className="text-2xl font-bold text-white">Innovanet</div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="#home" className="text-white hover:text-accent transition-colors font-medium">
                Home
              </Link>
              {/** <Link href="#empresa" className="text-white hover:text-accent transition-colors font-medium">
                Empresa
              </Link>*/} 
              <Link href="#planos" className="text-white hover:text-accent transition-colors font-medium">
                Planos
              </Link>
               {/** <Link href="#cobertura" className="text-white hover:text-accent transition-colors font-medium">
                Cobertura
              </Link>*/} 
              <Link href="#contato" className="text-white hover:text-accent transition-colors font-medium">
                Fale Conosco
              </Link>
              <Link
                href="/painel"
                className="bg-accent text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 hover:shadow-lg transition-all"
              >
                CENTRAL DO CLIENTE
              </Link>
            </nav>

            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-3 bg-white/10 p-4 rounded-lg">
              <Link href="#home" className="text-white hover:text-accent transition-colors font-medium py-2">
                Home
              </Link>
               {/** <Link href="#empresa" className="text-white hover:text-accent transition-colors font-medium py-2">
                Empresa
              </Link>*/} 
              <Link href="#planos" className="text-white hover:text-accent transition-colors font-medium py-2">
                Planos
              </Link>
              <Link href="#cobertura" className="text-white hover:text-accent transition-colors font-medium py-2">
                Cobertura
              </Link>
              <Link href="#contato" className="text-white hover:text-accent transition-colors font-medium py-2">
                Fale Conosco
              </Link>
              <Link
                href="/painel"
                className="bg-accent text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all text-center mt-2"
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
