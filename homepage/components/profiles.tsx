
const profiles = [
  {
    title: "Home Office",
    subtitle: "Trabalha em casa?",
    backgroundImage: "/home-office.png",
    bgWidth: 370,
    bgHeight: 580,
  },
  {
    title: "Streaming",
    subtitle: "Assiste filmes e séries?",
    backgroundImage: "/streaming.png",
    bgWidth: 370,
    bgHeight: 580,
  },
  {
    title: "Gamer",
    subtitle: "Joga Bastante?",
    backgroundImage: "/gamer.png",
    bgWidth: 370,
    bgHeight: 580,
  },
]

export default function Profiles() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Aqui você tem <strong>muito mais</strong>
          </h2>
          <p className="text-xl text-gray-600">Qual seu perfil de velocidade?</p>
        </div>

        <div className="list-items container2">
          <div className="row2 grid grid-cols-1 md:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <a
                key={profile.title}
                href="#planos"
                className="item grid-4 group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <figure className="aspect-[370/580] relative overflow-hidden">
                  <img
                    src={profile.backgroundImage || "/placeholder.svg"}
                    alt={profile.title}
                    width={profile.bgWidth}
                    height={profile.bgHeight}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300" />
                  <div className="content absolute bottom-0 left-0 right-0 p-8 text-white text-center translate-y-8 group-hover:translate-y-0 transition-all duration-300">
                    <h4 className="title text-6xl font-bold mb-1">{profile.title}</h4>
                    <h5 className="subtitle text-xl mb-5 opacity-90">{profile.subtitle}</h5>
                    <div className="btn opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="relative inline-block bg-accent hover:bg-accent/90 px-8 py-3 rounded-lg font-semibold transition-all duration-300 group-hover:scale-105">
                        <span className="relative z-10">Veja os planos</span>
                      </span>
                    </div>
                  </div>
                  <div className="icon absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                  </div>
                </figure>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
