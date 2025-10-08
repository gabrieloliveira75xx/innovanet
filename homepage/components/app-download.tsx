import Link from "next/link"
import { LogIn } from "lucide-react"

export default function AppDownload() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-2xl opacity-0 animate-scale-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white opacity-0 animate-slide-in-left delay-200 flex-1">
              <h3 className="text-3xl font-bold mb-4">Acessar Central do Assinante</h3>
              <p className="text-lg mb-6">
                Gerencie sua assinatura, consulte faturas e muito mais em nossa área exclusiva para clientes.
              </p>

              <Link
                href="/painel"
                className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <LogIn size={24} className="transition-transform duration-300 group-hover:scale-110" />
                <span>Acessar Agora</span>
              </Link>
            </div>

            <div className="flex justify-center opacity-0 animate-slide-in-right delay-500">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-6xl font-bold text-primary">Innovanet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
