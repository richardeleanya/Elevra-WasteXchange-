import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>
  ) {}

  async savePayment(payment: Partial<Payment>) {
    return this.paymentRepo.save(payment);
  }

  async updateStatus(paymentId: string, status: string) {
    return this.paymentRepo.update(paymentId, { status });
  }

  async findByInvoiceId(invoiceId: string) {
    return this.paymentRepo.findOne({ where: { invoiceId } });
  }
}