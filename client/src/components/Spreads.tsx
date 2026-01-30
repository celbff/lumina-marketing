import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

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
  const [activeId, setActiveId] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const spreadId = spreads[index]?.id;
            if (spreadId) setActiveId(spreadId);
          }
        });
      },
      { threshold: 0.5 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="spreads" className="relative py-20 overflow-hidden">
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
          {spreads.map((spread, index) => {
            const isActive = activeId === spread.id;
            
            return (
              <div
                key={spread.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`group relative p-6 rounded-lg transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-br from-accent/20 to-secondary/10 border-accent/60 shadow-lg shadow-accent/20"
                    : "bg-gradient-to-br from-white/5 to-white/[0.02] border-accent/20 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
                } border`}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-500 -z-10 ${
                  isActive
                    ? "bg-gradient-to-br from-accent/20 to-secondary/10"
                    : "bg-gradient-to-br from-accent/0 to-secondary/0 group-hover:from-accent/10 group-hover:to-secondary/10"
                }`} />

                {/* Icon */}
                <div className={`text-4xl mb-4 transition-all duration-300 ${
                  isActive ? "scale-125" : "group-hover:scale-110"
                }`}>
                  {spread.icon}
                </div>

                {/* Content */}
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white group-hover:text-accent"
                }`}>
                  {spread.name}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isActive ? "text-white/80" : "text-muted-foreground"
                }`}>
                  {spread.description}
                </p>

                {/* Decorative accent */}
                <div className={`absolute top-0 right-0 bg-gradient-to-b from-accent to-secondary rounded-r-lg transition-all duration-300 ${
                  isActive ? "w-1 h-full" : "w-1 h-0 group-hover:h-full"
                }`} />
              </div>
            );
          })}
        </div>

        {/* Coming soon notice */}
        <div className="mt-12 p-6 rounded-lg bg-secondary/10 border border-secondary/30 text-center">
          <p className="text-muted-foreground">
            <span className="text-accent font-semibold">Em breve:</span> Mais atualizações e métodos de tiragem serão adicionados ao Lumina
          </p>
        </div>

        {/* CTA para loja */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Interessado em adquirir baralhos ciganos e oráculos?</p>
          <a href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition">
            Conheça Nossa Loja
          </a>
        </div>
      </div>
    </section>
  );
}
