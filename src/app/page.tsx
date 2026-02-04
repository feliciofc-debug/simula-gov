export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold tracking-[0.3em] text-[#d4af37]">
            SIMULA
          </span>
          <span className="rounded-full border border-[#d4af37]/40 px-3 py-1 text-xs uppercase text-[#d4af37]">
            GOV
          </span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-[#b3b3c7]">
          <a className="hover:text-white" href="#como-funciona">
            Como funciona
          </a>
          <a className="hover:text-white" href="#seguranca">
            Segurança
          </a>
          <a
            className="rounded-full border border-[#d4af37]/40 px-4 py-2 text-[#d4af37] hover:border-[#d4af37]"
            href="/login"
          >
            Entrar
          </a>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-10">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.5em] text-[#d4af37]">
              Simulações econômicas públicas
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Antecipe impactos fiscais e sociais antes de aprovar políticas.
            </h1>
            <p className="text-lg text-[#b3b3c7]">
              O SimulaGov conecta dados de arrecadação e comportamento
              populacional a cenários tributários, entregando análises claras
              para decisões estratégicas.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/dashboard"
                className="rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110"
              >
                Abrir dashboard
              </a>
              <a
                href="/login"
                className="rounded-full border border-[#d4af37]/40 px-6 py-3 text-sm font-semibold text-[#d4af37] hover:border-[#d4af37]"
              >
                Acessar conta
              </a>
            </div>
            <div className="flex gap-6 text-sm text-[#b3b3c7]">
              <div>
                <p className="text-2xl font-semibold text-white">+10M</p>
                <p>Agentes simulados</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">2s</p>
                <p>Tempo médio</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">99.9%</p>
                <p>Confiabilidade</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-[#d4af37]/20 bg-[#11111a] p-8 shadow-[0_0_60px_rgba(212,175,55,0.15)]">
            <h2 className="text-xl font-semibold text-[#d4af37]">
              Painel Executivo
            </h2>
            <p className="mt-3 text-sm text-[#b3b3c7]">
              Compare cenários em tempo real com indicadores de arrecadação,
              redistribuição e bem-estar.
            </p>
            <div className="mt-6 space-y-4 text-sm text-white">
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#0a0a0f]/60 px-4 py-3">
                <span>Cenário atual</span>
                <span className="text-[#d4af37]">R$ 3,2T</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#0a0a0f]/60 px-4 py-3">
                <span>Cenário proposto</span>
                <span className="text-[#d4af37]">R$ 3,4T</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#0a0a0f]/60 px-4 py-3">
                <span>Variação</span>
                <span className="text-emerald-400">+6,1%</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="grid gap-6 md:grid-cols-3"
        >
          {[
            {
              title: "Dados reais",
              text: "Integração com bases públicas e relatórios internos.",
            },
            {
              title: "Modelos transparentes",
              text: "Regras fiscais claras e auditáveis.",
            },
            {
              title: "Resultados acionáveis",
              text: "Insights prontos para conselhos e ministérios.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/5 bg-[#11111a] p-6"
            >
              <h3 className="text-lg font-semibold text-[#d4af37]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-[#b3b3c7]">{item.text}</p>
            </div>
          ))}
        </section>

        <section
          id="seguranca"
          className="rounded-3xl border border-[#d4af37]/20 bg-[#11111a] p-8"
        >
          <h2 className="text-2xl font-semibold">Governança e Segurança</h2>
          <p className="mt-4 text-sm text-[#b3b3c7]">
            Controle de acesso por níveis, trilhas de auditoria e execução
            isolada em ambiente local. Dados sensíveis nunca saem da sua
            infraestrutura.
          </p>
        </section>
      </main>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-[#b3b3c7]">
        SIMULA GOV © 2026 • Plataforma estratégica para políticas públicas
      </footer>
    </div>
  );
}
