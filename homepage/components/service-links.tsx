import { FileText, Settings, MessageCircle } from "lucide-react"

export default function ServiceLinks() {
  return (
    <section className="py-8 -mt-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="bg-accent rounded-2xl shadow-2xl p-4 opacity-0 animate-scale-in backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/painel/minhas-faturas"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <FileText size={40} className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-semibold">Acesse agora mesmo sua 2ª via do boleto</span>
            </a>

            <a
              href="/painel/suporte"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <Settings size={40} className="transition-transform duration-300 group-hover:rotate-90" />
              <span className="font-semibold">Contate nosso Suporte para reparos</span>
            </a>

            <a
              href="https://wa.me/551234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <MessageCircle size={40} className="transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold">Compre seu plano pelo WhatsApp!</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
