"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, CreditCard, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CategoryNav } from "@/components/category-nav"
import { MercadoPagoCheckout } from "@/components/mercado-pago-checkout"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

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
      badge: { bg: "bg-green-500", icon: CheckCircle, text: "Paga" },
      description: "Esta fatura já foi paga",
    }
  }

  if (isOverdue(fatura.vencimento)) {
    return {
      color: "bg-red-50 border-red-300",
      badge: { bg: "bg-red-500", icon: XCircle, text: "Vencida" },
      description: "Esta fatura está vencida",
    }
  }

  return {
    color: "bg-orange-50 border-orange-300",
    badge: { bg: "bg-orange-500", icon: AlertCircle, text: "Pendente" },
    description: "Aguardando pagamento",
  }
}

export default function MinhasFaturasPage() {
  const [faturas, setFaturas] = useState(faturasIniciais)
  const [selectedFatura, setSelectedFatura] = useState<(typeof faturasIniciais)[0] | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const status = searchParams.get("status")
    if (status === "success") {
      console.log("Pagamento aprovado!")
    } else if (status === "failure") {
      console.log("Pagamento rejeitado")
    } else if (status === "pending") {
      console.log("Pagamento pendente")
    }
  }, [searchParams])

  const handleCardClick = (fatura: (typeof faturasIniciais)[0]) => {
    if (fatura.status === "paga") {
      toast({
        title: "Fatura já paga",
        description: `A fatura de ${fatura.mes} já foi paga.`,
        duration: 3000,
      })
    } else {
      setSelectedFatura(fatura)
      setIsCheckoutOpen(true)
    }
  }

  const handlePaymentClick = (fatura: (typeof faturasIniciais)[0]) => {
    setSelectedFatura(fatura)
    setIsCheckoutOpen(true)
  }

  const handlePaymentSuccess = () => {
    if (selectedFatura) {
      setFaturas((prevFaturas) => prevFaturas.map((f) => (f.id === selectedFatura.id ? { ...f, status: "paga" } : f)))
    }
    setIsCheckoutOpen(false)
    setSelectedFatura(null)
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
    setSelectedFatura(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <CategoryNav />

      <header className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/painel"
            className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-medium">Voltar</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Minhas Faturas</h1>
          <p className="mt-2 text-gray-600 text-lg">Consulte e pague suas contas de forma simples e segura</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-4">
          {faturas.map((fatura) => {
            const statusInfo = getStatusInfo(fatura)
            const StatusIcon = statusInfo.badge.icon

            return (
              <Card
                key={fatura.id}
                className={`shadow-lg border-2 ${statusInfo.color} transition-all hover:shadow-xl cursor-pointer`}
                onClick={() => handleCardClick(fatura)}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                          <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">{fatura.mes}</h3>
                          <p className="text-gray-700 text-lg">
                            Vencimento: <strong className="text-gray-900">{fatura.vencimento}</strong>
                          </p>
                          <p className="text-3xl font-bold text-primary mt-3">{fatura.valor}</p>
                        </div>
                      </div>

                      <Badge className={`${statusInfo.badge.bg} text-white text-lg px-5 py-3 gap-2 w-fit`}>
                        <StatusIcon className="w-6 h-6" />
                        {statusInfo.badge.text}
                      </Badge>
                    </div>

                    <div className="text-center">
                      <p className="text-base font-medium text-gray-700">{statusInfo.description}</p>
                    </div>

                    {fatura.status === "pendente" && (
                      <div className="flex justify-center pt-2">
                        <Button
                          size="lg"
                          className="gap-3 bg-primary hover:opacity-90 text-xl py-7 px-12 w-full md:w-auto min-w-[280px] shadow-md pointer-events-none"
                        >
                          <CreditCard className="w-7 h-7" />
                          Pagar Agora
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
          <Link href="/painel">
            <Button size="lg" variant="ghost" className="text-base gap-2 text-gray-600 hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              Voltar para o Início
            </Button>
          </Link>
        </div>
      </main>

      {selectedFatura && (
        <MercadoPagoCheckout
          fatura={selectedFatura}
          isOpen={isCheckoutOpen}
          onClose={handleCloseCheckout}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
