import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Innovanet - Painel do Cliente",
  description: "Gerencie seu plano, WiFi, faturas e serviços da Innovanet de forma simples, rápida e segura.",
  icons: {
    icon: "icon.png",
  },
  keywords: [
    "Innovanet",
    "Painel do Cliente",
    "Dashboard",
    "Gerenciamento de plano",
    "WiFi",
    "Faturas",
    "Serviços de internet",
    "Usuário",
  ],
  authors: [{ name: "Innovanet", url: "https://www.innovanet.com.br" }],
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="icon.png" />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
