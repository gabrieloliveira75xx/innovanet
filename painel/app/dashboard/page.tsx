import Link from "next/link"
import { CreditCard, Wifi, FileText, LogOut } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Innovanet</h1>
            <p className="text-gray-600 mt-1">Central do Assinante</p>
          </div>
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
            <LogOut size={20} />
            <span className="hidden sm:inline">Sair</span>
          </Link>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao seu Painel</h2>
          <p className="text-gray-600 text-lg">Escolha o que você deseja fazer</p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Meu Plano Card */}
          <Link href="/painel/meu-plano" className="block group">
            <Card className="h-full border-2 border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center h-full">
                <div className="bg-primary/10 rounded-full p-8 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <CreditCard className="w-16 h-16 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Meu Plano</h2>
                <p className="text-gray-600 text-base leading-relaxed">Veja detalhes do seu plano de internet</p>
              </CardContent>
            </Card>
          </Link>

          {/* Minha Rede WiFi Card */}
          <Link href="/painel/meu-wifi/" className="block group">
            <Card className="h-full border-2 border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center h-full">
                <div className="bg-primary/10 rounded-full p-8 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Wifi className="w-16 h-16 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Minha Rede WiFi</h2>
                <p className="text-gray-600 text-base leading-relaxed">Gerencie sua senha e configurações</p>
              </CardContent>
            </Card>
          </Link>

          {/* Minhas Faturas Card */}
          <Link href="/painel/minhas-fatura" className="block group">
            <Card className="h-full border-2 border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300">
              <CardContent className="flex flex-col items-center justify-center p-10 text-center h-full">
                <div className="bg-primary/10 rounded-full p-8 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <FileText className="w-16 h-16 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Minhas Faturas</h2>
                <p className="text-gray-600 text-base leading-relaxed">Consulte e pague suas contas</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
