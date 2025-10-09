"use client"

import Link from "next/link"
import { ArrowLeft, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function MudarPlanoPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const currentPlanId = "turbo"

  const plans = [
    {
      id: "basico",
      name: "Básico",
      speed: "80 Megas",
      price: "49,90",
      description: "Ideal para navegar e assistir vídeos",
      features: ["80 Mbps de velocidade", "Wi-Fi grátis"],
      popular: false,
    },
    {
      id: "turbo",
      name: "Turbo",
      speed: "300 Megas",
      price: "79,90",
      description: "Perfeito para trabalho e entretenimento",
      features: ["300 Mbps de velocidade", "Wi-Fi 5 grátis", "Sem fidelidade"],
      popular: true,
    },
    {
      id: "ultra",
      name: "Ultra",
      speed: "500 Megas",
      price: "119,90",
      description: "Máxima velocidade para casa ou empresa",
      features: ["500 Megas de velocidade", "Wi-Fi 6 grátis"],
      popular: false,
    },
  ]

  const handleSelectPlan = (planId: string) => {
    if (planId === currentPlanId) return
    setSelectedPlan(planId)
  }

  const handleConfirm = () => {
    if (selectedPlan) {
      alert("Solicitação enviada! Nossa equipe entrará em contato em breve para confirmar a mudança de plano.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/painel/meu-plano"
            className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-medium">Voltar</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Escolha seu Novo Plano</h1>
          <p className="mt-2 text-gray-600">Selecione o plano ideal para você</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentPlanId

            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-300 border-2 ${
                  isCurrentPlan
                    ? "border-gray-300 opacity-75 cursor-not-allowed"
                    : selectedPlan === plan.id
                      ? "border-primary shadow-xl scale-105 cursor-pointer"
                      : "border-gray-200 hover:border-primary hover:shadow-lg cursor-pointer"
                }`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {isCurrentPlan ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Plano Atual
                  </div>
                ) : (
                  plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </div>
                  )
                )}
                <CardHeader
                  className={`${isCurrentPlan ? "bg-gray-400" : "bg-primary"} text-white rounded-t-lg text-center py-6`}
                >
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <p className="text-sm mt-1 opacity-90">{plan.speed}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4 text-center">
                    <div className={`text-4xl font-bold ${isCurrentPlan ? "text-gray-500" : "text-primary"} mb-2`}>
                      R$ {plan.price}
                    </div>
                    <div className="text-gray-600 text-sm">por mês</div>
                  </div>

                  <p className="text-gray-700 text-sm text-center mb-4 leading-relaxed">{plan.description}</p>

                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isCurrentPlan ? "text-gray-500" : "text-primary"}`}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {isCurrentPlan ? (
                    <div className="flex items-center justify-center gap-2 text-gray-600 font-semibold bg-gray-100 py-2 px-4 rounded-lg text-sm">
                      <AlertCircle className="w-5 h-5" />
                      <span>Você já usa este plano</span>
                    </div>
                  ) : (
                    selectedPlan === plan.id && (
                      <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm">
                        <Check className="w-5 h-5" />
                        <span>Plano Selecionado</span>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleConfirm}
            disabled={!selectedPlan}
            className="h-auto py-6 px-12 text-lg md:text-xl font-semibold bg-primary hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Mudança de Plano
          </Button>
          <Link href="/painel/meu-plano">
            <Button
              size="lg"
              variant="outline"
              className="h-auto py-6 px-12 text-lg md:text-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all bg-transparent"
            >
              Cancelar
            </Button>
          </Link>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link href="/painel/meu-plano">
            <Button size="lg" variant="ghost" className="text-base gap-2 text-gray-600 hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              Voltar para Meu Plano
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
