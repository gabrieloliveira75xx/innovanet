import Link from "next/link"
import { CreditCard, Wifi, FileText, Headset } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryNav } from "@/components/category-nav"

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <CategoryNav hideMenuItems={true} showLogoutButton={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-3 tracking-tight">
            O que você deseja fazer?
          </h2>
          <p className="text-[#6E6E73] text-base sm:text-lg md:text-xl">Escolha uma das opções abaixo</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <Link href="/painel/meu-plano" className="block group">
            <Card className="h-full border border-[#D2D2D7] bg-white hover:shadow-2xl transition-all duration-500 card-hover rounded-2xl overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-8 lg:p-10 text-center h-full min-h-[160px] sm:min-h-[280px]">
                <div className="bg-primary/10 rounded-full p-3 sm:p-6 mb-3 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <CreditCard className="w-8 h-8 sm:w-12 sm:h-12 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-2 text-[#1D1D1F] tracking-tight">
                  Meu Plano
                </h2>
                <p className="hidden sm:block text-[#6E6E73] text-xs sm:text-sm lg:text-base leading-relaxed">
                  Veja detalhes do seu plano de internet
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/painel/meu-wifi/" className="block group">
            <Card className="h-full border border-[#D2D2D7] bg-white hover:shadow-2xl transition-all duration-500 card-hover rounded-2xl overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-8 lg:p-10 text-center h-full min-h-[160px] sm:min-h-[280px]">
                <div className="bg-primary/10 rounded-full p-3 sm:p-6 mb-3 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <Wifi className="w-8 h-8 sm:w-12 sm:h-12 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-2 text-[#1D1D1F] tracking-tight">
                  Minha Rede WiFi
                </h2>
                <p className="hidden sm:block text-[#6E6E73] text-xs sm:text-sm lg:text-base leading-relaxed">
                  Gerencie sua senha e configurações
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/painel/minhas-faturas" className="block group">
            <Card className="h-full border border-[#D2D2D7] bg-white hover:shadow-2xl transition-all duration-500 card-hover rounded-2xl overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-8 lg:p-10 text-center h-full min-h-[160px] sm:min-h-[280px]">
                <div className="bg-primary/10 rounded-full p-3 sm:p-6 mb-3 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-2 text-[#1D1D1F] tracking-tight">
                  Minhas Faturas
                </h2>
                <p className="hidden sm:block text-[#6E6E73] text-xs sm:text-sm lg:text-base leading-relaxed">
                  Consulte e pague suas contas
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/painel/suporte" className="block group">
            <Card className="h-full border border-[#D2D2D7] bg-white hover:shadow-2xl transition-all duration-500 card-hover rounded-2xl overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-8 lg:p-10 text-center h-full min-h-[160px] sm:min-h-[280px]">
                <div className="bg-primary/10 rounded-full p-3 sm:p-6 mb-3 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <Headset className="w-8 h-8 sm:w-12 sm:h-12 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h2 className="text-base sm:text-xl lg:text-2xl font-semibold mb-2 text-[#1D1D1F] tracking-tight">
                  Suporte
                </h2>
                <p className="hidden sm:block text-[#6E6E73] text-xs sm:text-sm lg:text-base leading-relaxed">
                  Fale conosco e tire suas dúvidas
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
