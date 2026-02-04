"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  Clock,
  PlayCircle,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const metrics = [
  {
    label: "Total de Simulações",
    value: "128",
    icon: <PlayCircle className="h-5 w-5 text-[#d4af37]" />,
  },
  {
    label: "Última Simulação",
    value: "Há 12 minutos",
    icon: <Clock className="h-5 w-5 text-[#d4af37]" />,
  },
  {
    label: "Economia Projetada",
    value: "R$ 3.480.000",
    icon: <TrendingUp className="h-5 w-5 text-[#d4af37]" />,
  },
  {
    label: "Alertas Ativos",
    value: "3",
    icon: <AlertTriangle className="h-5 w-5 text-[#d4af37]" />,
  },
];

const highlights = [
  { label: "PIB", value: "+2.3%", color: "text-emerald-400" },
  { label: "Inflação (IPCA)", value: "4.2%", color: "text-yellow-300" },
  { label: "SELIC", value: "11.25%", color: "text-slate-200" },
  { label: "Desemprego", value: "7.8%", color: "text-orange-400" },
];

const simulations = [
  {
    date: "Hoje, 09:40",
    name: "Reforma ICMS",
    agents: "1.2M",
    aliquota: "27% → 25%",
    result: "+R$ 180M",
  },
  {
    date: "Ontem, 18:12",
    name: "Benefícios regionais",
    agents: "800K",
    aliquota: "29% → 26%",
    result: "+R$ 95M",
  },
  {
    date: "Ontem, 10:30",
    name: "Incentivo verde",
    agents: "640K",
    aliquota: "24% → 22%",
    result: "+R$ 62M",
  },
  {
    date: "10/02, 15:05",
    name: "Revisão PIS/COFINS",
    agents: "2M",
    aliquota: "30% → 27%",
    result: "+R$ 310M",
  },
  {
    date: "09/02, 11:44",
    name: "Cenário base 2026",
    agents: "950K",
    aliquota: "26% → 26%",
    result: "+R$ 140M",
  },
];

const evolutionData = [
  { month: "Abr", value: 820 },
  { month: "Mai", value: 1180 },
  { month: "Jun", value: 1560 },
  { month: "Jul", value: 1940 },
  { month: "Ago", value: 2360 },
  { month: "Set", value: 2840 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]">
            Dashboard Executivo
          </p>
          <h1 className="font-display text-3xl font-semibold">
            Panorama de decisões econômicas
          </h1>
        </div>
        <Link
          href="/relatorios"
          className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 px-4 py-2 text-xs uppercase text-[#d4af37] hover:border-[#d4af37]"
        >
          Ver relatórios <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase text-[#b3b3c7]">{metric.label}</p>
              {metric.icon}
            </div>
            <p className="mt-3 text-lg font-semibold text-white">
              {metric.value}
            </p>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#d4af37]">
              Indicadores em destaque
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-[#0a0a0f]/60 p-4"
              >
                <p className="text-xs uppercase text-[#b3b3c7]">
                  {item.label}
                </p>
                <p className={`mt-2 text-lg font-semibold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#d4af37]">
              Evolução
            </h2>
          </div>
          <p className="mt-3 text-sm text-[#b3b3c7]">
            Economia projetada acumulada nos últimos meses.
          </p>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolutionData}>
                <defs>
                  <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#22222f" />
                <XAxis dataKey="month" stroke="#b3b3c7" />
                <YAxis stroke="#b3b3c7" />
                <Tooltip
                  contentStyle={{
                    background: "#0a0a0f",
                    border: "1px solid #2a2a38",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d4af37"
                  strokeWidth={2}
                  fill="url(#goldFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="glass-card rounded-3xl p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-[#d4af37]">
            Últimas simulações
          </h2>
          <Link
            href="/relatorios"
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]"
          >
            Ver todas
          </Link>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#b3b3c7]">
              <tr className="border-b border-white/10">
                <th className="py-3">Data</th>
                <th>Nome</th>
                <th>Agentes</th>
                <th>Alíquota</th>
                <th>Resultado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-white/5 text-[#dfe2f5]"
                >
                  <td className="py-3">{row.date}</td>
                  <td>{row.name}</td>
                  <td>{row.agents}</td>
                  <td>{row.aliquota}</td>
                  <td className="text-emerald-300">{row.result}</td>
                  <td>
                    <button className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase text-[#b3b3c7]">
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
