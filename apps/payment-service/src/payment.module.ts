import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';
import { PaymentsProcessor } from './payments.processor';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'payments' }),
    TypeOrmModule.forFeature([Payment]),
    TerminusModule,
  ],
  providers: [PaymentsService, PaymentsProcessor],
  exports: [PaymentsService],
})
export class PaymentModule {}