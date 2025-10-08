export default function Hero() {
  return (
    <section className="relative bg-primary text-white pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl relative z-10 opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            Internet de Alta Velocidade para Sua Casa
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pretty font-light opacity-0 animate-fade-in-up delay-200">
            Fibra óptica com instalação gratuita e suporte 24/7
          </p>
          <a
            href="https://wa.me/551234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-in-up delay-400 animate-pulse-glow"
          >
            Assine Agora pelo WhatsApp
          </a>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent hidden lg:block" />
    </section>
  )
}
