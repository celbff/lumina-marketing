import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const screens = [
  {
    id: 1,
    title: "Mesa Real",
    description: "Leitura completa e sistêmica com todas as posições",
    image: "/images/tela_mesa_real.jpeg",
  },
  {
    id: 2,
    title: "Estudo & Fundamentos",
    description: "Aprenda os fundamentos do Baralho Cigano",
    image: "/images/tela_estudo.jpeg",
  },
  {
    id: 3,
    title: "Glossário",
    description: "Consulte significados e interpretações",
    image: "/images/tela_glossario.jpeg",
  },
  {
    id: 4,
    title: "Tiragem de 9 Cartas",
    description: "Leitura versátil com múltiplas interpretações",
    image: "/images/tela_tiragem_9_cartas.jpeg",
  },
  {
    id: 5,
    title: "Tiragem do Relógio",
    description: "Compreenda ciclos temporais e períodos",
    image: "/images/tela_tiragem_relogio.jpeg"
  },
  {
    id: 6,
    title: "Tiragem Personalizada",
    description: "Crie suas próprias tiragens customizadas",
    image: "/images/tela_tiragem_personalizada.jpeg",
  },
];

export default function AppPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  const currentScreen = screens[currentIndex];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 opacity-20" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 opacity-20" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
            Conheça a Interface do <span className="text-accent">Lumina</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma experiência intuitiva e elegante para explorar as leituras do Baralho Cigano
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 mb-8">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-secondary to-accent rounded-2xl opacity-20 blur-xl -z-10" />
            
            <img
              src={currentScreen.image}
              alt={currentScreen.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Info */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {currentScreen.title}
            </h3>
            <p className="text-muted-foreground">
              {currentScreen.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="icon"
              className="rounded-full border-accent/50 hover:border-accent hover:bg-accent/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Indicators */}
            <div className="flex gap-2">
              {screens.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-accent w-8"
                      : "bg-accent/30 hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="rounded-full border-accent/50 hover:border-accent hover:bg-accent/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Counter */}
          <div className="text-center text-sm text-muted-foreground">
            {currentIndex + 1} de {screens.length}
          </div>
        </div>
      </div>
    </section>
  );
}
