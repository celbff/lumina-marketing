import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, ArrowLeft } from "lucide-react";

const ADMIN_PASSWORD = "Lunara2026!";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      // Armazenar token no localStorage
      localStorage.setItem("admin_token", "authenticated");
      setLocation("/admin/shop");
    } else {
      setError("Senha incorreta");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-slate-900/50 border-accent/30">
        <div className="flex items-center justify-center mb-8">
          <Lock className="w-8 h-8 text-accent mr-3" />
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Playfair Display" }}>
            Painel Admin
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Senha de Acesso
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Digite a senha"
              className="bg-slate-800/50 border-accent/30 text-white placeholder:text-muted-foreground"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            Acessar Painel
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-accent/20">
          <a href="/" className="flex items-center gap-2 text-accent hover:text-accent/80 transition">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </a>
        </div>
      </Card>
    </div>
  );
}
