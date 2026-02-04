"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Image,
  Presentation,
  Table2,
  Download,
  Trash2,
  Eye,
  FileDown,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "../../providers/ToastProvider";

type HistoryRow = {
  id: string;
  date: string;
  name: string;
  numAgentes: number;
  aliquotaAtual: number;
  novaAliquota: number;
  resultado: number;
  tempoSegundos: number;
};

const mockRows: HistoryRow[] = [
  {
    id: "mock-1",
    date: "12/02/2026 10:20",
    name: "Teste ICMS Goiás",
    numAgentes: 100000,
    aliquotaAtual: 0.27,
    novaAliquota: 0.25,
    resultado: 21100,
    tempoSegundos: 0.021,
  },
  {
    id: "mock-2",
    date: "12/02/2026 09:04",
    name: "Análise Reforma",
    numAgentes: 1000000,
    aliquotaAtual: 0.27,
    novaAliquota: 0.23,
    resultado: 250000,
    tempoSegundos: 0.032,
  },
  {
    id: "mock-3",
    date: "11/02/2026 18:35",
    name: "Cenário Agro",
    numAgentes: 500000,
    aliquotaAtual: 0.25,
    novaAliquota: 0.24,
    resultado: 93000,
    tempoSegundos: 0.019,
  },
  {
    id: "mock-4",
    date: "11/02/2026 15:42",
    name: "Serviços Digitais",
    numAgentes: 250000,
    aliquotaAtual: 0.26,
    novaAliquota: 0.28,
    resultado: -42000,
    tempoSegundos: 0.024,
  },
  {
    id: "mock-5",
    date: "10/02/2026 10:12",
    name: "Cenário Base 2026",
    numAgentes: 900000,
    aliquotaAtual: 0.27,
    novaAliquota: 0.27,
    resultado: 140000,
    tempoSegundos: 0.028,
  },
  {
    id: "mock-6",
    date: "09/02/2026 16:58",
    name: "Reforma PIS/COFINS",
    numAgentes: 800000,
    aliquotaAtual: 0.29,
    novaAliquota: 0.26,
    resultado: 195000,
    tempoSegundos: 0.031,
  },
];

const exportCards = [
  {
    id: "pdf",
    title: "Relatório Executivo",
    description: "Resumo completo em PDF",
    icon: FileText,
    action: "Gerar PDF",
  },
  {
    id: "excel",
    title: "Dados Completos",
    description: "Planilha com todos os dados",
    icon: Table2,
    action: "Exportar Excel",
  },
  {
    id: "ppt",
    title: "Apresentação",
    description: "Slides prontos para reunião",
    icon: Presentation,
    action: "Gerar PowerPoint",
  },
  {
    id: "infografico",
    title: "Infográfico",
    description: "Visual para redes sociais",
    icon: Image,
    action: "Gerar Imagem",
  },
];

export default function RelatoriosPage() {
  const { pushToast } = useToast();
  const [rows, setRows] = useState<HistoryRow[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("simula-history");
    const parsed = stored ? (JSON.parse(stored) as HistoryRow[]) : [];
    setRows(parsed.length > 0 ? parsed : mockRows);
  }, []);

  const pageSize = 5;
  const totalPages = Math.ceil(rows.length / pageSize) || 1;
  const pageRows = useMemo(
    () => rows.slice((page - 1) * pageSize, page * pageSize),
    [rows, page]
  );

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });

  const handleAction = (id: string, message: string) => {
    setLoadingAction(id);
    setTimeout(() => {
      setLoadingAction(null);
      pushToast(message, "success");
    }, 900);
  };

  const handleDelete = (id: string) => {
    setLoadingAction(`delete-${id}`);
    setTimeout(() => {
      setRows((prev) => prev.filter((row) => row.id !== id));
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("simula-history");
        if (stored) {
          const next = (JSON.parse(stored) as HistoryRow[]).filter(
            (row) => row.id !== id
          );
          localStorage.setItem("simula-history", JSON.stringify(next));
        }
      }
      setLoadingAction(null);
      pushToast("Simulação removida do histórico.", "info");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]">
          Relatórios
        </p>
        <h1 className="font-display text-3xl font-semibold">
          Central de Relatórios
        </h1>
        <p className="text-sm text-[#b3b3c7]">
          Exporte dados e acompanhe o histórico de simulações
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {exportCards.map((card) => {
          const Icon = card.icon;
          const actionId = `export-${card.id}`;
          const isLoading = loadingAction === actionId;
          return (
            <button
              key={card.id}
              onClick={() =>
                handleAction(actionId, `${card.title} gerado com sucesso.`)
              }
              disabled={isLoading}
              className="glass-card rounded-3xl p-6 text-left transition hover:border-[#d4af37]/40 disabled:cursor-not-allowed"
            >
              <Icon className="h-6 w-6 text-[#d4af37]" />
              <h2 className="mt-4 font-display text-lg font-semibold text-white">
                {card.title}
              </h2>
              <p className="mt-2 text-xs text-[#b3b3c7]">{card.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#d4af37]">
                <Download className="h-4 w-4" />
                {isLoading ? "Gerando..." : card.action}
              </div>
            </button>
          );
        })}
      </section>

      <section className="glass-card rounded-3xl p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-[#d4af37]">
            Histórico de Simulações
          </h2>
          <Link
            href="/simulador"
            className="rounded-full bg-[#d4af37] px-5 py-2 text-xs font-semibold text-[#0a0a0f] hover:brightness-110"
          >
            Nova Simulação
          </Link>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#b3b3c7]">
              <tr className="border-b border-white/10">
                <th className="py-3">Data/Hora</th>
                <th>Nome da Simulação</th>
                <th>Agentes</th>
                <th>Alíquota Atual</th>
                <th>Nova Alíquota</th>
                <th>Resultado</th>
                <th>Tempo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 text-[#dfe2f5]"
                >
                  <td className="py-3">{row.date}</td>
                  <td>{row.name}</td>
                  <td>{row.numAgentes.toLocaleString("pt-BR")}</td>
                  <td>{(row.aliquotaAtual * 100).toFixed(0)}%</td>
                  <td>{(row.novaAliquota * 100).toFixed(0)}%</td>
                  <td
                    className={
                      row.resultado >= 0 ? "text-emerald-300" : "text-red-300"
                    }
                  >
                    {formatCurrency(row.resultado)}
                  </td>
                  <td>{row.tempoSegundos.toFixed(3)} s</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleAction(
                            `view-${row.id}`,
                            "Detalhes carregados."
                          )
                        }
                        disabled={loadingAction === `view-${row.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]"
                      >
                        <Eye className="h-3 w-3" />
                        {loadingAction === `view-${row.id}`
                          ? "Abrindo..."
                          : "Ver"}
                      </button>
                      <button
                        onClick={() =>
                          handleAction(
                            `export-${row.id}`,
                            "Relatório exportado."
                          )
                        }
                        disabled={loadingAction === `export-${row.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]"
                      >
                        <FileDown className="h-3 w-3" />
                        {loadingAction === `export-${row.id}`
                          ? "Exportando..."
                          : "Exportar"}
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        disabled={loadingAction === `delete-${row.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] text-[#b3b3c7] hover:border-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3 w-3" />
                        {loadingAction === `delete-${row.id}`
                          ? "Removendo..."
                          : "Deletar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex items-center justify-between text-xs text-[#b3b3c7]">
          <span>
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="rounded-full border border-white/10 px-3 py-1 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="rounded-full border border-white/10 px-3 py-1 disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
