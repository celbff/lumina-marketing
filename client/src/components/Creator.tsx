import { Star } from "lucide-react";

export default function Creator() {
  return (
    <section id="creator" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagem Circular */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm flex justify-center">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent via-secondary to-accent rounded-full opacity-20 blur-xl" />
              
              {/* Circular Frame */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl shadow-accent/30 border-4 border-accent/20 flex-shrink-0">
                <img
                  src="/images/celso_luiz.png"
                  alt="Celso Luiz - Criador do Lumina"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-accent font-semibold">Conheça o Criador</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
                Celso Luiz
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Formado como Psicoterapeuta Holístico, possui experiência de vários anos e milhares de atendimentos nas abordagens de terapias complementares e leituras oraculares, também especializado em design digital e venda de cartas de oráculos e baralhos com ou sem legendas*. Com alto desenvolvimento espiritual e orientação transformadora.
              </p>
            </div>

            {/* Expertise */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Especialidades</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Leituras Intuitivas",
                  "Interpretação Sistêmica",
                  "Orientação Espiritual",
                  "Desenvolvimento Pessoal",
                  "Análise de Ciclos",
                  "Consultoria Oracular",
                ].map((specialty, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-foreground">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20">
              <p className="text-foreground leading-relaxed">
                <span className="font-semibold text-accent">"Lumina"</span> nasceu da visão de democratizar o acesso à sabedoria oracular, combinando a profundidade da tradição com a precisão da inteligência artificial, para que todos possam receber orientações transformadoras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
