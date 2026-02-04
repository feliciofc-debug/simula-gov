"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

const API_URL = "http://localhost:8080";

export default function DashboardPage() {
  const [form, setForm] = useState({
    numAgentes: 1000000,
    numRodadas: 10,
    aliquotaAtual: 0.27,
    novaAliquota: 0.25,
  });
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatNumber = (value: number) =>
    value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        numAgentes: String(form.numAgentes),
        numRodadas: String(form.numRodadas),
        aliquotaAtual: String(form.aliquotaAtual),
        novaAliquota: String(form.novaAliquota),
      });
      const response = await fetch(`${API_URL}/simulate?${params.toString()}`);
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Falha ao executar simulação.");
      }
      const data = (await response.json()) as SimulationResult;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const wealthData = result
    ? [
        {
          name: "Atual",
          total: result.cenarioAtual.riquezaTotal,
        },
        {
          name: "Novo",
          total: result.cenarioNovo.riquezaTotal,
        },
      ]
    : [];

  const avgData = result
    ? [
        {
          name: "Atual",
          media: result.cenarioAtual.media,
        },
        {
          name: "Novo",
          media: result.cenarioNovo.media,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-10 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.5em] text-[#d4af37]">
              Dashboard Governamental
            </p>
            <h1 className="text-3xl font-semibold">Centro de Simulação</h1>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full border border-[#d4af37]/40 px-4 py-2 text-[#d4af37]">
              API: {API_URL}
            </span>
            <a
              href="/"
              className="rounded-full border border-white/10 px-4 py-2 text-[#b3b3c7]"
            >
              Voltar
            </a>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/5 bg-[#11111a] p-8"
          >
            <h2 className="text-xl font-semibold text-[#d4af37]">
              Configurar simulação
            </h2>
            <p className="mt-3 text-sm text-[#b3b3c7]">
              Ajuste os parâmetros e compare resultados em tempo real.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                {
                  label: "Número de agentes",
                  name: "numAgentes",
                  type: "number",
                },
                {
                  label: "Número de rodadas",
                  name: "numRodadas",
                  type: "number",
                },
                {
                  label: "Alíquota atual",
                  name: "aliquotaAtual",
                  type: "number",
                  step: "0.01",
                },
                {
                  label: "Nova alíquota",
                  name: "novaAliquota",
                  type: "number",
                  step: "0.01",
                },
              ].map((field) => (
                <label key={field.name} className="space-y-2 text-sm">
                  <span className="text-[#b3b3c7]">{field.label}</span>
                  <input
                    type={field.type}
                    step={field.step}
                    value={form[field.name as keyof typeof form]}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.name]:
                          field.type === "number"
                            ? Number(event.target.value)
                            : event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </label>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#d4af37] py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Simulando..." : "Executar simulação"}
            </button>
            {error && (
              <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                {error}
              </div>
            )}
          </form>

          <div className="rounded-3xl border border-white/5 bg-[#11111a] p-8">
            <h2 className="text-xl font-semibold text-[#d4af37]">
              Resultados comparativos
            </h2>
            <p className="mt-3 text-sm text-[#b3b3c7]">
              Visualize a diferença entre o cenário atual e o proposto.
            </p>
            {result ? (
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      label: "Agentes",
                      value: formatNumber(result.numAgentes),
                    },
                    {
                      label: "Rodadas",
                      value: formatNumber(result.numRodadas),
                    },
                    {
                      label: "Tempo (s)",
                      value: formatNumber(result.tempoSegundos),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/5 bg-[#0a0a0f]/60 px-4 py-3 text-sm"
                    >
                      <p className="text-[#b3b3c7]">{item.label}</p>
                      <p className="text-lg font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="h-56">
                    <p className="mb-3 text-sm text-[#b3b3c7]">
                      Riqueza total
                    </p>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={wealthData} barSize={56}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#22222f" />
                        <XAxis dataKey="name" stroke="#b3b3c7" />
                        <YAxis stroke="#b3b3c7" />
                        <Tooltip
                          contentStyle={{
                            background: "#0a0a0f",
                            border: "1px solid #2a2a38",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="total" fill="#d4af37" name="Total" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-56">
                    <p className="mb-3 text-sm text-[#b3b3c7]">
                      Riqueza média por agente
                    </p>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={avgData} barSize={56}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#22222f" />
                        <XAxis dataKey="name" stroke="#b3b3c7" />
                        <YAxis stroke="#b3b3c7" />
                        <Tooltip
                          contentStyle={{
                            background: "#0a0a0f",
                            border: "1px solid #2a2a38",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="media" fill="#f5f5f5" name="Média" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-white/5 bg-[#0a0a0f]/60 p-6 text-sm text-[#b3b3c7]">
                Execute a simulação para visualizar gráficos e indicadores.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
