"use client"

import Link from "next/link"
import { ArrowLeft, FileText, Download, CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CategoryNav } from "@/components/category-nav"

const faturas = [
  {
    id: 1,
    mes: "Maio 2025",
    valor: "R$ 99,90",
    vencimento: "15/05/2025",
    status: "pendente",
  },
  {
    id: 2,
    mes: "Abril 2025",
    valor: "R$ 99,90",
    vencimento: "15/04/2025",
    status: "paga",
  },
  {
    id: 3,
    mes: "Março 2025",
    valor: "R$ 99,90",
    vencimento: "15/03/2025",
    status: "paga",
  },
]

export default function MinhasFaturasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CategoryNav />

      <header className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-medium">Voltar</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Minhas Faturas</h1>
          <p className="mt-2 text-gray-600">Consulte e pague suas contas</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-4">
          {faturas.map((fatura) => (
            <Card key={fatura.id} className="shadow-lg border-2 border-gray-200">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">{fatura.mes}</h3>
                      <p className="text-gray-700 text-base">
                        Vencimento: <strong>{fatura.vencimento}</strong>
                      </p>
                      <p className="text-2xl font-bold text-primary mt-2">{fatura.valor}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:items-end">
                    {fatura.status === "paga" ? (
                      <Badge className="bg-green-500 text-white text-base px-4 py-2 gap-2 w-fit">
                        <CheckCircle className="w-5 h-5" />
                        Paga
                      </Badge>
                    ) : (
                      <Badge className="bg-accent text-white text-base px-4 py-2 gap-2 w-fit">
                        <AlertCircle className="w-5 h-5" />
                        Pendente
                      </Badge>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="lg"
                        variant="outline"
                        className="gap-2 border-2 border-gray-300 hover:bg-gray-100 bg-transparent"
                      >
                        <Download className="w-5 h-5" />
                        Baixar
                      </Button>
                      {fatura.status === "pendente" && (
                        <Button size="lg" className="gap-2 bg-primary hover:opacity-90">
                          <CreditCard className="w-5 h-5" />
                          Pagar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 shadow-lg border-2 border-gray-200">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">Formas de Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3 text-base leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Pix (pagamento instantâneo)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Cartão de crédito</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Boleto bancário</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Débito automático</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-8">
          <Button
            size="lg"
            className="h-auto py-6 text-lg md:text-xl font-semibold bg-primary hover:opacity-90 transition-all"
          >
            Configurar Débito Automático
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-auto py-6 text-lg md:text-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all bg-transparent"
          >
            Ver Histórico Completo
          </Button>
        </div>

        <div className="text-center">
          <Link href="/dashboard">
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
