"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CategoryNav } from "@/components/category-nav"

const faturasIniciais = [
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

function isOverdue(vencimento: string): boolean {
  const [day, month, year] = vencimento.split("/").map(Number)
  const dueDate = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dueDate < today
}

function getStatusInfo(fatura: (typeof faturasIniciais)[0]) {
  if (fatura.status === "paga") {
    return {
      color: "bg-green-50 border-green-300",
      badge: { bg: "bg-green-600", icon: CheckCircle, text: "Paga" },
    }
  }

  if (isOverdue(fatura.vencimento)) {
    return {
      color: "bg-red-50 border-red-300",
      badge: { bg: "bg-red-600", icon: XCircle, text: "Vencida" },
    }
  }

  return {
    color: "bg-orange-50 border-orange-300",
    badge: { bg: "bg-orange-600", icon: AlertCircle, text: "Pendente" },
  }
}

export default function MinhasFaturasPage() {
  const [faturas] = useState(faturasIniciais)

  const handleCardClick = (fatura: (typeof faturasIniciais)[0]) => {
    if (fatura.status !== "paga") {
      console.log("Abrir pagamento para:", fatura.mes)
    }
  }

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
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-3">Minhas Faturas</h1>
          <p className="text-xl text-[#6E6E73]">Consulte e pague suas contas</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {faturas.map((fatura) => {
            const statusInfo = getStatusInfo(fatura)
            const StatusIcon = statusInfo.badge.icon

            return (
              <Card
                key={fatura.id}
                className={`border transition-all hover:shadow-xl cursor-pointer shadow-lg bg-white ${statusInfo.color}`}
                onClick={() => handleCardClick(fatura)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 text-[#1D1D1F]">{fatura.mes}</h3>
                        <p className="text-lg text-[#6E6E73]">Vencimento: {fatura.vencimento}</p>
                      </div>
                      <Badge className={`${statusInfo.badge.bg} text-white text-lg px-6 py-3 gap-2`}>
                        <StatusIcon className="w-6 h-6" />
                        {statusInfo.badge.text}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-bold text-primary">{fatura.valor}</p>

                      {fatura.status === "pendente" && (
                        <Button
                          size="lg"
                          className="gap-2 h-14 px-8 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("Pagar fatura:", fatura.id)
                          }}
                        >
                          <CreditCard className="w-5 h-5" />
                          Pagar Agora
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-12">
          <Button
            size="lg"
            className="h-16 text-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Configurar Débito Automático
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-xl font-bold border bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all"
          >
            Ver Histórico Completo
          </Button>
        </div>
      </main>
    </div>
  )
}
