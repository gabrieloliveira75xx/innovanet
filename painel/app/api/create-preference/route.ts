import { NextRequest, NextResponse } from 'next/server'

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "TEST-6600054139336956-101020-93c9569ba92ef0403eec39d9c510bf04-2081096650"

export async function POST(request: NextRequest) {
  try {
    const { fatura, items } = await request.json()
    
    // Determinar os itens para a preferência
    let preferenceItems = []
    
    if (items && Array.isArray(items)) {
      // Múltiplos itens (para componentes universais)
      preferenceItems = items.map(item => ({
        title: item.title,
        quantity: item.quantity || 1,
        unit_price: item.amount
      }))
    } else if (fatura) {
      // Item único (para faturas)
      preferenceItems = [{
        title: `Fatura ${fatura.mes}`,
        quantity: 1,
        unit_price: parseFloat(fatura.valor.replace('R$ ', '').replace(',', '.'))
      }]
    } else {
      throw new Error('Nenhum item ou fatura fornecido')
    }
    
    // Criar preferência de pagamento no Mercado Pago
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: preferenceItems,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/minhas-faturas?status=success`,
          failure: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/minhas-faturas?status=failure`,
          pending: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/minhas-faturas?status=pending`
        },
        notification_url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/webhook`,
        external_reference: `fatura_${fatura.id}` // Referência para identificar a fatura
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Erro ao criar preferência:', error)
      return NextResponse.json({ error: 'Erro ao criar preferência de pagamento' }, { status: 500 })
    }

    const preference = await response.json()
    
    return NextResponse.json({ 
      preferenceId: preference.id,
      initPoint: preference.init_point 
    })
    
  } catch (error) {
    console.error('Erro no endpoint de preferência:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
