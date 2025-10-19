"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import {
  UserPlus,
  User,
  FileText,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Wifi,
  CheckCircle2,
  Calendar,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Plan {
  id: string
  name: string
  speed: string
  price: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    speed: "80 MEGA",
    price: "R$ 49,90/mês",
    features: ["Fibra óptica", "Wi-Fi grátis", "Suporte técnico", "Sem SPC/Serasa", "Instalação grátis"],
  },
  {
    id: "turbo",
    name: "Turbo",
    speed: "300 MEGA",
    price: "R$ 79,90/mês",
    popular: true,
    features: ["Fibra óptica", "Wi-Fi 5 grátis", "Suporte técnico", "Sem SPC/Serasa", "Instalação grátis"],
  },
  {
    id: "ultra",
    name: "Ultra",
    speed: "500 MEGA",
    price: "R$ 119,90/mês",
    features: ["Fibra óptica", "Wi-Fi 6 grátis", "Suporte técnico", "Sem SPC/Serasa", "Instalação grátis"],
  },
]

type FlowStep = "form" | "review" | "installation" | "success"

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("form")
  const [installationDate, setInstallationDate] = useState("")
  const [installationPeriod, setInstallationPeriod] = useState("")

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    documento: "",
    tipoDocumento: "cpf",
    telefone: "",
    email: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    planoEscolhido: "",
    formaPagamento: "",
    observacoes: "",
  })

  const [documentoError, setDocumentoError] = useState("")
  const [planoError, setPlanoError] = useState("")
  const [cepLoading, setCepLoading] = useState(false)

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    }
    return value
  }

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
    }
    return value
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3").replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{1,3})$/, "$1-$2")
    }
    return value
  }

  const isValidCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, "")
    if (numbers.length !== 11) return false

    // Validação básica de CPF
    if (/^(\d)\1{10}$/.test(numbers)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(numbers.charAt(i)) * (10 - i)
    }
    let digit = 11 - (sum % 11)
    if (digit >= 10) digit = 0
    if (digit !== Number.parseInt(numbers.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += Number.parseInt(numbers.charAt(i)) * (11 - i)
    }
    digit = 11 - (sum % 11)
    if (digit >= 10) digit = 0
    if (digit !== Number.parseInt(numbers.charAt(10))) return false

    return true
  }

  const isValidCNPJ = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, "")
    if (numbers.length !== 14) return false
    if (/^(\d)\1{13}$/.test(numbers)) return false
    return true
  }

  const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formData.tipoDocumento === "cpf" ? formatCPF(value) : formatCNPJ(value)
    setFormData({ ...formData, documento: formatted })
    setDocumentoError("")
  }

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData({ ...formData, telefone: formatted })
  }

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value)
    setFormData({ ...formData, cep: formatted })

    const numbers = formatted.replace(/\D/g, "")
    if (numbers.length === 8) {
      setCepLoading(true)
      try {
        const response = await fetch(`https://viacep.com.br/ws/${numbers}/json/`)
        const data = await response.json()

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            uf: data.uf || "",
          }))
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error)
      } finally {
        setCepLoading(false)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.planoEscolhido) {
      setPlanoError("Por favor, selecione um plano antes de continuar")
      document.getElementById("planos-section")?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    if (formData.tipoDocumento === "cpf" && !isValidCPF(formData.documento)) {
      setDocumentoError("CPF inválido")
      return
    }

    if (formData.tipoDocumento === "cnpj" && !isValidCNPJ(formData.documento)) {
      setDocumentoError("CNPJ inválido")
      return
    }

    setDocumentoError("")
    setPlanoError("")
    setCurrentStep("review")
  }

  const handleConfirmData = () => {
    setCurrentStep("installation")
  }

  const handleFinishRegistration = () => {
    console.log("Dados do cadastro:", {
      ...formData,
      installationDate,
      installationPeriod,
    })
    setCurrentStep("success")
  }

  const resetForm = () => {
    setFormData({
      nomeCompleto: "",
      documento: "",
      tipoDocumento: "cpf",
      telefone: "",
      email: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      planoEscolhido: "",
      formaPagamento: "",
      observacoes: "",
    })
    setInstallationDate("")
    setInstallationPeriod("")
    setCurrentStep("form")
  }

  const selectedPlan = plans.find((p) => p.id === formData.planoEscolhido)

  if (currentStep === "success") {
    return (
      <main className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-[#D2D2D7] text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-500/10 p-6 rounded-full">
                <CheckCircle2 className="text-green-500" size={64} />
              </div>
            </div>
            <h1 className="text-3xl font-semibold mb-4 text-[#1D1D1F]">Cadastro realizado com sucesso!</h1>
            <p className="text-[#6E6E73] text-lg mb-8">
              O cliente {formData.nomeCompleto} foi cadastrado no sistema. O financeiro receberá a notificação para
              gerar a primeira fatura e a equipe técnica será notificada para realizar a instalação em{" "}
              {new Date(installationDate).toLocaleDateString("pt-BR")} no período da {installationPeriod}.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetForm} className="bg-primary text-white rounded-xl hover:opacity-90 px-8">
                Novo Cadastro
              </Button>
              <Button variant="outline" className="rounded-xl border-[#D2D2D7] px-8 bg-transparent">
                Voltar ao Painel
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (currentStep === "installation") {
    return (
      <main className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#D2D2D7]">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Calendar className="text-primary" size={32} />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-center mb-2 text-[#1D1D1F] tracking-tight">
              Agendamento de Instalação
            </h1>
            <p className="text-center text-[#6E6E73] mb-8">Selecione a data e o período para a instalação do serviço</p>

            <div className="space-y-6">
              {/* Data de Instalação */}
              <div>
                <label htmlFor="installationDate" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                  Data de Instalação
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="text-[#6E6E73]" size={20} />
                  </div>
                  <input
                    type="date"
                    id="installationDate"
                    value={installationDate}
                    onChange={(e) => setInstallationDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="block w-full pl-10 pr-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    required
                  />
                </div>
              </div>

              {/* Período */}
              <div>
                <label className="block text-sm font-medium text-[#1D1D1F] mb-3">Período</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setInstallationPeriod("manhã")}
                    className={`cursor-pointer border-2 rounded-xl p-6 transition-all ${
                      installationPeriod === "manhã"
                        ? "border-primary bg-primary/5"
                        : "border-[#D2D2D7] hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Clock className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1D1D1F]">Manhã</h3>
                        <p className="text-sm text-[#6E6E73]">08:00 às 12:00</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setInstallationPeriod("tarde")}
                    className={`cursor-pointer border-2 rounded-xl p-6 transition-all ${
                      installationPeriod === "tarde"
                        ? "border-primary bg-primary/5"
                        : "border-[#D2D2D7] hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Clock className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1D1D1F]">Tarde</h3>
                        <p className="text-sm text-[#6E6E73]">13:00 às 18:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo */}
              {installationDate && installationPeriod && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">Resumo do Agendamento</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-[#6E6E73]">Cliente:</span>
                      <span className="ml-2 font-semibold text-[#1D1D1F]">{formData.nomeCompleto}</span>
                    </div>
                    <div>
                      <span className="text-[#6E6E73]">Data:</span>
                      <span className="ml-2 font-semibold text-[#1D1D1F]">
                        {new Date(installationDate).toLocaleDateString("pt-BR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6E6E73]">Período:</span>
                      <span className="ml-2 font-semibold text-[#1D1D1F]">
                        {installationPeriod === "manhã" ? "Manhã (08:00 às 12:00)" : "Tarde (13:00 às 18:00)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6E6E73]">Endereço:</span>
                      <span className="ml-2 font-semibold text-[#1D1D1F]">
                        {formData.logradouro}, {formData.numero}
                        {formData.complemento && ` - ${formData.complemento}`} - {formData.bairro}, {formData.cidade}/
                        {formData.uf}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep("review")}
                  className="flex-1 rounded-xl border-[#D2D2D7] hover:bg-[#F5F5F7] py-6 text-base bg-transparent"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleFinishRegistration}
                  disabled={!installationDate || !installationPeriod}
                  className="flex-1 bg-primary text-white rounded-xl hover:opacity-90 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Finalizar Cadastro
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (currentStep === "review") {
    return (
      <main className="min-h-screen bg-[#F5F5F7] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="text-5xl font-bold text-primary mb-2">Innovanet</div>
            </Link>
            <p className="text-[#6E6E73] text-base">Revisão de Dados do Cliente</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#D2D2D7]">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <FileText className="text-primary" size={32} />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-center mb-2 text-[#1D1D1F] tracking-tight">Revisão dos Dados</h1>
            <p className="text-center text-[#6E6E73] mb-8">
              Verifique se todas as informações estão corretas antes de prosseguir
            </p>

            <div className="space-y-6">
              {/* Dados Pessoais */}
              <div className="border border-[#D2D2D7] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
                  <User size={20} />
                  Dados Pessoais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#6E6E73]">Nome Completo:</span>
                    <p className="font-semibold text-[#1D1D1F] mt-1">{formData.nomeCompleto}</p>
                  </div>
                  <div>
                    <span className="text-[#6E6E73]">{formData.tipoDocumento === "cpf" ? "CPF" : "CNPJ"}:</span>
                    <p className="font-semibold text-[#1D1D1F] mt-1">{formData.documento}</p>
                  </div>
                  <div>
                    <span className="text-[#6E6E73]">Telefone:</span>
                    <p className="font-semibold text-[#1D1D1F] mt-1">{formData.telefone}</p>
                  </div>
                  <div>
                    <span className="text-[#6E6E73]">E-mail:</span>
                    <p className="font-semibold text-[#1D1D1F] mt-1">{formData.email}</p>
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="border border-[#D2D2D7] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Endereço
                </h2>
                <div className="text-sm">
                  <span className="text-[#6E6E73]">Endereço Completo:</span>
                  <p className="font-semibold text-[#1D1D1F] mt-1">
                    {formData.logradouro}, {formData.numero}
                    {formData.complemento && ` - ${formData.complemento}`}
                    <br />
                    {formData.bairro} - CEP {formData.cep}
                    <br />
                    {formData.cidade}/{formData.uf}
                  </p>
                </div>
              </div>

              {/* Plano e Pagamento */}
              <div className="border border-[#D2D2D7] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
                  <Wifi size={20} />
                  Plano e Pagamento
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#6E6E73]">Plano Escolhido:</span>
                    <p className="font-semibold text-[#1D1D1F] mt-1">
                      {selectedPlan?.name} - {selectedPlan?.speed}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#6E6E73]">Valor Mensal:</span>
                    <p className="font-semibold text-[#1D1D1F] mt-1">{selectedPlan?.price}</p>
                  </div>
                  <div>
                    <span className="text-[#6E6E73]">Forma de Pagamento:</span>
                    <p className="font-semibold text-[#1D1D1F] mt-1">
                      {formData.formaPagamento === "pix"
                        ? "PIX"
                        : formData.formaPagamento === "cartao"
                          ? "Cartão de Crédito"
                          : "Boleto Bancário"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Observações */}
              {formData.observacoes && (
                <div className="border border-[#D2D2D7] rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Observações Internas
                  </h2>
                  <p className="text-sm text-[#6E6E73]">{formData.observacoes}</p>
                </div>
              )}

              {/* Aviso */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <p className="text-sm text-blue-900 text-center">
                  <strong>Atenção:</strong> Certifique-se de que o cliente revisou e confirmou todos os dados acima
                  antes de prosseguir.
                </p>
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep("form")}
                  className="flex-1 rounded-xl border-[#D2D2D7] hover:bg-[#F5F5F7] py-6 text-base bg-transparent"
                >
                  Editar Dados
                </Button>
                <Button
                  onClick={handleConfirmData}
                  className="flex-1 bg-primary text-white rounded-xl hover:opacity-90 py-6 text-base"
                >
                  Confirmado pelo Cliente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-5xl font-bold text-primary mb-2">Innovanet</div>
          </Link>
          <p className="text-[#6E6E73] text-base">Sistema de Cadastro de Clientes</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#D2D2D7]">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <UserPlus className="text-primary" size={32} />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-8 text-[#1D1D1F] tracking-tight">
            Cadastro de Novo Cliente
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados Pessoais */}
            <div>
              <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
                <User size={20} />
                Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label htmlFor="nomeCompleto" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Nome Completo / Razão Social
                  </label>
                  <input
                    type="text"
                    id="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder="Digite o nome completo"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tipoDocumento" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Tipo de Documento
                  </label>
                  <select
                    id="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value, documento: "" })}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                  >
                    <option value="cpf">CPF</option>
                    <option value="cnpj">CNPJ</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="documento" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    {formData.tipoDocumento === "cpf" ? "CPF" : "CNPJ"}
                  </label>
                  <input
                    type="text"
                    id="documento"
                    value={formData.documento}
                    onChange={handleDocumentoChange}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder={formData.tipoDocumento === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"}
                    maxLength={formData.tipoDocumento === "cpf" ? 14 : 18}
                    required
                  />
                  {documentoError && <p className="text-red-500 text-sm mt-1">{documentoError}</p>}
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Telefone / WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="text-[#6E6E73]" size={20} />
                    </div>
                    <input
                      type="text"
                      id="telefone"
                      value={formData.telefone}
                      onChange={handleTelefoneChange}
                      className="block w-full pl-10 pr-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="text-[#6E6E73]" size={20} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full pl-10 pr-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Endereço
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div>
                  <label htmlFor="cep" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="cep"
                    value={formData.cep}
                    onChange={handleCEPChange}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder="00000-000"
                    maxLength={9}
                    required
                  />
                  {cepLoading && <p className="text-primary text-sm mt-1">Buscando endereço...</p>}
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                  <label htmlFor="logradouro" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Logradouro
                  </label>
                  <input
                    type="text"
                    id="logradouro"
                    value={formData.logradouro}
                    onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder="Rua, Avenida, etc."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="numero" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder="Nº"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="complemento" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    value={formData.complemento}
                    onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder="Apto, Bloco, etc."
                  />
                </div>

                <div>
                  <label htmlFor="bairro" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Bairro
                  </label>
                  <input
                    type="text"
                    id="bairro"
                    value={formData.bairro}
                    onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder="Bairro"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder="Cidade"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="uf" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    UF
                  </label>
                  <input
                    type="text"
                    id="uf"
                    value={formData.uf}
                    onChange={(e) => setFormData({ ...formData, uf: e.target.value.toUpperCase() })}
                    className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                    placeholder="UF"
                    maxLength={2}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Plano e Pagamento */}
            <div id="planos-section">
              <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
                <Wifi size={20} />
                Plano e Pagamento
              </h2>

              {/* Planos */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1D1D1F] mb-3">
                  Escolha o Plano <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => {
                        setFormData({ ...formData, planoEscolhido: plan.id })
                        setPlanoError("")
                      }}
                      className={`relative cursor-pointer border-2 rounded-xl p-5 transition-all ${
                        formData.planoEscolhido === plan.id
                          ? "border-primary bg-primary/5"
                          : "border-[#D2D2D7] hover:border-primary/50"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Mais Popular
                        </div>
                      )}
                      <div className="text-center mb-3">
                        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-1">{plan.name}</h3>
                        <div className="text-2xl font-bold text-primary mb-1">{plan.speed}</div>
                        <div className="text-lg font-semibold text-[#1D1D1F]">{plan.price}</div>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm text-[#6E6E73] flex items-start gap-2">
                            <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {planoError && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 text-sm font-medium">{planoError}</p>
                  </div>
                )}
              </div>

              {/* Forma de Pagamento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="formaPagamento" className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Forma de Pagamento
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="text-[#6E6E73]" size={20} />
                    </div>
                    <select
                      id="formaPagamento"
                      value={formData.formaPagamento}
                      onChange={(e) => setFormData({ ...formData, formaPagamento: e.target.value })}
                      className="block w-full pl-10 pr-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F]"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="pix">PIX</option>
                      <option value="cartao">Cartão de Crédito</option>
                      <option value="boleto">Boleto Bancário</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <h2 className="text-lg font-semibold text-[#1D1D1F] mb-4 flex items-center gap-2">
                <FileText size={20} />
                Observações Internas
              </h2>
              <textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                className="block w-full px-4 py-3 border border-[#D2D2D7] rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-[#1D1D1F] resize-none"
                placeholder="Adicione observações internas sobre o cliente (opcional)"
                rows={4}
              />
            </div>

            {/* Resumo do Plano Selecionado */}
            {selectedPlan && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">Resumo do Cadastro</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#6E6E73]">Plano:</span>
                    <span className="ml-2 font-semibold text-[#1D1D1F]">
                      {selectedPlan.name} - {selectedPlan.speed}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#6E6E73]">Valor:</span>
                    <span className="ml-2 font-semibold text-[#1D1D1F]">{selectedPlan.price}</span>
                  </div>
                  {formData.formaPagamento && (
                    <div>
                      <span className="text-[#6E6E73]">Pagamento:</span>
                      <span className="ml-2 font-semibold text-[#1D1D1F]">
                        {formData.formaPagamento === "pix"
                          ? "PIX"
                          : formData.formaPagamento === "cartao"
                            ? "Cartão de Crédito"
                            : "Boleto Bancário"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl border-[#D2D2D7] hover:bg-[#F5F5F7] py-6 text-base bg-transparent"
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-primary text-white rounded-xl hover:opacity-90 py-6 text-base">
                Continuar
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[#6E6E73] hover:text-primary transition-colors">
            ← Voltar ao painel
          </Link>
        </div>
      </div>
    </main>
  )
}
