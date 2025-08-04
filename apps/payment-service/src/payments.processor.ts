import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import Stripe from 'stripe';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { InvoiceCreatedEvent, PaymentIntentCreatedEvent, PaymentSucceededEvent } from 'libs-common';
import { Inject } from '@nestjs/common';

const stripe = new Stripe(process.env.STRIPE_API_KEY || '', { apiVersion: '2023-10-16' });

@Processor('payments')
export class PaymentsProcessor {
  constructor(
    private paymentsService: PaymentsService,
    @Inject('BULL_EVENTS_QUEUE') private eventsQueue: any // stub, in real setup inject Bull queue for events
  ) {}

  @Process('invoiceCreated')
  async handleInvoiceCreated(job: Job<InvoiceCreatedEvent>) {
    const { invoiceId, amount } = job.data;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in pennies
      currency: 'gbp',
      automatic_payment_methods: { enabled: true },
    });

    const payment = await this.paymentsService.savePayment({
      invoiceId,
      provider: 'stripe',
      status: 'created',
      externalId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    });

    // Publish PaymentIntentCreatedEvent
    const event: PaymentIntentCreatedEvent = {
      paymentId: payment.id,
      invoiceId,
      provider: 'stripe',
      clientSecret: paymentIntent.client_secret || '',
      createdAt: new Date().toISOString(),
    };
    await this.eventsQueue.add('PaymentIntentCreatedEvent', event);

    // Simulate webhook (in dev): mark as succeeded after 5s
    setTimeout(async () => {
      await this.paymentsService.updateStatus(payment.id, 'succeeded');
      // Ideally update Invoice.paid=true here via API call/event
      const successEvent: PaymentSucceededEvent = {
        paymentId: payment.id,
        invoiceId,
        provider: 'stripe',
        succeededAt: new Date().toISOString(),
      };
      await this.eventsQueue.add('PaymentSucceededEvent', successEvent);
    }, 5000);
  }
}