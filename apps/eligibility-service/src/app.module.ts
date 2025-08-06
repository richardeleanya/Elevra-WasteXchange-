import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { EligibilityModule } from './eligibility/eligibility.module';

@Module({
  imports: [TerminusModule, EligibilityModule],
  controllers: [HealthController],
})
export class AppModule {}