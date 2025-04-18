"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { BarChart3, FileText, Home, LayoutDashboard, Package, ShoppingCart, Users, Wallet, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "@/components/user-nav"
import { RegistrarVentaDialog } from "@/components/registrar-venta-dialog"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Ventas",
    href: "/ventas",
    icon: ShoppingCart,
  },
  {
    title: "Inventario",
    href: "/inventario",
    icon: Package,
  },
  {
    title: "Compras/Producción",
    href: "/compras-produccion",
    icon: FileText,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    title: "Gastos",
    href: "/gastos",
    icon: Wallet,
  },
  {
    title: "Reportes",
    href: "/reportes",
    icon: BarChart3,
  },
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isRegistrarVentaOpen, setIsRegistrarVentaOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-4 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 pt-10">
              <div className="flex h-full flex-col">
                <div className="px-4 py-2">
                  <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <Home className="h-5 w-5" />
                    <span>Eufrosine</span>
                  </Link>
                </div>
                <div className="px-4 py-2">
                  <Button className="w-full cursor-pointer justify-start gap-2" onClick={() => setIsRegistrarVentaOpen(true)}>
                    <ShoppingCart className="h-4 w-4" />
                    Registrar Venta
                  </Button>
                </div>
                <nav className="flex-1 overflow-auto py-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="hidden items-center gap-2 font-semibold md:flex">
            <Home className="h-5 w-5" />
            <span>Eufrosine</span>
          </Link>
          <nav className="hidden flex-1 items-center gap-6 md:flex md:gap-4 md:px-6"></nav>
          <div className="ml-auto flex items-center gap-2">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-background md:flex">
          <div className="flex flex-col gap-2 p-4">
            <Button className="w-full cursor-pointer justify-start gap-2" onClick={() => setIsRegistrarVentaOpen(true)}>
              <ShoppingCart className="h-4 w-4" />
              Registrar Venta
            </Button>
          </div>
          <nav className="flex-1 overflow-auto py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <RegistrarVentaDialog open={isRegistrarVentaOpen} onOpenChange={setIsRegistrarVentaOpen} />
    </div>
  )
}
