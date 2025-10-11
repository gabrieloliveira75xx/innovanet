import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log da notificação recebida do Mercado Pago
    console.log('Webhook recebido do Mercado Pago:', body)
    
    // Aqui você pode processar a notificação
    // Por exemplo, atualizar o status da fatura no banco de dados
    
    if (body.type === 'payment') {
      const paymentId = body.data.id
      console.log(`Pagamento processado: ${paymentId}`)
      
      // Aqui você faria a lógica para atualizar o status da fatura
      // Por exemplo, buscar a fatura pelo payment_id e marcar como paga
    }
    
    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
