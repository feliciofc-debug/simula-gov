"use client";

import { useMemo, useState } from "react";
import {
  Brain,
  AlertTriangle,
  PlayCircle,
  Save,
  FileDown,
  RotateCw,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SimulationResult = {
  numAgentes: number;
  numRodadas: number;
  aliquotaAtual: number;
  novaAliquota: number;
  cenarioAtual: { riquezaTotal: number; media: number };
  cenarioNovo: { riquezaTotal: number; media: number };
  tempoSegundos: number;
};

const API_URL = "http://api2.amzofertas.com.br:8080";

const presets = [
  { label: "Teste Rápido", numAgentes: 10000, numRodadas: 5 },
  { label: "Análise Padrão", numAgentes: 100000, numRodadas: 10 },
  { label: "Simulação Completa", numAgentes: 1000000, numRodadas: 20 },
];

const gaugeData = [
  { name: "Negativo", value: 50, fill: "#ef4444" },
  { name: "Positivo", value: 50, fill: "#22c55e" },
];

export default function SimuladorPage() {
  const [form, setForm] = useState({
    nome: "Simulação Fiscal 2026",
    numAgentes: 100000,
    numRodadas: 10,
    aliquotaAtual: 0.27,
    novaAliquota: 0.25,
    setor: "Todos os Setores",
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatNumber = (value: number) =>
    value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });

  const diffAbsolute = result
    ? result.cenarioNovo.riquezaTotal - result.cenarioAtual.riquezaTotal
    : 0;

  const diffPercent = result
    ? (diffAbsolute / result.cenarioAtual.riquezaTotal) * 100
    : 0;

  const diffLabel = diffAbsolute >= 0 ? "POSITIVO" : "NEGATIVO";

  const barData = useMemo(() => {
    if (!result) return [];
    return [
      {
        name: "Cenário Atual",
        value: result.cenarioAtual.riquezaTotal,
        fill: "#6b7280",
      },
      {
        name: "Cenário Novo",
        value: result.cenarioNovo.riquezaTotal,
        fill: "#d4af37",
      },
    ];
  }, [result]);

  const handlePreset = (preset: (typeof presets)[number]) => {
    setForm((prev) => ({
      ...prev,
      numAgentes: preset.numAgentes,
      numRodadas: preset.numRodadas,
    }));
  };

  const simulate = async () => {
    setLoading(true);
    setError(null);
    setProgress(10);
    setResult(null);
    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : prev));
    }, 400);
    try {
      const params = new URLSearchParams({
        numAgentes: String(form.numAgentes),
        numRodadas: String(form.numRodadas),
        aliquotaAtual: String(form.aliquotaAtual),
        novaAliquota: String(form.novaAliquota),
      });
      const response = await fetch(`${API_URL}/simulate?${params.toString()}`);
      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(payload?.error || "Falha ao executar simulação.");
      }
      const data = payload as SimulationResult;
      setResult(data);
      setProgress(100);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro inesperado na simulação."
      );
    } finally {
      clearInterval(progressTimer);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 600);
    }
  };

  const gaugeAngle = Math.max(-20, Math.min(20, diffPercent));
  const needleAngle = (gaugeAngle / 20) * 90;

  return (
    <div className="flex flex-col gap-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]">
          Simulador
        </p>
        <h1 className="font-display text-3xl font-semibold">
          Simulador de Cenários Econômicos
        </h1>
        <p className="text-sm text-[#b3b3c7]">
          Configure os parâmetros e compare resultados em tempo real
        </p>
      </header>

      <section className="flex flex-wrap gap-3">
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => handlePreset(preset)}
            className="rounded-full border border-white/10 px-5 py-2 text-xs text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]"
          >
            {preset.label}
          </button>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-8">
          <h2 className="font-display text-xl font-semibold text-[#d4af37]">
            Parâmetros da Simulação
          </h2>
          <div className="mt-6 space-y-5">
            <label className="space-y-2 text-sm">
              <span className="text-[#b3b3c7]">Nome da simulação</span>
              <input
                value={form.nome}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, nome: event.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
              />
            </label>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#b3b3c7]">
                <span>Número de agentes</span>
                <span className="text-white">
                  {formatNumber(form.numAgentes)}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={10000000}
                step={10000}
                value={form.numAgentes}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    numAgentes: Number(event.target.value),
                  }))
                }
                className="w-full accent-[#d4af37]"
              />
              <div className="flex justify-between text-xs text-[#6f6f87]">
                <span>10K</span>
                <span>10M</span>
              </div>
            </div>
            <label className="space-y-2 text-sm">
              <span className="text-[#b3b3c7]">Número de rodadas</span>
              <select
                value={form.numRodadas}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    numRodadas: Number(event.target.value),
                  }))
                }
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
              >
                {[5, 10, 20, 50, 100].map((value) => (
                  <option key={value} value={value}>
                    {value} rodadas
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h2 className="font-display text-xl font-semibold text-[#d4af37]">
            Configuração Tributária
          </h2>
          <div className="mt-6 space-y-5">
            <label className="space-y-2 text-sm">
              <span className="text-[#b3b3c7]">Alíquota atual (%)</span>
              <input
                type="number"
                step="0.01"
                value={form.aliquotaAtual}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    aliquotaAtual: Number(event.target.value),
                  }))
                }
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-[#b3b3c7]">Nova alíquota (%)</span>
              <input
                type="number"
                step="0.01"
                value={form.novaAliquota}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    novaAliquota: Number(event.target.value),
                  }))
                }
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-[#b3b3c7]">Setor</span>
              <select
                value={form.setor}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, setor: event.target.value }))
                }
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
              >
                {[
                  "Todos os Setores",
                  "Indústria",
                  "Comércio",
                  "Serviços",
                  "Agronegócio",
                ].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <button
        onClick={simulate}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4af37] px-8 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <PlayCircle className="h-4 w-4" />
        Executar Simulação
      </button>

      {error && (
        <section className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 text-sm text-red-200">
            <AlertTriangle className="h-4 w-4 text-red-300" />
            {error}
          </div>
        </section>
      )}

      {loading && (
        <section className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent" />
            <p className="text-sm text-[#b3b3c7]">
              Simulando {formatNumber(form.numAgentes)} agentes...
            </p>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[#d4af37] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>
      )}

      {result && !loading && (
        <>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card rounded-3xl p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#6b7280]">
                Cenário Atual ({(result.aliquotaAtual * 100).toFixed(0)}%)
              </p>
              <p className="mt-4 text-2xl font-semibold text-white">
                {formatCurrency(result.cenarioAtual.riquezaTotal)}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Média por agente: {formatCurrency(result.cenarioAtual.media)}
              </p>
            </div>
            <div className="glass-card rounded-3xl border border-[#d4af37]/40 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                Cenário Novo ({(result.novaAliquota * 100).toFixed(0)}%)
              </p>
              <p className="mt-4 text-2xl font-semibold text-[#d4af37]">
                {formatCurrency(result.cenarioNovo.riquezaTotal)}
              </p>
              <p className="mt-2 text-sm text-[#b3b3c7]">
                Média por agente: {formatCurrency(result.cenarioNovo.media)}
              </p>
            </div>
          </section>

          <section className="glass-card mx-auto max-w-3xl rounded-3xl p-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b3b3c7]">
              Impacto da Mudança
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-[#b3b3c7]">Diferença Absoluta</p>
                <p className="text-lg font-semibold text-white">
                  {formatCurrency(diffAbsolute)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#b3b3c7]">Diferença Percentual</p>
                <p className="text-lg font-semibold text-white">
                  {diffPercent.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-[#b3b3c7]">Tempo de Processamento</p>
                <p className="text-lg font-semibold text-white">
                  {result.tempoSegundos.toFixed(3)} s
                </p>
              </div>
            </div>
            <span
              className={`mt-6 inline-flex rounded-full px-4 py-2 text-xs font-semibold ${
                diffAbsolute >= 0
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {diffLabel}
            </span>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-card rounded-3xl p-8">
              <h2 className="font-display text-xl font-semibold text-[#d4af37]">
                Comparativo de riqueza
              </h2>
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barSize={60}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#22222f" />
                    <XAxis dataKey="name" stroke="#b3b3c7" />
                    <YAxis stroke="#b3b3c7" />
                    <Tooltip
                      contentStyle={{
                        background: "#0a0a0f",
                        border: "1px solid #2a2a38",
                      }}
                    />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                      {barData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                      <LabelList
                        dataKey="value"
                        formatter={(value: number) => formatCurrency(value)}
                        position="top"
                        fill="#d4af37"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8">
              <h2 className="font-display text-xl font-semibold text-[#d4af37]">
                Variação percentual
              </h2>
              <div className="relative mt-6 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gaugeData}
                      dataKey="value"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={2}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div
                  className="absolute left-1/2 top-1/2 h-1 w-24 origin-left rounded-full bg-white"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${needleAngle}deg)`,
                    backgroundColor: diffPercent >= 0 ? "#22c55e" : "#ef4444",
                  }}
                />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                <p className="mt-2 text-center text-sm text-[#b3b3c7]">
                  {diffPercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </section>

          <section className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-[#d4af37]" />
              <h2 className="font-display text-xl font-semibold text-[#d4af37]">
                Insight da IA
              </h2>
            </div>
            <p className="mt-4 text-sm text-[#b3b3c7]">
              Com a redução da alíquota de{" "}
              {(result.aliquotaAtual * 100).toFixed(0)}% para{" "}
              {(result.novaAliquota * 100).toFixed(0)}%, a simulação projeta um
              aumento de {formatCurrency(diffAbsolute)} na riqueza total,
              representando crescimento de {diffPercent.toFixed(2)}%. Este
              cenário beneficia principalmente o setor de {form.setor}, com
              impacto positivo na geração de empregos e consumo.
            </p>
          </section>

          <section className="flex flex-wrap justify-end gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]">
              <Save className="h-4 w-4" />
              Salvar Simulação
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]">
              <FileDown className="h-4 w-4" />
              Exportar PDF
            </button>
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-5 py-2 text-xs font-semibold text-[#0a0a0f] hover:brightness-110"
            >
              <RotateCw className="h-4 w-4" />
              Nova Simulação
            </button>
          </section>
        </>
      )}
    </div>
  );
}
