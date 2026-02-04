"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Cpu,
  FilePieChart,
  Landmark,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
          <span className="text-xl font-semibold tracking-[0.3em] text-[#d4af37]">
            SIMULA
          </span>
          <span className="rounded-full border border-[#d4af37]/40 px-3 py-1 text-xs uppercase text-[#d4af37]">
            GOV
          </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-[#b3b3c7] md:flex">
            <a className="hover:text-white" href="#recursos">
              Recursos
            </a>
            <a className="hover:text-white" href="#modulos">
              Módulos
            </a>
            <a className="hover:text-white" href="#contato">
              Contato
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              className="rounded-full border border-[#d4af37]/40 px-4 py-2 text-xs uppercase text-[#d4af37] hover:border-[#d4af37]"
              href="/login"
            >
              Entrar
            </a>
            <a
              className="hidden rounded-full bg-[#d4af37] px-4 py-2 text-xs font-semibold text-[#0a0a0f] md:inline-flex"
              href="#cta"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-20 pt-10">
        <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#d4af37]">
              <Sparkles className="h-4 w-4" />
              Inteligência econômica
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Plataforma de Inteligência Econômica
            </h1>
            <p className="text-lg text-[#b3b3c7]">
              Simule decisões de bilhões antes de implementar.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#cta"
                className="rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110"
              >
                Solicitar Demonstração
              </a>
              <a
                href="/login"
                className="rounded-full border border-[#d4af37]/40 px-6 py-3 text-sm font-semibold text-[#d4af37] hover:border-[#d4af37]"
              >
                Entrar
              </a>
            </div>
            <div className="grid gap-6 text-sm text-[#b3b3c7] sm:grid-cols-3">
              {[
                { label: "agentes", value: "200M+" },
                { label: "tempo", value: "< 1 segundo" },
                { label: "precisão", value: "99.2%" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-4">
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase text-[#b3b3c7]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl border border-[#d4af37]/20 p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-[#d4af37]">
                Visão executiva
              </h2>
              <FilePieChart className="h-5 w-5 text-[#d4af37]" />
            </div>
            <p className="mt-3 text-sm text-[#b3b3c7]">
              Modelos auditáveis, indicadores críticos e trilhas de decisão em
              uma única plataforma.
            </p>
            <div className="mt-6 space-y-4 text-sm text-white">
              {[
                { label: "Cenário atual", value: "R$ 3,2T" },
                { label: "Cenário proposto", value: "R$ 3,4T" },
                { label: "Economia potencial", value: "+ R$ 180B" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a0a0f]/60 px-4 py-3"
                >
                  <span>{row.label}</span>
                  <span className="text-[#d4af37]">{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="recursos" className="space-y-8">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-[#d4af37]" />
            <h2 className="font-display text-2xl font-semibold">Recursos</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Governança total",
                text: "Permissões por órgão, trilhas e auditoria contínua.",
              },
              {
                title: "Simulações massivas",
                text: "Milhões de agentes processados em segundos.",
              },
              {
                title: "Indicadores estratégicos",
                text: "KPIs claros para tomada de decisão imediata.",
              },
              {
                title: "Relatórios premium",
                text: "Exportações prontas para conselhos e comissões.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                  Destaque {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[#b3b3c7]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="modulos" className="space-y-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-[#d4af37]" />
            <h2 className="font-display text-2xl font-semibold">
              Os 4 módulos
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Diagnóstico Situacional",
                text: "Análise de indicadores macro e micro.",
              },
              {
                title: "Simulador de Cenários",
                text: "Milhões de agentes em segundos.",
              },
              {
                title: "Planejamento Estratégico",
                text: "Eixos e metas do mandato.",
              },
              {
                title: "Monitoramento e Relatórios",
                text: "Dashboards e exports.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#d4af37]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#b3b3c7]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="para-quem" className="space-y-8">
          <div className="flex items-center gap-3">
            <Landmark className="h-5 w-5 text-[#d4af37]" />
            <h2 className="font-display text-2xl font-semibold">Para quem</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Governos Estaduais e Federais",
                icon: <Landmark className="h-5 w-5 text-[#d4af37]" />,
                text: "Políticas públicas baseadas em evidências e simulações.",
              },
              {
                title: "Grandes Corporações",
                icon: <Briefcase className="h-5 w-5 text-[#d4af37]" />,
                text: "Planejamento fiscal, cenários e risco regulatório.",
              },
              {
                title: "Consultorias (Big Four)",
                icon: <BarChart3 className="h-5 w-5 text-[#d4af37]" />,
                text: "Estudos econômicos e relatórios premium para clientes.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-[#b3b3c7]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="cta"
          className="rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#12121a] via-[#0f0f17] to-[#12121a] p-10 text-center"
        >
          <h2 className="font-display text-2xl font-semibold">
            Transforme decisões públicas com inteligência econômica
          </h2>
          <p className="mt-4 text-sm text-[#b3b3c7]">
            Solicite uma demonstração e veja o SIMULA operando com seus dados.
          </p>
          <a
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110"
          >
            Solicitar Demonstração
          </a>
        </section>
      </main>

      <footer
        id="contato"
        className="border-t border-white/10 bg-[#0a0a0f] py-10"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 text-sm text-[#b3b3c7] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">SIMULA</p>
            <p>Plataforma estratégica de inteligência econômica</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <span>Recursos</span>
            <span>Módulos</span>
            <span>Contato</span>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-[#6f6f87]">
          © 2026 SIMULA - Uma empresa Allhinko
        </p>
      </footer>
    </div>
  );
}
