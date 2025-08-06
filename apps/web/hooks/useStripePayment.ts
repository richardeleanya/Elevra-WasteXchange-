import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCallback } from 'react';

export function useStripePayment(invoiceId: string) {
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery(['payment', invoiceId], async () => {
    const res = await fetch(`/api/payments/${invoiceId}`);
    if (!res.ok) throw new Error('Unable to fetch payment info');
    return res.json();
  });

  const confirmPayment = useMutation(
    async () => {
      if (!stripe || !elements) throw new Error('Stripe not loaded');
      const card = elements.getElement(CardElement);
      if (!card) throw new Error('Card element not found');
      const { clientSecret } = data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card }
      });
      if (result.error) throw result.error;
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['invoices']);
      },
    }
  );

  return { ...data, isLoading, error, confirmPayment };
}