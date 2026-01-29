import { Button } from "@/components/ui/button";
import { Mail, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-accent/20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent -z-10 opacity-30" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
              <span className="text-accent">Lumina</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Seu mentor de Baralho Cigano com Inteligência Artificial. Sabedoria ancestral encontra tecnologia moderna.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-accent transition">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#spreads" className="text-muted-foreground hover:text-accent transition">
                  Tiragens
                </a>
              </li>
              <li>
                <a href="#preview" className="text-muted-foreground hover:text-accent transition">
                  Interface
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-accent transition">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition">
                  Guias
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Conecte-se</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-accent/20 hover:border-accent hover:bg-accent/10 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-accent" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-accent/20 hover:border-accent hover:bg-accent/10 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-accent" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-accent/20 hover:border-accent hover:bg-accent/10 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-accent" />
              </a>
              <a
                href="mailto:contato@lumina.com"
                className="p-2 rounded-lg bg-white/5 border border-accent/20 hover:border-accent hover:bg-accent/10 transition"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-accent" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative p-8 rounded-xl bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20 mb-12">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/0 to-secondary/0 rounded-xl opacity-20 blur-xl -z-10" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Pronto para explorar Lumina?
              </h3>
              <p className="text-muted-foreground">
                Comece com 30 minutos de acesso gratuito, sem cartão de crédito necessário
              </p>
            </div>
            <a href="https://novoscaminhos.github.io/portal-lumina/" target="_blank" rel="noopener noreferrer">
              <Button className="px-8 py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg font-semibold whitespace-nowrap">
                Experimentar Agora
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-accent/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © 2026 Lumina. Todos os direitos reservados. Criado por Celso Luiz.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition">
              Privacidade
            </a>
            <a href="#" className="hover:text-accent transition">
              Termos
            </a>
            <a href="#" className="hover:text-accent transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
