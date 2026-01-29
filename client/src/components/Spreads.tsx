import { Badge } from "@/components/ui/badge";

const spreads = [
  {
    id: 1,
    name: "Mesa Real",
    description: "A disposição mais completa e sistêmica do Baralho Cigano para leituras profundas e evolutivas.",
    icon: "🎴",
  },
  {
    id: 2,
    name: "9 Cartas",
    description: "Uma tiragem versátil que oferece múltiplas camadas de interpretação simultânea.",
    icon: "🔮",
  },
  {
    id: 3,
    name: "Relógio",
    description: "Perfeita para compreender ciclos temporais e períodos de transformação.",
    icon: "⏰",
  },
  {
    id: 4,
    name: "Templo de Afrodite",
    description: "Especializada em questões de amor, relacionamentos e conexões profundas.",
    icon: "💕",
  },
];

export default function Spreads() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30">
            Tiragens Disponíveis
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
            Múltiplos Métodos de Leitura
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o método que melhor se adequa à sua pergunta e necessidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spreads.map((spread) => (
            <div
              key={spread.id}
              className="group relative p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-secondary/0 group-hover:from-accent/10 group-hover:to-secondary/10 rounded-lg transition-all duration-300 -z-10" />

              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {spread.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                {spread.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {spread.description}
              </p>

              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-1 h-0 bg-gradient-to-b from-accent to-secondary group-hover:h-full transition-all duration-300 rounded-r-lg" />
            </div>
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="mt-12 p-6 rounded-lg bg-secondary/10 border border-secondary/30 text-center">
          <p className="text-muted-foreground">
            <span className="text-accent font-semibold">Em breve:</span> Mais atualizações e métodos de tiragem serão adicionados ao Lumina
          </p>
        </div>
      </div>
    </section>
  );
}
