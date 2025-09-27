import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Cargar Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // URL de retorno después del pago
        return_url: `${window.location.origin}/orden/success`,
      },
      redirect: 'if_required'
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || 'Error en el pago');
        onError(error.message || 'Error en el pago');
      } else {
        setMessage("Ha ocurrido un error inesperado.");
        onError("Ha ocurrido un error inesperado.");
      }
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {message && (
        <div className="alert alert-danger mt-3" role="alert">
          {message}
        </div>
      )}

      <button
        disabled={isLoading || !stripe || !elements}
        className="btn btn-primary btn-lg w-100 mt-4"
        type="submit"
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            Procesando...
          </>
        ) : (
          <>
            <i className="fas fa-credit-card me-2" />
            Pagar ${amount.toLocaleString('es-MX')} MXN
          </>
        )}
      </button>
    </form>
  );
};

interface StripePaymentProps {
  amount: number;
  orderId?: string;
  customerEmail?: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({
  amount,
  orderId,
  customerEmail,
  onSuccess,
  onError
}) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Crear PaymentIntent en el backend
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        orderId,
        customerEmail
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          onError('Error al inicializar el pago');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        onError('Error al conectar con el servidor de pagos');
        setLoading(false);
      });
  }, [amount, orderId, customerEmail, onError]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#1e40af',
    },
  };

  const options = {
    clientSecret: clientSecret!,
    appearance,
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando formulario de pago...</span>
        </div>
        <p className="mt-2">Preparando formulario de pago seguro...</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="alert alert-danger">
        Error al cargar el formulario de pago. Por favor, recarga la página.
      </div>
    );
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};

export default StripePayment;