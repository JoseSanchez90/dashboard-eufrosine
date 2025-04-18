"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function UserNav() {
  const { theme, setTheme } = useTheme()
  const [showProfileDialog, setShowProfileDialog] = useState(false)

  // Datos de ejemplo del usuario
  const userData = {
    nombre: "Tania Pamela",
    apellidos: "Hidalgo Nuñez",
    telefono: "993753816",
    direccion: "Av cincuentenario 390 Hualmay - Huacho",
    email: "tania_h_n@hotmail.com",
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" /> */}
              <AvatarFallback>TH</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userData.nombre} {userData.apellidos}
              </p>
              <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setShowProfileDialog(true)}>Perfil</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">Configuración</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem className="cursor-pointer" value="light">Claro</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className="cursor-pointer" value="dark">Oscuro</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className="cursor-pointer" value="system">Sistema</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Cerrar sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Perfil de Usuario</DialogTitle>
            <DialogDescription>Información personal de tu cuenta</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input id="nombre" value={userData.nombre} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apellidos" className="text-right">
                Apellidos
              </Label>
              <Input id="apellidos" value={userData.apellidos} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" value={userData.email} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">
                Teléfono
              </Label>
              <Input id="telefono" value={userData.telefono} className="col-span-3" readOnly />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="direccion" className="text-right">
                Dirección
              </Label>
              <Input id="direccion" value={userData.direccion} className="col-span-3" readOnly />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
