import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { IntegrationController } from './integration.controller';
import { HMRCConnector } from './providers/hmrc.connector';
import { DWPConnector } from './providers/dwp.connector';
import { OpenBankingConnector } from './providers/openbanking.connector';
import { ExperianConnector } from './providers/experian.connector';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'integrations' }),
    TerminusModule,
  ],
  controllers: [HealthController, IntegrationController],
  providers: [
    HMRCConnector,
    DWPConnector,
    OpenBankingConnector,
    ExperianConnector,
  ],
  exports: [],
})
export class AppModule {}