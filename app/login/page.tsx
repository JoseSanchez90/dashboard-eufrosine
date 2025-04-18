"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    console.log({ email, password, rememberMe })

    // Por ahora, simplemente redirigimos al dashboard
    router.push("/")
  }

  const handleGoogleLogin = () => {
    // Aquí iría la lógica de autenticación con Google
    console.log("Login with Google")

    // Por ahora, simplemente redirigimos al dashboard
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      {/* Lado izquierdo - Formulario de login */}
      <div className="flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-8">Bienvenido</h2>

          <Button
            variant="outline"
            className="w-full mb-6 flex items-center justify-center gap-2 cursor-pointer bg-gray-800 text-white hover:bg-gray-900"
            onClick={handleGoogleLogin}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                />
                <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                />
                <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                />
              </g>
            </svg>
            Iniciar sesión con Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">ó inicia sesión con tu email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => {}}>
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Recordar mi sesión
              </Label>
            </div>

            <Button type="submit" className="w-full cursor-pointer bg-blue-700 hover:bg-blue-800">
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>

      {/* Lado derecho - Imagen */}
      <div className="hidden bg-blue-100 md:flex md:w-1/2 md:flex-col md:items-center md:justify-center">
        <div className="max-w-md px-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Agua de Mesa</h3>
              <p className="text-sm text-muted-foreground">Sistema de gestión para tu empresa EuFrosine</p>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="/img/Logo-Eufrosine.png"
                alt="Login"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
