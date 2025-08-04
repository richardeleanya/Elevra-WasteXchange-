import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { useStripePayment } from '../../hooks/useStripePayment';
import { useEffect, useState } from 'react';
import { Box, Button, Heading, useToast } from '@chakra-ui/react';

export default function PayInvoicePage() {
  const router = useRouter();
  const { invoiceId } = router.query as { invoiceId: string };
  const [stripePromise, setStripePromise] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    fetch('/api/payments/' + invoiceId)
      .then((res) => res.json())
      .then(({ publishableKey }) => {
        setStripePromise(loadStripe(publishableKey));
      });
  }, [invoiceId]);

  if (!stripePromise) return null;

  return (
    <Elements stripe={stripePromise}>
      <PayForm invoiceId={invoiceId} />
    </Elements>
  );
}

function PayForm({ invoiceId }: { invoiceId: string }) {
  const { confirmPayment, isLoading } = useStripePayment(invoiceId);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await confirmPayment.mutateAsync();
      toast({ status: 'success', description: 'Payment successful!' });
      router.push('/dashboard');
    } catch (err: any) {
      toast({ status: 'error', description: err.message || 'Payment failed' });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={12}>
      <Heading mb={4}>Pay Invoice</Heading>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <Button mt={4} colorScheme="blue" type="submit" isLoading={isLoading}>
          Pay now
        </Button>
      </form>
    </Box>
  );
}