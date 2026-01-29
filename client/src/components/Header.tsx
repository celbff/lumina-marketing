import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Diferenciais", href: "#features" },
    { label: "Tiragens", href: "#spreads" },
    { label: "Interface", href: "#preview" },
    { label: "Depoimentos", href: "#testimonials" },
    { label: "Preços", href: "#pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-blue-950/95 to-slate-900/90 backdrop-blur-md border-b border-accent/20">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <img
            src="/images/lumina-logo.jpg"
            alt="Lumina Logo"
            className="w-12 h-12 rounded-lg"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
              Lumina
            </span>
            <span className="text-xs text-accent">Mentor de Baralho Cigano</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-accent transition font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <a href="#pricing">
            <button className="px-6 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition">
              Começar Agora
            </button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-accent" />
          ) : (
            <Menu className="w-6 h-6 text-accent" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-accent/20 bg-blue-950/95 backdrop-blur-md">
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#pricing" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full px-6 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-semibold transition">
                Começar Agora
              </button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
