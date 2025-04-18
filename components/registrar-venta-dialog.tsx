"use client"

import type React from "react"

import { useState } from "react"

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

interface RegistrarVentaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PRESENTACIONES = [
  { id: "Recarga", nombre: "Recarga Bidon 20L", precio: 12.0 },
  { id: "botella-625ml", nombre: "Botella 625ml", precio: 1.0 },
  { id: "botella-1L", nombre: "Botella 1 litro", precio: 2.0 },
  { id: "botella-3L", nombre: "Botella 3 litros", precio: 2.5 },
  { id: "botella-10L", nombre: "Botella 10 litros", precio: 6.0 },
  { id: "bidon-20L", nombre: "Bidón 20 litros", precio: 30.0 },
]

export function RegistrarVentaDialog({ open, onOpenChange }: RegistrarVentaDialogProps) {
  const [presentacion, setPresentacion] = useState("")
  const [cantidad, setCantidad] = useState("1")
  const [cliente, setCliente] = useState("")
  const [dni, setDni] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [metodoPago, setMetodoPago] = useState("")
  const [registrarCliente, setRegistrarCliente] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para registrar la venta
    console.log({
      presentacion,
      cantidad: Number.parseInt(cantidad),
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
      // Aquí iría la lógica para registrar el cliente
    }

    // Resetear el formulario
    setPresentacion("")
    setCantidad("1")
    setCliente("")
    setDni("")
    setDireccion("")
    setTelefono("")
    setMetodoPago("")
    setRegistrarCliente(false)

    // Cerrar el diálogo
    onOpenChange(false)
  }

  // Calcular el precio total
  const precioUnitario = presentacion ? PRESENTACIONES.find((p) => p.id === presentacion)?.precio || 0 : 0
  const precioTotal = precioUnitario * Number.parseInt(cantidad || "0")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Registrar Venta</DialogTitle>
          <DialogDescription>Complete los detalles para registrar una nueva venta de agua Eufrosine.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="presentacion" className="text-right">
                Presentación
              </Label>
              <Select value={presentacion} onValueChange={setPresentacion} required>
                <SelectTrigger id="presentacion" className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cantidad" className="text-right">
                Cantidad
              </Label>
              <Input
                id="cantidad"
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cliente" className="text-right">
                Cliente
              </Label>
              <Input
                id="cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dni" className="text-right">
                DNI
              </Label>
              <Input
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="col-span-3"
                maxLength={8}
                pattern="[0-9]{8}"
                title="El DNI debe tener 8 dígitos"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="metodo-pago" className="text-right">
                Método de Pago
              </Label>
              <Select value={metodoPago} onValueChange={setMetodoPago} required>
                <SelectTrigger id="metodo-pago" className="col-span-3">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Total</Label>
              <div className="col-span-3 font-bold">S/ {precioTotal.toFixed(2)}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3 flex items-center space-x-2">
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
          </div>
          <DialogFooter>
            <Button type="submit">Registrar Venta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
