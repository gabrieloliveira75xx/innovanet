import { MapPin } from "lucide-react"

export default function Coverage() {
  return (
    <section id="cobertura" className="py-20 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-300" />
      </div>

       {/** <div className="container mx-auto px-4 text-center relative z-10">
        <MapPin size={64} className="mx-auto mb-6 opacity-0 animate-scale-in" />
        <h2 className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-in-up delay-200">
          Área de Cobertura
        </h2>
        <p className="text-xl mb-8 opacity-0 animate-fade-in-up delay-300">Verifique se já estamos em sua região.</p>
        <a
          href="#"
          className="inline-block bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl opacity-0 animate-fade-in-up delay-400"
        >
          Consultar Viabilidade
        </a>
      </div>*/}   
    </section>
  )
}
