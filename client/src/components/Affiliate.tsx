import { Badge } from "@/components/ui/badge";
import { ArrowRight, Gift, TrendingUp, Users } from "lucide-react";

export default function Affiliate() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 -z-10" />
      
      {/* Decorative animated elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />

      <div className="container relative z-10">
        {/* Main CTA Section */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/20 text-accent hover:bg-accent/30 animate-pulse">
              🚀 Oportunidade
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "Playfair Display" }}>
              Quer Ter Uma Renda Extra?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Torne-se um <span className="text-accent font-semibold">Afiliado Lumina</span> e ganhe comissões por cada venda
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="relative mb-16">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-accent rounded-2xl blur opacity-75 -z-10 animate-pulse" />
            
            <div className="relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-12 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left side - Benefits */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8">
                    Benefícios do Programa
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: TrendingUp,
                        title: "Comissões Atrativas",
                        desc: "Ganhe uma comissão generosa por cada venda realizada",
                      },
                      {
                        icon: Users,
                        title: "Suporte Dedicado",
                        desc: "Equipe pronta para ajudar no seu crescimento",
                      },
                      {
                        icon: Gift,
                        title: "Materiais Prontos",
                        desc: "Acesso a banners, textos e conteúdo para divulgar",
                      },
                    ].map((benefit, idx) => {
                      const Icon = benefit.icon;
                      return (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/20">
                              <Icon className="h-6 w-6 text-accent" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">
                              {benefit.title}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {benefit.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right side - CTA */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block mb-6 p-6 rounded-2xl bg-accent/10 border border-accent/30">
                      <p className="text-5xl font-bold text-accent mb-2">∞</p>
                      <p className="text-white font-semibold">Ganhos Ilimitados</p>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-4">
                      Comece Agora!
                    </h4>
                    
                    <p className="text-muted-foreground mb-8">
                      Entre em contato conosco e saiba mais sobre como se tornar um afiliado Lumina
                    </p>

                    <a
                      href="https://wa.me/5516997934558?text=Olá! Gostaria de saber mais sobre o programa de afiliados Lumina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-lg font-bold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 group"
                    >
                      Fale Conosco no WhatsApp
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <p className="text-xs text-muted-foreground mt-4">
                      Resposta em até 24 horas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: "1000+", label: "Usuários Ativos" },
              { number: "50+", label: "Afiliados Parceiros" },
              { number: "R$ 100k+", label: "Comissões Pagas" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
              >
                <p className="text-3xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
