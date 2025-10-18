const plans = [
  {
    name: "Básico",
    price: "49,90",
    speed: "80",
    unit: "MEGA",
    features: [
      "Fibra óptica",
      "Wi-Fi Grátis",
      "Suporte técnico",
      "Sem consulta ao SPC/Serasa",
      "Instalação grátis",
      "Consulte disponibilidade",
    ],
    popular: false,
  },
  {
    name: "Turbo",
    price: "79,90",
    speed: "300",
    unit: "MEGA",
    features: [
      "Fibra óptica",
      "Wi-Fi 5 Grátis",
      "Suporte técnico",
      "Sem consulta ao SPC/Serasa",
      "Instalação grátis",
      "Consulte disponibilidade",
    ],
    popular: true,
  },
  {
    name: "Ultra",
    price: "119,90",
    speed: "500",
    unit: "MEGA",
    features: [
      "Fibra óptica",
      "Wi-Fi 6 Grátis",
      "Suporte técnico",
      "Sem consulta ao SPC/Serasa",
      "Instalação grátis",
      "Consulte disponibilidade",
    ],
    popular: false,
  },
]

export default function Plans() {
  return (
    <section id="planos" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4 text-balance">Nossos Planos</h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light">Escolha o plano ideal para você</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular ? "ring-2 ring-accent md:scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-accent text-white px-4 py-1.5 text-sm font-bold rounded-bl-xl">Mais Popular</div>
                </div>
              )}

              <div className="bg-primary text-white py-10 px-6 text-center">
                <h3 className="text-xl font-semibold mb-3 opacity-90">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-7xl font-bold">{plan.speed}</span>
                  <span className="text-2xl font-semibold">{plan.unit}</span>
                </div>
              </div>

              <div className="text-center py-6 px-6 border-b border-gray-100">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-lg text-gray-600">R$</span>
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-lg text-gray-600">/mês</span>
                </div>
              </div>

              <div className="px-6 py-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pb-6">
                <a
                  href="https://wa.me/551234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${
                    plan.popular
                      ? "bg-accent text-white hover:bg-accent/90 shadow-md hover:shadow-lg"
                      : "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
                  }`}
                >
                  Assinar Agora
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">Todos os planos incluem instalação gratuita e suporte técnico 24/7</p>
        </div>
      </div>
    </section>
  )
}
