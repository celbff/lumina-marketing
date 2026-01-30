import { Sparkles, Brain, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Sparkles,
    title: "Sabedoria Ancestral",
    description: "Interpretações baseadas nos fundamentos reais do Baralho Cigano, respeitando a tradição e a profundidade das leituras.",
  },
  {
    icon: Brain,
    title: "Precisão Tecnológica",
    description: "IA treinada para análises sistêmicas e profundas, combinando padrões com intuição para respostas precisas.",
  },
  {
    icon: Clock,
    title: "Mentor 24h",
    description: "Tenha um especialista sempre ao seu lado para tirar suas dúvidas, explorar significados e aprofundar interpretações.",
  },
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveIndex(index);
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
    <section id="features" className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 -left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 opacity-20" />
      <div className="absolute bottom-1/3 -right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 opacity-20" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
            Por que escolher <span className="text-accent">Lumina</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma fusão perfeita entre tradição oracular ancestral e inteligência artificial moderna
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeIndex === index;
            
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`group relative p-8 rounded-xl transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-accent/20 to-secondary/10 border-accent/60 shadow-xl shadow-accent/20"
                    : "bg-gradient-to-br from-white/5 to-white/[0.02] border-accent/20"
                } border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10`}
              >
                {/* Glow on active/hover */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-500 -z-10 ${
                  isActive
                    ? "bg-gradient-to-br from-accent/20 to-secondary/10"
                    : "bg-gradient-to-br from-accent/0 to-secondary/0 group-hover:from-accent/10 group-hover:to-secondary/10"
                }`} />

                {/* Icon */}
                <div className={`mb-6 inline-block p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-accent/40"
                    : "bg-accent/10 group-hover:bg-accent/20"
                }`}>
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${
                    isActive ? "text-white" : "text-accent"
                  }`} />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white group-hover:text-accent"
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed transition-colors duration-300 ${
                  isActive ? "text-white/80" : "text-muted-foreground"
                }`}>
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-secondary rounded-b-xl transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
