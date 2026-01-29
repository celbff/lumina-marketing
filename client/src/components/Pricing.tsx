import { useState } from "react";
import { Copy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const [copied, setCopied] = useState(false);
  const pixKey = "lunara_terapias@jim.com";
  const whatsappNumber = "5516997934558";
  const price = 39.90;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const message = `Olá! Realizei o pagamento via PIX e gostaria de ativar minha conta premium no Lumina.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setTimeout(() => {
      window.location.href = "/payment-success";
    }, 1000);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
            Acesso <span className="text-accent">Premium</span> ao Lumina
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desbloqueie todo o potencial do seu mentor de Baralho Cigano com IA
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-accent/30 shadow-2xl shadow-accent/20">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/0 via-accent/20 to-secondary/0 rounded-2xl opacity-30 blur-xl -z-10" />

            {/* Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="inline-block px-4 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                Tempo Limitado
              </span>
            </div>

            {/* Content */}
            <div className="relative space-y-8 pt-4">
              {/* Price */}
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  R$ {price.toFixed(2)}
                </div>
                <p className="text-muted-foreground">Acesso completo ao Lumina</p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">O que você recebe:</h3>
                <ul className="space-y-3">
                  {[
                    "Acesso ilimitado a todas as tiragens",
                    "Mesa Real, 9 Cartas, Relógio e Templo de Afrodite",
                    "Interpretações com IA avançada",
                    "Suporte e orientação 24h",
                    "Atualizações futuras incluídas",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 pt-4 border-t border-accent/20">
                {/* PIX */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white">1. Pague com PIX</h4>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-accent/20 text-sm text-muted-foreground truncate">
                      {pixKey}
                    </div>
                    <Button
                      onClick={handleCopyPix}
                      className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                        copied
                          ? "bg-green-600 hover:bg-green-600 text-white"
                          : "bg-accent hover:bg-accent/90 text-accent-foreground"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Copie a chave PIX e faça a transferência no seu banco
                  </p>
                </div>

                {/* WhatsApp */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-semibold text-white">2. Confirme via WhatsApp</h4>
                  <Button
                    onClick={handleWhatsApp}
                    className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enviar Comprovante no WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    +55 (16) 99793-4558
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">⏱️ Oferta limitada:</span> Aproveite este preço especial enquanto disponível!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Dúvidas sobre o pagamento? Entre em contato conosco via WhatsApp
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            Fale conosco no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
