import { NextRequest, NextResponse } from 'next/server'

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "TEST-6600054139336956-101020-93c9569ba92ef0403eec39d9c510bf04-2081096650"

export async function POST(request: NextRequest) {
  try {
    const { formData, selectedPaymentMethod } = await request.json()
    
    console.log('Processando pagamento:', { formData, selectedPaymentMethod })
    
    // Aqui você processaria o pagamento real usando a API do Mercado Pago
    // Por enquanto, vamos simular um pagamento bem-sucedido
    
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simular resposta de sucesso
    const paymentResult = {
      id: `payment_${Date.now()}`,
      status: 'approved',
      amount: formData.amount || 99.90,
      payment_method: selectedPaymentMethod,
      created_at: new Date().toISOString()
    }
    
    console.log('Pagamento processado com sucesso:', paymentResult)
    
    return NextResponse.json({ 
      success: true, 
      payment: paymentResult 
    })
    
  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao processar pagamento' 
    }, { status: 500 })
  }
}
