"use client"

import type React from "react"

import { useState } from "react"
import { Package, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
// import { toast } from "@/components/ui/use-toast"

// Definir tipos para los productos
interface ProductoInventario {
  id: number
  nombre: string
  stock: number
  estado: string
  precio: number
}

export function InventarioContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("todos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductoInventario | null>(null)

  // Estados para el formulario de nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    stock: "0",
    precio: "",
  })

  // Estados para el formulario de edición
  const [productoEditado, setProductoEditado] = useState({
    nombre: "",
    stock: "",
    precio: "",
  })

  // Datos de ejemplo para el inventario
  const [inventoryItems] = useState<ProductoInventario[]>([
    { id: 1, nombre: "Bidón 20 litros", stock: 0, estado: "sin-stock", precio: 30.0 },
    { id: 2, nombre: "Botella 10 litros", stock: 0, estado: "sin-stock", precio: 6.0 },
    { id: 3, nombre: "Botella 3 litros", stock: 0, estado: "sin-stock", precio: 2.5 },
    { id: 4, nombre: "Botella 1 litro", stock: 0, estado: "sin-stock", precio: 2.0 },
    { id: 5, nombre: "Botella 625ml", stock: 0, estado: "sin-stock", precio: 1.0 },
    { id: 6, nombre: "Recarga Bidón 20L", stock: 0, estado: "sin-stock", precio: 12.0 },
  ])

  // Filtrar elementos según búsqueda y estado
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "todos" || item.estado === filterStatus
    return matchesSearch && matchesFilter
  })

  // Función para obtener el color de la insignia según el estado
  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "optimo":
        return "bg-emerald-500"
      case "medio":
        return "bg-amber-500"
      case "bajo":
        return "bg-red-500"
      case "sin-stock":
      default:
        return "variant-outline"
    }
  }

  // Función para obtener el texto del estado
  const getStatusText = (estado: string) => {
    switch (estado) {
      case "optimo":
        return "Óptimo"
      case "medio":
        return "Medio"
      case "bajo":
        return "Bajo"
      case "sin-stock":
      default:
        return "Sin stock"
    }
  }

  // Manejar cambios en el formulario de nuevo producto
  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNuevoProducto({
      ...nuevoProducto,
      [name]: value,
    })
  }

  // Manejar cambios en el formulario de edición
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductoEditado({
      ...productoEditado,
      [name]: value,
    })
  }

  // Manejar envío del formulario de nuevo producto (solo visual)
  // const handleAddSubmit = () => {
  //   // Validar que los campos no estén vacíos
  //   if (!nuevoProducto.nombre || !nuevoProducto.precio) {
  //     toast({
  //       title: "Error",
  //       description: "Por favor complete todos los campos requeridos",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   // Mostrar mensaje de éxito (solo visual)
  //   toast({
  //     title: "Producto añadido",
  //     description: `El producto "${nuevoProducto.nombre}" ha sido añadido al inventario.`,
  //   })

  //   // Resetear formulario y cerrar diálogo
  //   setNuevoProducto({
  //     nombre: "",
  //     stock: "0",
  //     precio: "",
  //   })
  //   setIsAddDialogOpen(false)
  // }

  // // Manejar envío del formulario de edición (solo visual)
  // const handleEditSubmit = () => {
  //   // Validar que los campos no estén vacíos
  //   if (!productoEditado.nombre || !productoEditado.precio) {
  //     toast({
  //       title: "Error",
  //       description: "Por favor complete todos los campos requeridos",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   // Mostrar mensaje de éxito (solo visual)
  //   toast({
  //     title: "Producto actualizado",
  //     description: `El producto "${productoEditado.nombre}" ha sido actualizado.`,
  //   })

  //   // Cerrar diálogo
  //   setIsEditDialogOpen(false)
  // }

  // Abrir diálogo de edición
  const handleEditClick = (product: ProductoInventario) => {
    setSelectedProduct(product)
    setProductoEditado({
      nombre: product.nombre,
      stock: product.stock.toString(),
      precio: product.precio.toString(),
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventario</h1>
          <p className="text-muted-foreground">Gestiona el stock de productos</p>
        </div>
        <Button className="gap-1 cursor-pointer" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Añadir producto
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Productos en inventario</CardTitle>
          <CardDescription>Administra el stock y precios de tus productos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="optimo">Óptimo</SelectItem>
                <SelectItem value="medio">Medio</SelectItem>
                <SelectItem value="bajo">Bajo</SelectItem>
                <SelectItem value="sin-stock">Sin stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.nombre}</TableCell>
                    <TableCell>{item.stock} unidades</TableCell>
                    <TableCell>
                      <Badge className={getBadgeVariant(item.estado)}>{getStatusText(item.estado)}</Badge>
                    </TableCell>
                    <TableCell>S/ {item.precio.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button className="cursor-pointer" variant="ghost" size="sm" onClick={() => handleEditClick(item)}>
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex h-[200px] items-center justify-center flex-col gap-2 text-center">
              <Package className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No se encontraron productos</p>
              <p className="text-xs text-muted-foreground">Intenta con otra búsqueda o añade nuevos productos</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Diálogo para añadir producto */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Añadir Producto</DialogTitle>
            <DialogDescription>Complete los detalles del nuevo producto para añadirlo al inventario.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleAddInputChange}
                className="col-span-3"
                placeholder="Ej: Botella 1 litro"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock Inicial
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={nuevoProducto.stock}
                onChange={handleAddInputChange}
                className="col-span-3"
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="precio" className="text-right">
                Precio (S/)
              </Label>
              <Input
                id="precio"
                name="precio"
                type="number"
                step="0.01"
                min="0"
                value={nuevoProducto.precio}
                onChange={handleAddInputChange}
                className="col-span-3"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="cursor-pointer">Añadir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar producto */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>Modifique los detalles del producto seleccionado.</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="edit-nombre"
                  name="nombre"
                  value={productoEditado.nombre}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={productoEditado.stock}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-precio" className="text-right">
                  Precio (S/)
                </Label>
                <Input
                  id="edit-precio"
                  name="precio"
                  type="number"
                  step="0.01"
                  min="0"
                  value={productoEditado.precio}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="cursor-pointer">Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
