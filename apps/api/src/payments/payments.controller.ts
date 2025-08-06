import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':invoiceId')
  async getPaymentInfo(@Param('invoiceId') invoiceId: string) {
    const payment = await this.paymentsService.getByInvoiceId(invoiceId);
    if (!payment) {
      return { error: 'Not found' };
    }
    return {
      clientSecret: payment.clientSecret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    };
  }
}