"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Building2,
  ChevronRight,
  Cpu,
  FilePieChart,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
        <nav className="hidden items-center gap-6 text-sm text-[#b3b3c7] md:flex">
          <a className="hover:text-white" href="#como-funciona">
            Como funciona
          </a>
          <a className="hover:text-white" href="#para-quem">
            Para quem
          </a>
          <a className="hover:text-white" href="#cases">
            Casos de uso
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
            Solicitar demonstração
          </a>
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
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Simule decisões de bilhões antes de implementar
            </h1>
            <p className="text-lg text-[#b3b3c7]">
              O SimulaGov antecipa impactos tributários, sociais e fiscais em
              segundos, permitindo decisões públicas com confiança e evidências.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/dashboard"
                className="rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110"
              >
                Acessar dashboard
              </a>
              <a
                href="#cta"
                className="rounded-full border border-[#d4af37]/40 px-6 py-3 text-sm font-semibold text-[#d4af37] hover:border-[#d4af37]"
              >
                Solicitar demonstração
              </a>
            </div>
            <div className="grid gap-6 text-sm text-[#b3b3c7] sm:grid-cols-3">
              {[
                { label: "Agentes simulados", value: "200M+" },
                { label: "Resultados em segundos", value: "< 5s" },
                { label: "Precisão estatística", value: "99%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
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
            className="rounded-3xl border border-[#d4af37]/20 bg-white/5 p-8 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#d4af37]">
                Painel Executivo
              </h2>
              <ShieldCheck className="h-5 w-5 text-[#d4af37]" />
            </div>
            <p className="mt-3 text-sm text-[#b3b3c7]">
              Modelos auditáveis e indicadores críticos prontos para conselhos,
              ministérios e comissões.
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

        <section id="como-funciona" className="space-y-8">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-[#d4af37]" />
            <h2 className="text-2xl font-semibold">Como funciona</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Coleta inteligente",
                text: "Integra dados de arrecadação, população e mercado.",
              },
              {
                title: "Modelagem fiscal",
                text: "Define regras de tributação e incentivos.",
              },
              {
                title: "Simulação em massa",
                text: "Roda milhões de agentes em segundos.",
              },
              {
                title: "Decisão estratégica",
                text: "Entrega insights prontos para decisão.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                  Passo {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[#b3b3c7]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="para-quem" className="space-y-8">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-[#d4af37]" />
            <h2 className="text-2xl font-semibold">Para quem</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Governos",
                icon: <Landmark className="h-5 w-5 text-[#d4af37]" />,
                text: "Modelos tributários e políticas públicas baseadas em evidências.",
              },
              {
                title: "Grandes Empresas",
                icon: <Briefcase className="h-5 w-5 text-[#d4af37]" />,
                text: "Planejamento fiscal e análise de risco regulatório.",
              },
              {
                title: "Consultorias",
                icon: <BarChart3 className="h-5 w-5 text-[#d4af37]" />,
                text: "Estudos econômicos e relatórios premium para clientes.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-[#b3b3c7]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cases" className="space-y-8">
          <div className="flex items-center gap-3">
            <FilePieChart className="h-5 w-5 text-[#d4af37]" />
            <h2 className="text-2xl font-semibold">Casos de uso</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Mudanças tributárias",
                text: "Avalie impactos antes de aprovar reformas fiscais.",
              },
              {
                title: "Análise de cenários",
                text: "Compare arrecadação e bem-estar em múltiplas hipóteses.",
              },
              {
                title: "Recuperação de créditos",
                text: "Identifique oportunidades de recuperação e otimização.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-[#d4af37]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#b3b3c7]">{item.text}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase text-[#d4af37]">
                  Ver detalhes <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="cta"
          className="rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#11111a] via-[#0f0f17] to-[#11111a] p-10 text-center"
        >
          <h2 className="text-2xl font-semibold">
            Leve inteligência econômica para o seu governo
          </h2>
          <p className="mt-4 text-sm text-[#b3b3c7]">
            Solicite uma demonstração e veja o SimulaGov em ação com seus dados.
          </p>
          <a
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110"
          >
            Solicitar demonstração
          </a>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0a0a0f] py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 text-sm text-[#b3b3c7] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">SIMULA GOV</p>
            <p>Plataforma estratégica para políticas públicas</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <span>Governança</span>
            <span>Privacidade</span>
            <span>Contato</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
