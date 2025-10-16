import Link from "next/link"
import { CreditCard, Wifi, FileText, LogOut, Headset } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <header className="bg-white border-b border-[#D2D2D7] py-6 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-primary tracking-tight">Innovanet</h1>
            <p className="text-[#6E6E73] mt-1 text-base">Central do Assinante</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-[#6E6E73] hover:text-primary transition-colors min-h-[44px] px-3"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline font-medium">Sair</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 tracking-tight">
            Bem-vindo ao seu Painel
          </h2>
          <p className="text-[#6E6E73] text-lg md:text-xl">Escolha o que você deseja fazer</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <Link href="/painel/meu-plano" className="block group">
            <Card className="h-full border border-[#D2D2D7] bg-white hover:shadow-xl transition-all duration-400 card-hover rounded-2xl overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-8 lg:p-10 text-center h-full min-h-[280px]">
                <div className="bg-primary/10 rounded-full p-6 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <CreditCard className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-2 text-[#1D1D1F] tracking-tight">Meu Plano</h2>
                <p className="text-[#6E6E73] text-sm lg:text-base leading-relaxed">
                  Veja detalhes do seu plano de internet
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/painel/meu-wifi/" className="block group">
            <Card className="h-full border border-[#D2D2D7] bg-white hover:shadow-xl transition-all duration-400 card-hover rounded-2xl overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-8 lg:p-10 text-center h-full min-h-[280px]">
                <div className="bg-primary/10 rounded-full p-6 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Wifi className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-2 text-[#1D1D1F] tracking-tight">
                  Minha Rede WiFi
                </h2>
                <p className="text-[#6E6E73] text-sm lg:text-base leading-relaxed">
                  Gerencie sua senha e configurações
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/painel/minhas-faturas" className="block group">
            <Card className="h-full border border-[#D2D2D7] bg-white hover:shadow-xl transition-all duration-400 card-hover rounded-2xl overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-8 lg:p-10 text-center h-full min-h-[280px]">
                <div className="bg-primary/10 rounded-full p-6 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <FileText className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-2 text-[#1D1D1F] tracking-tight">Minhas Faturas</h2>
                <p className="text-[#6E6E73] text-sm lg:text-base leading-relaxed">Consulte e pague suas contas</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/painel/suporte" className="block group">
            <Card className="h-full border border-[#D2D2D7] bg-white hover:shadow-xl transition-all duration-400 card-hover rounded-2xl overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-8 lg:p-10 text-center h-full min-h-[280px]">
                <div className="bg-primary/10 rounded-full p-6 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Headset className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-xl lg:text-2xl font-semibold mb-2 text-[#1D1D1F] tracking-tight">Suporte</h2>
                <p className="text-[#6E6E73] text-sm lg:text-base leading-relaxed">Fale conosco e tire suas dúvidas</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
