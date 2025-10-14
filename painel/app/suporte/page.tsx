"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, HelpCircle, FileQuestion, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SuportePage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado:", formData)
    alert("Chamado aberto com sucesso! Entraremos em contato em breve.")
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white border-b border-gray-200 py-6 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/painel"
            className="inline-flex items-center gap-2 mb-4 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base font-medium">Voltar</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Central de Suporte</h1>
          <p className="mt-2 text-gray-600">Estamos aqui para ajudar você</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Informações de Contato */}
        <Card className="mb-8 shadow-lg border-2 border-gray-200">
          <CardHeader className="bg-primary text-white rounded-t-lg">
            <CardTitle className="text-2xl md:text-3xl font-bold">Canais de Atendimento</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Telefone</h3>
                  <p className="text-xl font-semibold text-primary">0800 123 4567</p>
                  <p className="text-sm text-gray-600 mt-1">Ligação gratuita</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">WhatsApp</h3>
                  <p className="text-xl font-semibold text-primary">(11) 98765-4321</p>
                  <p className="text-sm text-gray-600 mt-1">Atendimento rápido</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">E-mail</h3>
                  <p className="text-lg text-primary break-all">suporte@innovanet.com.br</p>
                  <p className="text-sm text-gray-600 mt-1">Resposta em até 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Horário</h3>
                  <p className="text-base text-gray-700">Segunda a Sexta</p>
                  <p className="text-base text-gray-700">8h às 20h</p>
                  <p className="text-sm text-gray-600 mt-1">Sábados: 8h às 14h</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categorias de Ajuda */}
        <Card className="mb-8 shadow-lg border-2 border-gray-200">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">Como podemos ajudar?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="flex flex-col items-center gap-3 p-6 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="bg-primary/10 rounded-full p-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Wrench className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="font-semibold text-gray-900 text-center">Problemas Técnicos</span>
              </button>

              <button className="flex flex-col items-center gap-3 p-6 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="bg-primary/10 rounded-full p-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <FileQuestion className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="font-semibold text-gray-900 text-center">Dúvidas sobre Planos</span>
              </button>

              <button className="flex flex-col items-center gap-3 p-6 rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="bg-primary/10 rounded-full p-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <HelpCircle className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="font-semibold text-gray-900 text-center">Outras Questões</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Contato */}
        <Card className="mb-8 shadow-lg border-2 border-gray-200">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">Abrir Chamado</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-base font-semibold">
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  className="h-12 text-base border-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  E-mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="h-12 text-base border-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assunto" className="text-base font-semibold">
                  Assunto
                </Label>
                <Input
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  placeholder="Descreva brevemente o problema"
                  className="h-12 text-base border-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensagem" className="text-base font-semibold">
                  Mensagem
                </Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Descreva detalhadamente sua solicitação..."
                  className="min-h-32 text-base border-2 resize-none"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold bg-primary hover:opacity-90">
                Enviar Chamado
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Botões de Ação Rápida */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button
            size="lg"
            className="h-auto py-6 text-lg md:text-xl font-semibold bg-green-600 hover:bg-green-700 transition-all gap-2"
            onClick={() => window.open("https://wa.me/5511987654321", "_blank")}
          >
            <MessageCircle className="w-6 h-6" />
            Chat via WhatsApp
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-auto py-6 text-lg md:text-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all bg-transparent gap-2"
          >
            <HelpCircle className="w-6 h-6" />
            Central de Ajuda
          </Button>
        </div>

        {/* Dicas */}
        <Card className="mb-8 shadow-lg border-2 border-gray-200">
          <CardHeader className="bg-gray-100 border-b border-gray-200">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">Dicas Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3 text-base leading-relaxed">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Reinicie seu roteador antes de entrar em contato</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Verifique se há manutenção programada na sua região</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Tenha em mãos seu número de cliente para atendimento mais rápido</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-700">Consulte nossa base de conhecimento para soluções imediatas</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/painel">
            <Button size="lg" variant="ghost" className="text-base gap-2 text-gray-600 hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              Voltar para o Início
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
