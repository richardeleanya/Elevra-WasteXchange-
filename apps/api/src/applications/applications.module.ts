import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../entities/application.entity';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { BullModule } from '@nestjs/bull';
import { ApplicationsProcessor } from './applications.processor';
import { Invoice } from '../entities/invoice.entity';
import { InvoicesService } from '../invoices/invoices.service';
import { Benefit } from '../entities/benefit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, Invoice, Benefit]),
    BullModule.registerQueue({ name: 'applications' }),
  ],
  providers: [ApplicationsService, ApplicationsProcessor, InvoicesService],
  controllers: [ApplicationsController],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}