import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import PayInvoicePage from '../pages/pay/[invoiceId]';
import { Elements } from '@stripe/react-stripe-js';

jest.mock('@stripe/react-stripe-js', () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  useStripe: () => ({
    confirmCardPayment: jest.fn().mockResolvedValue({ paymentIntent: { status: 'succeeded' } }),
  }),
  useElements: () => ({
    getElement: () => ({}),
  }),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { invoiceId: 'inv1' },
    push: jest.fn(),
  }),
}));

describe('PayForm', () => {
  it('should show success toast on payment', async () => {
    render(
      <Elements stripe={{}} >
        <PayInvoicePage />
      </Elements>
    );
    fireEvent.submit(screen.getByRole('form'));
    await waitFor(() =>
      expect(screen.getByText('Payment successful!')).toBeInTheDocument()
    );
  });
});