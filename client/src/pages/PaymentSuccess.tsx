import { useEffect, useState } from "react";
import { CheckCircle, Download, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-03-30T23:59:59").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-purple-950 flex flex-col">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-2xl w-full">
          {/* Success Card */}
          <div className="text-center mb-12">
            {/* Animated checkmark */}
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-accent rounded-full opacity-20 blur-xl animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="w-24 h-24 text-accent animate-bounce" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
              Pagamento <span className="text-accent">Confirmado!</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Bem-vindo ao Lumina. Sua jornada com o mentor de Baralho Cigano com IA começa agora.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-accent/30 shadow-2xl shadow-accent/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Oferta Limitada</h2>
              <p className="text-muted-foreground">Este preço especial expira em:</p>
            </div>

            {/* Timer Display */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { value: timeLeft.days, label: "Dias" },
                { value: timeLeft.hours, label: "Horas" },
                { value: timeLeft.minutes, label: "Minutos" },
                { value: timeLeft.seconds, label: "Segundos" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative p-4 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30 mb-2">
                    <div className="text-3xl lg:text-4xl font-bold text-accent">
                      {String(item.value).padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-accent">
              ⏰ Aproveite este preço especial enquanto disponível!
            </p>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Download,
                title: "1. Baixe o App",
                description: "Acesse a App Store ou Google Play para baixar Lumina",
              },
              {
                icon: MessageCircle,
                title: "2. Confirme no WhatsApp",
                description: "Envie seu comprovante para ativar sua conta premium",
              },
              {
                icon: Clock,
                title: "3. Comece Agora",
                description: "Acesse todas as tiragens e comece suas leituras",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-accent/20 hover:border-accent/50 transition"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-accent/20">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-12">
            <a
              href={`https://wa.me/5516997934558?text=Olá! Realizei o pagamento via PIX e gostaria de ativar minha conta premium no Lumina.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition text-lg">
                <MessageCircle className="w-6 h-6" />
                Confirmar Pagamento no WhatsApp
              </Button>
            </a>

            <a href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full px-8 py-4 border-accent/50 hover:border-accent hover:bg-accent/10 rounded-lg font-semibold transition text-lg"
              >
                Voltar para Home
              </Button>
            </a>
          </div>

          {/* Benefits Highlight */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20">
            <h3 className="text-xl font-bold text-white mb-4">O que você tem acesso agora:</h3>
            <ul className="space-y-3">
              {[
                "✨ Mesa Real - Leitura completa e sistêmica",
                "🔮 9 Cartas - Interpretação versátil",
                "⏰ Relógio - Compreensão de ciclos temporais",
                "💕 Templo de Afrodite - Questões de amor e relacionamentos",
                "🤖 IA Avançada - Interpretações profundas e personalizadas",
                "📚 Suporte 24h - Mentor sempre disponível",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-accent/20 py-8 px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Dúvidas? Entre em contato conosco via{" "}
            <a
              href={`https://wa.me/5516997934558`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition font-semibold"
            >
              WhatsApp
            </a>
          </p>
          <p className="mt-2">© 2026 Lumina. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
