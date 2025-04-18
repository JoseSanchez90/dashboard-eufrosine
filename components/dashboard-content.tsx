"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Package, ShoppingCart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyAreaChart } from "@/components/empty-area-chart"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DashboardContent() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("3m")

  const handleGestionarInventario = () => {
    router.push("/inventario")
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <Badge variant="outline" className="text-muted-foreground border-muted bg-muted/50">
              <ArrowRight className="mr-1 h-3 w-3" />
              0%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">S/ 0.00</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowRight className="mr-1 h-3 w-3 text-muted-foreground" />
              <span className="font-medium">Sin datos históricos</span>
            </div>
            <p className="text-xs text-muted-foreground">Esperando primeras ventas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
            <Badge variant="outline" className="text-muted-foreground border-muted bg-muted/50">
              <ArrowRight className="mr-1 h-3 w-3" />
              0%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowRight className="mr-1 h-3 w-3 text-muted-foreground" />
              <span className="font-medium">Sin datos históricos</span>
            </div>
            <p className="text-xs text-muted-foreground">Esperando primeros registros</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Badge variant="outline" className="text-muted-foreground border-muted bg-muted/50">
              <ArrowRight className="mr-1 h-3 w-3" />
              0%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowRight className="mr-1 h-3 w-3 text-muted-foreground" />
              <span className="font-medium">Sin datos históricos</span>
            </div>
            <p className="text-xs text-muted-foreground">Esperando primeros registros</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Crecimiento</CardTitle>
            <Badge variant="outline" className="text-muted-foreground border-muted bg-muted/50">
              <ArrowRight className="mr-1 h-3 w-3" />
              0%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowRight className="mr-1 h-3 w-3 text-muted-foreground" />
              <span className="font-medium">Sin datos históricos</span>
            </div>
            <p className="text-xs text-muted-foreground">Esperando primeros registros</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Ventas Totales</CardTitle>
              <CardDescription>Historial de ventas</CardDescription>
            </div>
            <div className="ml-auto flex gap-2">
              <Button
                variant={timeRange === "3m" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setTimeRange("3m")}
              >
                3 meses
              </Button>
              <Button
                variant={timeRange === "30d" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setTimeRange("30d")}
              >
                30 días
              </Button>
              <Button
                variant={timeRange === "7d" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setTimeRange("7d")}
              >
                7 días
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-2">
            <EmptyAreaChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center flex-col gap-2 text-center">
              <Package className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No hay datos de ventas registrados aún</p>
              <p className="text-xs text-muted-foreground">Las estadísticas aparecerán cuando se registren ventas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Recientes</CardTitle>
            <CardDescription>Últimas transacciones registradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center flex-col gap-2 text-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No hay ventas registradas aún</p>
              <p className="text-xs text-muted-foreground">Las ventas aparecerán aquí cuando se registren</p>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm" disabled>
                Ver todas las ventas
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado del Inventario</CardTitle>
            <CardDescription>Niveles actuales de stock</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertDescription>El inventario inicial debe ser configurado por un administrador.</AlertDescription>
            </Alert>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Bidón 20 litros</TableCell>
                  <TableCell>0 unidades</TableCell>
                  <TableCell>
                    <Badge variant="outline">Sin stock</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Botella 10 litros</TableCell>
                  <TableCell>0 unidades</TableCell>
                  <TableCell>
                    <Badge variant="outline">Sin stock</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Botella 3 litros</TableCell>
                  <TableCell>0 unidades</TableCell>
                  <TableCell>
                    <Badge variant="outline">Sin stock</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <Button className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white" variant="outline" size="sm" onClick={handleGestionarInventario}>
                Gestionar inventario
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
