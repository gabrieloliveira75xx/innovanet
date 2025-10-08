import { Facebook, Instagram, Youtube, FileText, Settings, MessageCircle, FileCheck } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="bg-accent rounded-2xl p-6 -mt-32 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <a
              href="/painel/faturas"
              className="flex items-center gap-4 bg-white/10 hover:bg-primary p-5 rounded-xl transition-all hover:shadow-lg"
            >
              <FileText size={36} className="flex-shrink-0" />
              <span className="font-semibold text-sm leading-tight">Acesse agora a sua 2ª via de fatura.</span>
            </a>

            <a
              href="/painel"
              className="flex items-center gap-4 bg-white/10 hover:bg-primary p-5 rounded-xl transition-all hover:shadow-lg"
            >
              <MessageCircle size={36} className="flex-shrink-0" />
              <span className="font-semibold text-sm leading-tight">Acesse agora a sua área do cliente.</span>
            </a>

            <a
              href="/painel/meu-plano/suporte"
              className="flex items-center gap-4 bg-white/10 hover:bg-primary p-5 rounded-xl transition-all hover:shadow-lg"
            >
              <Settings size={36} className="flex-shrink-0" />
              <span className="font-semibold text-sm leading-tight">Contate nosso suporte para reparos.</span>
            </a>

            <a
              href="/painel/meu-wifi/"
              className="flex items-center gap-4 bg-white/10 hover:bg-primary p-5 rounded-xl transition-all hover:shadow-lg"
            >
              <FileCheck size={36} className="flex-shrink-0" />
              <span className="font-semibold text-sm leading-tight">Veja a senha e configure o Wi-Fi.</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-3xl font-bold mb-4">Innovanet</h3>
            <p className="text-white/90 font-light leading-relaxed">Internet de alta velocidade com fibra óptica</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Menu</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/80 hover:text-accent transition-colors font-light">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-accent transition-colors font-light">
                  Para Você
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-accent transition-colors font-light">
                  Para Empresas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-accent transition-colors font-light">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contato</h4>
            <p className="text-white/90 mb-2 font-light flex items-center gap-2">
              <MessageCircle size={20} />
              (12) 34567890
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Redes Sociais</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-white/10 hover:bg-accent p-3 rounded-lg transition-all hover:scale-110 hover:shadow-lg"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-accent p-3 rounded-lg transition-all hover:scale-110 hover:shadow-lg"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-accent p-3 rounded-lg transition-all hover:scale-110 hover:shadow-lg"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/80 font-light">
          <p>&copy; 2025 Innovanet - Todos direitos reservados.</p>
        </div>
      </div>

      <a
        href="https://wa.me/551234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50 flex items-center gap-2 group"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline font-semibold">WhatsApp</span>
      </a>
    </footer>
  )
}
