"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentMethodCardProps {
  title: string
  description: string
  icon: React.ReactNode
  isRecommended?: boolean
  onClick: () => void
}

export function PaymentMethodCard({ 
  title, 
  description, 
  icon, 
  isRecommended = false, 
  onClick 
}: PaymentMethodCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
        isRecommended ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-3 ${
            isRecommended ? 'bg-primary/20' : 'bg-gray-100'
          }`}>
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{title}</h3>
              {isRecommended && (
                <Badge className="bg-primary text-white text-xs">
                  Recomendado
                </Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PaymentMethodsProps {
  onPaymentMethodSelect: (method: string) => void
}

export function PaymentMethods({ onPaymentMethodSelect }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const paymentMethods = [
    {
      id: 'pix',
      title: 'PIX',
      description: 'Pagamento instantâneo e gratuito',
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      isRecommended: true
    },
    {
      id: 'credit-card',
      title: 'Cartão de Crédito',
      description: 'Parcelamento em até 12x sem juros',
      icon: <CreditCard className="w-6 h-6 text-primary" />
    },
    {
      id: 'boleto',
      title: 'Boleto Bancário',
      description: 'Pagamento em até 3 dias úteis',
      icon: <Clock className="w-6 h-6 text-primary" />
    }
  ]

  const handleMethodClick = (methodId: string) => {
    setSelectedMethod(methodId)
    onPaymentMethodSelect(methodId)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Escolha a Forma de Pagamento
        </h2>
        <p className="text-gray-600">
          Selecione a opção mais conveniente para você
        </p>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            title={method.title}
            description={method.description}
            icon={method.icon}
            isRecommended={method.isRecommended}
            onClick={() => handleMethodClick(method.id)}
          />
        ))}
      </div>

      {/* Informações de Segurança */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-800">Pagamento 100% Seguro</h4>
              <p className="text-sm text-green-700">
                Seus dados são protegidos com criptografia de nível bancário
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
