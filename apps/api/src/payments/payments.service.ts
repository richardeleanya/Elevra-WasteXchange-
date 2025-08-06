import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'libs-common';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>
  ) {}

  async getByInvoiceId(invoiceId: string): Promise<Payment | undefined> {
    return this.paymentRepo.findOne({ where: { invoiceId } });
  }
}