import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/guided", label: "Guided Journey" },
  { to: "/mapping", label: "Mapping" },
  { to: "/talk-tracks", label: "Talk Tracks" },
  { to: "/playbook", label: "Playbook" },
] as const;

interface AppShellProps {
  children?: React.ReactNode;
  onSearchOpen?: () => void;
}

export function AppShell({ children, onSearchOpen }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / App name */}
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-gray-900">
              {config.appName}
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSearchOpen}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-out nav ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.nav
              key="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="fixed right-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] w-64 flex-col gap-1 border-l border-gray-200 bg-white p-4 md:hidden"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ───────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {children ?? <Outlet />}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400">
            {config.appName} v{config.version}
          </p>
          <p className="text-xs text-gray-400">
            Last updated {config.lastUpdated}
          </p>
        </div>
      </footer>
    </div>
  );
}
