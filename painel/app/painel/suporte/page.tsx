"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, MessageCircle, Mail, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CategoryNav } from "@/components/category-nav"

export default function SuportePage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado:", formData)
    alert("Chamado aberto com sucesso! Entraremos em contato em breve.")
    setFormData({ nome: "", email: "", mensagem: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
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
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-2 tracking-tight">Suporte</h1>
          <p className="text-lg md:text-xl text-[#6E6E73]">Como podemos ajudar você hoje?</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-8 text-center tracking-tight">Fale Conosco</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <Button
              size="lg"
              className="h-28 text-lg font-medium bg-[#34C759] hover:bg-[#34C759]/90 flex-col gap-2 py-6 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] rounded-2xl"
              onClick={() => window.open("https://wa.me/5511987654321", "_blank")}
            >
              <MessageCircle className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">WhatsApp</div>
                <div className="text-xs font-normal opacity-90">(11) 98765-4321</div>
              </div>
            </Button>

            <Button
              size="lg"
              className="h-28 text-lg font-medium bg-primary hover:bg-primary/90 flex-col gap-2 py-6 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] rounded-2xl"
              onClick={() => (window.location.href = "tel:08001234567")}
            >
              <Phone className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Telefone</div>
                <div className="text-xs font-normal opacity-90">0800 123 4567</div>
              </div>
            </Button>

            <Button
              size="lg"
              className="h-28 text-lg font-medium bg-[#FF9500] hover:bg-[#FF9500]/90 flex-col gap-2 py-6 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] rounded-2xl"
              onClick={() => (window.location.href = "mailto:suporte@innovanet.com.br")}
            >
              <Mail className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">E-mail</div>
                <div className="text-xs font-normal opacity-90">suporte@innovanet.com.br</div>
              </div>
            </Button>
          </div>
        </div>

        <Card className="border border-[#D2D2D7] shadow-md bg-white rounded-2xl overflow-hidden card-hover mb-8 p-0">
          <CardHeader className="bg-primary text-white border-b border-primary/20 py-6 px-6 lg:px-8">
            <CardTitle className="text-2xl font-semibold tracking-tight">Enviar Mensagem</CardTitle>
            <p className="text-white/90 text-sm mt-1 font-normal">Descreva seu problema e retornaremos em breve</p>
          </CardHeader>
          <CardContent className="p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-base font-medium text-[#1D1D1F]">
                  Seu Nome
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  className="h-12 text-base border-[#D2D2D7] focus:border-primary rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium text-[#1D1D1F]">
                  Seu E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="h-12 text-base border-[#D2D2D7] focus:border-primary rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem" className="text-base font-medium text-[#1D1D1F]">
                  Sua Mensagem
                </Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Descreva como podemos ajudar..."
                  className="min-h-32 text-base resize-none border-[#D2D2D7] focus:border-primary rounded-xl"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base font-medium shadow-md hover:shadow-lg transition-all rounded-xl"
              >
                Enviar Mensagem
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#D2D2D7] shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-6 lg:p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-7 h-7 text-primary" />
              <h3 className="text-xl font-semibold text-[#1D1D1F] tracking-tight">Horário de Atendimento</h3>
            </div>
            <div className="space-y-1">
              <p className="text-base text-[#1D1D1F] font-medium">Segunda a Sexta: 8h às 20h</p>
              <p className="text-base text-[#1D1D1F] font-medium">Sábados: 8h às 14h</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
