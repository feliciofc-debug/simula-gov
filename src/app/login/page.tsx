"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const FIXED_EMAIL = "feliciofc@gmail.com";
const FIXED_PASSWORD = "Dcd318798$";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
      if (typeof window !== "undefined") {
        localStorage.setItem("simula-auth", "true");
        localStorage.setItem("simula-user", email);
      }
      setError(null);
      router.push("/dashboard");
      return;
    }
    setError("Credenciais inválidas. Verifique e tente novamente.");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-12 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-semibold tracking-[0.3em] text-[#d4af37]"
          >
            SIMULA
          </a>
          <a
            href="/dashboard"
            className="rounded-full border border-[#d4af37]/40 px-4 py-2 text-xs uppercase text-[#d4af37]"
          >
            Ir para o painel
          </a>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/5 bg-[#11111a] p-8">
            <h1 className="text-3xl font-semibold">Acesso governamental</h1>
            <p className="mt-3 text-sm text-[#b3b3c7]">
              Utilize suas credenciais institucionais para acessar as
              simulações e relatórios estratégicos.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm text-[#b3b3c7]">E-mail</label>
                <input
                  type="email"
                  placeholder="nome.sobrenome@gov.br"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white placeholder:text-[#59607a] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#b3b3c7]">Senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white placeholder:text-[#59607a] focus:border-[#d4af37] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#d4af37] py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110"
              >
                Entrar
              </button>
              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                  {error}
                </div>
              )}
            </form>
          </div>

          <aside className="rounded-3xl border border-[#d4af37]/20 bg-[#11111a] p-8">
            <h2 className="text-xl font-semibold text-[#d4af37]">
              Acesso em múltiplos níveis
            </h2>
            <p className="mt-3 text-sm text-[#b3b3c7]">
              Controle de permissões por órgão, secretaria e nível de decisão.
              Compartilhe resultados com conselhos e comissões sem expor dados
              sensíveis.
            </p>
            <div className="mt-6 space-y-4 text-sm">
              {[
                "Camadas de segurança e auditoria",
                "Histórico completo de cenários",
                "Relatórios exportáveis em PDF",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/5 bg-[#0a0a0f]/60 px-4 py-3 text-[#b3b3c7]"
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
