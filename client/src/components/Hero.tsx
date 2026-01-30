export default function Hero() {

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950 -z-10" />
      
      {/* Efeito de luz de fundo */}
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 opacity-30" />
      <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10 opacity-20" />

      <div className="container relative z-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado esquerdo - Conteúdo */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "Playfair Display" }}>
                Conheça <span className="text-accent">Lumina</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Seu Mentor de Baralho Cigano com Inteligência Artificial. Combine a sabedoria ancestral com a precisão tecnológica para interpretações profundas e transformadoras.
              </p>
            </div>

            {/* Destaques rápidos */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-foreground">Sabedoria Ancestral</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-foreground">IA Avançada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-foreground">24h Disponível</span>
              </div>
            </div>



            {/* Link para degustação */}
            <div className="pt-4">
              <a
                href="https://novoscaminhos.github.io/portal-lumina/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition"
              >
                <span>Experimentar por 30 minutos</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Lado direito - Imagem */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-md">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent via-secondary to-accent rounded-2xl opacity-20 blur-xl" />
              
              {/* Imagem */}
              <img
                src="/images/imagem_principal_topo.jpeg"
                alt="Lumina - Mentor de Baralho Cigano com IA"
                className="relative w-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
