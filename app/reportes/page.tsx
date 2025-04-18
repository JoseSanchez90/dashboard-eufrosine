import { DashboardShell } from "@/components/dashboard-shell"

export default function ReportesPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <h1 className="text-2xl font-bold">Reportes</h1>
        <p>Contenido de la sección de reportes</p>
      </div>
    </DashboardShell>
  )
}
