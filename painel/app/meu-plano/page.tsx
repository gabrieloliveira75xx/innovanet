"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CategoryNav } from "@/components/category-nav"

export default function MeuPlanoPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <CategoryNav />

      <header className="bg-white border-b shadow-sm py-4 px-3">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/painel"
            className="inline-flex items-center gap-2 mb-4 text-[#6E6E73] hover:text-primary transition-colors min-h-[48px] text-lg"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Voltar</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-3">Meu Plano</h1>
          <p className="text-xl text-[#6E6E73]">Informações do seu plano</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border mb-8 shadow-lg hover:shadow-xl transition-shadow bg-white rounded-2xl overflow-hidden p-0">
          <CardHeader className="bg-primary text-white border-b py-6 px-8">
            <CardTitle className="text-3xl font-bold text-center">Turbo - 300 Megas</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-lg text-[#6E6E73] mb-2">Velocidade</p>
                <p className="text-5xl font-bold text-primary">300 Mbps</p>
              </div>

              <div className="text-center border-t pt-8">
                <p className="text-lg text-[#6E6E73] mb-2">Valor Mensal</p>
                <p className="text-5xl font-bold text-primary">R$ 79,90</p>
              </div>

              <div className="text-center border-t pt-8">
                <p className="text-lg text-[#6E6E73] mb-2">Próximo Vencimento</p>
                <p className="text-2xl font-bold text-[#1D1D1F]">Dia 15 de cada mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <Link href="/painel/mudar-plano" className="block">
            <Button
              size="lg"
              className="w-full h-16 text-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Mudar de Plano
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-xl font-bold border bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all"
          >
            Ver Mais Detalhes
          </Button>
        </div>
      </main>
    </div>
  )
}
