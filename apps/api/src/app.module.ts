import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HouseholdModule } from './household/household.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { BenefitsModule } from './benefits/benefits.module';
import { ApplicationsModule } from './applications/applications.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    BullModule.forRootAsync({
      useFactory: () => ({
        connection: {
          host: 'redis',
          port: 6379,
        },
      }),
    }),
    UsersModule,
    AuthModule,
    HouseholdModule,
    EligibilityModule,
    BenefitsModule,
    ApplicationsModule,
    InvoicesModule,
    CommonModule,
  ],
})
export class AppModule {}