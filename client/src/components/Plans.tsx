import { Badge } from "@/components/ui/badge";
import { Check, Copy, MessageCircle } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: 1,
    name: "Mensal",
    price: "29,90",
    period: "/mês",
    description: "Acesso contínuo com renovação mensal",
    popular: false,
    features: [
      "Todas as mesas",
      "Modo Estudo",
      "Mentor IA com limite mensal",
      "Atualizações contínuas",
    ],
    cta: "Começar com Mensal",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Anual",
    price: "299,00",
    period: "/ano",
    description: "Melhor relação custo-benefício",
    popular: true,
    features: [
      "Acesso a todas as mesas",
      "Modo Estudo interativo (fundamentos, geometria e tempo)",
      "Mentor IA integrado com limite mensal",
      "Leituras salvas e histórico",
      "Guia PDF de estudo",
      "Atualizações contínuas durante 12 meses",
    ],
    cta: "Começar com Anual",
    color: "from-accent to-secondary",
  },
  {
    id: 3,
    name: "Vitalício",
    price: "397,00",
    period: "único",
    description: "Investimento único, acesso permanente",
    popular: false,
    features: [
      "Todas as mesas atuais",
      "Modo estudo completo",
      "Guia PDF",
      "Mentor IA com limite justo",
      "Atualizações estruturais do app",
    ],
    cta: "Escolher Vitalício",
    color: "from-purple-500 to-pink-500",
  },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<number>(2);
  const [copied, setCopied] = useState(false);
  const pixKey = "lunara_terapias@jim.com";
  const whatsappNumber = "5516997934558";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="plans" className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30">
            Planos de Assinatura
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Playfair Display" }}>
            Escolha Seu Plano
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acesso ilimitado ao Lumina com diferentes opções de investimento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  isSelected ? "md:scale-105" : ""
                }`}
              >
                {/* Card */}
                <div
                  className={`relative p-8 rounded-2xl border transition-all duration-500 h-full flex flex-col ${
                    isSelected
                      ? `bg-gradient-to-br ${plan.color} bg-opacity-10 border-white/30 shadow-2xl shadow-accent/30`
                      : "bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-accent text-accent-foreground">
                        Mais Popular
                      </Badge>
                    </div>
                  )}

                  {/* Plan name and price */}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      isSelected ? "text-white" : "text-white/80"
                    }`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className={`text-4xl font-bold transition-colors duration-300 ${
                        isSelected ? "text-accent" : "text-white"
                      }`}>
                        R$ {plan.price}
                      </span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                            isSelected ? "text-accent" : "text-accent/60"
                          }`} />
                          <span className={`text-sm transition-colors duration-300 ${
                            isSelected && plan.id === 2 ? "text-white font-medium" : "text-white/80"
                          }`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isSelected
                        ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:shadow-accent/50`
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-16 p-6 rounded-lg bg-secondary/10 border border-secondary/30 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground">
            <span className="text-accent font-semibold">Todos os planos incluem:</span> Acesso ao Mentor IA, múltiplas tiragens, modo estudo e atualizações regulares
          </p>
        </div>

        {/* Payment Section */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Como Funciona o Pagamento</h3>
            
            <div className="space-y-8">
              {/* PIX Payment */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">1. Pague com PIX</h4>
                <p className="text-muted-foreground mb-4">Copie a chave PIX abaixo e faça a transferência no seu banco:</p>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-accent/20 text-sm text-white truncate font-mono">
                    {pixKey}
                  </div>
                  <button
                    onClick={handleCopyPix}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      copied
                        ? "bg-green-600 hover:bg-green-600 text-white"
                        : "bg-accent hover:bg-accent/90 text-accent-foreground"
                    }`}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp Confirmation */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">2. Confirme via WhatsApp</h4>
                <p className="text-muted-foreground mb-4">Após fazer o PIX, envie uma mensagem para confirmar seu pagamento:</p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Olá! Realizei o pagamento via PIX e gostaria de ativar minha conta no Lumina.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-center transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar Mensagem no WhatsApp
                </a>
                <p className="text-xs text-muted-foreground text-center">+55 (16) 99793-4558</p>
              </div>

              {/* Important Info */}
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">📋 Importante:</span> Após confirmar o pagamento via WhatsApp, você receberá as instruções de acesso ao Lumina em até 24 horas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
