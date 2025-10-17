"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Wifi, Zap, HelpCircle, Menu, X, LogOut } from "lucide-react"

interface CategoryNavProps {
  hideMenuItems?: boolean
  showLogoutButton?: boolean
}

export function CategoryNav({ hideMenuItems = false, showLogoutButton = false }: CategoryNavProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categories = [
    {
      name: "Meu Plano",
      href: "/painel/meu-plano",
      icon: Zap,
    },
    {
      name: "Minha Rede WiFi",
      href: "/painel/meu-wifi/",
      icon: Wifi,
    },
    {
      name: "Minhas Faturas",
      href: "/painel/minhas-faturas",
      icon: CreditCard,
    },
    {
      name: "Suporte",
      href: "/painel/suporte",
      icon: HelpCircle,
    },
  ]

  const visibleCategories = hideMenuItems ? [] : categories

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-smooth z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <nav className="bg-white/95 backdrop-blur-xl border-b border-[#D2D2D7] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/painel" className="flex items-center group" onClick={closeMobileMenu}>
              <span className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight group-hover:opacity-80 transition-opacity">
                Innovanet
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              {showLogoutButton && (
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[#6E6E73] hover:text-primary transition-all duration-300 min-h-[44px] px-3 rounded-xl hover:bg-[#F5F5F7]"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline font-medium text-base">Sair</span>
                </Link>
              )}

              {visibleCategories.length > 0 && (
                <div className="hidden lg:flex items-center gap-2">
                  {visibleCategories.map((category) => {
                    const isActive = pathname.startsWith(category.href)
                    const Icon = category.icon

                    return (
                      <Link
                        key={category.href}
                        href={category.href}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-white shadow-md"
                            : "text-[#1D1D1F] hover:bg-[#F5F5F7] hover:scale-105"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}

              {visibleCategories.length > 0 && (
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 rounded-xl text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-105"
                  aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {visibleCategories.length > 0 && (
          <div
            className={`lg:hidden fixed top-16 sm:top-20 right-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-72 bg-white/98 backdrop-blur-xl border-l border-[#D2D2D7] shadow-2xl z-50 transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
          >
            <div className="p-6 space-y-3 overflow-y-auto h-full">
              {visibleCategories.map((category, index) => {
                const isActive = pathname.startsWith(category.href)
                const Icon = category.icon

                return (
                  <Link
                    key={category.href}
                    href={category.href}
                    onClick={closeMobileMenu}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl font-medium text-base transition-all duration-300 animate-fade-in-up ${
                      isActive
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "text-[#1D1D1F] hover:bg-[#F5F5F7] hover:scale-105"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
