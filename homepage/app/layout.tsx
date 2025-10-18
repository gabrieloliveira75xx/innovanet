import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Innovanet - Conectando inovação e simplicidade",
  description: "Innovanet oferece internet robusta, simples e acessível, revolucionando o mercado com soluções modernas e custo-benefício excepcional.",
  icons: {
    icon: "icon.png",
  },
  keywords: [
    "Innovanet",
    "Internet fibra óptica",
    "Alta velocidade",
    "Inovação",
    "Custo-benefício",
    "Conexão confiável",
    "Tecnologia moderna",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="icon.png" />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
