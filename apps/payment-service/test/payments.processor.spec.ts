import { PaymentsProcessor } from '../src/payments.processor';
import { PaymentsService } from '../src/payments.service';
import Stripe from 'stripe';

jest.mock('stripe');

describe('PaymentsProcessor', () => {
  let processor: PaymentsProcessor;
  let paymentsService: PaymentsService;
  let eventsQueue: { add: jest.Mock };

  beforeEach(() => {
    paymentsService = {
      savePayment: jest.fn().mockResolvedValue({ id: 'pmt1', invoiceId: 'inv1' }),
      updateStatus: jest.fn(),
      findByInvoiceId: jest.fn(),
    } as unknown as PaymentsService;
    eventsQueue = { add: jest.fn() };
    processor = new PaymentsProcessor(paymentsService, eventsQueue);
  });

  it('should create a PaymentIntent and publish events', async () => {
    (Stripe.prototype.paymentIntents as any).create = jest.fn().mockResolvedValue({
      id: 'pi_123',
      client_secret: 'secret_123',
    });

    await processor.handleInvoiceCreated({
      data: { invoiceId: 'inv1', amount: 12.34 },
    } as any);

    expect(paymentsService.savePayment).toHaveBeenCalled();
    expect(eventsQueue.add).toHaveBeenCalledWith('PaymentIntentCreatedEvent', expect.objectContaining({
      invoiceId: 'inv1',
      provider: 'stripe',
    }));
  });
});