"use client";

import { useState } from "react";
import { ChevronDown, DollarSign, Leaf, TrendingUp, Users } from "lucide-react";

const axes = [
  {
    id: "fiscal",
    title: "Eixo Fiscal",
    icon: DollarSign,
    color: "text-emerald-400",
    progress: 25,
    items: [
      "Meta de Resultado Primário: Superávit de 1% do PIB até 2030",
      "Âncora Fiscal: Limite de crescimento de despesas em 2.5% a.a.",
      "Projeção de Receita: R$ 2.1 tri → R$ 2.5 tri",
    ],
  },
  {
    id: "produtividade",
    title: "Eixo Produtividade",
    icon: TrendingUp,
    color: "text-blue-400",
    progress: 15,
    items: [
      "Reforma Tributária: Simplificação do sistema",
      "Desburocratização: Reduzir tempo de abertura de empresa para 1 dia",
      "Investimento em Inovação: Aumentar P&D para 2% do PIB",
    ],
  },
  {
    id: "social",
    title: "Eixo Social",
    icon: Users,
    color: "text-purple-400",
    progress: 30,
    items: [
      "Bolsa Família: Ampliar para 25 milhões de famílias",
      "Educação: Universalizar creche até 2029",
      "Saúde: Reduzir fila do SUS em 50%",
    ],
  },
  {
    id: "sustentabilidade",
    title: "Eixo Sustentabilidade",
    icon: Leaf,
    color: "text-teal-300",
    progress: 20,
    items: [
      "Energia Limpa: 90% da matriz renovável até 2030",
      "Desmatamento Zero: Amazônia e Cerrado",
      "Economia Circular: Reciclar 40% dos resíduos",
    ],
  },
];

const timeline = [
  { year: "2027", label: "Diagnóstico e Reformas Iniciais" },
  { year: "2028", label: "Implementação dos Eixos" },
  { year: "2029", label: "Consolidação e Ajustes" },
  { year: "2030", label: "Avaliação e Resultados" },
];

export default function PlanejamentoPage() {
  const [openId, setOpenId] = useState<string | null>("fiscal");

  return (
    <div className="flex flex-col gap-10">
      <div className="glass-card rounded-3xl p-10">
        <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]">
          Planejamento
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold">
          Planejamento Estratégico
        </h1>
        <p className="mt-3 text-sm text-[#b3b3c7]">
          Eixos e metas para o mandato 2027-2030
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        {axes.map((axis) => {
          const Icon = axis.icon;
          const isOpen = openId === axis.id;
          return (
            <button
              key={axis.id}
              type="button"
              onClick={() => setOpenId(isOpen ? null : axis.id)}
              className="glass-card rounded-3xl p-6 text-left transition hover:border-[#d4af37]/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${axis.color}`} />
                  <h2 className="font-display text-lg font-semibold text-white">
                    {axis.title}
                  </h2>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-[#b3b3c7] transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#d4af37]"
                  style={{ width: `${axis.progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[#b3b3c7]">
                {axis.progress}% concluído
              </p>
              {isOpen && (
                <ul className="mt-4 space-y-2 text-sm text-[#dfe2f5]">
                  {axis.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              )}
            </button>
          );
        })}
      </section>

      <section className="glass-card rounded-3xl p-8">
        <h2 className="font-display text-xl font-semibold text-[#d4af37]">
          Timeline do Mandato
        </h2>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          {timeline.map((item, index) => (
            <div key={item.year} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 text-sm text-[#d4af37]">
                {item.year}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {item.label}
                </p>
              </div>
              {index < timeline.length - 1 && (
                <div className="hidden h-px w-16 bg-white/10 lg:block" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
