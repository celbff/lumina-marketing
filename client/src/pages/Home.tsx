import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Spreads from "@/components/Spreads";
import AppPreview from "@/components/AppPreview";
import Creator from "@/components/Creator";
import Testimonials from "@/components/Testimonials";
import Plans from "@/components/Plans";
import Affiliate from "@/components/Affiliate";
import Footer from "@/components/Footer";

/**
 * Landing Page - Lumina
 * Tema: Escuro, Minimalista, Místico & Futurista
 * 
 * Seções:
 * 1. Hero - Apresentação principal com CTA
 * 2. Features - 3 diferenciais principais
 * 3. Spreads - Tiragens disponíveis
 * 4. AppPreview - Carrossel de telas do app
 * 5. Creator - Sobre Celso Luiz
 * 6. Testimonials - Depoimentos de usuários
 * 7. Pricing - Seção de pagamento
 * 8. Footer - Links e CTA final
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <Spreads />
      <AppPreview />
      <Creator />
      <Testimonials />
      <Plans />
      <Affiliate />
      <Footer />
    </div>
  );
}
