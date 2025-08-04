import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationProcessor } from './notification.processor';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'notifications' }),
  ],
  providers: [NotificationProcessor],
})
export class NotificationModule {}