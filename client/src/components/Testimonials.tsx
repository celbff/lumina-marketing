import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Marina Silva",
    role: "Consultora de Vida",
    content:
      "Lumina transformou minha prática. As interpretações são precisas e profundas, combinando exatamente a sabedoria ancestral com a tecnologia moderna. Meus clientes ficam impressionados com a qualidade.",
    rating: 5,
  },
  {
    id: 2,
    name: "João Santos",
    role: "Terapeuta Holístico",
    content:
      "Nunca imaginei que a IA pudesse capturar tão bem a essência do Baralho Cigano. Celso criou algo verdadeiramente especial. É como ter um mentor disponível 24 horas.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Estudante de Tarô",
    content:
      "Como iniciante, Lumina me ajudou a entender os fundamentos de forma clara e estruturada. A interface é intuitiva e as explicações são sempre relevantes. Recomendo muito!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 opacity-20" />
      <div className="absolute bottom-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 opacity-20" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
            O que dizem sobre <span className="text-accent">Lumina</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de usuários que transformaram suas práticas
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="relative p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-accent/20 shadow-xl shadow-accent/10 mb-8">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/0 via-secondary/0 to-accent/0 rounded-xl opacity-20 blur-xl -z-10" />

            {/* Quote mark */}
            <div className="text-6xl text-accent/20 mb-4 leading-none">"</div>

            {/* Content */}
            <p className="text-lg text-foreground leading-relaxed mb-6">
              {currentTestimonial.content}
            </p>

            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-accent fill-accent"
                />
              ))}
            </div>

            {/* Author */}
            <div className="border-t border-accent/20 pt-6">
              <p className="font-semibold text-white">
                {currentTestimonial.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentTestimonial.role}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
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
              {testimonials.map((_, index) => (
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
        </div>
      </div>
    </section>
  );
}
