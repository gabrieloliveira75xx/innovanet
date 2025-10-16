"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, Copy, Check, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CategoryNav } from "@/components/category-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function MinhaWiFiPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [wifiPassword, setWifiPassword] = useState("MinhaS3nh@F0rt3")

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(wifiPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePasswordChange = () => {
    setPasswordError("")

    if (newPassword.length < 8) {
      setPasswordError("A senha deve ter no mínimo 8 caracteres")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem")
      return
    }

    setWifiPassword(newPassword)
    setIsModalOpen(false)
    setNewPassword("")
    setConfirmPassword("")
    setPasswordError("")
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNewPassword("")
    setConfirmPassword("")
    setPasswordError("")
    setShowNewPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <CategoryNav />

      <header className="bg-white border-b border-[#D2D2D7] shadow-sm py-4 px-3">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/painel"
            className="inline-flex items-center gap-2 mb-4 text-[#6E6E73] hover:text-primary transition-colors min-h-[44px] text-base font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-2 tracking-tight">Minha Rede WiFi</h1>
          <p className="text-lg md:text-xl text-[#6E6E73]">Informações da sua rede</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border border-[#D2D2D7] shadow-md bg-white rounded-2xl overflow-hidden card-hover mb-8 p-0">
          <CardHeader className="bg-primary text-white border-b border-primary/20 py-6 px-6 lg:px-8">
            <CardTitle className="text-2xl font-semibold tracking-tight">Informações da Rede WiFi</CardTitle>
          </CardHeader>
          <CardContent className="p-6 lg:p-8 space-y-8">
            <div>
              <Label htmlFor="network-name" className="text-base font-medium text-[#1D1D1F] mb-3 block">
                Nome da Rede
              </Label>
              <p className="text-2xl md:text-3xl font-semibold text-primary text-center py-4 bg-[#F5F5F7] rounded-xl border border-[#D2D2D7]">
                Innovanet_Casa_5G
              </p>
            </div>

            <div>
              <Label htmlFor="wifi-password" className="text-base font-medium text-[#1D1D1F] mb-3 block">
                Senha do WiFi
              </Label>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    id="wifi-password"
                    type={showPassword ? "text" : "password"}
                    value={wifiPassword}
                    readOnly
                    className="text-xl h-14 pr-14 font-mono text-center font-semibold border-[#D2D2D7] rounded-xl"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F] min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button
                  size="lg"
                  onClick={handleCopyPassword}
                  className="w-full h-14 text-base font-medium gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] rounded-xl"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Senha Copiada!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar Senha
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="h-14 text-base font-medium gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] rounded-xl"
          >
            <Lock className="w-5 h-5" />
            Alterar Senha WiFi
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 text-base font-medium border-[#D2D2D7] bg-white hover:bg-[#F5F5F7] shadow-sm hover:shadow-md transition-all rounded-xl btn-secondary"
          >
            Preciso de Ajuda
          </Button>
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">Alterar Senha WiFi</DialogTitle>
            <DialogDescription className="text-base text-[#6E6E73]">
              Digite a nova senha para sua rede WiFi. A senha deve ter no mínimo 8 caracteres.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-base font-medium">
                Nova Senha
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                  className="h-12 text-base pr-12 rounded-xl border-[#D2D2D7]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F] min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={showNewPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-base font-medium">
                Confirmar Nova Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite a senha novamente"
                  className="h-12 text-base pr-12 rounded-xl border-[#D2D2D7]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E73] hover:text-[#1D1D1F] min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {passwordError && (
              <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] px-4 py-3 rounded-xl text-sm font-medium">
                {passwordError}
              </div>
            )}
          </div>

          <DialogFooter className="gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseModal}
              className="h-12 text-base font-medium min-w-[120px] rounded-xl border-[#D2D2D7] btn-secondary bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handlePasswordChange}
              className="h-12 text-base font-medium min-w-[120px] rounded-xl"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
