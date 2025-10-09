"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Wifi, Zap } from "lucide-react"

export function CategoryNav() {
  const pathname = usePathname()

  const categories = [
    {
      name: "Meu Plano",
      href: "meu-plano/",
      icon: Zap,
    },
    {
      name: "Minha Rede WiFi",
      href: "meu-wifi/",
      icon: Wifi,
    },
    {
      name: "Minhas Faturas",
      href: "minhas-faturas/",
      icon: CreditCard,
    },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Innovanet</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {categories.map((category) => {
              const isActive = pathname.startsWith(category.href)
              const Icon = category.icon

              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
