import { DashboardShell } from "@/components/dashboard-shell"

export default function ClientesPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <p>Contenido de la sección de clientes</p>
      </div>
    </DashboardShell>
  )
}
