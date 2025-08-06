import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepo: Repository<Invoice>
  ) {}

  async create(applicationId: string, feeAmount: number) {
    const invoice = this.invoiceRepo.create({
      applicationId,
      feeAmount,
      paid: false,
    });
    return this.invoiceRepo.save(invoice);
  }

  findByUser(userId: string) {
    return this.invoiceRepo
      .createQueryBuilder('invoice')
      .innerJoin('invoice.application', 'application')
      .where('application.userId = :userId', { userId })
      .getMany();
  }
}