import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';

export default function PWAInstallBanner() {
  const { isInstallable, isInstalled } = usePWA();
  const [showBanner, setShowBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowBanner(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowBanner(false);
    }

    setDeferredPrompt(null);
  };

  if (!showBanner || isInstalled || !isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-r from-accent to-secondary rounded-lg shadow-2xl p-4 border border-accent/30">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-white mb-1">Instale Lumina</h3>
            <p className="text-sm text-foreground/90">
              Acesse Lumina como um app direto na sua tela inicial
            </p>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-foreground/70 hover:text-foreground transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleInstall}
            className="flex-1 bg-white hover:bg-white/90 text-accent font-semibold flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Instalar
          </Button>
          <Button
            onClick={() => setShowBanner(false)}
            variant="outline"
            className="flex-1 border-white/30 hover:border-white/50 text-white"
          >
            Depois
          </Button>
        </div>
      </div>
    </div>
  );
}
