"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  Home,
  LogOut,
  PlayCircle,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/diagnostico", label: "Diagnóstico", icon: BarChart3 },
  { href: "/simulador", label: "Simulador", icon: PlayCircle },
  { href: "/planejamento", label: "Planejamento", icon: Target },
  { href: "/relatorios", label: "Relatórios", icon: FileText },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading, userEmail, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f] text-sm text-[#b3b3c7]">
        Verificando credenciais...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col justify-between border-r border-white/10 bg-[#0a0a0f]/90 px-6 py-8 backdrop-blur lg:flex">
        <div>
          <div className="text-xl font-semibold tracking-[0.3em] text-[#d4af37]">
            SIMULA
          </div>
          <nav className="mt-10 space-y-2 text-sm text-[#b3b3c7]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-white/10 text-[#d4af37]"
                      : "hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-[#b3b3c7]">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">
              Usuário logado
            </p>
            <p className="mt-2 text-sm text-white">
              {userEmail ?? "convidado@simula.gov"}
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              router.replace("/login");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0a0a0f]/80 px-6 py-4 backdrop-blur lg:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#b3b3c7]"
          >
            Menu
          </button>
          <span className="text-sm font-semibold tracking-[0.3em] text-[#d4af37]">
            SIMULA
          </span>
          <Link
            href="/dashboard"
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#b3b3c7]"
          >
            Dashboard
          </Link>
        </div>
        <main className="px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-72 bg-[#0a0a0f] px-6 py-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tracking-[0.3em] text-[#d4af37]">
                SIMULA
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-xs text-[#b3b3c7]"
              >
                Fechar
              </button>
            </div>
            <nav className="mt-8 space-y-2 text-sm text-[#b3b3c7]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-white/10 text-[#d4af37]"
                        : "hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-[#b3b3c7]">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">
                  Usuário logado
                </p>
                <p className="mt-2 text-sm text-white">
                  {userEmail ?? "convidado@simula.gov"}
                </p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  router.replace("/login");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-[#b3b3c7] hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
