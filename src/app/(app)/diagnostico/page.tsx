export default function DiagnosticoPage() {
  const indicadores = [
    {
      indicador: "PIB",
      valor: "R$ 10.9 tri",
      variacao: "+2.3%",
      descricao: "Crescimento real da economia",
      color: "text-emerald-400",
    },
    {
      indicador: "IPCA",
      valor: "4.2%",
      variacao: "-0.3%",
      descricao: "Índice de inflação oficial",
      color: "text-emerald-400",
    },
    {
      indicador: "Desemprego",
      valor: "7.8%",
      variacao: "-0.5%",
      descricao: "Taxa de desocupação",
      color: "text-emerald-400",
    },
    {
      indicador: "SELIC",
      valor: "11.25%",
      variacao: "+0.25%",
      descricao: "Taxa básica de juros",
      color: "text-yellow-300",
    },
    {
      indicador: "Dívida/PIB",
      valor: "74.3%",
      variacao: "+1.2%",
      descricao: "Endividamento público",
      color: "text-orange-400",
    },
    {
      indicador: "Balança Comercial",
      valor: "+US$ 8.2bi",
      variacao: "+15%",
      descricao: "Saldo exportações - importações",
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="glass-card rounded-3xl p-10">
        <p className="text-xs uppercase tracking-[0.5em] text-[#d4af37]">
          Diagnóstico
        </p>
        <h1 className="font-display mt-4 text-3xl font-semibold">
          Diagnóstico Situacional
        </h1>
        <p className="mt-3 text-sm text-[#b3b3c7]">
          Análise de indicadores macroeconômicos e microeconômicos
        </p>
      </div>

      <section className="glass-card rounded-3xl p-8">
        <h2 className="font-display text-xl font-semibold text-[#d4af37]">
          Indicadores Macroeconômicos
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {indicadores.map((item) => (
            <div
              key={item.indicador}
              className="rounded-2xl border border-white/10 bg-[#0a0a0f]/60 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-[#b3b3c7]">
                  {item.indicador}
                </p>
                <span className={`text-xs font-semibold ${item.color}`}>
                  {item.variacao}
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold text-white">
                {item.valor}
              </p>
              <p className="mt-2 text-xs text-[#b3b3c7]">{item.descricao}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
