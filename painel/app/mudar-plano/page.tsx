"use client"

import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CategoryNav } from "@/components/category-nav"

export default function MudarPlanoPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const currentPlanId = "turbo"

  const plans = [
    {
      id: "basico",
      name: "Básico",
      speed: "80 Megas",
      price: "49,90",
      features: ["80 Mbps", "Wi-Fi grátis"],
    },
    {
      id: "turbo",
      name: "Turbo",
      speed: "300 Megas",
      price: "79,90",
      features: ["300 Mbps", "Wi-Fi 5 grátis"],
    },
    {
      id: "ultra",
      name: "Ultra",
      speed: "500 Megas",
      price: "119,90",
      features: ["500 Mbps", "Wi-Fi 6 grátis"],
    },
  ]

  const handleSelectPlan = (planId: string) => {
    if (planId === currentPlanId) return
    setSelectedPlan(planId)
  }

  const handleConfirm = () => {
    if (selectedPlan) {
      console.log("Confirmar mudança para:", selectedPlan)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <CategoryNav />

      <header className="bg-white border-b shadow-sm py-4 px-3">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/painel"
            className="inline-flex items-center gap-2 mb-4 text-[#6E6E73] hover:text-primary transition-colors min-h-[48px] text-lg"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Voltar</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] mb-3">Escolha seu Plano</h1>
          <p className="text-xl text-[#6E6E73]">Selecione o plano ideal para você</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentPlanId
            const isSelected = selectedPlan === plan.id

            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-300 border shadow-lg bg-white rounded-2xl overflow-hidden p-0 ${
                  isCurrentPlan
                    ? "opacity-50 cursor-not-allowed border-gray-300"
                    : isSelected
                      ? "border-primary shadow-2xl scale-105 cursor-pointer"
                      : "hover:border-primary hover:shadow-xl hover:scale-[1.02] cursor-pointer border-gray-300"
                }`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {isCurrentPlan && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6E6E73] text-white px-6 py-2 rounded-full text-base font-bold z-10">
                    Plano Atual
                  </div>
                )}
                <CardHeader
                  className={`${isCurrentPlan ? "bg-[#6E6E73]" : "bg-primary"} text-white text-center py-8 px-8`}
                >
                  <CardTitle className="text-3xl font-bold mb-2">{plan.name}</CardTitle>
                  <p className="text-xl font-semibold">{plan.speed}</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-6 text-center">
                    <div className={`text-5xl font-bold ${isCurrentPlan ? "text-[#6E6E73]" : "text-primary"} mb-2`}>
                      R$ {plan.price}
                    </div>
                    <div className="text-[#6E6E73] text-lg">por mês</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-lg text-[#1D1D1F]">
                        <Check
                          className={`w-6 h-6 flex-shrink-0 ${isCurrentPlan ? "text-[#6E6E73]" : "text-primary"}`}
                        />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {!isCurrentPlan && isSelected && (
                    <div className="flex items-center justify-center gap-2 text-primary font-bold text-lg bg-primary/10 py-3 rounded-lg">
                      <Check className="w-6 h-6" />
                      <span>Selecionado</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            onClick={handleConfirm}
            disabled={!selectedPlan}
            className="h-16 text-xl font-bold disabled:opacity-50 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Confirmar Mudança de Plano
          </Button>
          <Link href="/painel/meu-plano">
            <Button
              size="lg"
              variant="outline"
              className="w-full h-16 text-xl font-bold border bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all"
            >
              Cancelar
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
