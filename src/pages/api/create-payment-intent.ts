import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil'
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'mxn', orderId, customerEmail } = req.body;

    // Validar que el monto sea válido
    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'El monto mínimo es de 50 centavos' });
    }

    // Crear el PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe espera el monto en centavos
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: orderId || '',
        customerEmail: customerEmail || ''
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (err: any) {
    console.error('Error creating payment intent:', err);
    res.status(500).json({
      error: 'Error al crear la intención de pago',
      details: err.message
    });
  }
}