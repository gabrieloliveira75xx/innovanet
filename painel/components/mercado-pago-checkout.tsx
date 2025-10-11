"use client"

import { useState, useEffect, useRef } from "react"
import { initMercadoPago, Payment } from "@mercadopago/sdk-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, CreditCard, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react"

// Configuração do Mercado Pago - Credenciais de Teste
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "TEST-acb6b977-55a6-494d-864f-fad1aeabb557"
const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "TEST-6600054139336956-101020-93c9569ba92ef0403eec39d9c510bf04-2081096650"

interface Fatura {
  id: number
  mes: string
  valor: string
  vencimento: string
  status: string
}

interface MercadoPagoCheckoutProps {
  fatura: Fatura
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
}

export function MercadoPagoCheckout({ 
  fatura, 
  isOpen, 
  onClose, 
  onPaymentSuccess 
}: MercadoPagoCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isMercadoPagoReady, setIsMercadoPagoReady] = useState(false)
  const [preferenceId, setPreferenceId] = useState<string | null>(null)
  const [isBrickReady, setIsBrickReady] = useState(false)
  const paymentBrickRef = useRef<any>(null)

  useEffect(() => {
    if (isOpen) {
      // Inicializar Mercado Pago
      const initMP = async () => {
        try {
          await initMercadoPago(PUBLIC_KEY, {
            locale: 'pt-BR'
          })
          setIsMercadoPagoReady(true)
          await createPaymentPreference()
        } catch (error: any) {
          console.error('Erro ao inicializar Mercado Pago:', error)
          setErrorMessage('Erro ao carregar sistema de pagamento')
          setPaymentStatus('error')
        }
      }
      initMP()
    }
  }, [isOpen])

  const createPaymentPreference = async () => {
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fatura })
      })

      if (!response.ok) {
        throw new Error('Erro ao criar preferência de pagamento')
      }

      const data = await response.json()
      setPreferenceId(data.preferenceId)
      setPaymentStatus('idle')
    } catch (error) {
      console.error('Erro ao criar preferência:', error)
      setPaymentStatus('error')
      setErrorMessage('Erro ao processar pagamento. Tente novamente.')
    }
  }

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    setIsLoading(true)
    setPaymentStatus('processing')
    
    try {
      // Processar pagamento usando nosso endpoint
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          formData: {
            ...formData,
            amount: parseFloat(fatura.valor.replace('R$ ', '').replace(',', '.'))
          },
          selectedPaymentMethod 
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setPaymentStatus('success')
        setTimeout(() => {
          onPaymentSuccess()
          onClose()
        }, 2000)
      } else {
        throw new Error(result.error || 'Erro ao processar pagamento')
      }
      
    } catch (error) {
      setPaymentStatus('error')
      setErrorMessage('Erro ao processar pagamento')
    } finally {
      setIsLoading(false)
    }
  }

  const onError = async (error: any) => {
    console.error('Erro no Payment Brick:', error)
    setPaymentStatus('error')
    setErrorMessage('Erro no sistema de pagamento')
  }

  const onReady = async () => {
    setIsBrickReady(true)
    console.log('Payment Brick está pronto')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto payment-modal-container">
      <div className="w-full max-w-4xl mx-auto my-4">
        <Card className="shadow-2xl max-h-[90vh] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
              Pagar Fatura - {fatura.mes}
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
          
          <CardContent className="space-y-4 sm:space-y-6 flex-1 overflow-y-auto payment-modal-content">
          {/* Informações da Fatura */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Mês:</span>
              <span className="font-semibold text-sm sm:text-base">{fatura.mes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-gray-600">Vencimento:</span>
              <span className="font-semibold text-sm sm:text-base">{fatura.vencimento}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2 sm:pt-3">
              <span className="text-xs sm:text-sm text-gray-600">Valor:</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">{fatura.valor}</span>
            </div>
          </div>

          {/* Payment Brick */}
          {isMercadoPagoReady && preferenceId && (
            <div className="min-h-[500px] sm:min-h-[600px] max-h-[70vh] overflow-hidden mercadopago-bricks-container">
              {paymentStatus === 'idle' && (
                <div className="h-full">
                  <Payment
                    initialization={{
                      amount: parseFloat(fatura.valor.replace('R$ ', '').replace(',', '.')),
                      preferenceId: preferenceId,
                    }}
                    customization={{
                      paymentMethods: {
                        ticket: "all",
                        bankTransfer: "all", 
                        creditCard: "all",
                        prepaidCard: "all",
                        debitCard: "all",
                        mercadoPago: "all",
                      },
                    }}
                    onSubmit={onSubmit}
                    onReady={onReady}
                    onError={onError}
                  />
                </div>
              )}
            </div>
          )}

          {/* Estados de Loading e Feedback */}
          {paymentStatus === 'processing' && (
            <div className="text-center space-y-4 py-8">
              <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 animate-spin" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Processando Pagamento</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Aguarde enquanto processamos seu pagamento...
                </p>
              </div>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="text-center space-y-4 py-8">
              <div className="bg-green-50 rounded-lg p-4 sm:p-6">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Pagamento Aprovado!</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Sua fatura foi paga com sucesso. Você será redirecionado em breve.
                </p>
              </div>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center space-y-4 py-8">
              <div className="bg-red-50 rounded-lg p-4 sm:p-6">
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Erro no Pagamento</h3>
                <p className="text-xs sm:text-sm text-red-600 mb-4">{errorMessage}</p>
                <Button 
                  onClick={() => {
                    setPaymentStatus('idle')
                    createPaymentPreference()
                  }}
                  variant="outline"
                  className="w-full text-sm sm:text-base"
                >
                  Tentar Novamente
                </Button>
              </div>
            </div>
          )}

          {/* Informações de Segurança */}
          <div className="bg-green-50 rounded-lg p-3 sm:p-4 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-800 text-xs sm:text-sm">Pagamento 100% Seguro</h4>
                <p className="text-xs sm:text-sm text-green-700">
                  Seus dados são protegidos com criptografia de nível bancário
                </p>
              </div>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}