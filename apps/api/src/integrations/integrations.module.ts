import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationLog } from '../entities/integration_log.entity';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';

@Module({
  imports: [TypeOrmModule.forFeature([IntegrationLog])],
  controllers: [IntegrationsController],
  providers: [IntegrationsService],
  exports: [],
})
export class IntegrationsModule {}