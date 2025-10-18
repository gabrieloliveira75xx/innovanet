"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CategoryNav } from "@/components/category-nav"

interface Invoice {
  id: number
  month: string
  amount: string
  dueDate: string
  status: "paid" | "pending" | "overdue"
  paymentMethod?: string
  transactionId?: string
}

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 1,
    month: "Maio 2025",
    amount: "R$ 99,90",
    dueDate: "15/05/2025",
    status: "pending",
  },
  {
    id: 2,
    month: "Abril 2025",
    amount: "R$ 99,90",
    dueDate: "15/04/2025",
    status: "paid",
    paymentMethod: "Cartão de Crédito",
    transactionId: "TXN-2025-04-001",
  },
  {
    id: 3,
    month: "Março 2025",
    amount: "R$ 99,90",
    dueDate: "15/03/2025",
    status: "paid",
    paymentMethod: "Cartão de Crédito",
    transactionId: "TXN-2025-03-001",
  },
]

function isOverdue(dueDate: string): boolean {
  const [day, month, year] = dueDate.split("/").map(Number)
  const dueDateObj = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return dueDateObj < today
}

interface StatusInfo {
  color: string
  badge: {
    bg: string
    icon: typeof CheckCircle
    text: string
  }
}

function getStatusInfo(invoice: Invoice): StatusInfo {
  if (invoice.status === "paid") {
    return {
      color: "bg-blue-50/50 border-blue-200/60",
      badge: { bg: "bg-blue-600", icon: CheckCircle, text: "Paga" },
    }
  }

  if (isOverdue(invoice.dueDate)) {
    return {
      color: "bg-red-50 border-red-300/60",
      badge: { bg: "bg-slate-600", icon: AlertCircle, text: "Vencida" },
    }
  }

  return {
    color: "bg-amber-50/50 border-amber-200/60",
    badge: { bg: "bg-amber-600", icon: Clock, text: "Pendente" },
  }
}

export default function MinhasFaturasPage() {
  const [invoices] = useState<Invoice[]>(INITIAL_INVOICES)
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "overdue">("all")

  const handleCardClick = (invoice: Invoice) => {
    if (invoice.status !== "paid") {
      console.log("Abrir pagamento para:", invoice.month)
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    if (statusFilter === "all") return true
    if (statusFilter === "overdue") return isOverdue(invoice.dueDate)
    return invoice.status === statusFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <CategoryNav />

      <header className="bg-card border-b border-border py-4 px-3">
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
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground tracking-tight">Nenhuma fatura encontrada com este status.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredInvoices.map((invoice) => {
              const statusInfo = getStatusInfo(invoice)
              const StatusIcon = statusInfo.badge.icon

              return (
                <Card
                  key={invoice.id}
                  className={`
                    border transition-all hover:shadow-xl cursor-pointer 
                    shadow-lg bg-card rounded-2xl overflow-hidden
                  `}
                  onClick={() => handleCardClick(invoice)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-1 text-foreground tracking-tight">{invoice.month}</h3>
                        <p className="text-[15px] text-muted-foreground tracking-tight">
                          Vencimento: {invoice.dueDate}
                        </p>
                      </div>

                      <Badge
                        className={`
                          ${statusInfo.badge.bg} text-white text-[13px] px-3 py-1.5 gap-1.5
                          rounded-full font-medium shadow-sm tracking-tight
                        `}
                      >
                        <StatusIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
                        {statusInfo.badge.text}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-4xl font-semibold text-primary tracking-tight">{invoice.amount}</p>
                      </div>

                      {invoice.status === "pending" && (
                        <button
                          className="
                            bg-primary hover:bg-primary/90 text-primary-foreground
                            px-6 py-3 rounded-full font-medium text-[15px] tracking-tight
                            shadow-sm hover:shadow-md
                            transition-all duration-200 ease-out
                            flex items-center gap-2
                            min-h-[44px]
                          "
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("Pagar fatura:", invoice.id)
                          }}
                        >
                          <CreditCard className="w-[18px] h-[18px]" strokeWidth={2} />
                          Pagar Agora
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

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
