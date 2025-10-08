"use client"
import { useState } from "react"
import Link from "next/link"
import {
  Wifi,
  Gauge,
  Key,
  CreditCard,
  MessageSquare,
  Clock,
  PhoneCall,
  MessageCircle,
  LogOut,
  User,
  Home,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
  Send,
  History,
  Zap,
  Shield,
} from "lucide-react"

export default function DashboardPage() {
  const [speedTestRunning, setSpeedTestRunning] = useState(false)
  const [speedResult, setSpeedResult] = useState<number | null>(null)
  const [wifiName, setWifiName] = useState("")
  const [wifiPassword, setWifiPassword] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")

  const handleSpeedTest = () => {
    setSpeedTestRunning(true)
    setSpeedResult(null)
    setTimeout(() => {
      setSpeedResult(Math.floor(Math.random() * 100) + 200)
      setSpeedTestRunning(false)
    }, 3000)
  }

  const handleCancelSubscription = (method: "whatsapp" | "phone") => {
    if (method === "whatsapp") {
      window.open("https://wa.me/551234567890", "_blank")
    } else {
      window.location.href = "tel:+551234567890"
    }
  }

  const handleWifiNameSubmit = () => {
    if (wifiName.trim()) {
      console.log("[v0] WiFi name updated:", wifiName)
      setWifiName("")
    }
  }

  const handleWifiPasswordSubmit = () => {
    if (wifiPassword.length >= 8) {
      console.log("[v0] WiFi password updated")
      setWifiPassword("")
    }
  }

  const handleTicketSubmit = () => {
    if (ticketMessage.trim()) {
      console.log("[v0] Ticket submitted:", ticketMessage)
      setTicketMessage("")
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card/80 backdrop-blur-glass border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="animate-fade-in-up">
              <h1 className="text-2xl font-bold gradient-text">Central do Assinante</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Bem-vindo de volta</p>
            </div>
            <div className="flex gap-2 animate-fade-in-up delay-100">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-all hover:scale-105"
              >
                <Home size={18} />
                <span className="hidden sm:inline">Início</span>
              </Link>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-all hover:scale-105">
                <LogOut size={18} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-primary via-primary to-[oklch(0.4_0.25_264)] rounded-2xl shadow-lg p-6 sm:p-8 mb-8 text-primary-foreground animate-scale-in overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-5"></div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
              <div className="bg-white/15 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Plano Fibra 300 Mega</h2>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={18} className="text-accent" />
                  <span className="text-sm text-primary-foreground/95 font-medium">Conta Ativa</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
                  <div className="flex items-center gap-1">
                    <Zap size={14} />
                    <span>300 Mbps</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield size={14} />
                    <span>Fibra Óptica</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <span className="text-xs text-primary-foreground/80 uppercase tracking-wide">Próximo vencimento</span>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span className="text-lg font-bold">20/05/2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 card-hover animate-fade-in-up delay-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Wifi className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Gerenciar Roteador</h2>
                <p className="text-xs text-muted-foreground">Configure sua rede WiFi</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Gauge className="text-accent" size={22} />
                  <span className="font-semibold text-foreground">Teste de Velocidade</span>
                </div>
                {speedResult && (
                  <div className="mb-4 text-center py-6 bg-card rounded-xl border border-border animate-scale-in">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="text-accent animate-pulse" size={24} />
                      <p className="text-5xl font-bold text-foreground">{speedResult}</p>
                      <span className="text-xl text-muted-foreground">Mbps</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Velocidade de Download</p>
                  </div>
                )}
                <button
                  onClick={handleSpeedTest}
                  disabled={speedTestRunning}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Gauge size={18} />
                  {speedTestRunning ? "Testando..." : "Iniciar Teste"}
                </button>
              </div>

              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Wifi className="text-accent" size={22} />
                  <span className="font-semibold text-foreground">Alterar Nome do WiFi</span>
                </div>
                <input
                  type="text"
                  placeholder="Digite o novo nome da rede"
                  value={wifiName}
                  onChange={(e) => setWifiName(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg mb-3 focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground transition-all"
                />
                <button
                  onClick={handleWifiNameSubmit}
                  disabled={!wifiName.trim()}
                  className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Salvar Nome
                </button>
              </div>

              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="text-accent" size={22} />
                  <span className="font-semibold text-foreground">Alterar Senha do WiFi</span>
                </div>
                <input
                  type="password"
                  placeholder="Nova senha (mínimo 8 caracteres)"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg mb-2 focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground transition-all"
                />
                {wifiPassword && wifiPassword.length < 8 && (
                  <p className="text-xs text-destructive mb-2 flex items-center gap-1">
                    <AlertCircle size={12} />A senha deve ter no mínimo 8 caracteres
                  </p>
                )}
                <button
                  onClick={handleWifiPasswordSubmit}
                  disabled={wifiPassword.length < 8}
                  className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Salvar Senha
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 card-hover animate-fade-in-up delay-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="bg-primary/10 p-3 rounded-xl">
                <MessageSquare className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Chamados</h2>
                <p className="text-xs text-muted-foreground">Suporte técnico</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Send className="text-accent" size={20} />
                  <h3 className="font-semibold text-foreground">Abrir Novo Chamado</h3>
                </div>
                <textarea
                  placeholder="Descreva seu problema ou solicitação em detalhes..."
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg mb-3 focus:ring-2 focus:ring-ring focus:border-transparent resize-none bg-background text-foreground placeholder:text-muted-foreground transition-all"
                />
                <button
                  onClick={handleTicketSubmit}
                  disabled={!ticketMessage.trim()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Enviar Chamado
                </button>
              </div>

              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <History className="text-accent" size={20} />
                  <h3 className="font-semibold text-foreground">Histórico de Chamados</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-card p-4 rounded-xl border border-border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-foreground">Problema de conexão</span>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 size={14} />
                        Resolvido
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar size={12} />
                      15/04/2025 • Protocolo #12345
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border border-border hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-foreground">Lentidão na internet</span>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 shadow-sm animate-pulse">
                        <AlertCircle size={14} />
                        Em andamento
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar size={12} />
                      10/04/2025 • Protocolo #12344
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 card-hover animate-fade-in-up delay-400">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="bg-primary/10 p-3 rounded-xl">
                <CreditCard className="text-primary" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Pagamento</h2>
                <p className="text-xs text-muted-foreground">Faturas e histórico</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-gradient-to-br from-accent/15 via-accent/10 to-accent/5 rounded-xl p-6 border-2 border-accent/30 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <CreditCard size={18} className="text-accent" />
                    Fatura Atual
                  </h3>
                  <span className="text-xs bg-accent/20 text-accent px-3 py-1.5 rounded-full font-semibold shadow-sm">
                    Pendente
                  </span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-accent/20">
                    <span className="text-sm text-muted-foreground">Vencimento</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Calendar size={14} />
                      20/05/2025
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Valor</span>
                    <span className="text-4xl font-bold text-foreground">R$ 99,90</span>
                  </div>
                </div>
                <button className="btn-accent w-full py-3.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <CreditCard size={20} />
                  Pagar Agora
                </button>
              </div>

              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <History className="text-accent" size={20} />
                  <h3 className="font-semibold text-foreground">Histórico de Pagamentos</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { month: "Abril 2025", status: "Pago", date: "20/04/2025", value: "R$ 99,90" },
                    { month: "Março 2025", status: "Pago", date: "20/03/2025", value: "R$ 99,90" },
                    { month: "Fevereiro 2025", status: "Pago", date: "20/02/2025", value: "R$ 99,90" },
                  ].map((payment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 px-4 bg-card rounded-lg border border-border hover:shadow-sm transition-all"
                    >
                      <div>
                        <span className="text-sm font-semibold text-foreground block">{payment.month}</span>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar size={10} />
                          {payment.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-foreground block mb-1">{payment.value}</span>
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 card-hover animate-fade-in-up delay-500">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="bg-destructive/10 p-3 rounded-xl">
                <LogOut className="text-destructive" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Cancelar Assinatura</h2>
                <p className="text-xs text-muted-foreground">Fale conosco</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-5 border border-border">
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-5">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong className="text-destructive">Sentiremos sua falta!</strong> Para cancelar sua assinatura,
                    entre em contato conosco através de um dos canais abaixo:
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleCancelSubscription("whatsapp")}
                    className="w-full flex items-center justify-center gap-3 bg-green-500 text-white py-3.5 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
                  >
                    <MessageCircle size={22} />
                    Cancelar via WhatsApp
                  </button>

                  <button
                    onClick={() => handleCancelSubscription("phone")}
                    className="btn-primary w-full py-3.5 shadow-sm hover:shadow-md hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <PhoneCall size={22} />
                    Cancelar via Ligação
                  </button>
                </div>

                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
                    <Clock size={14} className="text-accent" />
                    <span>Horário de atendimento: Segunda a Sexta, 8h às 18h</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
