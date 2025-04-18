import { DashboardShell } from "@/components/dashboard-shell"

export default function ComprasProduccionPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <h1 className="text-2xl font-bold">Compras/Producción</h1>
        <p>Contenido de la sección de compras y producción</p>
      </div>
    </DashboardShell>
  )
}
