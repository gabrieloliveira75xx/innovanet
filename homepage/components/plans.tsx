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
    <section id="planos" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Nossos Planos</h2>
          <p className="text-xl text-gray-600">Escolha o plano ideal para você</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular ? "ring-4 ring-accent scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-1 right-4 bg-accent text-white px-4 py-1.5 text-sm font-bold rounded-full shadow-lg z-10">
                  Mais Popular
                </div>
              )}

              {/* Speed Badge */}
              <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-6 px-6 text-center">
                <h5 className="text-4xl font-bold">
                  {plan.speed} <span className="text-2xl font-normal">{plan.unit}</span>
                </h5>
              </div>

              {/* Animated Scene */}
              <div className="relative h-32 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
                {/* Stars */}
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}

                {/* Rocket */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-float">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-lg"
                  >
                    <path d="M12 2L4 12h5v8l3-4 3 4v-8h5L12 2z" fill="#FF9100" stroke="#fff" strokeWidth="1" />
                    <circle cx="12" cy="10" r="2" fill="#fff" />
                  </svg>
                </div>
              </div>

              {/* Price Section */}
              <div className="text-center py-6 px-6 bg-gray-50">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-xl text-gray-600 font-medium">R$</span>
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-lg text-gray-600 font-medium">/mês</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 font-medium">Internet Fibra Óptica</p>
              </div>

              {/* Features List */}
              <div className="px-6 py-6">
                <ul className="space-y-2.5">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="px-6 pb-6">
                <a
                  href="https://wa.me/551234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-accent text-white font-bold text-lg rounded-xl transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5"
                >
                  EU QUERO
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
