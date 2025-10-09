"use client"

import Link from "next/link"
import { ArrowLeft, Zap, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CategoryNav } from "@/components/category-nav"

export default function MeuPlanoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* CategoryNav moved to the top, before header */}
      <CategoryNav />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-medium">Voltar</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Meu Plano</h1>
          <p className="mt-2 text-gray-600">Informações sobre seu plano de internet</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Plan Details Card */}
        <Card className="mb-8 shadow-lg border-2 border-gray-200">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="text-2xl md:text-3xl font-bold">Plano Atual</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Turbo - 300 Megas</h3>
                  <p className="text-gray-700 text-base leading-relaxed">Perfeito para trabalho e entretenimento</p>
                  <p className="text-gray-700 text-base leading-relaxed mt-2">
                    Velocidade: <strong>300 Mbps</strong>
                  </p>
                  <p className="text-gray-700 text-base leading-relaxed">Wi-Fi 5 grátis • Sem fidelidade</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Valor Mensal</h3>
                  <p className="text-3xl font-bold text-primary">R$ 79,90</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Próximo Vencimento</h3>
                  <p className="text-gray-700 text-base">
                    Dia <strong>15 de cada mês</strong>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/mudar-plano" className="block">
            <Button
              size="lg"
              className="w-full h-auto py-6 text-lg md:text-xl font-semibold bg-primary hover:opacity-90 transition-all"
            >
              Mudar de Plano
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="h-auto py-6 text-lg md:text-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all bg-transparent"
          >
            Falar com Suporte
          </Button>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/">
            <Button size="lg" variant="ghost" className="text-base gap-2 text-gray-600 hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              Voltar para o Início
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
