"use client"

import { useState, useEffect } from "react"
import { initMercadoPago, StatusScreen } from "@mercadopago/sdk-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, X } from "lucide-react"

// Configuração do Mercado Pago
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "TEST-acb6b977-55a6-494d-864f-fad1aeabb557"

interface StatusScreenProps {
  paymentId: string
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
}

export function PaymentStatusScreen({ 
  paymentId, 
  isOpen, 
  onClose, 
  onPaymentSuccess 
}: StatusScreenProps) {
  const [isMercadoPagoReady, setIsMercadoPagoReady] = useState(false)
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading')

  useEffect(() => {
    if (isOpen) {
      // Inicializar Mercado Pago
      const initMP = async () => {
        try {
          await initMercadoPago(PUBLIC_KEY, {
            locale: 'pt-BR'
          })
          setIsMercadoPagoReady(true)
        } catch (error) {
          console.error('Erro ao inicializar Mercado Pago:', error)
        }
      }
      initMP()
    }
  }, [isOpen])

  const onReady = async () => {
    console.log('Status Screen Brick está pronto')
  }

  const onError = async (error: any) => {
    console.error('Erro no Status Screen Brick:', error)
    setStatus('error')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg mx-auto shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold text-gray-900">
            Status do Pagamento
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Status Screen Brick */}
          {isMercadoPagoReady && (
            <div className="min-h-[300px]">
              <StatusScreen
                initialization={{
                  paymentId: paymentId,
                }}
                onReady={onReady}
                onError={onError}
              />
            </div>
          )}

          {/* Fallback para quando o Brick não carregar */}
          {!isMercadoPagoReady && (
            <div className="text-center space-y-4">
              <div className="bg-blue-50 rounded-lg p-6">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-pulse" />
                <h3 className="font-semibold text-gray-900 mb-2">Carregando Status</h3>
                <p className="text-sm text-gray-600">
                  Aguarde enquanto verificamos o status do seu pagamento...
                </p>
              </div>
            </div>
          )}

          {/* Botão de ação */}
          <div className="flex gap-3">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Fechar
            </Button>
            <Button 
              onClick={() => {
                onPaymentSuccess()
                onClose()
              }}
              className="flex-1 bg-primary hover:opacity-90"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
