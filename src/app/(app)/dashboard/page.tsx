"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CalendarClock,
  Download,
  FileText,
  LineChart,
  PieChart as PieIcon,
  PlayCircle,
  Share2,
  Timer,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
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

type HistoryEntry = {
  id: string;
  date: string;
  numAgentes: number;
  numRodadas: number;
  aliquotaAtual: number;
  novaAliquota: number;
  economia: number;
  tempoSegundos: number;
};

const API_URL = "http://api2.amzofertas.com.br:8080";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const [form, setForm] = useState({
    numAgentes: 100000,
    numRodadas: 10,
    aliquotaAtual: 0.27,
    novaAliquota: 0.25,
  });
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: "hist-1",
      date: "Hoje, 09:32",
      numAgentes: 100000,
      numRodadas: 12,
      aliquotaAtual: 0.27,
      novaAliquota: 0.25,
      economia: 1850000000,
      tempoSegundos: 2.6,
    },
    {
      id: "hist-2",
      date: "Ontem, 17:05",
      numAgentes: 1000000,
      numRodadas: 10,
      aliquotaAtual: 0.29,
      novaAliquota: 0.26,
      economia: 4250000000,
      tempoSegundos: 3.4,
    },
  ]);

  const formatNumber = (value: number) =>
    value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });

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
      const economia =
        data.cenarioNovo.riquezaTotal - data.cenarioAtual.riquezaTotal;
      const entry: HistoryEntry = {
        id: `hist-${Date.now()}`,
        date: new Date().toLocaleString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        numAgentes: data.numAgentes,
        numRodadas: data.numRodadas,
        aliquotaAtual: data.aliquotaAtual,
        novaAliquota: data.novaAliquota,
        economia,
        tempoSegundos: data.tempoSegundos,
      };
      setHistory((prev) => [entry, ...prev].slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const economiaProjetada = result
    ? result.cenarioNovo.riquezaTotal - result.cenarioAtual.riquezaTotal
    : 0;

  const wealthData = result
    ? [
        { name: "Cenário atual", total: result.cenarioAtual.riquezaTotal },
        { name: "Cenário novo", total: result.cenarioNovo.riquezaTotal },
      ]
    : [];

  const avgData = result
    ? [
        { name: "Atual", media: result.cenarioAtual.media },
        { name: "Novo", media: result.cenarioNovo.media },
      ]
    : [];

  const pieData = result
    ? [
        { name: "Atual", value: result.cenarioAtual.riquezaTotal },
        {
          name: "Incremento",
          value: Math.max(
            0,
            result.cenarioNovo.riquezaTotal - result.cenarioAtual.riquezaTotal
          ),
        },
      ]
    : [];

  const metrics = useMemo(() => {
    const totalSimulacoes = history.length;
    const ultimaSimulacao = history[0]?.date ?? "-";
    const economiaTotal = history.reduce((acc, item) => acc + item.economia, 0);
    const tempoMedio =
      history.reduce((acc, item) => acc + item.tempoSegundos, 0) /
      (history.length || 1);
    return { totalSimulacoes, ultimaSimulacao, economiaTotal, tempoMedio };
  }, [history]);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]">
            Dashboard Governamental
          </p>
          <h1 className="font-display text-3xl font-semibold">
            Centro de Simulação
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#b3b3c7]">
          <span className="rounded-full border border-[#d4af37]/40 px-4 py-2 text-[#d4af37]">
            API: {API_URL}
          </span>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total de simulações",
            value: metrics.totalSimulacoes,
            icon: <BarChart3 className="h-5 w-5 text-[#d4af37]" />,
          },
          {
            label: "Última simulação",
            value: metrics.ultimaSimulacao,
            icon: <CalendarClock className="h-5 w-5 text-[#d4af37]" />,
          },
          {
            label: "Economia total projetada",
            value: formatCurrency(metrics.economiaTotal),
            icon: <Wallet className="h-5 w-5 text-[#d4af37]" />,
          },
          {
            label: "Tempo médio",
            value: `${formatNumber(metrics.tempoMedio)} s`,
            icon: <Timer className="h-5 w-5 text-[#d4af37]" />,
          },
        ].map((metric) => (
          <motion.div
            key={metric.label}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase text-[#b3b3c7]">
                {metric.label}
              </p>
              {metric.icon}
            </div>
            <p className="mt-3 text-lg font-semibold text-white">
              {metric.value}
            </p>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#d4af37]">
              Nova simulação
            </h2>
            <PlayCircle className="h-5 w-5 text-[#d4af37]" />
          </div>
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
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            {[
              { label: "Teste rápido (10K)", numAgentes: 10000 },
              { label: "Padrão (100K)", numAgentes: 100000 },
              { label: "Completo (1M)", numAgentes: 1000000 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    numAgentes: preset.numAgentes,
                  }))
                }
                className="rounded-full border border-white/10 px-4 py-2 text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                {preset.label}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d4af37] py-3 text-sm font-semibold text-[#0a0a0f] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <PlayCircle className="h-4 w-4" />
            {loading ? "Simulando..." : "Executar simulação"}
          </button>
          {error && (
            <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
              {error}
            </div>
          )}
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#d4af37]">
              Resultados
            </h2>
            <LineChart className="h-5 w-5 text-[#d4af37]" />
          </div>
          <p className="mt-3 text-sm text-[#b3b3c7]">
            Compare cenários e visualize a economia projetada.
          </p>
          {result ? (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    label: "Cenário Atual",
                    total: formatCurrency(result.cenarioAtual.riquezaTotal),
                    media: formatCurrency(result.cenarioAtual.media),
                  },
                  {
                    label: "Cenário Novo",
                    total: formatCurrency(result.cenarioNovo.riquezaTotal),
                    media: formatCurrency(result.cenarioNovo.media),
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-white/10 bg-[#0a0a0f]/60 p-4 text-sm"
                  >
                    <p className="text-[#b3b3c7]">{card.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {card.total}
                    </p>
                    <p className="mt-1 text-xs text-[#b3b3c7]">
                      Média por agente: {card.media}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    label: "Diferença absoluta",
                    value: formatCurrency(economiaProjetada),
                  },
                  {
                    label: "Diferença percentual",
                    value: `${formatNumber(
                      (economiaProjetada / result.cenarioAtual.riquezaTotal) *
                        100
                    )}%`,
                  },
                  {
                    label: "Tempo de processamento",
                    value: `${formatNumber(result.tempoSegundos)} s`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-[#0a0a0f]/60 p-4 text-sm"
                  >
                    <p className="text-[#b3b3c7]">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                Economia projetada:{" "}
                <span className="font-semibold">
                  {formatCurrency(economiaProjetada)}
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="h-56">
                  <p className="mb-3 text-sm text-[#b3b3c7]">
                    Comparativo de riqueza
                  </p>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={wealthData} barSize={50}>
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
                    Distribuição de ganhos
                  </p>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          background: "#0a0a0f",
                          border: "1px solid #2a2a38",
                        }}
                      />
                      <Legend />
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        innerRadius={45}
                        paddingAngle={3}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${entry.name}`}
                            fill={index === 0 ? "#2a2a38" : "#d4af37"}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="h-52">
                <p className="mb-3 text-sm text-[#b3b3c7]">
                  Riqueza média por agente
                </p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={avgData} barSize={50}>
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
          ) : (
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0a0a0f]/60 p-6 text-sm text-[#b3b3c7]">
              Execute a simulação para visualizar gráficos e indicadores.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#d4af37]">
              Histórico de simulações
            </h2>
            <ArrowUpRight className="h-5 w-5 text-[#d4af37]" />
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[#b3b3c7]">
                <tr className="border-b border-white/10">
                  <th className="py-3">Data</th>
                  <th>Agentes</th>
                  <th>Rodadas</th>
                  <th>Alíquota</th>
                  <th>Resultado</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 text-[#dfe2f5]"
                  >
                    <td className="py-3">{row.date}</td>
                    <td>{formatNumber(row.numAgentes)}</td>
                    <td>{row.numRodadas}</td>
                    <td>
                      {(row.aliquotaAtual * 100).toFixed(0)}% →{" "}
                      {(row.novaAliquota * 100).toFixed(0)}%
                    </td>
                    <td className="text-emerald-300">
                      + {formatCurrency(row.economia)}
                    </td>
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
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#d4af37]">
              Relatórios
            </h2>
            <FileText className="h-5 w-5 text-[#d4af37]" />
          </div>
          <p className="mt-3 text-sm text-[#b3b3c7]">
            Compartilhe resultados com conselhos e ministérios.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            {[
              { label: "Exportar PDF", icon: <Download className="h-4 w-4" /> },
              {
                label: "Exportar Excel",
                icon: <Download className="h-4 w-4" />,
              },
              { label: "Compartilhar", icon: <Share2 className="h-4 w-4" /> },
            ].map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#0a0a0f]/60 px-4 py-3 text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
                <PieIcon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
