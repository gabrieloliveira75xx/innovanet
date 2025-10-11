"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Wifi, Eye, EyeOff, Copy, Check, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CategoryNav } from "@/components/category-nav"
import { UniversalPayment } from "@/components/universal-payment"

export default function MinhaWiFiPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [paymentItems, setPaymentItems] = useState<any[]>([])
  const wifiPassword = "MinhaS3nh@F0rt3"

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(wifiPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUpgradeWifi = () => {
    setPaymentItems([{
      id: 'wifi-upgrade',
      title: 'Upgrade para Wi-Fi 6',
      description: 'Melhoria da rede Wi-Fi para tecnologia mais avançada',
      amount: 25.00,
      quantity: 1
    }])
    setIsPaymentOpen(true)
  }

  const handlePaymentSuccess = (paymentData?: any) => {
    console.log('Upgrade Wi-Fi realizado com sucesso:', paymentData)
    alert('Upgrade Wi-Fi realizado com sucesso!')
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Minha Rede WiFi</h1>
          <p className="mt-2 text-gray-600">Gerencie sua rede e senha WiFi</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Card className="mb-8 shadow-lg border-2 border-gray-200">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="text-2xl md:text-3xl font-bold">Informações da Rede</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <Wifi className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">Nome da Rede (SSID)</h3>
                  <p className="text-2xl font-bold text-primary">Innovanet_Casa_5G</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="wifi-password" className="text-xl md:text-2xl font-bold text-gray-900">
                  Senha do WiFi
                </Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="wifi-password"
                      type={showPassword ? "text" : "password"}
                      value={wifiPassword}
                      readOnly
                      className="text-xl h-14 pr-12 font-mono border-2 border-gray-300"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                  <Button size="lg" onClick={handleCopyPassword} className="h-14 px-6 bg-primary hover:opacity-90">
                    {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  </Button>
                </div>
                <p className="text-gray-600 text-base">
                  {copied ? "✓ Senha copiada!" : "Clique no botão para copiar a senha"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-lg border-2 border-gray-200">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">Dicas Importantes</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3 text-base leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Mantenha sua senha em local seguro</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Não compartilhe sua senha com desconhecidos</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Reinicie o roteador se tiver problemas de conexão</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            size="lg"
            className="h-auto py-6 text-lg md:text-xl font-semibold bg-primary hover:opacity-90 transition-all"
          >
            Alterar Senha WiFi
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleUpgradeWifi}
            className="h-auto py-6 text-lg md:text-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all bg-transparent gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Upgrade Wi-Fi
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-auto py-6 text-lg md:text-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all bg-transparent"
          >
            Ajuda com WiFi
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

      {/* Modal de Pagamento */}
      <UniversalPayment
        items={paymentItems}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        title="Upgrade Wi-Fi"
        description="Confirme o pagamento para fazer upgrade da sua rede Wi-Fi"
      />
    </div>
  )
}
