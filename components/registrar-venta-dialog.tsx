"use client"

import type React from "react"

import { useState } from "react"
import { Trash2, Plus, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RegistrarVentaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PRESENTACIONES = [
  { id: "recarga-20L", nombre: "Recarga Bidon 20L", precio: 12.0 },
  { id: "botella-625ml", nombre: "Botella 625ml", precio: 1.0 },
  { id: "botella-1L", nombre: "Botella 1 litro", precio: 2.0 },
  { id: "botella-3L", nombre: "Botella 3 litros", precio: 2.5 },
  { id: "botella-10L", nombre: "Botella 10 litros", precio: 6.0 },
  { id: "bidon-20L", nombre: "Bidón 20 litros", precio: 30.0 },
]

interface ProductoVenta {
  id: string
  nombre: string
  precio: number
  cantidad: number
  subtotal: number
}

export function RegistrarVentaDialog({ open, onOpenChange }: RegistrarVentaDialogProps) {
  // Estado para los productos en la venta actual
  const [productosVenta, setProductosVenta] = useState<ProductoVenta[]>([])

  // Estado para el formulario de añadir producto
  const [presentacion, setPresentacion] = useState("")
  const [cantidad, setCantidad] = useState("1")

  // Estado para los datos del cliente
  const [cliente, setCliente] = useState("")
  const [dni, setDni] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [metodoPago, setMetodoPago] = useState("")
  const [registrarCliente, setRegistrarCliente] = useState(false)

  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState("productos")

  // Función para añadir un producto a la venta
  const handleAddProducto = () => {
    if (!presentacion || Number.parseInt(cantidad) <= 0) return

    const productoSeleccionado = PRESENTACIONES.find((p) => p.id === presentacion)
    if (!productoSeleccionado) return

    const cantidadNum = Number.parseInt(cantidad)
    const subtotal = productoSeleccionado.precio * cantidadNum

    // Verificar si el producto ya está en la lista
    const productoExistente = productosVenta.find((p) => p.id === presentacion)

    if (productoExistente) {
      // Actualizar cantidad y subtotal del producto existente
      setProductosVenta(
        productosVenta.map((p) =>
          p.id === presentacion
            ? {
                ...p,
                cantidad: p.cantidad + cantidadNum,
                subtotal: p.subtotal + subtotal,
              }
            : p,
        ),
      )
    } else {
      // Añadir nuevo producto a la lista
      setProductosVenta([
        ...productosVenta,
        {
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          cantidad: cantidadNum,
          subtotal: subtotal,
        },
      ])
    }

    // Resetear selección para añadir otro producto
    setPresentacion("")
    setCantidad("1")
  }

  // Función para eliminar un producto de la venta
  const handleRemoveProducto = (id: string) => {
    setProductosVenta(productosVenta.filter((p) => p.id !== id))
  }

  // Calcular el total de la venta
  const totalVenta = productosVenta.reduce((total, producto) => total + producto.subtotal, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que haya al menos un producto
    if (productosVenta.length === 0) {
      alert("Debe añadir al menos un producto a la venta")
      return
    }

    // Validar que haya un cliente
    if (!cliente) {
      alert("Debe ingresar el nombre del cliente")
      setActiveTab("cliente")
      return
    }

    // Validar método de pago
    if (!metodoPago) {
      alert("Debe seleccionar un método de pago")
      setActiveTab("cliente")
      return
    }

    // Aquí iría la lógica para registrar la venta
    console.log({
      productos: productosVenta,
      total: totalVenta,
      cliente,
      dni,
      direccion,
      telefono,
      metodoPago,
      registrarCliente,
    })

    // Si registrarCliente está marcado, también registrar en el componente Clientes
    if (registrarCliente) {
      console.log("Registrando cliente:", {
        cliente,
        dni,
        direccion,
        telefono,
      })
    }

    // Resetear el formulario
    setProductosVenta([])
    setPresentacion("")
    setCantidad("1")
    setCliente("")
    setDni("")
    setDireccion("")
    setTelefono("")
    setMetodoPago("")
    setRegistrarCliente(false)
    setActiveTab("productos")

    // Cerrar el diálogo
    onOpenChange(false)
  }

  // Función para resetear el formulario al cerrar
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setProductosVenta([])
      setPresentacion("")
      setCantidad("1")
      setCliente("")
      setDni("")
      setDireccion("")
      setTelefono("")
      setMetodoPago("")
      setRegistrarCliente(false)
      setActiveTab("productos")
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Registrar Venta</DialogTitle>
          <DialogDescription>Complete los detalles para registrar una nueva venta de agua Eufrosine.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200">
              <TabsTrigger value="productos">
                Productos {productosVenta.length > 0 && `(${productosVenta.length})`}
              </TabsTrigger>
              <TabsTrigger value="cliente">Datos del Cliente</TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-hidden">
              <TabsContent value="productos" className="flex flex-col h-full overflow-hidden">
                <div className="flex items-end gap-2 mb-4">
                  <div className="flex-1">
                    <Label htmlFor="presentacion" className="mb-2 block">
                      Presentación
                    </Label>
                    <Select value={presentacion} onValueChange={setPresentacion}>
                      <SelectTrigger id="presentacion">
                        <SelectValue placeholder="Seleccione una presentación" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRESENTACIONES.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.nombre} - S/ {p.precio.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24">
                    <Label htmlFor="cantidad" className="mb-2 block">
                      Cantidad
                    </Label>
                    <Input
                      id="cantidad"
                      type="number"
                      min="1"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    className="flex-shrink-0"
                    onClick={handleAddProducto}
                    disabled={!presentacion || Number.parseInt(cantidad) <= 0}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Añadir
                  </Button>
                </div>

                {/* Lista de productos añadidos con scroll */}
                <div className="flex-1 overflow-hidden border rounded-md">
                  {productosVenta.length > 0 ? (
                    <ScrollArea className="h-[250px] w-full">
                      <Table>
                        <TableHeader className="sticky top-0 bg-background z-10">
                          <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                            <TableHead className="text-right">Cant.</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {productosVenta.map((producto) => (
                            <TableRow key={producto.id}>
                              <TableCell className="py-2">{producto.nombre}</TableCell>
                              <TableCell className="text-right py-2">S/ {producto.precio.toFixed(2)}</TableCell>
                              <TableCell className="text-right py-2">{producto.cantidad}</TableCell>
                              <TableCell className="text-right py-2">S/ {producto.subtotal.toFixed(2)}</TableCell>
                              <TableCell className="py-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveProducto(producto.id)}
                                  className="h-7 w-7"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-center text-muted-foreground">
                      No hay productos añadidos a esta venta
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Badge className="text-lg px-3 py-1">Total: S/ {totalVenta.toFixed(2)}</Badge>
                  <Button className="bg-black" type="button" onClick={() => setActiveTab("cliente")}>
                    Continuar
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cliente" className="flex flex-col h-full">
                <div className="grid gap-4 mx-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cliente">Cliente</Label>
                      <Input id="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dni">DNI</Label>
                      <Input
                        id="dni"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        maxLength={8}
                        pattern="[0-9]{8}"
                        title="El DNI debe tener 8 dígitos"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección</Label>
                      <Input id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metodo-pago">Método de Pago</Label>
                    <Select value={metodoPago} onValueChange={setMetodoPago} required>
                      <SelectTrigger id="metodo-pago">
                        <SelectValue placeholder="Seleccione método de pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="efectivo">Efectivo</SelectItem>
                        <SelectItem value="tarjeta">Tarjeta</SelectItem>
                        <SelectItem value="transferencia">Transferencia</SelectItem>
                        <SelectItem value="yape">Yape</SelectItem>
                        <SelectItem value="plin">Plin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="registrar-cliente"
                      checked={registrarCliente}
                      onCheckedChange={(checked) => setRegistrarCliente(checked === true)}
                    />
                    <Label htmlFor="registrar-cliente" className="text-sm font-normal">
                      Registrar también en el módulo de Clientes
                    </Label>
                  </div>
                </div>

                <div className="mt-auto pt-4 flex justify-between items-center">
                  <Badge className="text-lg px-3 py-1">Total: S/ {totalVenta.toFixed(2)}</Badge>
                  <Button
                    type="button"
                    variant="outline"
                    className="self-start bg-black text-white"
                    onClick={() => setActiveTab("productos")}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Volver a Productos
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <DialogFooter className="pt-4 border-t mt-4">
            <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={productosVenta.length === 0}>
              Registrar Venta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
